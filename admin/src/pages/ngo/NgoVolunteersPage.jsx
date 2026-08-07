import { useEffect, useState, useCallback } from 'react';
import { Search, Download, RefreshCw, Eye, Check, X, Users } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';

const STATUS_OPTIONS = ['all', 'pending', 'active', 'inactive', 'contacted'];

export default function NgoVolunteersPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/volunteers')
      .then(d => setRows(d.items || []))
      .catch(() => showToast('Failed to load volunteers', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.phone?.includes(q) || r.city?.toLowerCase().includes(q);
    const matchStatus = statusF === 'all' || r.status === statusF;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      await api.put(`/admin/volunteers/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      showToast(`Status updated to ${status}`, 'success');
    } catch { 
      showToast('Update failed', 'error'); 
    } finally { 
      setUpdating(''); 
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">NGO Volunteers</h1>
            <p className="page-subtitle">Manage people who want to join DMS Aarohi initiatives</p>
          </div>
          <button className="btn btn-outline" onClick={load}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search name, email, phone, city..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <select value={statusF} onChange={e => setStatusF(e.target.value)} className="filter-select">
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <span style={{ marginLeft:'auto', fontSize:13, color:'var(--text-soft)' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-soft)' }}>Loading volunteers...</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Users} title="No volunteers found" subtitle="Try adjusting your filters or search." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name & Contact</th>
                  <th>City/State</th>
                  <th>Interest/Talent</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th align="right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td>
                      <div className="td-name">{r.name}</div>
                      <div className="td-soft">{r.email}</div>
                      <div className="td-soft">{r.phone}</div>
                    </td>
                    <td>
                      <div>{r.city}</div>
                      <div className="td-soft">{r.state || '-'}</div>
                    </td>
                    <td>
                      <div>{r.talentCategory || '-'}</div>
                      <div className="td-soft">{r.languagePreference}</div>
                    </td>
                    <td><StatusBadge status={r.status} /></td>
                    <td className="td-soft">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td align="right">
                      <button className="icon-btn" onClick={() => setSelected(r)} title="View Details">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Volunteer Details">
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div><label className="form-label text-xs">Name</label><div className="font-semibold">{selected.name}</div></div>
              <div><label className="form-label text-xs">Age / Gender</label><div>{selected.age || '-'} / {selected.gender || '-'}</div></div>
              <div><label className="form-label text-xs">Email</label><div>{selected.email}</div></div>
              <div><label className="form-label text-xs">Phone</label><div>{selected.phone}</div></div>
              <div><label className="form-label text-xs">City / State</label><div>{selected.city}, {selected.state}</div></div>
              <div><label className="form-label text-xs">Status</label><div style={{ marginTop: 4 }}><StatusBadge status={selected.status} /></div></div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: 16, borderRadius: 8, marginBottom: 20 }}>
              <div style={{ marginBottom: 12 }}>
                <label className="form-label text-xs">Interest / Talent Category</label>
                <div className="font-medium">{selected.talentCategory || '-'}</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="form-label text-xs">Language / Genre</label>
                <div className="font-medium">{selected.languagePreference || '-'}</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="form-label text-xs">Video Link</label>
                {selected.videoLink ? (
                  <a href={selected.videoLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', wordBreak: 'break-all' }}>
                    {selected.videoLink}
                  </a>
                ) : <div>-</div>}
              </div>
              <div>
                <label className="form-label text-xs">Short Introduction</label>
                <p style={{ margin: 0, fontSize: 14 }}>{selected.shortIntroduction || '-'}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              {selected.status !== 'contacted' && (
                <button className="btn btn-outline" disabled={!!updating} onClick={() => updateStatus(selected._id, 'contacted')}>
                  {updating === selected._id+'contacted' ? '...' : 'Mark Contacted'}
                </button>
              )}
              {selected.status !== 'active' && (
                <button className="btn btn-green" disabled={!!updating} onClick={() => updateStatus(selected._id, 'active')}>
                  {updating === selected._id+'active' ? '...' : <><Check size={14}/> Set Active</>}
                </button>
              )}
              {selected.status !== 'inactive' && (
                <button className="btn btn-danger" disabled={!!updating} onClick={() => updateStatus(selected._id, 'inactive')}>
                  {updating === selected._id+'inactive' ? '...' : <><X size={14}/> Set Inactive</>}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
