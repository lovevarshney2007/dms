import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import {
  postAdmin,
  putAdmin,
  deleteAdmin,
  getAdmin,
  clearAdminToken
} from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../../components/common/FormNotice";

const defaultEvent = {
  title: "",
  description: "",
  eventDate: "",
  eventLocation: "",
  posterImage: "",
  registrationDeadline: "",
  eventType: "Competition",
  liveLink: ""
};

const eventTypes = ["Competition", "Concert", "Workshop"];
const featureLinks = [
  { id: "create-event", label: "Create Event" },
  { id: "events-list", label: "Events List" },
  { id: "singing-report", label: "Singing Report" },
  { id: "ngo-report", label: "NGO Report" },
  { id: "all-submissions", label: "All Submissions" },
  { id: "volunteer-form", label: "Volunteer Form" },
  { id: "service-feature", label: "Service Feature" }
];

function AdminPage() {
  const [form, setForm] = useState(defaultEvent);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [reports, setReports] = useState({ singing: [], ngo: [], all: [] });
  const [loadingReports, setLoadingReports] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("create-event");
  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    city: "",
    contact: "",
    startDate: ""
  });
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  async function loadEvents() {
    try {
      const data = await getAdmin("/api/admin/events");
      setEvents(data);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  async function loadReports() {
    setLoadingReports(true);
    try {
      const [singing, ngo, all] = await Promise.all([
        getAdmin("/api/admin/reports/singing"),
        getAdmin("/api/admin/reports/ngo"),
        getAdmin("/api/admin/reports/all")
      ]);
      setReports({ singing, ngo, all });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoadingReports(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    loadEvents();
    loadReports();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      if (editingId) {
        await putAdmin(`/api/admin/events/${editingId}`, form);
        setStatus({ type: "success", message: "Event updated successfully." });
      } else {
        await postAdmin("/api/admin/events", form);
        setStatus({ type: "success", message: "Event created successfully." });
      }
      setForm(defaultEvent);
      setEditingId("");
      loadEvents();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(ev) {
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      eventDate: ev.eventDate ? ev.eventDate.slice(0, 10) : "",
      eventLocation: ev.eventLocation || "",
      posterImage: ev.posterImage || "",
      registrationDeadline: ev.registrationDeadline ? ev.registrationDeadline.slice(0, 10) : "",
      eventType: ev.eventType || "Competition",
      liveLink: ev.liveLink || ""
    });
    setEditingId(ev._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    try {
      await deleteAdmin(`/api/admin/events/${id}`);
      setStatus({ type: "success", message: "Event deleted." });
      loadEvents();
      if (editingId === id) {
        setEditingId("");
        setForm(defaultEvent);
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  function handleNavClick(id) {
    setActiveSection(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }

  function handleServiceSubmit(e) {
    e.preventDefault();
    if (!serviceForm.title.trim() || !serviceForm.description.trim()) return;
    const newService = {
      ...serviceForm,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()
    };
    setServices((prev) => [...prev, newService]);
    setServiceForm({
      title: "",
      description: "",
      city: "",
      contact: "",
      startDate: ""
    });
  }

  function handleServiceDelete(id) {
    setServices((prev) => prev.filter((item) => item.id !== id));
  }

  function downloadData(rows, filenameBase, columns, format = "csv") {
    if (!rows || rows.length === 0) return;

    const makeDelimited = (delimiter) => {
      const headers = columns.map((c) => c.label).join(delimiter);
      const body = rows
        .map((row) =>
          columns
            .map((c) => {
              const val = row[c.key] ?? "";
              const safe = String(val).replace(/"/g, '""');
              return safe.includes(delimiter) ? `"${safe}"` : safe;
            })
            .join(delimiter)
        )
        .join("\n");
      return `${headers}\n${body}`;
    };

    if (format === "pdf") {
      const html = `
        <html>
          <head><title>${filenameBase}</title></head>
          <body>
            <h3>${filenameBase}</h3>
            <table border="1" cellpadding="6" cellspacing="0">
              <thead>
                <tr>${columns.map((c) => `<th>${c.label}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${rows
                  .map(
                    (row) =>
                      `<tr>${columns
                        .map((c) => `<td>${row[c.key] ?? ""}</td>`)
                        .join("")}</tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>`;
      const win = window.open("", "_blank");
      if (!win) return;
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 200);
      return;
    }

    let content = "";
    let mime = "text/csv;charset=utf-8;";
    let ext = "csv";

    if (format === "tsv") {
      content = makeDelimited("\t");
      mime = "text/tab-separated-values;charset=utf-8;";
      ext = "tsv";
    } else if (format === "json") {
      content = JSON.stringify(rows, null, 2);
      mime = "application/json;charset=utf-8;";
      ext = "json";
    } else {
      content = makeDelimited(",");
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filenameBase}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <PageShell basePath="/admin">
      <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-6 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside
            className={`transition-all duration-200 lg:sticky lg:top-24 lg:h-[calc(100vh-12rem)] lg:flex-shrink-0 ${
              sidebarOpen
                ? "rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm w-full lg:w-64"
                : "w-full lg:w-auto lg:border-none lg:bg-transparent lg:p-0"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-700"></p>
                {sidebarOpen ? <span className="hidden text-xs text-stone-500 lg:inline"></span> : null}
              </div>
              <button
                type="button"
                aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                onClick={() => setSidebarOpen((open) => !open)}
                className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-stone-50"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {sidebarOpen ? (
                    <path d="M6 6l12 12M6 18L18 6" />
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            <nav className={`${sidebarOpen ? "mt-4 grid" : "hidden"} gap-2 text-sm font-semibold text-stone-800`}>
              {featureLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-emerald-700">&gt;</span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-5xl text-red-700">Admin</h1>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearAdminToken();
                  navigate("/admin/login");
                }}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-white"
              >
                Log out
              </button>
            </div>

            <div className={activeSection === "create-event" ? "space-y-4" : "hidden"} id="create-event">
              <form className="grid gap-4 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm md:grid-cols-2" onSubmit={handleSubmit}>
                <label className="grid gap-2 text-sm font-medium text-stone-800">
                  Event Title
                  <input
                    className={renderInputClassNames(true)}
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-800">
                  Event Type
                  <select
                    className={renderInputClassNames(true)}
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    required
                  >
                    {eventTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-800 md:col-span-2">
                  Event Description
                  <textarea
                    className={`${renderInputClassNames(true)} min-h-12`}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-800">
                  Event Date
                  <input
                    className={renderInputClassNames(true)}
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-800">
                  Registration Deadline
                  <input
                    className={renderInputClassNames(true)}
                    type="date"
                    value={form.registrationDeadline}
                    onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-800">
                  Event Location
                  <input
                    className={renderInputClassNames(true)}
                    type="text"
                    value={form.eventLocation}
                    onChange={(e) => setForm({ ...form, eventLocation: e.target.value })}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-800">
                  Poster Image
                  <input
                    className={renderInputClassNames(true)}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setForm((prev) => ({ ...prev, posterImage: reader.result || prev.posterImage }));
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-800">
                  YouTube Live / Stream Link (optional)
                  <input
                    className={renderInputClassNames(true)}
                    type="url"
                    value={form.liveLink}
                    onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                    placeholder="https://youtube.com/live/..."
                  />
                </label>

                <div className="space-y-4 md:col-span-2">
                  <FormNotice status={status} />
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? "Saving..." : editingId ? "Update Event" : "Create Event"}
                    </button>
                    {editingId ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId("");
                          setForm(defaultEvent);
                        }}
                        className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        Cancel Edit
                      </button>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>

            <div className={activeSection === "events-list" ? "space-y-3" : "hidden"} id="events-list">
              <h2 className="font-serif text-2xl text-stone-900">Events List</h2>
              <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between gap-2 pb-3">
                  <span className="text-sm font-semibold text-stone-700">Total: {events.length}</span>
                  <button
                    type="button"
                    className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
                    onClick={loadEvents}
                  >
                    Refresh
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {events.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-5 text-center text-sm text-stone-500">
                      No events yet.
                    </p>
                  ) : (
                    events.map((ev) => (
                      <article
                        key={ev._id}
                        className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-orange-700">{ev.eventType}</p>
                            <h3 className="font-serif text-lg text-stone-900 line-clamp-2">{ev.title}</h3>
                            <p className="text-xs text-stone-600 line-clamp-2">{ev.description}</p>
                          </div>
                          <img
                            className="h-14 w-14 rounded-lg object-cover"
                            src={ev.posterImage || "/legacy/current_event.jpg"}
                            alt={ev.title}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                          <div>
                            <p className="font-semibold text-stone-800">Date</p>
                            <p>{ev.eventDate ? ev.eventDate.slice(0, 10) : "TBA"}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-stone-800">Deadline</p>
                            <p>{ev.registrationDeadline ? ev.registrationDeadline.slice(0, 10) : "TBA"}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-stone-800">Location</p>
                            <p className="line-clamp-1">{ev.eventLocation || "TBA"}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-stone-800">Stream</p>
                            <p className="line-clamp-1">{ev.liveLink || "Optional"}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="rounded-full bg-stone-900 px-3 py-2 text-[11px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
                            onClick={() => startEdit(ev)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded-full border border-stone-300 px-3 py-2 text-[11px] font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-white"
                            onClick={() => handleDelete(ev._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className={activeSection === "singing-report" ? "rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm" : "hidden"} id="singing-report">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-xl text-stone-900">Singing Report</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">
                    {loadingReports ? "Loading..." : `${reports.singing.length} entries`}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["csv", "tsv", "json", "pdf"].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        disabled={reports.singing.length === 0}
                        onClick={() =>
                          downloadData(
                            reports.singing,
                            "singing-report",
                            [
                              { key: "name", label: "Name" },
                              { key: "email", label: "Email" },
                              { key: "phone", label: "Phone" },
                              { key: "city", label: "City" },
                              { key: "talentCategory", label: "Talent" },
                              { key: "languagePreference", label: "Language" },
                              { key: "videoLink", label: "Video Link" }
                            ],
                            fmt
                          )
                        }
                        className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="max-h-[360px] overflow-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                {reports.singing.length === 0 ? (
                  <p className="px-4 py-4 text-center text-sm text-stone-500">No submissions yet.</p>
                ) : (
                  <table className="min-w-full text-sm text-stone-800">
                    <thead className="bg-stone-100 text-left">
                      <tr>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Email</th>
                        <th className="px-3 py-2">Phone</th>
                        <th className="px-3 py-2">City</th>
                        <th className="px-3 py-2">Talent</th>
                        <th className="px-3 py-2">Language</th>
                        <th className="px-3 py-2">Video</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.singing.map((item) => (
                        <tr key={item._id} className="border-t border-stone-100">
                          <td className="px-3 py-2 font-semibold">{item.name}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.email}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.phone}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.city}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.talentCategory}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.languagePreference}</td>
                          <td className="px-3 py-2 text-xs text-emerald-700 underline">
                            {item.videoLink ? (
                              <a href={item.videoLink} target="_blank" rel="noreferrer">
                                Open
                              </a>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className={activeSection === "ngo-report" ? "rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm" : "hidden"} id="ngo-report">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-xl text-stone-900">NGO Report</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">
                    {loadingReports ? "Loading..." : `${reports.ngo.length} entries`}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["csv", "tsv", "json", "pdf"].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        disabled={reports.ngo.length === 0}
                        onClick={() =>
                          downloadData(
                            reports.ngo,
                            "ngo-report",
                            [
                              { key: "name", label: "Name" },
                              { key: "email", label: "Email" },
                              { key: "phone", label: "Phone" },
                              { key: "city", label: "City" },
                              { key: "helpType", label: "Help Type" },
                              { key: "message", label: "Message" }
                            ],
                            fmt
                          )
                        }
                        className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="max-h-[360px] overflow-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                {reports.ngo.length === 0 ? (
                  <p className="px-4 py-4 text-center text-sm text-stone-500">No submissions yet.</p>
                ) : (
                  <table className="min-w-full text-sm text-stone-800">
                    <thead className="bg-stone-100 text-left">
                      <tr>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Email</th>
                        <th className="px-3 py-2">Phone</th>
                        <th className="px-3 py-2">City</th>
                        <th className="px-3 py-2">Help Type</th>
                        <th className="px-3 py-2">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.ngo.map((item) => (
                        <tr key={item._id} className="border-t border-stone-100">
                          <td className="px-3 py-2 font-semibold">{item.name}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.email}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.phone}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.city}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.helpType}</td>
                          <td className="px-3 py-2 text-xs text-stone-700">{item.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div
              className={activeSection === "all-submissions" ? "rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm" : "hidden"}
              id="all-submissions"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-xl text-stone-900">All Submissions</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">
                    {loadingReports ? "Loading..." : `${reports.all.length} entries`}
                  </span>
                  <button
                    type="button"
                    disabled={reports.all.length === 0}
                    onClick={() =>
                      downloadCSV(
                        reports.all,
                        "all-submissions.csv",
                        [
                          { key: "formType", label: "Type" },
                          { key: "source", label: "Source" },
                          { key: "name", label: "Name" },
                          { key: "email", label: "Email" },
                          { key: "phone", label: "Phone" },
                          { key: "city", label: "City" },
                          { key: "createdAt", label: "Created" }
                        ]
                      )
                    }
                    className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="max-h-[360px] overflow-auto">
                <table className="min-w-full text-sm text-stone-800">
                  <thead className="bg-stone-100 text-left">
                    <tr>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Source</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Contact</th>
                      <th className="px-3 py-2">City</th>
                      <th className="px-3 py-2">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.all.length === 0 ? (
                      <tr>
                        <td className="px-3 py-3 text-center text-stone-500" colSpan={6}>
                          No submissions yet.
                        </td>
                      </tr>
                    ) : (
                      reports.all.map((item) => (
                        <tr key={item._id} className="border-t border-stone-100">
                          <td className="px-3 py-2 uppercase text-xs font-semibold text-stone-600">{item.formType}</td>
                          <td className="px-3 py-2 text-xs text-stone-600">{item.source || "-"}</td>
                          <td className="px-3 py-2">
                            <div className="font-semibold">{item.name}</div>
                            {item.stageName ? <div className="text-xs text-stone-500">Stage: {item.stageName}</div> : null}
                          </td>
                          <td className="px-3 py-2 text-xs text-stone-700">
                            {item.email}
                            <br />
                            {item.phone}
                          </td>
                          <td className="px-3 py-2">{item.city}</td>
                          <td className="px-3 py-2 text-xs text-stone-600">
                            {item.createdAt ? item.createdAt.slice(0, 10) : ""}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={activeSection === "volunteer-form" ? "rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-5 shadow-sm" : "hidden"} id="volunteer-form">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Volunteer</p>
                  <h3 className="font-serif text-2xl text-stone-900">Volunteer Form</h3>
                  <p className="mt-2 text-sm text-stone-700">
                    Collect and review community volunteer submissions here. Hook this card to your future form when ready.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white px-4 py-3 text-sm text-stone-800 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Status</p>
                  <p className="font-semibold">Pending integration</p>
                </div>
                <div className="rounded-xl bg-white px-4 py-3 text-sm text-stone-800 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Next step</p>
                  <p className="font-semibold">Connect API endpoint</p>
                </div>
              </div>
            </div>

            <div
              className={activeSection === "service-feature" ? "rounded-2xl border border-dashed border-amber-200 bg-amber-50/60 p-5 shadow-sm" : "hidden"}
              id="service-feature"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">Services</p>
                  <h3 className="font-serif text-2xl text-stone-900">NGO Service Feature</h3>
                  <p className="mt-2 text-sm text-stone-700">
                    Add and preview NGO service offerings similar to events. Data is stored locally in this session for now.
                  </p>
                </div>
              </div>
              <form className="mt-4 grid gap-3 rounded-xl bg-white px-4 py-4 shadow-sm sm:grid-cols-2" onSubmit={handleServiceSubmit}>
                <label className="grid gap-1 text-xs font-semibold text-stone-800">
                  Service title
                  <input
                    className={renderInputClassNames(true)}
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    required
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold text-stone-800">
                  City / Region
                  <input
                    className={renderInputClassNames(true)}
                    type="text"
                    value={serviceForm.city}
                    onChange={(e) => setServiceForm({ ...serviceForm, city: e.target.value })}
                    placeholder="E.g., Delhi NCR"
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold text-stone-800 sm:col-span-2">
                  Description
                  <textarea
                    className={`${renderInputClassNames(true)} min-h-12`}
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    required
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold text-stone-800">
                  Start date (optional)
                  <input
                    className={renderInputClassNames(true)}
                    type="date"
                    value={serviceForm.startDate}
                    onChange={(e) => setServiceForm({ ...serviceForm, startDate: e.target.value })}
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold text-stone-800">
                  Contact / Link
                  <input
                    className={renderInputClassNames(true)}
                    type="text"
                    value={serviceForm.contact}
                    onChange={(e) => setServiceForm({ ...serviceForm, contact: e.target.value })}
                    placeholder="email, phone, or URL"
                  />
                </label>
                <div className="sm:col-span-2 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-amber-600"
                  >
                    Add service
                  </button>
                  <p className="text-xs text-stone-500">Services are kept client-side until backend is wired.</p>
                </div>
              </form>

              <div className="mt-4 grid max-h-[320px] gap-3 overflow-auto sm:grid-cols-2">
                {services.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-amber-200 bg-white px-4 py-4 text-center text-sm text-stone-600">
                    No services yet. Add one with the form above.
                  </p>
                ) : (
                  services.map((service) => (
                    <article
                      key={service.id}
                      className="flex flex-col gap-2 rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm text-stone-800 shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{service.title}</p>
                          <p className="text-[11px] text-stone-500">{service.city || "Location TBD"}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleServiceDelete(service.id)}
                          className="text-[11px] font-semibold text-stone-500 transition hover:text-stone-800"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-[12px] text-stone-700 line-clamp-3">{service.description}</p>
                      <div className="flex items-center justify-between text-[11px] text-stone-600">
                        <span>{service.startDate ? service.startDate : "Start date TBD"}</span>
                        <span className="text-emerald-700">{service.contact || "Add contact"}</span>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default AdminPage;
