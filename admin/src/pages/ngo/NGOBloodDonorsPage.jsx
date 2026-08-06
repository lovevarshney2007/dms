import { useEffect, useState, useCallback } from 'react';
import { Search, Eye, Check, X, Droplet, Download, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

const STATUS_OPTIONS = ['all', 'new', 'contacted', 'verified'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function NGOBloodDonorsPage() {
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [statusF, setStatusF]     = useState('all');
  const [bgFilter, setBgFilter]   = useState('all');
  const [selected, setSelected]   = useState(null);
  const [updating, setUpdating]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/ngo/blood-donors')
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load blood donors', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const ms = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q)
      || r.phone?.includes(q) || r.city?.toLowerCase().includes(q) || r.bloodGroup?.toLowerCase().includes(q);
    const mst = statusF === 'all' || r.status === statusF;
    const mbg = bgFilter === 'all' || r.bloodGroup === bgFilter;
    return ms && mst && mbg;
  });

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      const updated = await api.put(`/admin/ngo/blood-donors/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? updated : x));
      if (selected?._id === id) setSelected(updated);
      showToast(`Status updated to ${status}`, 'success');
    } catch { showToast('Update failed', 'error'); }
    finally { setUpdating(''); }
  };

  const deleteDonor = async id => {
    if (!window.confirm('Remove this donor entry?')) return;
    try {
      await api.delete(`/admin/ngo/blood-donors/${id}`);
      setRows(r => r.filter(x => x._id !== id));
      if (selected?._id === id) setSelected(null);
      showToast('Donor removed', 'success');
    } catch { showToast('Delete failed', 'error'); }
  };

  const exportCSV = () => {
    const head = 'Name,Email,Phone,Age,Blood Group,Weight,City,Last Donation,Preferred Camp,Status,Registered';
    const body = filtered.map(r =>
      `"${r.name}","${r.email}","${r.phone}","${r.age || ''}","${r.bloodGroup || ''}","${r.weight || ''}","${r.city || ''}","${r.lastDonationDate || ''}","${r.preferredCamp || ''}","${r.status}","${new Date(r.createdAt).toLocaleDateString('en-IN')}"`
    ).join('\n');
    const blob = new Blob([head + '\n' + body], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ngo_blood_donors.csv';
    a.click();
    showToast('CSV downloaded', 'success');
  };

  const statusCounts = STATUS_OPTIONS.slice(1).reduce((acc, s) => ({ ...acc, [s]: rows.filter(r => r.status === s).length }), {});

  const BG_COLORS = { 'A+': '#ef4444', 'A-': '#f97316', 'B+': '#3b82f6', 'B-': '#6366f1', 'O+': '#10b981', 'O-': '#059669', 'AB+': '#8b5cf6', 'AB-': '#d946ef' };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Blood Donors</h1>
            <p className="page-subtitle">People registered as blood donors on the NGO website</p>
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
            className={`badge ${s === 'verified' ? 'approved' : s === 'contacted' ? 'shortlisted' : 'pending'}`}
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
          <input className="search-input" placeholder="Search name, blood group, city…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={bgFilter} onChange={e => setBgFilter(e.target.value)}>
          <option value="all">All Blood Groups</option>
          {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>
        <select className="filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-soft)' }}>{filtered.length} donor{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Droplet} title="No donors found" desc="Try adjusting your filters" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr>
                <th>Name</th><th>Blood Group</th><th>Contact</th><th>City</th><th>Status</th><th>Date</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td><div className="td-name">{r.name}</div></td>
                    <td>
                      {r.bloodGroup ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: BG_COLORS[r.bloodGroup] || '#94a3b8', color: '#fff', fontWeight: 700, fontSize: 11 }}>
                          {r.bloodGroup}
                        </span>
                      ) : <span className="td-soft">—</span>}
                    </td>
                    <td><div style={{ fontSize: 13 }}>{r.email}</div><div className="td-soft">{r.phone}</div></td>
                    <td><div className="td-soft">{r.city || '—'}</div></td>
                    <td><StatusBadge status={r.status || 'new'} /></td>
                    <td><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" title="View" onClick={() => setSelected(r)}><Eye size={14} /></button>
                        <a href={`mailto:${r.email}`} className="icon-btn" title="Email" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✉️</a>
                        {r.status !== 'verified' && (
                          <button className="icon-btn green" title="Mark Verified" disabled={!!updating} onClick={() => updateStatus(r._id, 'verified')}><Check size={14} /></button>
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
                  {selected.bloodGroup && (
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: BG_COLORS[selected.bloodGroup] || '#94a3b8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                      {selected.bloodGroup}
                    </div>
                  )}
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>{selected.name}</div>
                  <StatusBadge status={selected.status || 'new'} />
                </div>
                <button className="icon-btn" onClick={() => setSelected(null)}><X size={16} /></button>
              </div>
              <div className="detail-drawer-body">
                {[
                  ['Blood Group', selected.bloodGroup],
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                  ['Age', selected.age],
                  ['Weight', selected.weight ? `${selected.weight} kg` : null],
                  ['City', selected.city],
                  ['Last Donation', selected.lastDonationDate],
                  ['Preferred Camp', selected.preferredCamp],
                  ['Registered', new Date(selected.createdAt).toLocaleString('en-IN')],
                ].map(([l, v]) => v ? (
                  <div key={l} className="detail-field">
                    <div className="detail-field-label">{l}</div>
                    <div className="detail-field-value">{v}</div>
                  </div>
                ) : null)}
                {selected.notes && (
                  <div className="detail-field">
                    <div className="detail-field-label">Notes</div>
                    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>{selected.notes}</div>
                  </div>
                )}
              </div>
              <div className="detail-drawer-foot">
                <a href={`mailto:${selected.email}`} className="btn btn-green btn-sm">✉️ Email Donor</a>
                {selected.status !== 'contacted' && (
                  <button className="btn btn-outline btn-sm" disabled={!!updating} onClick={() => updateStatus(selected._id, 'contacted')}><Check size={13} />Mark Contacted</button>
                )}
                {selected.status !== 'verified' && (
                  <button className="btn btn-gold btn-sm" disabled={!!updating} onClick={() => updateStatus(selected._id, 'verified')}><Check size={13} />Mark Verified</button>
                )}
                <button className="icon-btn danger" onClick={() => deleteDonor(selected._id)} title="Delete">🗑️</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
