import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Eye, Check, X, ChevronDown, Users, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';

const STATUS_OPTIONS = ['all','pending','shortlisted','approved','rejected'];
const CATEGORY_OPTIONS = ['all','Classical','Bollywood','Folk','Ghazal','Sufi','Open Category'];

const MOCK = [
  { _id:'1', name:'Rahul Sharma',    email:'rahul@email.com',  phone:'+91 98765 43210', city:'Delhi',   talentCategory:'Classical',      age:'24', gender:'Male',   status:'pending',     createdAt:'2026-07-15T10:30:00Z', videoLink:'https://youtube.com/watch?v=abc', shortIntroduction:'Classical singer from Delhi NCR' },
  { _id:'2', name:'Priya Verma',     email:'priya@email.com',  phone:'+91 87654 32109', city:'Noida',   talentCategory:'Bollywood',      age:'19', gender:'Female', status:'shortlisted',  createdAt:'2026-07-14T09:15:00Z', videoLink:'', shortIntroduction:'Passionate Bollywood singer' },
  { _id:'3', name:'Amit Singh',      email:'amit@email.com',   phone:'+91 76543 21098', city:'Gurgaon', talentCategory:'Folk',           age:'31', gender:'Male',   status:'approved',     createdAt:'2026-07-13T14:22:00Z', videoLink:'https://youtube.com/watch?v=xyz', shortIntroduction:'Folk singer from Rajasthan' },
  { _id:'4', name:'Deepshikha Nair', email:'deep@email.com',   phone:'+91 65432 10987', city:'Delhi',   talentCategory:'Classical',      age:'27', gender:'Female', status:'approved',     createdAt:'2026-07-12T11:45:00Z', videoLink:'', shortIntroduction:'Hindustani classical vocalist' },
  { _id:'5', name:'Mandeep Kaur',    email:'mandeep@email.com',phone:'+91 54321 09876', city:'Faridabad',talentCategory:'Ghazal',        age:'35', gender:'Female', status:'rejected',     createdAt:'2026-07-11T16:00:00Z', videoLink:'', shortIntroduction:'Ghazal singer' },
  { _id:'6', name:'Vineet Kumar',    email:'vineet@email.com', phone:'+91 43210 98765', city:'Delhi',   talentCategory:'Bollywood',      age:'22', gender:'Male',   status:'pending',      createdAt:'2026-07-16T08:00:00Z', videoLink:'https://youtube.com/watch?v=def', shortIntroduction:'Aspiring Bollywood singer' },
];

