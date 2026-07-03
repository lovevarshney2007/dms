import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  postAdmin, putAdmin, deleteAdmin, getAdmin, clearAdminToken
} from "../../lib/api";

// ─── SVG Icon ────────────────────────────────────────────────────────────────
const Icon = ({ path, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const ICONS = {
  dashboard:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  competition:  "M8 21l4-4 4 4M12 17V3M5 8l7-5 7 5",
  season:       "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  contestants:  "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  stories:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  gallery:      "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0",
  videos:       "M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
  patrons:      "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  sponsors:     "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  testimonials: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  queries:      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  settings:     "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  logout:       "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  plus:         "M12 5v14M5 12h14",
  edit:         "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:        "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  check:        "M20 6L9 17l-5-5",
  x:            "M18 6L6 18M6 6l12 12",
  refresh:      "M1 4v6h6M23 20v-6h-6 M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15",
  download:     "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  eye:          "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  menu:         "M3 12h18M3 6h18M3 18h18",
  handshake:    "M9 12l2 2 4-4M7 17l-2 1.5A2 2 0 003 17V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2.5 1.8L17 17H7z",
  sponsor:      "M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  star:         "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  chevronRight: "M9 18l6-6-6-6",
  bell:         "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
};

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",              icon: "dashboard",   group: "overview" },
  { id: "registrations",label: "Candidates",             icon: "contestants", group: "submissions" },
  { id: "contact",      label: "Contact Queries",        icon: "queries",     group: "submissions" },
  { id: "sponsor_reqs", label: "Sponsor Requests",       icon: "sponsor",     group: "submissions" },
  { id: "pages_content",label: "Pages Metadata",         icon: "edit",        group: "cms" },
  { id: "home",         label: "Home Content",           icon: "patrons",     group: "cms" },
  { id: "competitions", label: "Seasons & Competitions", icon: "competition", group: "cms" },
  { id: "shows",        label: "Shows & Events",         icon: "videos",      group: "cms" },
  { id: "talents",      label: "Success Stories",        icon: "stories",     group: "cms" },
  { id: "gallery_page", label: "Gallery",                icon: "gallery",     group: "cms" },
  { id: "settings",     label: "Website Settings",       icon: "settings",    group: "system" },
];

const NAV_GROUPS = [
  { id: "overview",    label: "Overview" },
  { id: "submissions", label: "Submissions" },
  { id: "cms",         label: "Content Management" },
  { id: "system",      label: "System" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    pending:    { cls: "badge-amber",   label: "Pending" },
    approved:   { cls: "badge-green",   label: "Approved" },
    rejected:   { cls: "badge-red",     label: "Rejected" },
    shortlisted:{ cls: "badge-blue",    label: "Shortlisted" },
    replied:    { cls: "badge-purple",  label: "Replied" },
    resolved:   { cls: "badge-slate",   label: "Resolved" },
    contacted:  { cls: "badge-cyan",    label: "Contacted" },
  };
  const { cls, label } = map[status] || { cls: "badge-slate", label: status || "pending" };
  return <span className={`ap-badge ${cls}`}>{label}</span>;
};

// ─── Content type map ─────────────────────────────────────────────────────────
const CONTENT_TYPE_MAP = {
  pages:        "page-meta",
  competitions: "competition",
  seasons:      "season",
  contestants:  "qualified-contestant",
  stories:      "success-story",
  gallery:      "gallery",
  videos:       "video",
  patrons:      "patron",
  sponsors:     "sponsor",
  testimonials: "testimonial",
};

const FIELDS_MAP = {
  pages: [
    { key: "name",        label: "Page Identifier (e.g. about, home)", type: "text", required: true },
    { key: "title",       label: "Title",       type: "text", required: true },
    { key: "subtitle",    label: "Subtitle/Eyebrow", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "imageUrl",    label: "Image URL",   type: "text" },
  ],
  competitions: [
    { key: "title",         label: "Title",       type: "text", required: true },
    { key: "subtitle",      label: "Subtitle",    type: "text" },
    { key: "description",   label: "Description", type: "textarea" },
    { key: "imageUrl",      label: "Image URL",   type: "text" },
    { key: "meta.date",     label: "Event Date",  type: "text" },
    { key: "meta.location", label: "Location",    type: "text" },
    { key: "meta.tag",      label: "Event Tag",   type: "text" },
    { key: "order",         label: "Order",       type: "number" },
  ],
  seasons: [
    { key: "title",              label: "Season Title",      type: "text", required: true },
    { key: "subtitle",           label: "Tagline",           type: "text" },
    { key: "year",               label: "Year",              type: "text" },
    { key: "meta.status",        label: "Status (e.g. completed, grand-finale)", type: "text" },
    { key: "meta.color",         label: "CSS Color Class",   type: "text" },
    { key: "meta.lightBg",       label: "CSS Light Bg Class",type: "text" },
    { key: "meta.borderColor",   label: "CSS Border Class",  type: "text" },
    { key: "meta.winner",        label: "Winner Name",       type: "text" },
    { key: "meta.winnerImg",     label: "Winner Image URL",  type: "text" },
    { key: "meta.youtube",       label: "YouTube Highlight URL", type: "text" },
    { key: "meta.poster",        label: "Poster Image URL",  type: "text" },
    { key: "meta.grandFinale",   label: "Grand Finale Date", type: "text" },
    { key: "meta.venue",         label: "Grand Finale Venue",type: "text" },
    { key: "meta.description",   label: "Full Description",  type: "textarea" },
    { key: "order",              label: "Order",             type: "number" },
  ],
  contestants: [
    { key: "title",         label: "Contestant Name", type: "text", required: true },
    { key: "imageUrl",      label: "Photo URL",       type: "text" },
    { key: "meta.city",     label: "City",            type: "text" },
    { key: "meta.status",   label: "Status",          type: "text" },
    { key: "meta.category", label: "Category",        type: "text" },
    { key: "meta.score",    label: "Score",           type: "text" },
    { key: "order",         label: "Order",           type: "number" },
  ],
  stories: [
    { key: "title",       label: "Person Name",  type: "text", required: true },
    { key: "subtitle",    label: "Achievement",  type: "text", required: true },
    { key: "description", label: "Story",        type: "textarea" },
    { key: "imageUrl",    label: "Photo URL",    type: "text" },
    { key: "order",       label: "Order",        type: "number" },
  ],
  gallery: [
    { key: "title",             label: "Caption",    type: "text" },
    { key: "imageUrl",          label: "Image URL",  type: "text", required: true },
    { key: "meta.type",         label: "Type (Gallery or Video)", type: "text" },
    { key: "meta.season",       label: "Season",     type: "text" },
    { key: "meta.youtubeLink",  label: "YouTube Link", type: "text" },
    { key: "order",             label: "Order",      type: "number" },
  ],
  videos: [
    { key: "title",       label: "Video Title",  type: "text", required: true },
    { key: "videoUrl",    label: "YouTube URL",  type: "text", required: true },
    { key: "description", label: "Description",  type: "textarea" },
    { key: "order",       label: "Order",        type: "number" },
  ],
  patrons: [
    { key: "title",       label: "Name",         type: "text", required: true },
    { key: "subtitle",    label: "Title/Role",   type: "text" },
    { key: "imageUrl",    label: "Photo URL",    type: "text" },
    { key: "meta.role",   label: "Team Role (if in team)", type: "text" },
    { key: "meta.isTeam", label: "Is Team Member? (true/false)", type: "text" },
    { key: "order",       label: "Order",        type: "number" },
  ],
  sponsors: [
    { key: "title",    label: "Sponsor Name", type: "text", required: true },
    { key: "subtitle", label: "Tier/Level",   type: "text" },
    { key: "imageUrl", label: "Logo URL",     type: "text" },
    { key: "link",     label: "Website",      type: "text" },
    { key: "order",    label: "Order",        type: "number" },
  ],
  testimonials: [
    { key: "title",       label: "Person Name", type: "text", required: true },
    { key: "subtitle",    label: "Role",        type: "text" },
    { key: "description", label: "Testimonial", type: "textarea", required: true },
    { key: "imageUrl",    label: "Photo URL",   type: "text" },
    { key: "order",       label: "Order",       type: "number" },
  ],
};

function buildEmpty(section) {
  return (FIELDS_MAP[section] || []).reduce((acc, f) => {
    acc[f.key] = f.type === "number" ? 0 : "";
    return acc;
  }, {});
}

// ─── Animated Count-Up ───────────────────────────────────────────────────────
function CountUp({ value }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (value == null) return;
    const target = Number(value);
    const duration = 1200;
    const start = Date.now();
    function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);
  return <>{display ?? "—"}</>;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon, onClick }) {
  return (
    <div className={`ap-stat-card ${color}`} onClick={onClick} style={onClick ? { cursor: "pointer" } : {}}>
      <div className="ap-stat-shimmer" />
      <div className="ap-stat-icon-wrap">
        <Icon path={ICONS[icon] || ICONS.dashboard} size={22} />
      </div>
      <div className="ap-stat-body">
        <div className="ap-stat-value">
          <CountUp value={value} />
        </div>
        <div className="ap-stat-label">{label}</div>
      </div>
      <div className="ap-stat-arrow">
        <Icon path={ICONS.chevronRight} size={14} />
      </div>
    </div>
  );
}

