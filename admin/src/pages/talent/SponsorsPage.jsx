import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, DollarSign, X, Check, RefreshCw, ExternalLink } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

const TABS = [
  { key: 'requests', label: 'Sponsor Requests' },
  { key: 'sponsor', label: 'Active Sponsors' },
  { key: 'patron', label: 'Patrons' },
];

const EMPTY_SPONSOR = { name: '', title: '', organization: '', imageUrl: '', link: '', description: '' };
const STATUS_OPTS = ['pending', 'contacted', 'approved', 'rejected'];

export default function SponsorsPage() {
  const [tab, setTab]             = useState('requests');
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY_SPONSOR);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState('');
  const [updating, setUpdating]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    const url = tab === 'requests' ? '/admin/sponsor-requests' : `/admin/content/${tab}`;
    api.get(url)
      .then(d => setRows(Array.isArray(d) ? d : (d.items || [])))
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  const updateRequestStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.put(`/admin/sponsor-requests/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? { ...x, status } : x));
      showToast(`Status: ${status}`, 'success');
    } catch { showToast('Update failed', 'error'); }
    finally { setUpdating(''); }
  };

  const openAdd  = () => { setEditing(null); setForm(EMPTY_SPONSOR); setShowModal(true); };
  const openEdit = r => { setEditing(r); setForm({ ...EMPTY_SPONSOR, ...r }); setShowModal(true); };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.put(`/admin/content/${editing._id}`, form);
        setRows(r => r.map(x => x._id === editing._id ? updated : x));
        showToast('Updated', 'success');
      } else {
        const created = await api.post(`/admin/content/${tab}`, form);
        setRows(r => [created, ...r]);
        showToast('Added', 'success');
      }
      setShowModal(false);
    } catch (err) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async id => {
    if (!window.confirm('Delete?')) return;
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
            <h1 className="page-title">Sponsors</h1>
            <p className="page-subtitle">Manage corporate sponsors, patron requests</p>
            <div className="page-divider" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            {tab !== 'requests' && <button className="btn btn-gold btn-sm" onClick={openAdd}><Plus size={13} />Add</button>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: tab === t.key ? 'var(--gold)' : 'var(--card-bg)',
                color: tab === t.key ? '#1a1a2e' : 'var(--text-muted)', transition: 'all .15s'
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
          <EmptyState icon={DollarSign} title="Nothing here yet" desc={tab === 'requests' ? 'No sponsor requests received' : 'Add sponsors using the button above'} />
        ) : tab === 'requests' ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Organization</th><th>Contact</th><th>Tier</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r._id}>
                    <td><div className="td-name">{r.name}</div></td>
                    <td><div style={{ fontSize: 13 }}>{r.organization}</div></td>
                    <td><div style={{ fontSize: 12 }}>{r.email}</div><div className="td-soft">{r.phone}</div></td>
                    <td><span style={{ fontSize: 12, fontWeight: 600, background: 'var(--gold-bg)', color: 'var(--gold)', padding: '3px 9px', borderRadius: 20, border: '1px solid var(--gold-border)' }}>{r.sponsorshipTier || '—'}</span></td>
                    <td><StatusBadge status={r.status || 'pending'} /></td>
                    <td><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <div className="td-actions">
                        <select value={r.status || 'pending'} disabled={updating === r._id}
                          onChange={e => updateRequestStatus(r._id, e.target.value)}
                          style={{ fontSize: 12, padding: '3px 6px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer' }}>
                          {STATUS_OPTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14, padding: 18 }}>
            {rows.map(r => (
              <div key={r._id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
                {r.imageUrl && <img src={resolveImg(r.imageUrl)} alt={r.name || r.title} style={{ width: 60, height: 60, objectFit: 'contain', marginBottom: 10, borderRadius: 6 }} onError={e => e.target.style.display='none'} />}
                <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name || r.title}</div>
                {r.organization && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.organization}</div>}
                {r.link && <a href={r.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}><ExternalLink size={10} />Website</a>}
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }} onClick={() => openEdit(r)}><Edit2 size={11} />Edit</button>
                  <button className="icon-btn danger" disabled={deleting === r._id} onClick={() => del(r._id)}><Trash2 size={13} /></button>
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
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{editing ? 'Edit' : 'Add'} {tab === 'patron' ? 'Patron' : 'Sponsor'}</div>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
              </div>
              <form onSubmit={save}>
                <div className="detail-drawer-body" style={{ gap: 14 }}>
                  {[
                    ['name', 'Name', 'text'],
                    ['title', 'Title / Role', 'text'],
                    ['organization', 'Organization', 'text'],
                    ['imageUrl', 'Logo/Image URL', 'url'],
                    ['link', 'Website URL', 'url'],
                  ].map(([name, label, type]) => (
                    <div key={name} className="detail-field">
                      <div className="detail-field-label">{label}</div>
                      <input name={name} type={type} value={form[name] || ''} onChange={handle}
                        className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                    </div>
                  ))}
                  <div className="detail-field">
                    <div className="detail-field-label">Description</div>
                    <textarea name="description" value={form.description || ''} onChange={handle} rows={3}
                      className="form-input" style={{ fontSize: 13, padding: '8px 12px', resize: 'vertical' }} />
                  </div>
                </div>
                <div className="detail-drawer-foot">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold btn-sm" disabled={saving}><Check size={13} />{saving ? 'Saving…' : (editing ? 'Update' : 'Add')}</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