export default function RegistrationsPage() {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [statusF, setStatusF] = useState('all');
  const [catF, setCatF]       = useState('all');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/registrations?formType=talent-show')
      .then(d => setRows(d.items || d.registrations || (Array.isArray(d) ? d : MOCK)))
      .catch(() => setRows(MOCK))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.city?.toLowerCase().includes(q) || r.phone?.includes(q);
    const matchStatus = statusF === 'all' || r.status === statusF;
    const matchCat    = catF === 'all' || r.talentCategory === catF;
    return matchSearch && matchStatus && matchCat;
  });

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    try {
      await api.put(`/admin/registrations/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      showToast(`Status updated to ${status}`, 'success');
    } catch { showToast('Update failed', 'error'); }
    finally { setUpdating(''); }
  };

  const exportCSV = () => {
    const head = 'Name,Email,Phone,City,Category,Age,Gender,Status,Date';
    const body = filtered.map(r =>
      `"${r.name}","${r.email}","${r.phone}","${r.city}","${r.talentCategory}","${r.age}","${r.gender}","${r.status}","${new Date(r.createdAt).toLocaleDateString()}"`
    ).join('\n');
    const blob = new Blob([head + '\n' + body], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'registrations.csv'; a.click();
    showToast('CSV downloaded', 'success');
  };

  const counts = STATUS_OPTIONS.slice(1).reduce((acc, s) => ({ ...acc, [s]: rows.filter(r => r.status === s).length }), {});

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Registrations</h1>
            <p className="page-subtitle">Season 4 audition applicants</p>
            <div className="page-divider" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-gold btn-sm" onClick={exportCSV}><Download size={13} />Export CSV</button>
          </div>
        </div>
      </div>

      {/* Status summary pills */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:20 }}>
        {STATUS_OPTIONS.slice(1).map(s => (
          <button key={s} onClick={() => setStatusF(s === statusF ? 'all' : s)}
            className={`badge ${s}`}
            style={{ cursor:'pointer', border: statusF===s ? '2px solid currentColor' : '2px solid transparent', fontSize:12 }}>
            {s.charAt(0).toUpperCase()+s.slice(1)} ({counts[s] || 0})
          </button>
        ))}
        <button onClick={() => setStatusF('all')}
          style={{ fontSize:12, background:'none', border:'none', color:'var(--text-soft)', cursor:'pointer', fontWeight:600 }}>
          All ({rows.length})
        </button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input className="search-input" placeholder="Search name, email, city…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        <select className="filter-select" value={catF} onChange={e => setCatF(e.target.value)}>
          {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
        </select>
        <span style={{ marginLeft:'auto', fontSize:13, color:'var(--text-soft)' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <div style={{ padding:48, textAlign:'center', color:'var(--text-muted)' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Users} title="No registrations found" desc="Try adjusting your filters" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th><th>Contact</th><th>City</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td>
                      <div className="td-name">{r.name}</div>
                      <div className="td-soft">{r.stageName && `"${r.stageName}"`} {r.age && `· ${r.age} yrs`} {r.gender && `· ${r.gender}`}</div>
                    </td>
                    <td>
                      <div style={{ fontSize:13 }}>{r.email}</div>
                      <div className="td-soft">{r.phone}</div>
                    </td>
                    <td><div className="td-soft">{r.city}</div></td>
                    <td>
                      <span style={{ fontSize:12, fontWeight:600, background:'var(--gold-bg)', color:'var(--gold)', padding:'3px 9px', borderRadius:20, border:'1px solid var(--gold-border)' }}>
                        {r.talentCategory}
                      </span>
                    </td>
                    <td><StatusBadge status={r.status} /></td>
                    <td><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" title="View details" onClick={() => setSelected(r)}><Eye size={14} /></button>
                        {r.status !== 'approved' && (
                          <button className="icon-btn green" title="Approve" disabled={!!updating}
                            onClick={() => updateStatus(r._id, 'approved')}>
                            <Check size={14} />
                          </button>
                        )}
                        {r.status !== 'rejected' && (
                          <button className="icon-btn danger" title="Reject" disabled={!!updating}
                            onClick={() => updateStatus(r._id, 'rejected')}>
                            <X size={14} />
                          </button>
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

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div className="detail-drawer-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setSelected(null)} />
            <motion.div className="detail-drawer"
              initial={{ x:440 }} animate={{ x:0 }} exit={{ x:440 }}
              transition={{ duration:0.28, ease:'easeOut' }}>
              <div className="detail-drawer-head">
                <div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16 }}>{selected.name}</div>
                  <StatusBadge status={selected.status} />
                </div>
                <button className="icon-btn" onClick={() => setSelected(null)}><X size={16} /></button>
              </div>
              <div className="detail-drawer-body">
                {[['Email', selected.email],['Phone', selected.phone],['City', selected.city],
                  ['Age', selected.age],['Gender', selected.gender],['Stage Name', selected.stageName],
                  ['Category', selected.talentCategory],['Language', selected.languagePreference],
                  ['Registered', new Date(selected.createdAt).toLocaleString('en-IN')]
                ].map(([l,v]) => v ? (
                  <div key={l} className="detail-field">
                    <div className="detail-field-label">{l}</div>
                    <div className="detail-field-value">{v}</div>
                  </div>
                ) : null)}
                {selected.videoLink && (
                  <div className="detail-field">
                    <div className="detail-field-label">Video Link</div>
                    <a href={selected.videoLink} target="_blank" rel="noopener noreferrer" className="detail-field-link">{selected.videoLink}</a>
                  </div>
                )}
                {selected.shortIntroduction && (
                  <div className="detail-field">
                    <div className="detail-field-label">Introduction</div>
                    <div className="detail-field-value">{selected.shortIntroduction}</div>
                  </div>
                )}
              </div>
              <div className="detail-drawer-foot">
                <button className="btn btn-outline btn-sm" onClick={() => updateStatus(selected._id,'shortlisted')} disabled={!!updating}>Shortlist</button>
                <button className="btn btn-gold btn-sm" onClick={() => updateStatus(selected._id,'approved')} disabled={!!updating}><Check size={13}/>Approve</button>
                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(selected._id,'rejected')} disabled={!!updating}><X size={13}/>Reject</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
