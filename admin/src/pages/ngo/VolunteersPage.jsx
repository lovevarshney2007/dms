import { useEffect, useState, useCallback } from 'react';
import { Search, Eye, Check, X, Heart, Download, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

const STATUS_OPTIONS = ['all', 'pending', 'contacted', 'active', 'inactive'];
const ROLE_ICONS = { 'Blood Donor':'🩸', 'Event Organiser':'📋', 'Child Mentor / Tutor':'📚', 'Elderly Care Visitor':'🤝', 'Social Media Volunteer':'📱', 'Logistics Support':'📦' };

export default function VolunteersPage() {
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [statusF, setStatusF]     = useState('all');
  const [selected, setSelected]   = useState(null);
  const [updating, setUpdating]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/volunteers')
      .then(d => setRows(d.items || d.registrations || (Array.isArray(d) ? d : [])))
      .catch(() => showToast('Failed to load volunteers', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const ms = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.city?.toLowerCase().includes(q);
    const mst = statusF === 'all' || r.status === statusF;
    return ms && mst;
  });

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      await api.put(`/admin/volunteers/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      showToast(`Status: ${status}`, 'success');
    } catch { showToast('Update failed', 'error'); }
    finally { setUpdating(''); }
  };

  const exportCSV = () => {
    const head = 'Name,Email,Phone,City,Category,Availability,Status,Date';
    const body = filtered.map(r =>
      `"${r.name}","${r.email}","${r.phone}","${r.city}","${r.talentCategory || r.role || ''}","${r.availability || ''}","${r.status}","${new Date(r.createdAt).toLocaleDateString()}"`
    ).join('\n');
    const blob = new Blob([head + '\n' + body], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'volunteers.csv'; a.click();
    showToast('CSV downloaded', 'success');
  };

  const statusCounts = STATUS_OPTIONS.slice(1).reduce((acc, s) => ({ ...acc, [s]: rows.filter(r => r.status === s).length }), {});

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Volunteers</h1>
            <p className="page-subtitle">NGO volunteer registrations</p>
            <div className="page-divider green" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-green btn-sm" onClick={exportCSV}><Download size={13} />Export CSV</button>
          </div>
        </div>
      </div>

      {/* Status pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {STATUS_OPTIONS.slice(1).map(s => (
          <button key={s} onClick={() => setStatusF(s === statusF ? 'all' : s)}
            className={`badge ${s === 'active' ? 'approved' : s === 'pending' ? 'pending' : 'shortlisted'}`}
            style={{ cursor: 'pointer', border: statusF === s ? '2px solid currentColor' : '2px solid transparent', fontSize: 12 }}>
            {s.charAt(0).toUpperCase() + s.slice(1)} ({statusCounts[s] || 0})
          </button>
        ))}
        <button onClick={() => setStatusF('all')} style={{ fontSize: 12, background: 'none', border: 'none', color: 'var(--text-soft)', cursor: 'pointer', fontWeight: 600 }}>
          All ({rows.length})
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input className="search-input" placeholder="Search name, city, email…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-soft)' }}>{filtered.length} volunteer{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Heart} title="No volunteers found" desc="Try adjusting your filters" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Category</th><th>Contact</th><th>City</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td><div className="td-name">{r.name}</div><div className="td-soft">{r.shortIntroduction?.substring(0, 40) || ''}</div></td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
                        {ROLE_ICONS[r.talentCategory] || '👤'} {r.talentCategory || r.role || '—'}
                      </span>
                    </td>
                    <td><div style={{ fontSize: 13 }}>{r.email}</div><div className="td-soft">{r.phone}</div></td>
                    <td><div className="td-soft">{r.city}</div></td>
                    <td><StatusBadge status={r.status || 'pending'} /></td>
                    <td><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" title="View" onClick={() => setSelected(r)}><Eye size={14} /></button>
                        <a href={`mailto:${r.email}`} className="icon-btn" title="Email" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✉️</a>
                        {r.status !== 'active' && (
                          <button className="icon-btn green" title="Mark active" disabled={!!updating} onClick={() => updateStatus(r._id, 'active')}><Check size={14} /></button>
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
                <div>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{ROLE_ICONS[selected.talentCategory] || '👤'}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{selected.name}</div>
                  <StatusBadge status={selected.status || 'pending'} />
                </div>
                <button className="icon-btn" onClick={() => setSelected(null)}><X size={16} /></button>
              </div>
              <div className="detail-drawer-body">
                {[
                  ['Category', selected.talentCategory || selected.role],
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                  ['City', selected.city],
                  ['Language', selected.languagePreference],
                  ['Gender', selected.gender],
                  ['Age', selected.age],
                  ['Video Link', selected.videoLink],
                  ['Registered', new Date(selected.createdAt).toLocaleString('en-IN')]
                ].map(([l, v]) => v ? (
                  <div key={l} className="detail-field">
                    <div className="detail-field-label">{l}</div>
                    {l === 'Video Link'
                      ? <a href={v} target="_blank" rel="noopener noreferrer" className="detail-field-link">{v}</a>
                      : <div className="detail-field-value">{v}</div>}
                  </div>
                ) : null)}
                {selected.shortIntroduction && (
                  <div className="detail-field">
                    <div className="detail-field-label">Introduction</div>
                    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>{selected.shortIntroduction}</div>
                  </div>
                )}
              </div>
              <div className="detail-drawer-foot">
                <a href={`mailto:${selected.email}`} className="btn btn-green btn-sm">✉️ Email Volunteer</a>
                <button className="btn btn-outline btn-sm" disabled={!!updating} onClick={() => updateStatus(selected._id, 'contacted')}><Check size={13} />Mark Contacted</button>
                <button className="btn btn-gold btn-sm" disabled={!!updating} onClick={() => updateStatus(selected._id, 'active')}><Check size={13} />Mark Active</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
