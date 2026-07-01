import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  postAdmin,
  putAdmin,
  deleteAdmin,
  getAdmin,
  clearAdminToken
} from "../../lib/api";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ path, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const ICONS = {
  dashboard:   "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  competition: "M8 21l4-4 4 4M12 17V3M5 8l7-5 7 5",
  season:      "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  contestants: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  stories:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  gallery:     "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0",
  videos:      "M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
  patrons:     "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  sponsors:    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  testimonials:"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  queries:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  settings:    "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  logout:      "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  plus:        "M12 5v14M5 12h14",
  edit:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:       "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  check:       "M20 6L9 17l-5-5",
  x:           "M18 6L6 18M6 6l12 12",
  refresh:     "M1 4v6h6M23 20v-6h-6 M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15",
  download:    "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  menu:        "M3 12h18M3 6h18M3 18h18"
};

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",           icon: "dashboard" },
  { id: "home",         label: "Home Page",           icon: "patrons" },
  { id: "competitions", label: "Competitions Page",   icon: "competition" },
  { id: "shows",        label: "Shows Page",          icon: "videos" },
  { id: "talents",      label: "Success Stories Page",icon: "stories" },
  { id: "gallery_page", label: "Gallery Page",        icon: "gallery" },
  { id: "contact",      label: "Contact Page",        icon: "queries" },
  { id: "registrations",label: "Join Us (Registrations)", icon: "contestants" },
  { id: "settings",     label: "Website Settings",    icon: "settings" }
];

