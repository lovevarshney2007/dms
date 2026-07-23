import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, X, Check, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

const EMPTY = { name: '', title: '', imageUrl: '', description: '', videoLink: '', season: '' };

export default function SuccessStoriesPage() {
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/content/success-story')
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = r => { setEditing(r); setForm({ ...EMPTY, ...r }); setShowModal(true); };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.put(`/admin/content/${editing._id}`, form);
        setRows(r => r.map(x => x._id === editing._id ? updated : x));
        showToast('Story updated', 'success');
      } else {
        const created = await api.post('/admin/content/success-story', form);
        setRows(r => [created, ...r]);
        showToast('Story added', 'success');
      }
      setShowModal(false);
    } catch (err) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async id => {
    if (!window.confirm('Delete this story?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/content/${id}`);
      setRows(r => r.filter(x => x._id !== id));
      showToast('Deleted', 'success');
    } catch { showToast('Delete failed', 'error'); }
    finally { setDeleting(''); }
  };

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Success Stories</h1>
            <p className="page-subtitle">Manage alumni showcases and achievements</p>
            <div className="page-divider" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-gold btn-sm" onClick={openAdd}><Plus size={13} />Add Story</button>
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : rows.length === 0 ? (
          <EmptyState icon={Star} title="No success stories yet" desc="Add alumni stories using the button above" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, padding: 20 }}>
            {rows.map(r => (
              <div key={r._id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                {r.imageUrl && (
                  <div style={{ width: '100%', height: 160, overflow: 'hidden' }}>
                    <img src={resolveImg(r.imageUrl)} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                  </div>
                )}
                <div style={{ padding: 16 }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{r.name}</div>
                  {r.title && <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, marginBottom: 4 }}>🏆 {r.title}</div>}
                  {r.season && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Season: {r.season}</div>}
                  {r.description && <div style={{ fontSize: 12, color: 'var(--text-soft)', lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.description}</div>}
                  {r.videoLink && (
                    <a href={r.videoLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--gold)', display: 'block', marginBottom: 10 }}>▶️ Watch Video</a>
                  )}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => openEdit(r)}><Edit2 size={12} />Edit</button>
                    <button className="icon-btn danger" disabled={deleting === r._id} onClick={() => del(r._id)}><Trash2 size={14} /></button>
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
            <motion.div className="detail-drawer" style={{ width: 440 }} initial={{ x: 460 }} animate={{ x: 0 }} exit={{ x: 460 }} transition={{ duration: 0.28 }}>
              <div className="detail-drawer-head">
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{editing ? 'Edit Story' : 'Add Success Story'}</div>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
              </div>
              <form onSubmit={save}>
                <div className="detail-drawer-body" style={{ gap: 14 }}>
                  {[
                    ['name', 'Person Name', 'text'],
                    ['title', 'Achievement / Title', 'text'],
                    ['season', 'Season', 'text'],
                    ['imageUrl', 'Photo URL', 'url'],
                    ['videoLink', 'Video Link (optional)', 'url'],
                  ].map(([name, label, type]) => (
                    <div key={name} className="detail-field">
                      <div className="detail-field-label">{label}</div>
                      <input name={name} type={type} value={form[name] || ''} onChange={handle}
                        className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                    </div>
                  ))}
                  <div className="detail-field">
                    <div className="detail-field-label">About / Story</div>
                    <textarea name="description" value={form.description || ''} onChange={handle} rows={4}
                      className="form-input" style={{ fontSize: 13, padding: '8px 12px', resize: 'vertical' }} />
                  </div>
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
