import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Calendar, MapPin, X, Check, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

// Shows & Events uses two backends:
//  1. ContentBlock type="competition"  → historical shows/competitions (client site data)
//  2. Event model                      → upcoming events (admin-created)
const TABS = [
  { key: 'shows', label: 'Shows & Competitions' },
  { key: 'events', label: 'Upcoming Events' },
];

// For ContentBlock (shows)
const EMPTY_SHOW = { title: '', subtitle: '', description: '', imageUrl: '', year: '', meta: { date: '', location: '', tag: '' } };
// For Event model
const EMPTY_EVENT = { title: '', description: '', eventDate: '', eventLocation: '', posterImage: '', registrationDeadline: '', eventType: 'Competition', liveLink: '' };
const EVENT_TYPES = ['Competition', 'Concert', 'Workshop'];

export default function TalentEventsPage() {
  const [tab, setTab]             = useState('shows');
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY_SHOW);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    const url = tab === 'shows' ? '/admin/content/competition' : '/admin/events';
    api.get(url)
      .then(d => setRows(Array.isArray(d) ? d : (d.items || [])))
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  const emptyForm = tab === 'shows' ? EMPTY_SHOW : EMPTY_EVENT;

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = r => {
    setEditing(r);
    if (tab === 'shows') {
      setForm({ ...EMPTY_SHOW, ...r, meta: { date: r.meta?.date || '', location: r.meta?.location || '', tag: r.meta?.tag || '' } });
    } else {
      setForm({
        ...EMPTY_EVENT, ...r,
        eventDate: r.eventDate ? r.eventDate.split('T')[0] : '',
        registrationDeadline: r.registrationDeadline ? r.registrationDeadline.split('T')[0] : '',
      });
    }
    setShowModal(true);
  };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (tab === 'shows') {
        if (editing) {
          const updated = await api.put(`/admin/content/${editing._id}`, form);
          setRows(r => r.map(x => x._id === editing._id ? updated : x));
          showToast('Show updated', 'success');
        } else {
          const created = await api.post('/admin/content/competition', form);
          setRows(r => [created, ...r]);
          showToast('Show added', 'success');
        }
      } else {
        if (editing) {
          const updated = await api.put(`/admin/events/${editing._id}`, form);
          setRows(r => r.map(x => x._id === editing._id ? updated : x));
          showToast('Event updated', 'success');
        } else {
          const created = await api.post('/admin/events', form);
          setRows(r => [created, ...r]);
          showToast('Event created', 'success');
        }
      }
      setShowModal(false);
    } catch (err) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async id => {
    if (!window.confirm('Delete this item?')) return;
    setDeleting(id);
    try {
      const url = tab === 'shows' ? `/admin/content/${id}` : `/admin/events/${id}`;
      await api.delete(url);
      setRows(r => r.filter(x => x._id !== id));
      showToast('Deleted', 'success');
    } catch { showToast('Delete failed', 'error'); }
    finally { setDeleting(''); }
  };

  const handle = e => {
    const { name, value } = e.target;
    if (name.startsWith('meta.')) {
      const metaKey = name.split('.')[1];
      setForm(f => ({ ...f, meta: { ...f.meta, [metaKey]: value } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Shows & Events</h1>
            <p className="page-subtitle">Manage DMS Aarohi shows, competitions and upcoming events</p>
            <div className="page-divider" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-gold btn-sm" onClick={openAdd}><Plus size={13} />Add {tab === 'shows' ? 'Show' : 'Event'}</button>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: tab === t.key ? 'var(--gold)' : 'var(--card-bg)',
                color: tab === t.key ? '#1a1a2e' : 'var(--text-muted)',
                transition: 'all .15s'
              }}>
              {t.label} {rows.length > 0 && tab === t.key ? `(${rows.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : rows.length === 0 ? (
          <EmptyState icon={Calendar} title={tab === 'shows' ? 'No shows found' : 'No upcoming events'} desc={tab === 'shows' ? 'Add your first show using the button above' : 'Create upcoming events using the Add Event button'} />
        ) : tab === 'shows' ? (
          // Card grid for shows/competitions
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 16, padding: 18 }}>
            {rows.map(r => (
              <div key={r._id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                {r.imageUrl && (
                  <div style={{ width: '100%', height: 150, overflow: 'hidden' }}>
                    <img src={resolveImg(r.imageUrl)} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                  </div>
                )}
                <div style={{ padding: 14 }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{r.title}</div>
                  {r.subtitle && <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, marginBottom: 4 }}>{r.subtitle}</div>}
                  {r.meta?.date && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>📅 {r.meta.date}</div>}
                  {r.meta?.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-soft)', marginTop: 2 }}>
                      <MapPin size={10} />{r.meta.location}
                    </div>
                  )}
                  {r.meta?.tag && (
                    <span style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 600, background: 'var(--gold-bg)', color: 'var(--gold)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--gold-border)' }}>
                      {r.meta.tag}
                    </span>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }} onClick={() => openEdit(r)}><Edit2 size={11} />Edit</button>
                    <button className="icon-btn danger" disabled={deleting === r._id} onClick={() => del(r._id)}><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table for upcoming events
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Title</th><th>Type</th><th>Date</th><th>Location</th><th>Deadline</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r._id}>
                    <td>
                      <div className="td-name">{r.title}</div>
                      <div className="td-soft" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.description}</div>
                    </td>
                    <td><span style={{ fontSize: 12, fontWeight: 600, background: 'var(--gold-bg)', color: 'var(--gold)', padding: '3px 9px', borderRadius: 20, border: '1px solid var(--gold-border)' }}>{r.eventType}</span></td>
                    <td><div className="td-soft">{fmtDate(r.eventDate)}</div></td>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-soft)' }}><MapPin size={12} />{r.eventLocation}</div></td>
                    <td><div className="td-soft">{fmtDate(r.registrationDeadline)}</div></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" title="Edit" onClick={() => openEdit(r)}><Edit2 size={14} /></button>
                        <button className="icon-btn danger" title="Delete" disabled={deleting === r._id} onClick={() => del(r._id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="detail-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} />
            <motion.div className="detail-drawer" style={{ width: 460 }} initial={{ x: 480 }} animate={{ x: 0 }} exit={{ x: 480 }} transition={{ duration: 0.28 }}>
              <div className="detail-drawer-head">
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{editing ? 'Edit' : 'Add'} {tab === 'shows' ? 'Show' : 'Event'}</div>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
              </div>
              <form onSubmit={save}>
                <div className="detail-drawer-body" style={{ gap: 14 }}>
                  {tab === 'shows' ? (
                    <>
                      {[['title', 'Show Title', 'text'], ['subtitle', 'Subtitle (e.g. "1st Show")', 'text'], ['imageUrl', 'Poster Image URL', 'url']].map(([name, label, type]) => (
                        <div key={name} className="detail-field">
                          <div className="detail-field-label">{label}</div>
                          <input name={name} type={type} value={form[name] || ''} onChange={handle} required={name === 'title'} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                        </div>
                      ))}
                      <div className="detail-field">
                        <div className="detail-field-label">Description</div>
                        <textarea name="description" value={form.description || ''} onChange={handle} rows={2} className="form-input" style={{ fontSize: 13, padding: '8px 12px', resize: 'vertical' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div className="detail-field">
                          <div className="detail-field-label">Date</div>
                          <input name="meta.date" type="text" value={form.meta?.date || ''} onChange={handle} placeholder="e.g. 2013" className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                        </div>
                        <div className="detail-field">
                          <div className="detail-field-label">Tag</div>
                          <input name="meta.tag" type="text" value={form.meta?.tag || ''} onChange={handle} placeholder="e.g. Cultural Event" className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                        </div>
                      </div>
                      <div className="detail-field">
                        <div className="detail-field-label">Venue / Location</div>
                        <input name="meta.location" type="text" value={form.meta?.location || ''} onChange={handle} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                      </div>
                    </>
                  ) : (
                    <>
                      {[['title', 'Event Title', 'text'], ['eventLocation', 'Location', 'text'], ['posterImage', 'Poster Image URL', 'url'], ['liveLink', 'Live Link (optional)', 'url']].map(([name, label, type]) => (
                        <div key={name} className="detail-field">
                          <div className="detail-field-label">{label}</div>
                          <input name={name} type={type} value={form[name] || ''} onChange={handle} required={name !== 'liveLink'} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                        </div>
                      ))}
                      <div className="detail-field">
                        <div className="detail-field-label">Description</div>
                        <textarea name="description" value={form.description || ''} onChange={handle} required rows={3} className="form-input" style={{ fontSize: 13, padding: '8px 12px', resize: 'vertical' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div className="detail-field">
                          <div className="detail-field-label">Event Date</div>
                          <input name="eventDate" type="date" value={form.eventDate || ''} onChange={handle} required className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                        </div>
                        <div className="detail-field">
                          <div className="detail-field-label">Reg. Deadline</div>
                          <input name="registrationDeadline" type="date" value={form.registrationDeadline || ''} onChange={handle} required className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                        </div>
                      </div>
                      <div className="detail-field">
                        <div className="detail-field-label">Event Type</div>
                        <select name="eventType" value={form.eventType || 'Competition'} onChange={handle} className="filter-select" style={{ width: '100%' }}>
                          {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div className="detail-drawer-foot">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold btn-sm" disabled={saving}><Check size={13} />{saving ? 'Saving…' : (editing ? 'Update' : 'Create')}</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