// Status badge
const StatusBadge = ({ status }) => {
  const colors = {
    pending:     "bg-amber-100 text-amber-700",
    approved:    "bg-emerald-100 text-emerald-700",
    rejected:    "bg-red-100 text-red-700",
    shortlisted: "bg-blue-100 text-blue-700",
    replied:     "bg-purple-100 text-purple-700",
    resolved:    "bg-stone-100 text-stone-600"
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors[status] || "bg-stone-100 text-stone-500"}`}>
      {status || "pending"}
    </span>
  );
};

// ─── Generic CRUD section ─────────────────────────────────────────────────────
const CONTENT_TYPE_MAP = {
  competitions: "competition",
  seasons:      "season",
  contestants:  "qualified-contestant",
  contestants:  "qualified-contestant",
  stories:      "success-story",
  gallery:      "gallery",
  videos:       "video",
  patrons:      "patron",
  sponsors:     "sponsor",
  testimonials: "testimonial"
};

const FIELDS_MAP = {
  competitions: [
    { key: "title",       label: "Title",       type: "text", required: true },
    { key: "subtitle",    label: "Subtitle",    type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "imageUrl",    label: "Image URL",   type: "text" },
    { key: "meta.date",   label: "Event Date",  type: "text" },
    { key: "meta.location", label: "Location",  type: "text" },
    { key: "meta.tag",    label: "Event Tag",   type: "text" },
    { key: "order",       label: "Order",       type: "number" }
  ],
  seasons: [
    { key: "title",       label: "Season Title",  type: "text", required: true },
    { key: "subtitle",    label: "Tagline",        type: "text" },
    { key: "year",        label: "Year",           type: "text" },
    { key: "meta.status", label: "Status (e.g. completed, grand-finale)", type: "text" },
    { key: "meta.color",  label: "CSS Color Class (e.g. from-amber-500 to-orange-600)", type: "text" },
    { key: "meta.lightBg", label: "CSS Light Bg Class", type: "text" },
    { key: "meta.borderColor", label: "CSS Border Class", type: "text" },
    { key: "meta.winner", label: "Winner Name", type: "text" },
    { key: "meta.winnerImg", label: "Winner Image URL", type: "text" },
    { key: "meta.youtube", label: "YouTube Highlight URL", type: "text" },
    { key: "meta.poster", label: "Poster Image URL", type: "text" },
    { key: "meta.grandFinale", label: "Grand Finale Date (if upcoming)", type: "text" },
    { key: "meta.venue", label: "Grand Finale Venue (if upcoming)", type: "text" },
    { key: "meta.description", label: "Full Description",   type: "textarea" },
    { key: "order",       label: "Order",          type: "number" }
  ],
  contestants: [
    { key: "title",       label: "Contestant Name", type: "text", required: true },
    { key: "imageUrl",    label: "Photo URL",       type: "text" },
    { key: "meta.city",   label: "City",            type: "text" },
    { key: "meta.status", label: "Status",          type: "text" },
    { key: "meta.category", label: "Category",      type: "text" },
    { key: "meta.score",  label: "Score",           type: "text" },
    { key: "order",       label: "Order",           type: "number" }
  ],
  stories: [
    { key: "title",       label: "Person Name",   type: "text", required: true },
    { key: "subtitle",    label: "Achievement",   type: "text", required: true },
    { key: "description", label: "Story",         type: "textarea" },
    { key: "imageUrl",    label: "Photo URL",     type: "text" },
    { key: "order",       label: "Order",         type: "number" }
  ],
  gallery: [
    { key: "title",    label: "Caption",    type: "text" },
    { key: "imageUrl", label: "Image URL",  type: "text", required: true },
    { key: "meta.type", label: "Type (Gallery or Video)", type: "text" },
    { key: "meta.season", label: "Season", type: "text" },
    { key: "meta.youtubeLink", label: "YouTube Link", type: "text" },
    { key: "order",    label: "Order",      type: "number" }
  ],
  videos: [
    { key: "title",    label: "Video Title", type: "text", required: true },
    { key: "videoUrl", label: "YouTube URL", type: "text",  required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "order",    label: "Order",       type: "number" }
  ],
  patrons: [
    { key: "title",        label: "Name",         type: "text", required: true },
    { key: "subtitle",     label: "Title/Role",   type: "text" },
    { key: "imageUrl",     label: "Photo URL",    type: "text" },
    { key: "meta.role",    label: "Team Role (if in team)", type: "text" },
    { key: "meta.isTeam",  label: "Is Team Member? (true/false)", type: "text" },
    { key: "order",        label: "Order",        type: "number" }
  ],
  sponsors: [
    { key: "title",        label: "Sponsor Name",  type: "text", required: true },
    { key: "subtitle",     label: "Tier/Level",    type: "text" },
    { key: "imageUrl",     label: "Logo URL",      type: "text" },
    { key: "link",         label: "Website",       type: "text" },
    { key: "order",        label: "Order",         type: "number" }
  ],
  testimonials: [
    { key: "title",       label: "Person Name",  type: "text", required: true },
    { key: "subtitle",    label: "Role",         type: "text" },
    { key: "description", label: "Testimonial",  type: "textarea", required: true },
    { key: "imageUrl",    label: "Photo URL",    type: "text" },
    { key: "order",       label: "Order",        type: "number" }
  ]
};

function buildEmpty(section) {
  return (FIELDS_MAP[section] || []).reduce((acc, f) => {
    acc[f.key] = f.type === "number" ? 0 : "";
    return acc;
  }, {});
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon }) {
  return (
    <div className={`admin-stat-card ${color}`}>
      <div className="admin-stat-icon">
        <Icon path={ICONS[icon]} size={22} />
      </div>
      <div>
        <p className="admin-stat-value">{value ?? "—"}</p>
        <p className="admin-stat-label">{label}</p>
      </div>
    </div>
  );
}

// ─── Generic CMS Section ───────────────────────────────────────────────────────
function CmsSection({ section, title }) {
  const apiType = CONTENT_TYPE_MAP[section];
  const fields  = FIELDS_MAP[section] || [];
  const [items, setItems] = useState([]);
  const [form,  setForm]  = useState(buildEmpty(section));
  const [editId, setEditId] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [saving,  setSaving]    = useState(false);
  const [notice,  setNotice]    = useState({ type: "", msg: "" });
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdmin(`/api/admin/content/${apiType}`);
      setItems(data);
    } catch (e) {
      setNotice({ type: "error", msg: e.message });
    } finally {
      setLoading(false);
    }
  }, [apiType]);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setNotice({ type: "", msg: "" });
    try {
      const payload = {};
        const meta = {};
        for (const [k, v] of Object.entries(form)) {
          if (k.startsWith("meta.")) {
            let val = v;
            if (val === "true") val = true;
            if (val === "false") val = false;
            meta[k.replace("meta.", "")] = val;
          } else {
            payload[k] = v;
          }
        }
        if (Object.keys(meta).length > 0) {
          payload.meta = meta;
        }
      // Tags field: convert comma string to array
      if ("tags" in payload && typeof payload.tags === "string") {
        payload.tags = payload.tags.split(",").map(t => t.trim()).filter(Boolean);
      }
      if (editId) {
        await putAdmin(`/api/admin/content/${editId}`, payload);
        setNotice({ type: "ok", msg: "Updated!" });
      } else {
        await postAdmin(`/api/admin/content/${apiType}`, payload);
        setNotice({ type: "ok", msg: "Created!" });
      }
      setForm(buildEmpty(section));
      setEditId(null);
      setShowForm(false);
      load();
    } catch (e) {
      setNotice({ type: "error", msg: e.message });
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    const f = fields.reduce((acc, field) => {
      if (field.key.startsWith("meta.")) {
          const metaKey = field.key.replace("meta.", "");
          acc[field.key] = item.meta && item.meta[metaKey] !== undefined ? String(item.meta[metaKey]) : "";
        } else if (field.key === "tags" && Array.isArray(item[field.key])) {
        acc[field.key] = item[field.key].join(", ");
      } else {
        acc[field.key] = item[field.key] ?? (field.type === "number" ? 0 : "");
      }
      return acc;
    }, {});
    setForm(f);
    setEditId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteAdmin(`/api/admin/content/${id}`);
      load();
    } catch (e) {
      setNotice({ type: "error", msg: e.message });
    }
  }

  const downloadCSV = () => {
    if (!items.length) return;
    const keys = fields.map(f => f.key);
    const header = fields.map(f => f.label).join(",");
    const rows = items.map(item => keys.map(k => `"${(item[k] || "").toString().replace(/"/g, '""')}"`).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${section}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">{title || section}</h2>
          <p className="admin-section-count">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="admin-section-actions">
          <button className="admin-btn-icon" onClick={load} title="Refresh"><Icon path={ICONS.refresh} size={15} /></button>
          <button className="admin-btn-icon" onClick={downloadCSV} title="Download CSV"><Icon path={ICONS.download} size={15} /></button>
          <button className="admin-btn-primary" onClick={() => { setShowForm(f => !f); setEditId(null); setForm(buildEmpty(section)); }}>
            <Icon path={ICONS.plus} size={14} /> {showForm && !editId ? "Cancel" : "Add New"}
          </button>
        </div>
      </div>

      {notice.msg && (
        <div className={`admin-notice ${notice.type === "ok" ? "admin-notice-ok" : "admin-notice-err"}`}>
          {notice.msg}
          <button onClick={() => setNotice({ type: "", msg: "" })}><Icon path={ICONS.x} size={13} /></button>
        </div>
      )}

      {(showForm || editId) && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3 className="admin-form-title">{editId ? "Edit Item" : "Add New"}</h3>
          <div className="admin-form-grid">
            {fields.map(field => (
              <label key={field.key} className={`admin-label ${field.type === "textarea" ? "admin-label-full" : ""}`}>
                {field.label}{field.required && <span className="text-red-400"> *</span>}
                {field.type === "textarea" ? (
                  <textarea
                    className="admin-input"
                    value={form[field.key] || ""}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    required={field.required}
                    rows={3}
                  />
                ) : (
                  <input
                    className="admin-input"
                    type={field.type || "text"}
                    value={form[field.key] ?? ""}
                    onChange={e => setForm(p => ({ ...p, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value }))}
                    required={field.required}
                  />
                )}
              </label>
            ))}
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving ? "Saving…" : editId ? "Update" : "Create"}
            </button>
            <button type="button" className="admin-btn-ghost" onClick={() => { setShowForm(false); setEditId(null); setForm(buildEmpty(section)); }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">No items yet. Click "Add New" to get started.</div>
      ) : (
        <div className="admin-cards-grid">
          {items.map(item => (
            <div key={item._id} className="admin-card">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title || item.name || ""} className="admin-card-img" onError={e => { e.target.style.display = "none"; }} />
              )}
              {item.videoUrl && (
                <div className="admin-card-video-thumb">
                  <Icon path={ICONS.videos} size={28} />
                </div>
              )}
              <div className="admin-card-body">
                <p className="admin-card-title">{item.title || item.name || item.settingKey || "Untitled"}</p>
                {(item.subtitle || item.role || item.organization) && (
                  <p className="admin-card-sub">{item.subtitle || item.role || item.organization}</p>
                )}
                {item.description && <p className="admin-card-desc">{item.description}</p>}
                {item.quote && <p className="admin-card-desc italic">"{item.quote}"</p>}
                {item.year && <span className="admin-card-badge">{item.year}</span>}
                {item.season && <span className="admin-card-badge">{item.season}</span>}
              </div>
              <div className="admin-card-actions">
                <button className="admin-card-btn-edit" onClick={() => startEdit(item)}>
                  <Icon path={ICONS.edit} size={13} /> Edit
                </button>
                <button className="admin-card-btn-del" onClick={() => handleDelete(item._id)}>
                  <Icon path={ICONS.trash} size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function DashboardSection() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdmin("/api/admin/dashboard").then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Registrations",       key: "totalRegistrations", icon: "contestants", color: "stat-blue" },
    { label: "Contact Queries",      key: "contactQueries",     icon: "queries",      color: "stat-orange" },
    { label: "Events",               key: "totalEvents",        icon: "competition",  color: "stat-green" },
    { label: "Competitions",         key: "competitions",       icon: "competition",  color: "stat-purple" },
    { label: "Seasons",              key: "seasons",            icon: "season",       color: "stat-teal" },
    { label: "Qualified Contestants",key: "qualifiedContestants",icon: "contestants", color: "stat-indigo" },
    { label: "Success Stories",      key: "successStories",     icon: "stories",      color: "stat-amber" },
    { label: "Gallery Items",        key: "galleryItems",       icon: "gallery",      color: "stat-pink" },
    { label: "Videos",               key: "videos",             icon: "videos",       color: "stat-red" },
    { label: "Patrons",              key: "patrons",            icon: "patrons",      color: "stat-rose" },
    { label: "Sponsors",             key: "sponsors",           icon: "sponsors",     color: "stat-yellow" },
    { label: "Testimonials",         key: "testimonials",       icon: "testimonials", color: "stat-cyan" }
  ];

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Dashboard</h2>
      <p className="admin-section-count mb-6">Overview of your website content</p>
      {loading ? (
        <div className="admin-empty">Loading stats…</div>
      ) : (
        <div className="admin-stats-grid">
          {cards.map(c => (
            <StatCard key={c.key} label={c.label} value={stats?.[c.key]} icon={c.icon} color={c.color} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Registrations Section ─────────────────────────────────────────────────────
function ContestantsSection() {
  const [items, setItems]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const LIMIT = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (filter !== "all") params.set("formType", filter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("search", search);
      const data = await getAdmin(`/api/admin/registrations?${params}`);
      setItems(data.items);
      setTotal(data.total);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, filter, statusFilter, search]);

  useEffect(() => { load(); }, [load]);

  async function setStatus(id, status) {
    try {
      await putAdmin(`/api/admin/registrations/${id}/status`, { status });
      load();
    } catch (e) { alert(e.message); }
  }

  const downloadCSV = () => {
    if (!items.length) return;
    const cols = ["name","email","phone","city","formType","talentCategory","languagePreference","videoLink","status","createdAt"];
    const header = cols.join(",");
    const rows = items.map(r => cols.map(k => `"${(r[k]||"").toString().replace(/"/g,'""')}"`).join(","));
    const blob = new Blob([[header,...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="registrations.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Qualified Contestants</h2>
          <p className="admin-section-count">Total: {total}</p>
        </div>
        <div className="admin-section-actions">
          <button className="admin-btn-icon" onClick={load} title="Refresh"><Icon path={ICONS.refresh} size={15} /></button>
          <button className="admin-btn-icon" onClick={downloadCSV} title="Download CSV"><Icon path={ICONS.download} size={15} /></button>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input
          className="admin-search"
          placeholder="Search name, email, phone, city…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="admin-select" value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}>
          <option value="all">All Types</option>
          <option value="join-us">Join Us</option>
          <option value="talent-show">Talent Show</option>
        </select>
        <select className="admin-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">No registrations found.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email / Phone</th>
                <th>City</th>
                <th>Type</th>
                <th>Talent</th>
                <th>Video</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>
                    <div className="font-semibold text-white">{item.name}</div>
                    {item.stageName && <div className="text-xs text-slate-400">"{item.stageName}"</div>}
                  </td>
                  <td>
                    <div className="text-xs">{item.email}</div>
                    <div className="text-xs text-slate-400">{item.phone}</div>
                  </td>
                  <td className="text-xs">{item.city || "—"}</td>
                  <td>
                    <span className="admin-type-badge">{item.formType}</span>
                  </td>
                  <td className="text-xs">{item.talentCategory || "—"}</td>
                  <td>
                    {item.videoLink ? (
                      <a href={item.videoLink} target="_blank" rel="noreferrer" className="admin-link">
                        <Icon path={ICONS.eye} size={13} /> View
                      </a>
                    ) : "—"}
                  </td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>
                    <div className="admin-status-actions">
                      {["shortlisted","approved","rejected"].map(s => (
                        <button
                          key={s}
                          disabled={item.status === s}
                          className={`admin-status-btn ${item.status === s ? "opacity-40 cursor-default" : ""} status-${s}`}
                          onClick={() => setStatus(item._id, s)}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {total > LIMIT && (
        <div className="admin-pagination">
          <button className="admin-btn-ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="text-sm text-slate-400">Page {page} of {Math.ceil(total / LIMIT)}</span>
          <button className="admin-btn-ghost" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}

// ─── Contact Queries Section ────────────────────────────────────────────────────
function QueriesSection() {
  const [items, setItems]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const LIMIT = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (statusFilter !== "all") params.set("status", statusFilter);
      const data = await getAdmin(`/api/admin/contact-queries?${params}`);
      setItems(data.items);
      setTotal(data.total);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, statusFilter]);

  useEffect(() => { load(); }, [load]);

  async function setStatus(id, status) {
    try {
      await putAdmin(`/api/admin/contact-queries/${id}/status`, { status });
      load();
    } catch (e) { alert(e.message); }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Contact Queries</h2>
          <p className="admin-section-count">Total: {total}</p>
        </div>
        <div className="admin-section-actions">
          <button className="admin-btn-icon" onClick={load} title="Refresh"><Icon path={ICONS.refresh} size={15} /></button>
        </div>
      </div>

      <div className="admin-filters">
        <select className="admin-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="replied">Replied</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <div className="admin-empty">Loading…</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">No contact queries found.</div>
      ) : (
        <div className="admin-queries-list">
          {items.map(item => (
            <div key={item._id} className="admin-query-card">
              <div className="admin-query-header">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.email} · {item.phone}</p>
                  {item.subject && <p className="text-xs text-slate-300 mt-1 font-medium">{item.subject}</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={item.status} />
                  <span className="text-[10px] text-slate-500">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</span>
                </div>
              </div>
              {item.message && (
                <p className="admin-query-msg">{item.message}</p>
              )}
              <div className="admin-status-actions mt-3">
                {["replied","resolved"].map(s => (
                  <button
                    key={s}
                    disabled={item.status === s}
                    className={`admin-status-btn ${item.status === s ? "opacity-40 cursor-default" : ""} status-${s}`}
                    onClick={() => setStatus(item._id, s)}
                  >
                    Mark {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {total > LIMIT && (
        <div className="admin-pagination">
          <button className="admin-btn-ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="text-sm text-slate-400">Page {page} of {Math.ceil(total / LIMIT)}</span>
          <button className="admin-btn-ghost" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}

// ─── Website Settings Section ──────────────────────────────────────────────────
const DEFAULT_SETTINGS = [
  { key: "site_title",        label: "Website Title" },
  { key: "site_tagline",      label: "Tagline" },
  { key: "contact_email",     label: "Contact Email" },
  { key: "contact_phone",     label: "Contact Phone" },
  { key: "address",           label: "Address" },
  { key: "facebook_url",      label: "Facebook URL" },
  { key: "instagram_url",     label: "Instagram URL" },
  { key: "youtube_url",       label: "YouTube URL" },
  { key: "twitter_url",       label: "Twitter / X URL" },
  { key: "about_text",        label: "About Text (Short)" },
  { key: "footer_text",       label: "Footer Text" },
  { key: "registration_open", label: "Registration Open (true/false)" }
];

function SettingsSection() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState({ type: "", msg: "" });

  useEffect(() => {
    getAdmin("/api/admin/content/website-setting").then(items => {
      const map = {};
      items.forEach(item => { map[item.settingKey] = item.settingValue; });
      setValues(map);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setNotice({ type: "", msg: "" });
    try {
      await Promise.all(
        DEFAULT_SETTINGS.map(s =>
          postAdmin("/api/admin/content/website-setting", {
            settingKey: s.key,
            settingValue: values[s.key] || ""
          }).catch(() =>
            putAdmin("/api/admin/content/website-setting", {
              settingKey: s.key,
              settingValue: values[s.key] || ""
            })
          )
        )
      );
      setNotice({ type: "ok", msg: "Settings saved successfully!" });
    } catch (e) {
      setNotice({ type: "error", msg: e.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="admin-section"><div className="admin-empty">Loading settings…</div></div>;

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Website Settings</h2>
      <p className="admin-section-count mb-6">Manage global website configuration</p>

      {notice.msg && (
        <div className={`admin-notice ${notice.type === "ok" ? "admin-notice-ok" : "admin-notice-err"}`}>
          {notice.msg}
          <button onClick={() => setNotice({ type: "", msg: "" })}><Icon path={ICONS.x} size={13} /></button>
        </div>
      )}

      <form className="admin-settings-grid" onSubmit={handleSave}>
        {DEFAULT_SETTINGS.map(s => (
          <label key={s.key} className="admin-label">
            {s.label}
            <input
              className="admin-input"
              type="text"
              value={values[s.key] || ""}
              onChange={e => setValues(p => ({ ...p, [s.key]: e.target.value }))}
            />
          </label>
        ))}
        <div className="admin-settings-save">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Main AdminPage ─────────────────────────────────────────────────────────────
function AdminPage() {
  const [active, setActive]           = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login");
  }

  function renderContent() {
    switch (active) {
      case "dashboard": return <DashboardSection />;
      case "home":
        return (
          <div className="space-y-12">
            <CmsSection section="patrons" title="Patrons & Mentors" />
            <CmsSection section="sponsors" title="Sponsors" />
            <CmsSection section="testimonials" title="Testimonials" />
          </div>
        );
      case "competitions":
        return <CmsSection section="seasons" title="Voice of Delhi NCR Seasons" />;
      case "shows":
        return <CmsSection section="competitions" title="Shows & Events" />;
      case "talents":
        return (
          <div className="space-y-12">
            <CmsSection section="contestants" title="Qualified Contestants" />
            <CmsSection section="stories" title="Success Stories" />
          </div>
        );
      case "gallery_page":
        return (
          <div className="space-y-12">
            <CmsSection section="gallery" title="Gallery (Photos & Videos)" />
            <CmsSection section="videos" title="Other Video Links" />
          </div>
        );
      case "contact":
        return <QueriesSection />;
      case "registrations":
        return <ContestantsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  }

  return (
    <>
            <style>{`
        /* ─── Global & Animations ─── */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* ─── Admin Shell ─── */
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: radial-gradient(circle at top right, #1e1b4b 0%, #0f172a 40%, #020617 100%);
          font-family: 'Outfit', system-ui, sans-serif;
          color: #e2e8f0;
          overflow-x: hidden;
        }

        /* ─── Sidebar (Glassmorphism) ─── */
        .admin-sidebar {
          position: fixed;
          top: 0; left: 0;
          width: 280px;
          height: 100vh;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 4px 0 24px rgba(0,0,0,0.2);
        }
        .admin-sidebar.collapsed {
          transform: translateX(-280px);
        }
        .admin-sidebar-logo {
          padding: 32px 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }
        .admin-sidebar-logo::after {
          content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent);
        }
        .admin-sidebar-logo-title {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(to right, #fbbf24, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }
        .admin-sidebar-logo-sub {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #94a3b8;
          margin-top: 4px;
        }
        .admin-nav {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .admin-nav::-webkit-scrollbar { width: 4px; }
        .admin-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

        .admin-nav-item {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: transparent;
          color: #94a3b8;
          font-size: 14px; font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%; text-align: left;
          position: relative;
          overflow: hidden;
        }
        .admin-nav-item::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, rgba(245,158,11,0.1), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .admin-nav-item:hover { color: #fff; transform: translateX(4px); }
        .admin-nav-item:hover::before { opacity: 1; }
        .admin-nav-item.active {
          background: rgba(245,158,11,0.1);
          color: #fbbf24;
          border: 1px solid rgba(245,158,11,0.2);
          box-shadow: inset 4px 0 0 #f59e0b;
        }
        .admin-nav-item .nav-icon { opacity: 0.7; flex-shrink: 0; transition: transform 0.3s; }
        .admin-nav-item:hover .nav-icon { transform: scale(1.1); color: #fbbf24; }
        .admin-nav-item.active .nav-icon { opacity: 1; color: #f59e0b; transform: scale(1.1); }

        .admin-sidebar-footer { padding: 20px 16px; border-top: 1px solid rgba(255,255,255,0.05); }
        .admin-logout-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 12px; border-radius: 12px;
          background: rgba(239,68,68,0.1);
          color: #fca5a5; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.3s; border: 1px solid rgba(239,68,68,0.2); width: 100%;
        }
        .admin-logout-btn:hover {
          background: #ef4444; color: #fff; box-shadow: 0 4px 12px rgba(239,68,68,0.4); transform: translateY(-2px);
        }

        /* ─── Topbar ─── */
        .admin-topbar {
          position: fixed; top: 0; left: 280px; right: 0; height: 70px;
          background: rgba(2, 6, 23, 0.7); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; padding: 0 32px; gap: 16px;
          z-index: 90; transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-topbar.sidebar-collapsed { left: 0; }

        .admin-topbar-toggle {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #e2e8f0; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s;
        }
        .admin-topbar-toggle:hover { background: rgba(255,255,255,0.1); color: #fbbf24; transform: scale(1.05); }

        .admin-topbar-breadcrumb { font-size: 14px; color: #64748b; font-weight: 500; }
        .admin-topbar-breadcrumb span { color: #fbbf24; font-weight: 700; margin-left: 4px; }

        /* ─── Main Content ─── */
        .admin-main {
          margin-left: 280px; margin-top: 70px; padding: 40px; flex: 1;
          min-height: calc(100vh - 70px); transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeUp 0.6s ease-out;
        }
        .admin-main.sidebar-collapsed { margin-left: 0; }

        /* ─── Section ─── */
        .admin-section { display: flex; flex-direction: column; gap: 24px; animation: slideInRight 0.5s ease-out; }
        .admin-section-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .admin-section-title { font-size: 32px; font-weight: 800; color: #fff; letter-spacing: -0.02em; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .admin-section-count { font-size: 14px; color: #94a3b8; font-weight: 500; }
        .admin-section-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

        /* ─── Stat Cards (Wow effect) ─── */
        .admin-stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .admin-stat-card {
          position: relative; overflow: hidden;
          display: flex; align-items: center; gap: 16px;
          padding: 24px; border-radius: 20px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-stat-card::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: skewX(-25deg); transition: 0.5s;
        }
        .admin-stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.1);
        }
        .admin-stat-card:hover::before { left: 150%; }

        .admin-stat-icon {
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: inset 0 0 20px rgba(255,255,255,0.05);
        }
        .admin-stat-value { font-size: 32px; font-weight: 800; color: #fff; line-height: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .admin-stat-label { font-size: 13px; color: #94a3b8; margin-top: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

        .stat-blue .admin-stat-icon { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; }
        .stat-orange .admin-stat-icon { background: linear-gradient(135deg, #f97316, #c2410c); color: #fff; }
        .stat-green .admin-stat-icon { background: linear-gradient(135deg, #22c55e, #15803d); color: #fff; }
        .stat-purple .admin-stat-icon { background: linear-gradient(135deg, #a855f7, #7e22ce); color: #fff; }
        .stat-teal .admin-stat-icon { background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff; }
        .stat-indigo .admin-stat-icon { background: linear-gradient(135deg, #6366f1, #4338ca); color: #fff; }
        .stat-amber .admin-stat-icon { background: linear-gradient(135deg, #f59e0b, #b45309); color: #fff; }
        .stat-pink .admin-stat-icon { background: linear-gradient(135deg, #ec4899, #be185d); color: #fff; }
        .stat-red .admin-stat-icon { background: linear-gradient(135deg, #ef4444, #b91c1c); color: #fff; }
        .stat-rose .admin-stat-icon { background: linear-gradient(135deg, #f43f5e, #be123c); color: #fff; }
        .stat-yellow .admin-stat-icon { background: linear-gradient(135deg, #eab308, #a16207); color: #fff; }
        .stat-cyan .admin-stat-icon { background: linear-gradient(135deg, #06b6d4, #0e7490); color: #fff; }

        /* ─── Buttons ─── */
        .admin-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          color: #fff; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(234, 88, 12, 0.4);
          animation: pulseGlow 2s infinite;
        }
        .admin-btn-primary:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 8px 25px rgba(234, 88, 12, 0.6); animation: none; }
        .admin-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; animation: none; }

        .admin-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 20px; border-radius: 12px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #e2e8f0; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.3s;
        }
        .admin-btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-2px); }

        .admin-btn-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #cbd5e1; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s;
        }
        .admin-btn-icon:hover { background: rgba(255,255,255,0.1); color: #fbbf24; transform: translateY(-2px) rotate(5deg); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }

        /* ─── Notice ─── */
        .admin-notice {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-radius: 12px; font-size: 14px; font-weight: 600;
          animation: fadeUp 0.4s ease-out; backdrop-filter: blur(10px);
        }
        .admin-notice button { background: none; border: none; cursor: pointer; color: inherit; opacity: 0.7; transition: opacity 0.2s; }
        .admin-notice button:hover { opacity: 1; }
        .admin-notice-ok { background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); box-shadow: 0 0 20px rgba(34,197,94,0.1); }
        .admin-notice-err { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); box-shadow: 0 0 20px rgba(239,68,68,0.1); }

        /* ─── Form ─── */
        .admin-form {
          background: rgba(15,23,42,0.6); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;
          padding: 32px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          animation: fadeUp 0.5s ease-out;
        }
        .admin-form-title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
        .admin-form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .admin-form-actions { display: flex; gap: 16px; margin-top: 32px; }

        .admin-label { display: flex; flex-direction: column; gap: 8px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
        .admin-label-full { grid-column: 1 / -1; }

        .admin-input {
          padding: 14px 16px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2);
          color: #fff; font-size: 14px; font-family: inherit; transition: all 0.3s;
        }
        .admin-input:focus { border-color: #fbbf24; background: rgba(0,0,0,0.4); box-shadow: 0 0 0 4px rgba(245,158,11,0.1); outline: none; }
        .admin-input::placeholder { color: #475569; }
        textarea.admin-input { resize: vertical; min-height: 100px; }

        /* ─── Cards Grid ─── */
        .admin-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .admin-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); backdrop-filter: blur(10px);
          animation: fadeUp 0.5s ease-out backwards;
        }
        .admin-card:hover { transform: translateY(-10px); border-color: rgba(245,158,11,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.15); }
        
        .admin-card-img { width: 100%; height: 160px; object-fit: cover; transition: transform 0.5s; }
        .admin-card:hover .admin-card-img { transform: scale(1.05); }
        .admin-card-video-thumb { width: 100%; height: 160px; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: #f59e0b; }
        
        .admin-card-body { padding: 20px; flex: 1; }
        .admin-card-title { font-size: 16px; font-weight: 800; color: #fff; }
        .admin-card-sub { font-size: 12px; color: #94a3b8; margin-top: 4px; font-weight: 500; }
        .admin-card-desc { font-size: 13px; color: #cbd5e1; margin-top: 10px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5; }
        .admin-card-badge { display: inline-flex; padding: 4px 10px; border-radius: 20px; background: rgba(245,158,11,0.15); color: #fbbf24; font-size: 11px; font-weight: 700; margin-top: 12px; border: 1px solid rgba(245,158,11,0.3); }
        
        .admin-card-actions { display: flex; gap: 10px; padding: 16px 20px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); }
        .admin-card-btn-edit { flex: 1; display: inline-flex; justify-content: center; align-items: center; gap: 6px; padding: 8px; border-radius: 8px; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); color: #818cf8; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
        .admin-card-btn-edit:hover { background: #6366f1; color: #fff; }
        .admin-card-btn-del { flex: 1; display: inline-flex; justify-content: center; align-items: center; gap: 6px; padding: 8px; border-radius: 8px; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #f87171; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
        .admin-card-btn-del:hover { background: #ef4444; color: #fff; }

        /* ─── Empty State ─── */
        .admin-empty { text-align: center; padding: 80px 20px; color: #94a3b8; font-size: 16px; font-weight: 500; background: rgba(255,255,255,0.02); border: 2px dashed rgba(255,255,255,0.1); border-radius: 20px; animation: fadeUp 0.5s ease-out; }

        /* ─── Filters & Table ─── */
        .admin-filters { display: flex; gap: 16px; flex-wrap: wrap; background: rgba(15,23,42,0.4); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(10px); }
        .admin-search { flex: 1; min-width: 250px; padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: #fff; font-size: 14px; font-family: inherit; transition: all 0.3s; }
        .admin-search:focus { border-color: #fbbf24; outline: none; box-shadow: 0 0 0 4px rgba(245,158,11,0.1); }
        .admin-select { padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #0f172a; color: #cbd5e1; font-size: 14px; font-family: inherit; cursor: pointer; transition: all 0.3s; }
        .admin-select:focus { border-color: #fbbf24; outline: none; }

        .admin-table-wrap { overflow-x: auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(15,23,42,0.5); backdrop-filter: blur(10px); animation: fadeUp 0.6s ease-out; }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 14px; color: #e2e8f0; }
        .admin-table thead { background: rgba(0,0,0,0.3); }
        .admin-table th { padding: 16px 20px; text-align: left; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .admin-table td { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: middle; transition: background 0.2s; }
        .admin-table tbody tr { transition: all 0.3s; }
        .admin-table tbody tr:hover { background: rgba(255,255,255,0.04); transform: scale(1.005); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .admin-table tbody tr:last-child td { border-bottom: none; }

        .admin-type-badge { display: inline-flex; padding: 4px 10px; border-radius: 20px; background: rgba(139,92,246,0.15); color: #c4b5fd; font-size: 11px; font-weight: 700; text-transform: uppercase; border: 1px solid rgba(139,92,246,0.3); }
        .admin-link { display: inline-flex; align-items: center; gap: 6px; color: #fbbf24; font-weight: 600; text-decoration: none; font-size: 13px; transition: color 0.2s; }
        .admin-link:hover { color: #f59e0b; text-decoration: underline; }

        .admin-status-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .admin-status-btn { padding: 6px 12px; border-radius: 8px; border: 1px solid transparent; font-size: 11px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
        .status-shortlisted { background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.3); color: #93c5fd; } .status-shortlisted:hover:not(:disabled) { background: #3b82f6; color: #fff; }
        .status-approved { background: rgba(34,197,94,0.15); border-color: rgba(34,197,94,0.3); color: #86efac; } .status-approved:hover:not(:disabled) { background: #22c55e; color: #fff; }
        .status-rejected { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); color: #fca5a5; } .status-rejected:hover:not(:disabled) { background: #ef4444; color: #fff; }
        .status-replied { background: rgba(168,85,247,0.15); border-color: rgba(168,85,247,0.3); color: #d8b4fe; } .status-replied:hover:not(:disabled) { background: #a855f7; color: #fff; }
        .status-resolved { background: rgba(100,116,139,0.15); border-color: rgba(100,116,139,0.3); color: #cbd5e1; } .status-resolved:hover:not(:disabled) { background: #64748b; color: #fff; }

        /* ─── Contact Queries ─── */
        .admin-queries-list { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); }
        .admin-query-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; transition: all 0.3s; backdrop-filter: blur(10px); animation: fadeUp 0.5s ease-out backwards; }
        .admin-query-card:hover { transform: translateY(-5px); border-color: rgba(245,158,11,0.3); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
        .admin-query-header { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px; }
        .admin-query-msg { font-size: 14px; color: #cbd5e1; padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px; border-left: 4px solid #f59e0b; line-height: 1.6; }

        /* ─── Settings ─── */
        .admin-settings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; background: rgba(15,23,42,0.5); padding: 32px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px); }
        .admin-settings-save { grid-column: 1 / -1; margin-top: 16px; display: flex; justify-content: flex-end; }

        /* ─── Mobile ─── */
        .admin-mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); z-index: 99; }
        @media (max-width: 900px) {
          .admin-sidebar { transform: translateX(-280px); }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-mobile-overlay { display: block; }
          .admin-topbar { left: 0 !important; }
          .admin-main { margin-left: 0 !important; padding: 20px; }
          .admin-section-header { flex-direction: column; align-items: stretch; }
          .admin-section-actions { justify-content: space-between; }
        }
        @media (min-width: 901px) { .admin-mobile-overlay { display: none !important; } }
      `}</style>

      <div className="admin-shell">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="admin-mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-title">DMS Aarohi</div>
            <div className="admin-sidebar-logo-sub">Admin Panel</div>
          </div>

          <nav className="admin-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`admin-nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => { setActive(item.id); if (window.innerWidth < 900) setSidebarOpen(false); }}
              >
                <span className="nav-icon"><Icon path={ICONS[item.icon]} size={16} /></span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <button className="admin-logout-btn" onClick={handleLogout}>
              <Icon path={ICONS.logout} size={15} />
              Log Out
            </button>
          </div>
        </aside>

        {/* Topbar */}
        <header className={`admin-topbar ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
          <button className="admin-topbar-toggle" onClick={() => setSidebarOpen(o => !o)}>
            <Icon path={ICONS.menu} size={16} />
          </button>
          <p className="admin-topbar-breadcrumb">
            Admin / <span>{NAV_ITEMS.find(n => n.id === active)?.label}</span>
          </p>
        </header>

        {/* Main */}
        <main className={`admin-main ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default AdminPage;