// ─── Notice ──────────────────────────────────────────────────────────────────
function Notice({ type, msg, onClose }) {
  if (!msg) return null;
  return (
    <div className={`ap-notice ${type === "ok" ? "notice-ok" : "notice-err"}`}>
      <span>{type === "ok" ? "✓" : "⚠"} {msg}</span>
      <button onClick={onClose} className="ap-notice-close">
        <Icon path={ICONS.x} size={12} />
      </button>
    </div>
  );
}

// ─── Generic CMS Section ─────────────────────────────────────────────────────
function CmsSection({ section, title }) {
  const apiType = CONTENT_TYPE_MAP[section];
  const fields  = FIELDS_MAP[section] || [];
  const [items,    setItems]    = useState([]);
  const [form,     setForm]     = useState(buildEmpty(section));
  const [editId,   setEditId]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [notice,   setNotice]   = useState({ type: "", msg: "" });
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

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
      if (Object.keys(meta).length > 0) payload.meta = meta;
      if ("tags" in payload && typeof payload.tags === "string") {
        payload.tags = payload.tags.split(",").map(t => t.trim()).filter(Boolean);
      }
      if (editId) {
        await putAdmin(`/api/admin/content/${editId}`, payload);
        setNotice({ type: "ok", msg: "Updated successfully!" });
      } else {
        await postAdmin(`/api/admin/content/${apiType}`, payload);
        setNotice({ type: "ok", msg: "Created successfully!" });
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
        acc[field.key] = item.meta && item.meta[metaKey] !== undefined
          ? String(item.meta[metaKey]) : "";
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
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    try {
      await deleteAdmin(`/api/admin/content/${id}`);
      setNotice({ type: "ok", msg: "Deleted." });
      load();
    } catch (e) {
      setNotice({ type: "error", msg: e.message });
    }
  }

  const downloadCSV = () => {
    if (!items.length) return;
    const keys = fields.map(f => f.key);
    const header = fields.map(f => f.label).join(",");
    const rows = items.map(item =>
      keys.map(k => `"${(item[k] || "").toString().replace(/"/g, '""')}"`).join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${section}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ap-section" ref={formRef}>
      <div className="ap-section-header">
        <div>
          <h2 className="ap-section-title">{title || section}</h2>
          <p className="ap-section-sub">{items.length} item{items.length !== 1 ? "s" : ""} total</p>
        </div>
        <div className="ap-section-actions">
          <button className="ap-btn-icon" onClick={load} title="Refresh">
            <Icon path={ICONS.refresh} size={15} />
          </button>
          <button className="ap-btn-icon" onClick={downloadCSV} title="Export CSV">
            <Icon path={ICONS.download} size={15} />
          </button>
          <button className="ap-btn-primary" onClick={() => {
            setShowForm(f => !f); setEditId(null); setForm(buildEmpty(section));
          }}>
            <Icon path={showForm && !editId ? ICONS.x : ICONS.plus} size={14} />
            {showForm && !editId ? "Cancel" : "Add New"}
          </button>
        </div>
      </div>

      <Notice type={notice.type} msg={notice.msg} onClose={() => setNotice({ type: "", msg: "" })} />

      {(showForm || editId) && (
        <form className="ap-form" onSubmit={handleSubmit}>
          <div className="ap-form-header">
            <h3 className="ap-form-title">{editId ? "✏ Edit Item" : "✚ Add New Item"}</h3>
          </div>
          <div className="ap-form-grid">
            {fields.map(field => (
              <label key={field.key} className={`ap-label ${field.type === "textarea" ? "ap-label-full" : ""}`}>
                <span className="ap-label-text">
                  {field.label}
                  {field.required && <span className="ap-req">*</span>}
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    className="ap-input"
                    value={form[field.key] || ""}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    required={field.required}
                    rows={4}
                    placeholder={`Enter ${field.label.toLowerCase()}…`}
                  />
                ) : (
                  <input
                    className="ap-input"
                    type={field.type || "text"}
                    value={form[field.key] ?? ""}
                    onChange={e => setForm(p => ({
                      ...p,
                      [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value
                    }))}
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}…`}
                  />
                )}
              </label>
            ))}
          </div>
          <div className="ap-form-actions">
            <button type="submit" className="ap-btn-primary" disabled={saving}>
              {saving ? "Saving…" : editId ? "Update Item" : "Create Item"}
            </button>
            <button type="button" className="ap-btn-ghost" onClick={() => {
              setShowForm(false); setEditId(null); setForm(buildEmpty(section));
            }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="ap-loading">
          <div className="ap-spinner" />
          <span>Loading content…</span>
        </div>
      ) : items.length === 0 ? (
        <div className="ap-empty">
          <div className="ap-empty-icon">📭</div>
          <p>No {title?.toLowerCase() || section} yet.</p>
          <p className="ap-empty-sub">Click "Add New" to get started.</p>
        </div>
      ) : (
        <div className="ap-cards-grid">
          {items.map((item, idx) => (
            <div key={item._id} className="ap-card" style={{ animationDelay: `${idx * 40}ms` }}>
              {item.imageUrl && (
                <div className="ap-card-img-wrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title || item.name || ""}
                    className="ap-card-img"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                </div>
              )}
              {item.videoUrl && !item.imageUrl && (
                <div className="ap-card-video-thumb">
                  <Icon path={ICONS.videos} size={32} />
                  <span>Video</span>
                </div>
              )}
              <div className="ap-card-body">
                <p className="ap-card-title">{item.title || item.name || item.settingKey || "Untitled"}</p>
                {(item.subtitle || item.role) && (
                  <p className="ap-card-sub">{item.subtitle || item.role}</p>
                )}
                {item.description && (
                  <p className="ap-card-desc">{item.description}</p>
                )}
                {item.year && <span className="ap-tag">{item.year}</span>}
                {item.season && <span className="ap-tag">{item.season}</span>}
              </div>
              <div className="ap-card-actions">
                <button className="ap-card-edit" onClick={() => startEdit(item)}>
                  <Icon path={ICONS.edit} size={13} /> Edit
                </button>
                <button className="ap-card-del" onClick={() => handleDelete(item._id)}>
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

// ─── Events CMS (manages Event model) ──────────────────────────────────────
function EventsSection() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", eventDate: "", eventLocation: "", posterImage: "", registrationDeadline: "", eventType: "Competition", liveLink: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState({ type: "", msg: "" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdmin("/api/admin/events");
      setItems(data);
    } catch (e) { setNotice({ type: "error", msg: e.message }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() { setForm({ title: "", description: "", eventDate: "", eventLocation: "", posterImage: "", registrationDeadline: "", eventType: "Competition", liveLink: "" }); setEditId(null); }

  function startEdit(item) {
    setForm({
      title: item.title || "",
      description: item.description || "",
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().slice(0,16) : "",
      eventLocation: item.eventLocation || "",
      posterImage: item.posterImage || "",
      registrationDeadline: item.registrationDeadline ? new Date(item.registrationDeadline).toISOString().slice(0,16) : "",
      eventType: item.eventType || "Competition",
      liveLink: item.liveLink || ""
    });
    setEditId(item._id);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true); setNotice({ type: "", msg: "" });
    try {
      const payload = {
        title: form.title,
        description: form.description,
        eventDate: form.eventDate ? new Date(form.eventDate).toISOString() : null,
        eventLocation: form.eventLocation,
        posterImage: form.posterImage,
        registrationDeadline: form.registrationDeadline ? new Date(form.registrationDeadline).toISOString() : null,
        eventType: form.eventType,
        liveLink: form.liveLink
      };
      if (editId) {
        await putAdmin(`/api/admin/events/${editId}`, payload);
        setNotice({ type: "ok", msg: "Event updated." });
      } else {
        await postAdmin(`/api/admin/events`, payload);
        setNotice({ type: "ok", msg: "Event created." });
      }
      resetForm(); load();
    } catch (err) { setNotice({ type: "error", msg: err.message }); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    try { await deleteAdmin(`/api/admin/events/${id}`); setNotice({ type: "ok", msg: "Deleted." }); load(); }
    catch (e) { setNotice({ type: "error", msg: e.message }); }
  }

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div>
          <h2 className="ap-section-title">Shows & Events</h2>
          <p className="ap-section-sub">Manage events shown on the public site</p>
        </div>
        <div className="ap-section-actions">
          <button className="ap-btn-icon" onClick={load}>Refresh</button>
          <button className="ap-btn-primary" onClick={() => { resetForm(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Add New Event</button>
        </div>
      </div>

      <Notice type={notice.type} msg={notice.msg} onClose={() => setNotice({ type: "", msg: "" })} />

      <form className="ap-form" onSubmit={handleSubmit}>
        <div className="ap-form-grid">
          <label className="ap-label"><span className="ap-label-text">Title</span>
            <input className="ap-input" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} required />
          </label>
          <label className="ap-label"><span className="ap-label-text">Event Date</span>
            <input className="ap-input" type="datetime-local" value={form.eventDate} onChange={e => setForm(p => ({...p, eventDate: e.target.value}))} required />
          </label>
          <label className="ap-label"><span className="ap-label-text">Registration Deadline</span>
            <input className="ap-input" type="datetime-local" value={form.registrationDeadline} onChange={e => setForm(p => ({...p, registrationDeadline: e.target.value}))} required />
          </label>
          <label className="ap-label"><span className="ap-label-text">Location</span>
            <input className="ap-input" value={form.eventLocation} onChange={e => setForm(p => ({...p, eventLocation: e.target.value}))} required />
          </label>
          <label className="ap-label"><span className="ap-label-text">Poster Image URL</span>
            <input className="ap-input" value={form.posterImage} onChange={e => setForm(p => ({...p, posterImage: e.target.value}))} required />
          </label>
          <label className="ap-label"><span className="ap-label-text">Event Type</span>
            <select className="ap-input" value={form.eventType} onChange={e => setForm(p => ({...p, eventType: e.target.value}))}>
              <option>Competition</option>
              <option>Concert</option>
              <option>Workshop</option>
            </select>
          </label>
          <label className="ap-label ap-label-full"><span className="ap-label-text">Description</span>
            <textarea className="ap-input" rows={4} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} />
          </label>
          <label className="ap-label"><span className="ap-label-text">Live Link (optional)</span>
            <input className="ap-input" value={form.liveLink} onChange={e => setForm(p => ({...p, liveLink: e.target.value}))} />
          </label>
        </div>
        <div className="ap-form-actions">
          <button type="submit" className="ap-btn-primary" disabled={saving}>{saving ? "Saving…" : editId ? "Update Event" : "Create Event"}</button>
          <button type="button" className="ap-btn-ghost" onClick={() => { resetForm(); }}>{"Cancel"}</button>
        </div>
      </form>

      {loading ? (
        <div className="ap-loading"><div className="ap-spinner" /><span>Loading events…</span></div>
      ) : items.length === 0 ? (
        <div className="ap-empty"><div className="ap-empty-icon">📭</div><p>No events yet.</p></div>
      ) : (
        <div className="ap-cards-grid">
          {items.map((item, idx) => (
            <div key={item._id} className="ap-card" style={{ animationDelay: `${idx * 40}ms` }}>
              {item.posterImage && <div className="ap-card-img-wrap"><img src={item.posterImage} alt={item.title} className="ap-card-img" onError={e => { e.target.style.display = 'none'; }} /></div>}
              <div className="ap-card-body"><p className="ap-card-title">{item.title}</p><p className="ap-card-sub">{item.eventLocation}</p><p className="ap-card-desc">{item.description}</p></div>
              <div className="ap-card-actions"><button className="ap-card-edit" onClick={() => startEdit(item)}>Edit</button><button className="ap-card-del" onClick={() => handleDelete(item._id)}>Delete</button></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function DashboardSection({ onNavigate }) {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdmin("/api/admin/dashboard")
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const quickLinks = [
    { label: "Candidate Registrations", key: "totalRegistrations", icon: "contestants", color: "sc-blue",   nav: "registrations" },
    { label: "Contact Queries",         key: "contactQueries",     icon: "queries",     color: "sc-orange",  nav: "contact" },
    { label: "Sponsor Requests",        key: "sponsorRequests",    icon: "sponsor",     color: "sc-violet",  nav: "sponsor_reqs" },
    { label: "Events",                  key: "totalEvents",        icon: "competition", color: "sc-green",   nav: null },
    { label: "Seasons",                 key: "seasons",            icon: "season",      color: "sc-teal",    nav: "competitions" },
    { label: "Qualified Contestants",   key: "qualifiedContestants",icon:"contestants", color: "sc-indigo",  nav: "talents" },
    { label: "Success Stories",         key: "successStories",     icon: "stories",     color: "sc-amber",   nav: "talents" },
    { label: "Gallery Items",           key: "galleryItems",       icon: "gallery",     color: "sc-pink",    nav: "gallery_page" },
    { label: "Sponsors (CMS)",          key: "sponsors",           icon: "sponsors",    color: "sc-yellow",  nav: "home" },
    { label: "Testimonials",            key: "testimonials",       icon: "testimonials",color: "sc-cyan",    nav: "home" },
    { label: "Patrons",                 key: "patrons",            icon: "patrons",     color: "sc-rose",    nav: "home" },
    { label: "Videos",                  key: "videos",             icon: "videos",      color: "sc-red",     nav: "gallery_page" },
  ];

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div>
          <h2 className="ap-section-title">Dashboard</h2>
          <p className="ap-section-sub">Welcome back! Here's your site overview.</p>
        </div>
        <button className="ap-btn-ghost" onClick={() => {
          setLoading(true);
          getAdmin("/api/admin/dashboard").then(setStats).catch(() => {}).finally(() => setLoading(false));
        }}>
          <Icon path={ICONS.refresh} size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="ap-loading"><div className="ap-spinner" /><span>Loading stats…</span></div>
      ) : (
        <div className="ap-stats-grid">
          {quickLinks.map(c => (
            <StatCard
              key={c.key}
              label={c.label}
              value={stats?.[c.key]}
              icon={c.icon}
              color={c.color}
              onClick={c.nav ? () => onNavigate(c.nav) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Registrations ───────────────────────────────────────────────────────────
function RegistrationsSection() {
  const [items,        setItems]        = useState([]);
  const [total,        setTotal]        = useState(0);
  const [loading,      setLoading]      = useState(false);
  const [search,       setSearch]       = useState("");
  const [filter,       setFilter]       = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page,         setPage]         = useState(1);
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
    const a = document.createElement("a"); a.href = url; a.download = "registrations.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div>
          <h2 className="ap-section-title">Candidate Registrations</h2>
          <p className="ap-section-sub">Total: <strong style={{color:"#fbbf24"}}>{total}</strong> registrations</p>
        </div>
        <div className="ap-section-actions">
          <button className="ap-btn-icon" onClick={load} title="Refresh"><Icon path={ICONS.refresh} size={15} /></button>
          <button className="ap-btn-icon" onClick={downloadCSV} title="Export CSV"><Icon path={ICONS.download} size={15} /></button>
        </div>
      </div>

      <div className="ap-filters">
        <input
          className="ap-search"
          placeholder="🔍 Search by name, email, phone, city…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="ap-select" value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}>
          <option value="all">All Types</option>
          <option value="join-us">Join Us</option>
          <option value="talent-show">Talent Show</option>
        </select>
        <select className="ap-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="ap-loading"><div className="ap-spinner" /><span>Loading registrations…</span></div>
      ) : items.length === 0 ? (
        <div className="ap-empty">
          <div className="ap-empty-icon">📋</div>
          <p>No registrations found.</p>
          <p className="ap-empty-sub">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="ap-table-wrap">
          <table className="ap-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate</th>
                <th>Contact</th>
                <th>City</th>
                <th>Type</th>
                <th>Talent</th>
                <th>Video</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item._id}>
                  <td className="ap-td-num">{(page - 1) * LIMIT + idx + 1}</td>
                  <td>
                    <div className="ap-td-name">{item.name}</div>
                    {item.stageName && <div className="ap-td-sub">"{item.stageName}"</div>}
                  </td>
                  <td>
                    <div className="ap-td-email">{item.email}</div>
                    <div className="ap-td-sub">{item.phone}</div>
                  </td>
                  <td className="ap-td-city">{item.city || "—"}</td>
                  <td><span className="ap-type-badge">{item.formType}</span></td>
                  <td className="ap-td-sub">{item.talentCategory || "—"}</td>
                  <td>
                    {item.videoLink
                      ? <a href={item.videoLink} target="_blank" rel="noreferrer" className="ap-link"><Icon path={ICONS.eye} size={13} /> View</a>
                      : "—"}
                  </td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>
                    <div className="ap-status-btns">
                      {["shortlisted","approved","rejected"].map(s => (
                        <button
                          key={s}
                          disabled={item.status === s}
                          className={`ap-status-btn s-${s} ${item.status === s ? "ap-status-active" : ""}`}
                          onClick={() => setStatus(item._id, s)}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="ap-td-sub">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {total > LIMIT && (
        <div className="ap-pagination">
          <button className="ap-btn-ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="ap-page-info">Page {page} of {Math.ceil(total / LIMIT)}</span>
          <button className="ap-btn-ghost" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}

// ─── Contact Queries ─────────────────────────────────────────────────────────
function ContactSection() {
  const [items,        setItems]        = useState([]);
  const [total,        setTotal]        = useState(0);
  const [loading,      setLoading]      = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page,         setPage]         = useState(1);
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
    <div className="ap-section">
      <div className="ap-section-header">
        <div>
          <h2 className="ap-section-title">Contact Queries</h2>
          <p className="ap-section-sub">Total: <strong style={{color:"#fbbf24"}}>{total}</strong> queries</p>
        </div>
        <button className="ap-btn-icon" onClick={load} title="Refresh"><Icon path={ICONS.refresh} size={15} /></button>
      </div>

      <div className="ap-filters">
        <select className="ap-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="replied">Replied</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <div className="ap-loading"><div className="ap-spinner" /><span>Loading queries…</span></div>
      ) : items.length === 0 ? (
        <div className="ap-empty">
          <div className="ap-empty-icon">✉️</div>
          <p>No contact queries found.</p>
        </div>
      ) : (
        <div className="ap-query-grid">
          {items.map(item => (
            <div key={item._id} className="ap-query-card">
              <div className="ap-query-top">
                <div className="ap-query-meta">
                  <p className="ap-query-name">{item.name}</p>
                  <p className="ap-query-contact">{item.email} {item.phone ? `· ${item.phone}` : ""}</p>
                  {item.subject && <p className="ap-query-subject">{item.subject}</p>}
                </div>
                <div className="ap-query-right">
                  <StatusBadge status={item.status} />
                  <span className="ap-query-date">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : ""}
                  </span>
                </div>
              </div>
              {item.message && (
                <div className="ap-query-message">{item.message}</div>
              )}
              <div className="ap-status-btns" style={{ marginTop: 16 }}>
                {["replied","resolved"].map(s => (
                  <button
                    key={s}
                    disabled={item.status === s}
                    className={`ap-status-btn s-${s} ${item.status === s ? "ap-status-active" : ""}`}
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
        <div className="ap-pagination">
          <button className="ap-btn-ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="ap-page-info">Page {page} of {Math.ceil(total / LIMIT)}</span>
          <button className="ap-btn-ghost" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}

// ─── Sponsor Requests ─────────────────────────────────────────────────────────
function SponsorRequestsSection() {
  const [items,        setItems]        = useState([]);
  const [total,        setTotal]        = useState(0);
  const [loading,      setLoading]      = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page,         setPage]         = useState(1);
  const LIMIT = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (statusFilter !== "all") params.set("status", statusFilter);
      const data = await getAdmin(`/api/admin/sponsor-requests?${params}`);
      setItems(data.items);
      setTotal(data.total);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, statusFilter]);

  useEffect(() => { load(); }, [load]);

  async function setStatus(id, status) {
    try {
      await putAdmin(`/api/admin/sponsor-requests/${id}/status`, { status });
      load();
    } catch (e) { alert(e.message); }
  }

  const downloadCSV = () => {
    if (!items.length) return;
    const cols = ["name","organization","email","phone","website","sponsorshipTier","message","status","createdAt"];
    const header = cols.join(",");
    const rows = items.map(r => cols.map(k => `"${(r[k]||"").toString().replace(/"/g,'""')}"`).join(","));
    const blob = new Blob([[header,...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "sponsor-requests.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div>
          <h2 className="ap-section-title">Sponsor Requests</h2>
          <p className="ap-section-sub">Total: <strong style={{color:"#fbbf24"}}>{total}</strong> requests from potential sponsors</p>
        </div>
        <div className="ap-section-actions">
          <button className="ap-btn-icon" onClick={load}><Icon path={ICONS.refresh} size={15} /></button>
          <button className="ap-btn-icon" onClick={downloadCSV} title="Export CSV"><Icon path={ICONS.download} size={15} /></button>
        </div>
      </div>

      <div className="ap-filters">
        <select className="ap-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="ap-loading"><div className="ap-spinner" /><span>Loading sponsor requests…</span></div>
      ) : items.length === 0 ? (
        <div className="ap-empty">
          <div className="ap-empty-icon">🤝</div>
          <p>No sponsor requests yet.</p>
          <p className="ap-empty-sub">Sponsor applications submitted from the website will appear here.</p>
        </div>
      ) : (
        <div className="ap-table-wrap">
          <table className="ap-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Contact Person</th>
                <th>Organization</th>
                <th>Contact Info</th>
                <th>Tier Interest</th>
                <th>Website</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item._id}>
                  <td className="ap-td-num">{(page - 1) * LIMIT + idx + 1}</td>
                  <td><div className="ap-td-name">{item.name}</div></td>
                  <td className="ap-td-city">{item.organization || "—"}</td>
                  <td>
                    <div className="ap-td-email">{item.email}</div>
                    <div className="ap-td-sub">{item.phone}</div>
                  </td>
                  <td>
                    <span className="ap-type-badge">{item.sponsorshipTier || "General"}</span>
                  </td>
                  <td>
                    {item.website
                      ? <a href={item.website} target="_blank" rel="noreferrer" className="ap-link"><Icon path={ICONS.eye} size={13} /> Visit</a>
                      : "—"}
                  </td>
                  <td className="ap-td-sub" style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.message || "—"}
                  </td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>
                    <div className="ap-status-btns">
                      {["contacted","approved","rejected"].map(s => (
                        <button
                          key={s}
                          disabled={item.status === s}
                          className={`ap-status-btn s-${s} ${item.status === s ? "ap-status-active" : ""}`}
                          onClick={() => setStatus(item._id, s)}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="ap-td-sub">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {total > LIMIT && (
        <div className="ap-pagination">
          <button className="ap-btn-ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="ap-page-info">Page {page} of {Math.ceil(total / LIMIT)}</span>
          <button className="ap-btn-ghost" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}

// ─── Website Settings ─────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = [
  { key: "site_title",        label: "Website Title",          icon: "star" },
  { key: "site_tagline",      label: "Tagline",                icon: "star" },
  { key: "contact_email",     label: "Contact Email",          icon: "queries" },
  { key: "contact_phone",     label: "Contact Phone",          icon: "queries" },
  { key: "address",           label: "Address",                icon: "settings" },
  { key: "facebook_url",      label: "Facebook URL",           icon: "sponsors" },
  { key: "instagram_url",     label: "Instagram URL",          icon: "sponsors" },
  { key: "youtube_url",       label: "YouTube URL",            icon: "videos" },
  { key: "twitter_url",       label: "Twitter / X URL",        icon: "sponsors" },
  { key: "about_text",        label: "About Text (Short)",     icon: "edit" },
  { key: "footer_text",       label: "Footer Text",            icon: "edit" },
  { key: "registration_open", label: "Registration Open? (true/false)", icon: "check" },
];

function SettingsSection() {
  const [values,  setValues]  = useState({});
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [notice,  setNotice]  = useState({ type: "", msg: "" });

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

  if (loading) return <div className="ap-loading"><div className="ap-spinner" /><span>Loading settings…</span></div>;

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div>
          <h2 className="ap-section-title">Website Settings</h2>
          <p className="ap-section-sub">Manage global website configuration</p>
        </div>
      </div>
      <Notice type={notice.type} msg={notice.msg} onClose={() => setNotice({ type: "", msg: "" })} />
      <form className="ap-settings-form" onSubmit={handleSave}>
        <div className="ap-settings-grid">
          {DEFAULT_SETTINGS.map(s => (
            <label key={s.key} className="ap-label">
              <span className="ap-label-text">{s.label}</span>
              <input
                className="ap-input"
                type="text"
                value={values[s.key] || ""}
                onChange={e => setValues(p => ({ ...p, [s.key]: e.target.value }))}
                placeholder={`Enter ${s.label.toLowerCase()}…`}
              />
            </label>
          ))}
        </div>
        <div className="ap-settings-save">
          <button type="submit" className="ap-btn-primary" disabled={saving}>
            {saving ? "Saving…" : "💾 Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [active,      setActive]      = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  function handleNavigate(id) {
    setActive(id);
    if (window.innerWidth < 900) setSidebarOpen(false);
  }

  function renderContent() {
    switch (active) {
      case "dashboard":    return <DashboardSection onNavigate={handleNavigate} />;
      case "pages_content":return <CmsSection section="pages" title="Pages Metadata" />;
      case "home":
        return (
          <div className="ap-multi-section">
            <CmsSection section="patrons"      title="Patrons & Mentors" />
            <CmsSection section="sponsors"     title="Website Sponsors (CMS)" />
            <CmsSection section="testimonials" title="Testimonials" />
          </div>
        );
      case "competitions": return <CmsSection section="seasons"   title="Voice of Delhi NCR — Seasons" />;
      case "shows":        return <EventsSection />;
      case "talents":
        return (
          <div className="ap-multi-section">
            <CmsSection section="contestants" title="Qualified Contestants" />
            <CmsSection section="stories"     title="Success Stories" />
          </div>
        );
      case "gallery_page":
        return (
          <div className="ap-multi-section">
            <CmsSection section="gallery" title="Gallery (Photos & Videos)" />
            <CmsSection section="videos"  title="Video Links" />
          </div>
        );
      case "contact":      return <ContactSection />;
      case "registrations":return <RegistrationsSection />;
      case "sponsor_reqs": return <SponsorRequestsSection />;
      case "settings":     return <SettingsSection />;
      default:             return null;
    }
  }

  const currentNav = NAV_ITEMS.find(n => n.id === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        /* ─── Keyframes ─── */
        @keyframes apFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes apSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes apPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(245,158,11,0); }
        }
        @keyframes apSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes apShimmerSlide {
          from { left: -100%; }
          to   { left: 200%; }
        }
        @keyframes apCountUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes apBgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ─── Reset ─── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── Shell ─── */
        .ap-shell {
          display: flex;
          min-height: 100vh;
          background: #020617;
          font-family: 'Outfit', system-ui, sans-serif;
          color: #e2e8f0;
          overflow-x: hidden;
          position: relative;
        }
        .ap-shell::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at 10% 10%, rgba(99,102,241,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 90%, rgba(245,158,11,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%,  rgba(139,92,246,0.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ─── Sidebar ─── */
        .ap-sidebar {
          position: fixed;
          top: 0; left: 0;
          width: 272px;
          height: 100vh;
          background: rgba(10, 15, 30, 0.92);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          z-index: 200;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 4px 0 40px rgba(0,0,0,0.4);
          overflow: hidden;
        }
        .ap-sidebar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #6366f1, #f59e0b, #ec4899, #6366f1);
          background-size: 200% auto;
          animation: apBgShift 4s linear infinite;
        }
        .ap-sidebar.collapsed { transform: translateX(-272px); }

        /* Sidebar Logo */
        .ap-sidebar-logo {
          padding: 28px 24px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ap-logo-icon {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }
        .ap-logo-dot {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(245,158,11,0.4);
          flex-shrink: 0;
          animation: apPulse 3s infinite;
        }
        .ap-logo-text {
          font-size: 22px;
          font-weight: 900;
          background: linear-gradient(135deg, #fbbf24, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }
        .ap-logo-sub {
          font-size: 10px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding-left: 52px;
        }

        /* Nav */
        .ap-nav {
          flex: 1;
          overflow-y: auto;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ap-nav::-webkit-scrollbar { width: 3px; }
        .ap-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

        .ap-nav-group-label {
          font-size: 9px;
          font-weight: 800;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 12px 12px 6px;
          margin-top: 8px;
        }
        .ap-nav-group-label:first-child { margin-top: 0; }

        .ap-nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: transparent;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          text-align: left;
          position: relative;
          overflow: hidden;
        }
        .ap-nav-btn .ap-nav-icon { flex-shrink: 0; transition: all 0.25s; opacity: 0.5; }
        .ap-nav-btn:hover {
          color: #e2e8f0;
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.06);
          transform: translateX(3px);
        }
        .ap-nav-btn:hover .ap-nav-icon { opacity: 0.8; color: #fbbf24; transform: scale(1.1); }
        .ap-nav-btn.active {
          background: linear-gradient(135deg, rgba(245,158,11,0.12), rgba(234,88,12,0.06));
          color: #fbbf24;
          border-color: rgba(245,158,11,0.2);
          font-weight: 700;
          box-shadow: inset 3px 0 0 #f59e0b, 0 4px 12px rgba(245,158,11,0.1);
        }
        .ap-nav-btn.active .ap-nav-icon { opacity: 1; color: #f59e0b; }

        /* Sidebar Footer */
        .ap-sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .ap-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          color: #f87171;
          font-size: 13.5px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s;
        }
        .ap-logout-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 6px 20px rgba(239,68,68,0.4);
          transform: translateY(-2px);
        }

        /* ─── Topbar ─── */
        .ap-topbar {
          position: fixed;
          top: 0; left: 272px; right: 0;
          height: 64px;
          background: rgba(2, 6, 23, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          padding: 0 28px;
          gap: 16px;
          z-index: 100;
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ap-topbar.sb-collapsed { left: 0; }

        .ap-topbar-toggle {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
          flex-shrink: 0;
        }
        .ap-topbar-toggle:hover { background: rgba(255,255,255,0.08); color: #fbbf24; }

        .ap-topbar-breadcrumb {
          font-size: 14px;
          color: #475569;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ap-topbar-breadcrumb .ap-bc-current {
          color: #f1f5f9;
          font-weight: 700;
        }
        .ap-topbar-breadcrumb .ap-bc-sep { color: #334155; }

        .ap-topbar-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ap-topbar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          border-radius: 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
        }
        .ap-topbar-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          font-weight: 800;
          color: #fff;
        }

        /* ─── Main ─── */
        .ap-main {
          margin-left: 272px;
          margin-top: 64px;
          padding: 36px 40px;
          flex: 1;
          min-height: calc(100vh - 64px);
          transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }
        .ap-main.sb-collapsed { margin-left: 0; }

        /* ─── Section ─── */
        .ap-section { display: flex; flex-direction: column; gap: 28px; animation: apFadeUp 0.5s ease-out; }
        .ap-multi-section { display: flex; flex-direction: column; gap: 56px; animation: apFadeUp 0.5s ease-out; }
        .ap-section-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ap-section-title {
          font-size: 30px;
          font-weight: 900;
          color: #f8fafc;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .ap-section-sub { font-size: 14px; color: #64748b; margin-top: 4px; font-weight: 500; }
        .ap-section-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

        /* ─── Stat Cards ─── */
        .ap-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 18px;
        }
        .ap-stat-card {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 20px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(12px);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          animation: apFadeUp 0.5s ease-out backwards;
        }
        .ap-stat-shimmer {
          position: absolute;
          top: 0; left: -100%;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          transform: skewX(-20deg);
          transition: 0;
          pointer-events: none;
        }
        .ap-stat-card:hover { transform: translateY(-6px) scale(1.02); border-color: rgba(255,255,255,0.12); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .ap-stat-card:hover .ap-stat-shimmer { left: 200%; transition: left 0.6s ease; }

        .ap-stat-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ap-stat-body { flex: 1; }
        .ap-stat-value {
          font-size: 30px;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          animation: apCountUp 0.5s ease-out;
        }
        .ap-stat-label { font-size: 11px; color: #64748b; margin-top: 5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
        .ap-stat-arrow { opacity: 0; transition: opacity 0.25s; color: #94a3b8; }
        .ap-stat-card:hover .ap-stat-arrow { opacity: 1; }

        .sc-blue   .ap-stat-icon-wrap { background: linear-gradient(135deg,#3b82f6,#1d4ed8); color:#fff; }
        .sc-orange .ap-stat-icon-wrap { background: linear-gradient(135deg,#f97316,#c2410c); color:#fff; }
        .sc-green  .ap-stat-icon-wrap { background: linear-gradient(135deg,#22c55e,#15803d); color:#fff; }
        .sc-violet .ap-stat-icon-wrap { background: linear-gradient(135deg,#8b5cf6,#6d28d9); color:#fff; }
        .sc-teal   .ap-stat-icon-wrap { background: linear-gradient(135deg,#14b8a6,#0f766e); color:#fff; }
        .sc-indigo .ap-stat-icon-wrap { background: linear-gradient(135deg,#6366f1,#4338ca); color:#fff; }
        .sc-amber  .ap-stat-icon-wrap { background: linear-gradient(135deg,#f59e0b,#b45309); color:#fff; }
        .sc-pink   .ap-stat-icon-wrap { background: linear-gradient(135deg,#ec4899,#be185d); color:#fff; }
        .sc-red    .ap-stat-icon-wrap { background: linear-gradient(135deg,#ef4444,#b91c1c); color:#fff; }
        .sc-rose   .ap-stat-icon-wrap { background: linear-gradient(135deg,#f43f5e,#be123c); color:#fff; }
        .sc-yellow .ap-stat-icon-wrap { background: linear-gradient(135deg,#eab308,#a16207); color:#fff; }
        .sc-cyan   .ap-stat-icon-wrap { background: linear-gradient(135deg,#06b6d4,#0e7490); color:#fff; }

        /* ─── Badges ─── */
        .ap-badge {
          display: inline-flex;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .badge-amber  { background: rgba(245,158,11,0.15); color:#fbbf24; border: 1px solid rgba(245,158,11,0.3); }
        .badge-green  { background: rgba(34,197,94,0.15);  color:#4ade80; border: 1px solid rgba(34,197,94,0.3); }
        .badge-red    { background: rgba(239,68,68,0.15);  color:#f87171; border: 1px solid rgba(239,68,68,0.3); }
        .badge-blue   { background: rgba(59,130,246,0.15); color:#93c5fd; border: 1px solid rgba(59,130,246,0.3); }
        .badge-purple { background: rgba(168,85,247,0.15); color:#d8b4fe; border: 1px solid rgba(168,85,247,0.3); }
        .badge-slate  { background: rgba(100,116,139,0.15);color:#94a3b8; border: 1px solid rgba(100,116,139,0.3); }
        .badge-cyan   { background: rgba(6,182,212,0.15);  color:#67e8f9; border: 1px solid rgba(6,182,212,0.3); }

        /* ─── Buttons ─── */
        .ap-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          color: #fff;
          font-size: 13.5px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 16px rgba(234,88,12,0.35);
          white-space: nowrap;
        }
        .ap-btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 24px rgba(234,88,12,0.5); }
        .ap-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .ap-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: #cbd5e1;
          font-size: 13.5px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .ap-btn-ghost:hover { background: rgba(255,255,255,0.08); color: #fff; transform: translateY(-1px); }
        .ap-btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .ap-btn-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
          flex-shrink: 0;
        }
        .ap-btn-icon:hover { background: rgba(255,255,255,0.1); color: #fbbf24; transform: translateY(-2px) rotate(8deg); }

        /* ─── Notice ─── */
        .ap-notice {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          animation: apFadeUp 0.4s ease-out;
          backdrop-filter: blur(8px);
        }
        .notice-ok  { background: rgba(34,197,94,0.12);  color: #4ade80; border: 1px solid rgba(34,197,94,0.25); }
        .notice-err { background: rgba(239,68,68,0.12);  color: #f87171; border: 1px solid rgba(239,68,68,0.25); }
        .ap-notice-close {
          background: none; border: none; cursor: pointer;
          color: inherit; opacity: 0.6;
          display: flex; padding: 4px;
          transition: opacity 0.2s;
        }
        .ap-notice-close:hover { opacity: 1; }

        /* ─── Form ─── */
        .ap-form {
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          animation: apFadeUp 0.4s ease-out;
        }
        .ap-form-header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ap-form-title { font-size: 18px; font-weight: 800; color: #fff; }
        .ap-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
        }
        .ap-form-actions { display: flex; gap: 14px; margin-top: 28px; }

        .ap-label { display: flex; flex-direction: column; gap: 7px; }
        .ap-label-full { grid-column: 1 / -1; }
        .ap-label-text { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
        .ap-req { color: #f87171; margin-left: 2px; }

        .ap-input {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.3);
          color: #f1f5f9;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.3s;
          outline: none;
          width: 100%;
        }
        .ap-input:focus { border-color: rgba(245,158,11,0.5); background: rgba(0,0,0,0.4); box-shadow: 0 0 0 4px rgba(245,158,11,0.08); }
        .ap-input::placeholder { color: #334155; }
        textarea.ap-input { resize: vertical; min-height: 90px; }

        /* ─── CMS Cards ─── */
        .ap-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        .ap-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          animation: apFadeUp 0.5s ease-out backwards;
        }
        .ap-card:hover { transform: translateY(-8px); border-color: rgba(245,158,11,0.25); box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.08); }

        .ap-card-img-wrap { overflow: hidden; }
        .ap-card-img { width: 100%; height: 150px; object-fit: cover; transition: transform 0.5s; display: block; }
        .ap-card:hover .ap-card-img { transform: scale(1.06); }
        .ap-card-video-thumb {
          width: 100%; height: 150px;
          background: rgba(0,0,0,0.5);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: #f59e0b; gap: 8px; font-size: 12px; font-weight: 700;
        }
        .ap-card-body { padding: 18px; flex: 1; }
        .ap-card-title { font-size: 15px; font-weight: 800; color: #f1f5f9; line-height: 1.3; }
        .ap-card-sub { font-size: 12px; color: #64748b; margin-top: 4px; }
        .ap-card-desc { font-size: 12px; color: #94a3b8; margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5; }
        .ap-tag { display: inline-flex; padding: 3px 9px; border-radius: 20px; background: rgba(245,158,11,0.12); color: #fbbf24; font-size: 10px; font-weight: 700; margin-top: 8px; border: 1px solid rgba(245,158,11,0.25); }
        .ap-card-actions { display: flex; gap: 8px; padding: 14px 18px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.04); }
        .ap-card-edit {
          flex: 1; display: inline-flex; justify-content: center; align-items: center; gap: 6px;
          padding: 8px; border-radius: 9px;
          background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25);
          color: #818cf8; font-size: 12px; font-weight: 700; font-family: inherit;
          cursor: pointer; transition: all 0.25s;
        }
        .ap-card-edit:hover { background: #6366f1; color: #fff; border-color: #6366f1; }
        .ap-card-del {
          flex: 1; display: inline-flex; justify-content: center; align-items: center; gap: 6px;
          padding: 8px; border-radius: 9px;
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
          color: #f87171; font-size: 12px; font-weight: 700; font-family: inherit;
          cursor: pointer; transition: all 0.25s;
        }
        .ap-card-del:hover { background: #ef4444; color: #fff; border-color: #ef4444; }

        /* ─── Loading & Empty ─── */
        .ap-loading {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          padding: 80px 20px;
          color: #64748b; font-size: 15px; font-weight: 500;
        }
        .ap-spinner {
          width: 22px; height: 22px;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: #f59e0b;
          border-radius: 50%;
          animation: apSpin 0.8s linear infinite;
          flex-shrink: 0;
        }
        .ap-empty {
          text-align: center;
          padding: 80px 20px;
          border: 2px dashed rgba(255,255,255,0.07);
          border-radius: 20px;
          background: rgba(255,255,255,0.01);
          animation: apFadeUp 0.5s ease-out;
        }
        .ap-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .ap-empty p { color: #64748b; font-size: 16px; font-weight: 600; }
        .ap-empty-sub { font-size: 13px !important; margin-top: 6px; color: #334155 !important; }

        /* ─── Filters / Table ─── */
        .ap-filters {
          display: flex; gap: 12px; flex-wrap: wrap;
          padding: 16px;
          background: rgba(15,23,42,0.5);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }
        .ap-search {
          flex: 1; min-width: 220px;
          padding: 11px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.3);
          color: #f1f5f9;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.25s;
          outline: none;
        }
        .ap-search:focus { border-color: rgba(245,158,11,0.4); box-shadow: 0 0 0 3px rgba(245,158,11,0.08); }
        .ap-search::placeholder { color: #334155; }
        .ap-select {
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0b1120;
          color: #cbd5e1;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.25s;
          outline: none;
        }
        .ap-select:focus { border-color: rgba(245,158,11,0.4); }

        .ap-table-wrap {
          overflow-x: auto;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(15,23,42,0.5);
          backdrop-filter: blur(12px);
          animation: apFadeUp 0.5s ease-out;
        }
        .ap-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
          color: #e2e8f0;
        }
        .ap-table thead { background: rgba(0,0,0,0.3); }
        .ap-table th {
          padding: 14px 18px;
          text-align: left;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #475569;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          white-space: nowrap;
        }
        .ap-table td {
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          vertical-align: middle;
        }
        .ap-table tbody tr { transition: background 0.2s; }
        .ap-table tbody tr:hover { background: rgba(255,255,255,0.03); }
        .ap-table tbody tr:last-child td { border-bottom: none; }

        .ap-td-num { color: #334155; font-size: 12px; font-weight: 700; width: 40px; }
        .ap-td-name { font-weight: 700; color: #f1f5f9; }
        .ap-td-email { font-size: 12px; color: #e2e8f0; }
        .ap-td-sub { font-size: 11px; color: #475569; margin-top: 2px; }
        .ap-td-city { font-size: 13px; color: #94a3b8; }
        .ap-type-badge {
          display: inline-flex;
          padding: 3px 9px;
          border-radius: 20px;
          background: rgba(139,92,246,0.12);
          color: #c4b5fd;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          border: 1px solid rgba(139,92,246,0.25);
          white-space: nowrap;
        }
        .ap-link {
          display: inline-flex; align-items: center; gap: 4px;
          color: #fbbf24; font-weight: 600; text-decoration: none;
          font-size: 12px; transition: color 0.2s;
        }
        .ap-link:hover { color: #f59e0b; text-decoration: underline; }

        /* Status action buttons */
        .ap-status-btns { display: flex; gap: 6px; flex-wrap: wrap; }
        .ap-status-btn {
          padding: 5px 10px;
          border-radius: 8px;
          border: 1px solid transparent;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s;
          font-family: inherit;
          white-space: nowrap;
        }
        .ap-status-active { opacity: 0.45; cursor: default; }
        .s-shortlisted { background: rgba(59,130,246,0.12); border-color: rgba(59,130,246,0.25); color: #93c5fd; }
        .s-shortlisted:not(.ap-status-active):hover { background: #3b82f6; color: #fff; }
        .s-approved  { background: rgba(34,197,94,0.12);  border-color: rgba(34,197,94,0.25);  color: #86efac; }
        .s-approved:not(.ap-status-active):hover  { background: #22c55e; color: #fff; }
        .s-rejected  { background: rgba(239,68,68,0.12);  border-color: rgba(239,68,68,0.25);  color: #fca5a5; }
        .s-rejected:not(.ap-status-active):hover  { background: #ef4444; color: #fff; }
        .s-replied   { background: rgba(168,85,247,0.12); border-color: rgba(168,85,247,0.25); color: #d8b4fe; }
        .s-replied:not(.ap-status-active):hover   { background: #a855f7; color: #fff; }
        .s-resolved  { background: rgba(100,116,139,0.12);border-color: rgba(100,116,139,0.25);color: #cbd5e1; }
        .s-resolved:not(.ap-status-active):hover  { background: #64748b; color: #fff; }
        .s-contacted { background: rgba(6,182,212,0.12);  border-color: rgba(6,182,212,0.25);  color: #67e8f9; }
        .s-contacted:not(.ap-status-active):hover { background: #06b6d4; color: #fff; }

        /* ─── Contact / Query cards ─── */
        .ap-query-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }
        .ap-query-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 18px;
          padding: 22px;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
          animation: apFadeUp 0.5s ease-out backwards;
        }
        .ap-query-card:hover { transform: translateY(-4px); border-color: rgba(245,158,11,0.2); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
        .ap-query-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 12px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ap-query-meta { flex: 1; }
        .ap-query-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .ap-query-name { font-weight: 800; color: #f1f5f9; font-size: 15px; }
        .ap-query-contact { font-size: 12px; color: #475569; margin-top: 2px; }
        .ap-query-subject { font-size: 12px; color: #94a3b8; margin-top: 6px; font-weight: 600; }
        .ap-query-date { font-size: 10px; color: #334155; }
        .ap-query-message {
          font-size: 13px;
          color: #94a3b8;
          padding: 14px 16px;
          background: rgba(0,0,0,0.3);
          border-radius: 10px;
          border-left: 3px solid #f59e0b;
          line-height: 1.6;
          margin-top: 4px;
        }

        /* ─── Settings ─── */
        .ap-settings-form { }
        .ap-settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          background: rgba(15,23,42,0.5);
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
        }
        .ap-settings-save { margin-top: 20px; display: flex; justify-content: flex-end; }

        /* ─── Pagination ─── */
        .ap-pagination {
          display: flex; align-items: center; justify-content: center; gap: 16px;
          padding: 20px 0 0;
        }
        .ap-page-info { font-size: 13px; color: #475569; font-weight: 600; }

        /* ─── Mobile overlay ─── */
        .ap-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(4px);
          z-index: 150;
        }
        @media (max-width: 900px) {
          .ap-sidebar { transform: translateX(-272px); }
          .ap-sidebar.open { transform: translateX(0); }
          .ap-overlay { display: block; }
          .ap-topbar { left: 0 !important; }
          .ap-main { margin-left: 0 !important; padding: 20px 16px; }
          .ap-section-header { flex-direction: column; }
          .ap-stats-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
          .ap-query-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 901px) {
          .ap-overlay { display: none !important; }
        }
      `}</style>

      <div className="ap-shell">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="ap-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Sidebar ── */}
        <aside className={`ap-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
          {/* Logo */}
          <div className="ap-sidebar-logo">
            <div className="ap-logo-icon">
              <div className="ap-logo-dot">🎵</div>
              <span className="ap-logo-text">DMS Aarohi</span>
            </div>
            <div className="ap-logo-sub">Admin Control Panel</div>
          </div>

          {/* Nav */}
          <nav className="ap-nav">
            {NAV_GROUPS.map(group => {
              const groupItems = NAV_ITEMS.filter(i => i.group === group.id);
              return (
                <div key={group.id}>
                  <div className="ap-nav-group-label">{group.label}</div>
                  {groupItems.map(item => (
                    <button
                      key={item.id}
                      className={`ap-nav-btn ${active === item.id ? "active" : ""}`}
                      onClick={() => handleNavigate(item.id)}
                    >
                      <span className="ap-nav-icon">
                        <Icon path={ICONS[item.icon] || ICONS.dashboard} size={15} />
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="ap-sidebar-footer">
            <button className="ap-logout-btn" onClick={handleLogout}>
              <Icon path={ICONS.logout} size={15} />
              Log Out
            </button>
          </div>
        </aside>

        {/* ── Topbar ── */}
        <header className={`ap-topbar ${!sidebarOpen ? "sb-collapsed" : ""}`}>
          <button className="ap-topbar-toggle" onClick={() => setSidebarOpen(o => !o)}>
            <Icon path={ICONS.menu} size={16} />
          </button>
          <div className="ap-topbar-breadcrumb">
            <span>Admin</span>
            <span className="ap-bc-sep">›</span>
            <span className="ap-bc-current">{currentNav?.label || "Dashboard"}</span>
          </div>
          <div className="ap-topbar-right">
            <div className="ap-topbar-user">
              <div className="ap-topbar-avatar">A</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className={`ap-main ${!sidebarOpen ? "sb-collapsed" : ""}`}>
          {renderContent()}
        </main>
      </div>
    </>
  );
}
