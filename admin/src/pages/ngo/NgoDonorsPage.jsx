import { useEffect, useState, useCallback } from 'react';
import { Search, Trash2, RefreshCw, Eye, Droplet, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';

const STATUS_OPTIONS = ['all', 'new', 'contacted', 'verified'];

export default function NgoDonorsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    // API supports ?status=... & search=... natively, but we can do it client-side for fast UX too.
    api.get('/admin/ngo/blood-donors')
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load donors', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.phone?.includes(q) || r.city?.toLowerCase().includes(q) || r.bloodGroup?.toLowerCase().includes(q);
    const matchStatus = statusF === 'all' || r.status === statusF;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      await api.put(`/admin/ngo/blood-donors/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      showToast(`Status updated to ${status}`, 'success');
    } catch { 
      showToast('Update failed', 'error'); 
    } finally { 
      setUpdating(''); 
    }
  };

  const deleteDonor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donor record?')) return;
    setUpdating(id + 'del');
    try {
      await api.delete(`/admin/ngo/blood-donors/${id}`);
      setRows(r => r.filter(x => x._id !== id));
      if (selected?._id === id) setSelected(null);
      showToast('Donor deleted', 'success');
    } catch { 
      showToast('Deletion failed', 'error'); 
    } finally { 
      setUpdating(''); 
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Blood Donors</h1>
            <p className="page-subtitle">Manage blood donation pledges and requests</p>
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
            placeholder="Search name, phone, city, blood group..." 
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
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-soft)' }}>Loading donors...</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Droplet} title="No donors found" subtitle="Try adjusting your filters or search." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name & Contact</th>
                  <th>Blood Group & City</th>
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
                      <div style={{ fontWeight: 600, color: 'var(--red)' }}>{r.bloodGroup || '-'}</div>
                      <div className="td-soft">{r.city || '-'}</div>
                    </td>
                    <td><StatusBadge status={r.status} /></td>
                    <td className="td-soft">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td align="right" style={{ whiteSpace: 'nowrap' }}>
                      <button className="icon-btn" onClick={() => setSelected(r)} title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="icon-btn danger" style={{ marginLeft: 6 }} onClick={() => deleteDonor(r._id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Blood Donor Details">
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div><label className="form-label text-xs">Name</label><div className="font-semibold">{selected.name}</div></div>
              <div><label className="form-label text-xs">Blood Group</label><div className="font-semibold text-red-500" style={{ color: 'var(--red)' }}>{selected.bloodGroup || '-'}</div></div>
              <div><label className="form-label text-xs">Email</label><div>{selected.email}</div></div>
              <div><label className="form-label text-xs">Phone</label><div>{selected.phone}</div></div>
              <div><label className="form-label text-xs">Age / Weight</label><div>{selected.age || '-'} / {selected.weight ? selected.weight + ' kg' : '-'}</div></div>
              <div><label className="form-label text-xs">City</label><div>{selected.city || '-'}</div></div>
              <div><label className="form-label text-xs">Last Donation</label><div>{selected.lastDonationDate || '-'}</div></div>
              <div><label className="form-label text-xs">Preferred Camp</label><div>{selected.preferredCamp || '-'}</div></div>
              <div><label className="form-label text-xs">Status</label><div style={{ marginTop: 4 }}><StatusBadge status={selected.status} /></div></div>
            </div>

            {selected.notes && (
              <div style={{ background: 'var(--bg-subtle)', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                <label className="form-label text-xs">Notes</label>
                <p style={{ margin: 0, fontSize: 14 }}>{selected.notes}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              {selected.status !== 'new' && (
                <button className="btn btn-outline" disabled={!!updating} onClick={() => updateStatus(selected._id, 'new')}>
                  {updating === selected._id+'new' ? '...' : 'Mark New'}
                </button>
              )}
              {selected.status !== 'contacted' && (
                <button className="btn btn-gold" disabled={!!updating} onClick={() => updateStatus(selected._id, 'contacted')}>
                  {updating === selected._id+'contacted' ? '...' : 'Mark Contacted'}
                </button>
              )}
              {selected.status !== 'verified' && (
                <button className="btn btn-green" disabled={!!updating} onClick={() => updateStatus(selected._id, 'verified')}>
                  {updating === selected._id+'verified' ? '...' : <><Check size={14}/> Set Verified</>}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
