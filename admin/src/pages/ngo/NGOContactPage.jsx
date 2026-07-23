import { useEffect, useState, useCallback } from 'react';
import { Search, Eye, Check, X, MessageSquare, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

const STATUS_OPTIONS = ['all', 'pending', 'replied', 'resolved'];

export default function NGOContactPage() {
  const [rows, setRows]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [statusF, setStatusF]   = useState('all');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/ngo-queries')
      .then(d => setRows(d.items || d.queries || (Array.isArray(d) ? d : [])))
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const ms = !q || r.name?.toLowerCase().includes(q) || r.message?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q);
    return ms && (statusF === 'all' || r.status === statusF);
  });

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      await api.put(`/admin/ngo-queries/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      showToast('Status updated', 'success');
    } catch { showToast('Update failed', 'error'); }
    finally { setUpdating(''); }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">NGO Contact Queries</h1>
            <p className="page-subtitle">Messages from the NGO website contact form</p>
            <div className="page-divider green" />
          </div>
          <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input className="search-input" placeholder="Search name or message…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-soft)' }}>{filtered.length} quer{filtered.length !== 1 ? 'ies' : 'y'}</span>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={MessageSquare} title="No queries found" desc="No NGO contact queries yet" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Contact</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td><div className="td-name">{r.name}</div></td>
                    <td><div style={{ fontSize: 12 }}>{r.email}</div><div className="td-soft">{r.phone}</div></td>
                    <td><div className="td-soft" style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.message}</div></td>
                    <td><StatusBadge status={r.status || 'pending'} /></td>
                    <td><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" onClick={() => setSelected(r)}><Eye size={14} /></button>
                        <a href={`mailto:${r.email}`} className="icon-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Reply">✉️</a>
                        {r.status !== 'resolved' && (
                          <button className="icon-btn green" disabled={!!updating} onClick={() => updateStatus(r._id, 'resolved')}><Check size={14} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div className="detail-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} />
            <motion.div className="detail-drawer" initial={{ x: 440 }} animate={{ x: 0 }} exit={{ x: 440 }} transition={{ duration: 0.28 }}>
              <div className="detail-drawer-head">
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{selected.name}</div>
                <button className="icon-btn" onClick={() => setSelected(null)}><X size={16} /></button>
              </div>
              <div className="detail-drawer-body">
                {[['Email', selected.email], ['Phone', selected.phone], ['City', selected.city], ['Help Type', selected.helpType], ['Date', new Date(selected.createdAt).toLocaleString('en-IN')]].map(([l, v]) => v ? (
                  <div key={l} className="detail-field">
                    <div className="detail-field-label">{l}</div>
                    <div className="detail-field-value">{v}</div>
                  </div>
                ) : null)}
                <div className="detail-field">
                  <div className="detail-field-label">Message</div>
                  <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>{selected.message}</div>
                </div>
              </div>
              <div className="detail-drawer-foot">
                <a href={`mailto:${selected.email}`} className="btn btn-green btn-sm">✉️ Reply</a>
                <button className="btn btn-outline btn-sm" disabled={!!updating} onClick={() => updateStatus(selected._id, 'replied')}><Check size={13} />Mark Replied</button>
                <button className="btn btn-gold btn-sm" disabled={!!updating} onClick={() => updateStatus(selected._id, 'resolved')}><Check size={13} />Resolved</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
