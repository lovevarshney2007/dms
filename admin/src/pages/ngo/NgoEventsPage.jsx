import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Calendar } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

const EMPTY_EVENT = { title: '', date: '', location: '', desc: '', image: '', tag: 'Event', tagColor: 'bg-coral', icon: '📅' };

export default function NgoEventsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/ngo/events')
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load events', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm(EMPTY_EVENT); setShowModal(true); };
  const openEdit = (r) => { setEditing(r); setForm({ ...EMPTY_EVENT, ...r }); setShowModal(true); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await api.put(`/admin/ngo/events/${editing._id}`, form);
        setRows(r => r.map(x => x._id === editing._id ? res : x));
        showToast('Event updated', 'success');
      } else {
        const res = await api.post('/admin/ngo/events', form);
        setRows(r => [res, ...r]);
        showToast('Event created', 'success');
      }
      setShowModal(false);
    } catch {
      showToast('Failed to save event', 'error');
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/ngo/events/${id}`);
      setRows(r => r.filter(x => x._id !== id));
      showToast('Event deleted', 'success');
    } catch {
      showToast('Failed to delete', 'error');
    } finally {
      setDeleting('');
    }
  };

  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">NGO Events</h1>
            <p className="page-subtitle">Manage upcoming and past social impact events</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" onClick={load}>
              <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
            </button>
            <button className="btn btn-green" onClick={openAdd}>
              <Plus size={14} /> Add Event
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-soft)' }}>Loading events...</div>
        ) : rows.length === 0 ? (
          <EmptyState icon={Calendar} title="No events found" subtitle="Click 'Add Event' to create one." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title & Description</th>
                  <th>Date & Location</th>
                  <th>Tag / Icon</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r._id}>
                    <td>
                      {r.image ? (
                        <img src={resolveImg(r.image)} alt={r.title} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                      ) : <div style={{ width: 60, height: 40, background: 'var(--bg-subtle)', borderRadius: 4, display: 'grid', placeItems: 'center' }}>No Img</div>}
                    </td>
                    <td>
                      <div className="td-name">{r.title}</div>
                      <div className="td-soft" style={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {r.desc || '-'}
                      </div>
                    </td>
                    <td>
                      <div className="td-name">{r.date}</div>
                      <div className="td-soft">{r.location || '-'}</div>
                    </td>
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', background: 'var(--bg-subtle)', borderRadius: 12, fontSize: 12 }}>
                        <span>{r.icon}</span> <span>{r.tag}</span>
                      </div>
                    </td>
                    <td align="right" style={{ whiteSpace: 'nowrap' }}>
                      <button className="icon-btn" onClick={() => openEdit(r)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="icon-btn danger" style={{ marginLeft: 6 }} onClick={() => del(r._id)} disabled={deleting === r._id} title="Delete">
                        {deleting === r._id ? <RefreshCw size={16} className="spin" /> : <Trash2 size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Event' : 'Add Event'}>
        <form onSubmit={save} className="form-grid">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Event Title *</label>
            <input className="form-input" name="title" value={form.title} onChange={h} required placeholder="e.g. Blood Donation Drive" />
          </div>
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input className="form-input" name="date" value={form.date} onChange={h} required placeholder="e.g. 15th Aug 2026" />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="form-input" name="location" value={form.location} onChange={h} placeholder="e.g. Apollo Hospital" />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Description</label>
            <textarea className="form-input" name="desc" value={form.desc} onChange={h} rows="3" placeholder="Brief description..."></textarea>
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Image URL</label>
            <input className="form-input" name="image" value={form.image} onChange={h} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label className="form-label">Tag Name</label>
            <input className="form-input" name="tag" value={form.tag} onChange={h} placeholder="e.g. Health" />
          </div>
          <div className="form-group">
            <label className="form-label">Tag Color Class</label>
            <input className="form-input" name="tagColor" value={form.tagColor} onChange={h} placeholder="e.g. bg-coral" />
          </div>
          <div className="form-group">
            <label className="form-label">Icon Emoji</label>
            <input className="form-input" name="icon" value={form.icon} onChange={h} placeholder="e.g. ❤️" />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
            <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-green" disabled={saving}>
              {saving ? 'Saving...' : 'Save Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
