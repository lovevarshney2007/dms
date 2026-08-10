import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, LayoutTemplate, X, Check, RefreshCw } from 'lucide-react';
import { api } from '../lib/api';
import { showToast } from '../components/Toast';
import EmptyState from '../components/EmptyState';
import { resolveImg } from '../config';

const EMPTY = { 
  type: '', 
  title: '', 
  description: '', 
  imageUrl: '', 
  videoLink: '',
  name: '', // Useful for patrons/team
  role: '', // Useful for patrons/team
  season: '', // Useful for contestants
};

const TABS = [
  { id: 'qualified-contestant', label: 'Contestants' },
  { id: 'patron', label: 'Patrons' },
  { id: 'testimonial', label: 'Testimonials' },
  { id: 'faq', label: 'FAQs' },
  { id: 'highlight', label: 'Highlights' },
  { id: 'objective', label: 'Objectives' },
];

export default function ContentBlocksPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/content/${activeTab}`)
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  }, [activeTab]);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setEditing(null); setForm({ ...EMPTY, type: activeTab }); setShowModal(true); };
  const openEdit = r => { setEditing(r); setForm({ ...EMPTY, ...r, type: activeTab }); setShowModal(true); };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      // Map local form state to backend ContentBlock fields if necessary
      // ContentBlock schema: type, title, description, imageUrl, videoLink, order, isActive, metadata
      
      if (activeTab === 'faq') {
        payload.title = payload.title || payload.name;
      }
      
      if (activeTab === 'qualified-contestant') {
        payload.name = payload.title || payload.name;
        payload.role = payload.description || payload.role; // map role to category
      }

      if (editing) {
        const updated = await api.put(`/admin/content/${editing._id}`, payload);
        setRows(r => r.map(x => x._id === editing._id ? updated : x));
        showToast('Updated successfully', 'success');
      } else {
        const created = await api.post(`/admin/content/${activeTab}`, payload);
        setRows(r => [created, ...r]);
        showToast('Added successfully', 'success');
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

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Content Blocks</h1>
            <p className="page-subtitle">Manage dynamic text and basic sections across the site.</p>
            <div className="page-divider" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-gold btn-sm" onClick={openAdd}><Plus size={13} />Add New</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              background: activeTab === tab.id ? 'var(--gold)' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : rows.length === 0 ? (
          <EmptyState icon={LayoutTemplate} title={`No ${activeTab} items yet`} desc="Add items using the button above" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, padding: 20 }}>
            {rows.map(r => (
              <div key={r._id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                {r.imageUrl && (
                  <div style={{ width: '100%', height: 160, overflow: 'hidden' }}>
                    <img src={resolveImg(r.imageUrl)} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                  </div>
                )}
                <div style={{ padding: 16 }}>
                  {r.title && !r.name && <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{r.title}</div>}
                  {r.name && <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{r.name}</div>}
                  {r.role && <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, marginBottom: 4 }}>{r.role}</div>}
                  {r.season && <div style={{ fontSize: 11, color: 'var(--text-soft)', marginBottom: 4, padding: '2px 6px', background: 'var(--bg-hover)', borderRadius: 4, display: 'inline-block' }}>{r.season}</div>}
                  {r.description && <div style={{ fontSize: 12, color: 'var(--text-soft)', lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.description}</div>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
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
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{editing ? 'Edit Item' : 'Add Item'}</div>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
              </div>
              <form onSubmit={save}>
                <div className="detail-drawer-body" style={{ gap: 14 }}>
                  {['faq', 'objective', 'highlight'].includes(activeTab) ? (
                    <>
                      <div className="detail-field">
                        <div className="detail-field-label">Title / Question</div>
                        <input name="title" value={form.title || ''} onChange={handle} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} required />
                      </div>
                      <div className="detail-field">
                        <div className="detail-field-label">Description / Answer</div>
                        <textarea name="description" value={form.description || ''} onChange={handle} rows={4} className="form-input" style={{ fontSize: 13, padding: '8px 12px', resize: 'vertical' }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail-field">
                        <div className="detail-field-label">{activeTab === 'qualified-contestant' ? 'Name' : 'Name / Title'}</div>
                        <input name="title" value={form.title || form.name || ''} onChange={handle} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} required />
                      </div>
                      <div className="detail-field">
                        <div className="detail-field-label">{activeTab === 'qualified-contestant' ? 'Category (e.g. Junior)' : 'Role / Subtitle'}</div>
                        <input name="description" value={form.description || form.role || ''} onChange={handle} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                      </div>
                      {activeTab === 'qualified-contestant' && (
                        <div className="detail-field">
                          <div className="detail-field-label">Season (e.g. Season 4)</div>
                          <input name="season" value={form.season || ''} onChange={handle} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} required />
                        </div>
                      )}
                      <div className="detail-field">
                        <div className="detail-field-label">Image URL</div>
                        <input name="imageUrl" type="url" value={form.imageUrl || ''} onChange={handle} className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
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
