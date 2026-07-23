import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Image, X, Check, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

const TABS = [
  { key: 'ngo-gallery', label: 'Photos' },
  { key: 'ngo-camp', label: 'Blood Camps' },
];
const EMPTY = { title: '', imageUrl: '', description: '', tags: '' };

export default function NGOGalleryPage() {
  const [tab, setTab]             = useState('ngo-gallery');
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/content/${tab}`)
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = r => { setEditing(r); setForm({ ...EMPTY, ...r, tags: Array.isArray(r.tags) ? r.tags.join(', ') : (r.tags || '') }); setShowModal(true); };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (payload.tags) payload.tags = payload.tags.split(',').map(t => t.trim()).filter(Boolean);
      if (editing) {
        const updated = await api.put(`/admin/content/${editing._id}`, payload);
        setRows(r => r.map(x => x._id === editing._id ? updated : x));
        showToast('Updated', 'success');
      } else {
        const created = await api.post(`/admin/content/${tab}`, payload);
        setRows(r => [created, ...r]);
        showToast('Added', 'success');
      }
      setShowModal(false);
    } catch (err) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async id => {
    if (!window.confirm('Delete this item?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/content/${id}`);
      setRows(r => r.filter(x => x._id !== id));
      showToast('Deleted', 'success');
    } catch { showToast('Delete failed', 'error'); }
    finally { setDeleting(''); }
  };

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const addLabel = tab === 'ngo-gallery' ? 'Photo' : 'Blood Camp';

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">NGO Gallery</h1>
            <p className="page-subtitle">Manage NGO photos and blood camp records</p>
            <div className="page-divider green" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-green btn-sm" onClick={openAdd}><Plus size={13} />Add {addLabel}</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: tab === t.key ? 'var(--green)' : 'var(--card-bg)',
                color: tab === t.key ? '#fff' : 'var(--text-muted)', transition: 'all .15s'
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : rows.length === 0 ? (
          <EmptyState icon={Image} title={`No ${addLabel}s yet`} desc="Add items using the button above" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14, padding: 18 }}>
            {rows.map(r => (
              <div key={r._id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                {r.imageUrl && (
                  <div style={{ width: '100%', height: 140, overflow: 'hidden' }}>
                    <img src={resolveImg(r.imageUrl, 'ngo')} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                  </div>
                )}
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{r.title}</div>
                  {r.description && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.4 }}>{r.description.substring(0, 60)}...</div>}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }} onClick={() => openEdit(r)}><Edit2 size={11} />Edit</button>
                    <button className="icon-btn danger" disabled={deleting === r._id} onClick={() => del(r._id)}><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="detail-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} />
            <motion.div className="detail-drawer" style={{ width: 420 }} initial={{ x: 440 }} animate={{ x: 0 }} exit={{ x: 440 }} transition={{ duration: 0.28 }}>
              <div className="detail-drawer-head">
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{editing ? 'Edit' : 'Add'} {addLabel}</div>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
              </div>
              <form onSubmit={save}>
                <div className="detail-drawer-body" style={{ gap: 14 }}>
                  <div className="detail-field">
                    <div className="detail-field-label">Title</div>
                    <input name="title" type="text" value={form.title || ''} onChange={handle} required className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                  </div>
                  <div className="detail-field">
                    <div className="detail-field-label">Image URL</div>
                    <input name="imageUrl" type="url" value={form.imageUrl || ''} onChange={handle} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                  </div>
                  <div className="detail-field">
                    <div className="detail-field-label">Tags (comma-separated)</div>
                    <input name="tags" type="text" value={form.tags || ''} onChange={handle} placeholder="e.g. blood donation, camp" className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                  </div>
                  <div className="detail-field">
                    <div className="detail-field-label">Description</div>
                    <textarea name="description" value={form.description || ''} onChange={handle} rows={3}
                      className="form-input" style={{ fontSize: 13, padding: '8px 12px', resize: 'vertical' }} />
                  </div>
                </div>
                <div className="detail-drawer-foot">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-green btn-sm" disabled={saving}><Check size={13} />{saving ? 'Saving…' : (editing ? 'Update' : 'Add')}</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
