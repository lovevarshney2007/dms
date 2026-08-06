import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Users, X, Check, RefreshCw, Upload, User } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import EmptyState from '../../components/EmptyState';

const EMPTY = { name: '', role: '', image: '' };

export default function NGOTeamPage() {
  const [team, setTeam]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/ngo/team')
      .then(d => setTeam(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load team', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = m => { setEditing(m); setForm({ name: m.name, role: m.role, image: m.image || '' }); setShowModal(true); };

  const handleUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = localStorage.getItem('dms_admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5051/api'}/upload`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      setForm(f => ({ ...f, image: data.url }));
      showToast('Photo uploaded', 'success');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const save = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.put(`/admin/ngo/team/${editing._id}`, form);
        setTeam(t => t.map(m => m._id === editing._id ? updated : m));
        showToast('Team member updated', 'success');
      } else {
        const created = await api.post('/admin/ngo/team', form);
        setTeam(t => [created, ...t]);
        showToast('Team member added', 'success');
      }
      setShowModal(false);
    } catch (err) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async id => {
    if (!window.confirm('Remove this team member?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/ngo/team/${id}`);
      setTeam(t => t.filter(m => m._id !== id));
      showToast('Team member removed', 'success');
    } catch { showToast('Delete failed', 'error'); }
    finally { setDeleting(''); }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">NGO Team</h1>
            <p className="page-subtitle">Manage NGO team members shown on the website</p>
            <div className="page-divider green" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-green btn-sm" onClick={openAdd}><Plus size={13} />Add Member</button>
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : team.length === 0 ? (
          <EmptyState icon={Users} title="No team members yet" desc="Add NGO team members using the button above" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16, padding: 18 }}>
            {team.map(m => (
              <div key={m._id} style={{
                background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14,
                padding: 16, display: 'flex', alignItems: 'center', gap: 14
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', background: 'var(--green-bg)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {m.image
                    ? <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <User size={22} style={{ color: 'var(--green)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{m.role}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button className="icon-btn" onClick={() => openEdit(m)} title="Edit"><Edit2 size={13} /></button>
                  <button className="icon-btn danger" disabled={deleting === m._id} onClick={() => del(m._id)} title="Delete"><Trash2 size={13} /></button>
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
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{editing ? 'Edit' : 'Add'} Team Member</div>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
              </div>
              <form onSubmit={save}>
                <div className="detail-drawer-body" style={{ gap: 14 }}>
                  <div className="detail-field">
                    <div className="detail-field-label">Full Name *</div>
                    <input name="name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="form-input" placeholder="e.g. Pankaj Mathur" />
                  </div>
                  <div className="detail-field">
                    <div className="detail-field-label">Role / Designation *</div>
                    <input name="role" type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} required className="form-input" placeholder="e.g. President" />
                  </div>
                  <div className="detail-field">
                    <div className="detail-field-label">Photo URL</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input name="image" type="text" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="form-input" style={{ flex: 1 }} placeholder="Paste image URL or upload →" />
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" style={{ display: 'none' }} />
                      <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                        className="btn btn-outline btn-sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                        <Upload size={12} />{uploading ? '…' : 'Upload'}
                      </button>
                    </div>
                    {form.image && (
                      <div style={{ marginTop: 8, width: 64, height: 64, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <img src={form.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
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
