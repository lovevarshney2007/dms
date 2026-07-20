import { useEffect, useState, useCallback } from 'react';
import { Search, Eye, Check, X, MessageSquare, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

const MOCK = [
  { _id:'1', name:'Suman Gupta', email:'suman@email.com', phone:'+91 99887 76655', subject:'Registration query', message:'I want to know the last date for Season 4 registration. Can I still apply for the Classical category?', status:'new', createdAt:'2026-07-16T10:00:00Z' },
  { _id:'2', name:'Ramesh Kumar', email:'ramesh@email.com', phone:'+91 88776 65544', subject:'Show ticket enquiry', message:'How can I get tickets for the Grand Finale? Is it free entry?', status:'replied', createdAt:'2026-07-15T09:00:00Z' },
  { _id:'3', name:'Anjali Sharma', email:'anjali@email.com', phone:'+91 77665 54433', subject:'Collaboration', message:'I run a music school in Rohini and would like to partner with DMS Aarohi for Season 5.', status:'resolved', createdAt:'2026-07-14T11:30:00Z' },
];

const STATUS_OPTIONS = ['all','new','replied','resolved'];

export default function TalentContactPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/contact-queries')
      .then(d => setRows(d.queries || d || MOCK))
      .catch(() => setRows(MOCK))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const ms = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.message?.toLowerCase().includes(q);
    const mst = statusF === 'all' || r.status === statusF;
    return ms && mst;
  });

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/contact-queries/${id}/status`, { status });
      setRows(r => r.map(x => x._id === id ? { ...x, status } : x));
      if (selected?._id === id) setSelected(s => ({ ...s, status }));
      showToast('Status updated', 'success');
    } catch { showToast('Update failed', 'error'); }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Contact Queries</h1>
            <p className="page-subtitle">Messages from the Talent Hunt website</p>
            <div className="page-divider" />
          </div>
          <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13}/>Refresh</button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input className="search-input" placeholder="Search name, email, message…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        <span style={{ marginLeft:'auto', fontSize:13, color:'var(--text-soft)' }}>{filtered.length} result{filtered.length!==1?'s':''}</span>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding:48, textAlign:'center', color:'var(--text-muted)' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={MessageSquare} title="No queries found" desc="Adjust filters or check back later" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Subject</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td>
                      <div className="td-name">{r.name}</div>
                      <div className="td-soft">{r.email}</div>
                      {r.phone && <div className="td-soft">{r.phone}</div>}
                    </td>
                    <td><div style={{ fontSize:13 }}>{r.subject || '—'}</div></td>
                    <td><div className="td-soft" style={{ maxWidth:220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.message}</div></td>
                    <td><StatusBadge status={r.status || 'new'} /></td>
                    <td><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" title="View" onClick={() => setSelected(r)}><Eye size={14}/></button>
                        <a href={`mailto:${r.email}?subject=Re: ${r.subject || 'Your enquiry'}`} className="icon-btn" title="Reply via email" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                          ✉️
                        </a>
                        {r.status !== 'resolved' && <button className="icon-btn green" title="Mark resolved" onClick={() => updateStatus(r._id,'resolved')}><Check size={14}/></button>}
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
            <motion.div className="detail-drawer-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)} />
            <motion.div className="detail-drawer" initial={{x:440}} animate={{x:0}} exit={{x:440}} transition={{duration:0.28}}>
              <div className="detail-drawer-head">
                <div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16 }}>{selected.name}</div>
                  <StatusBadge status={selected.status || 'new'} />
                </div>
                <button className="icon-btn" onClick={() => setSelected(null)}><X size={16}/></button>
              </div>
              <div className="detail-drawer-body">
                {[['Email', selected.email],['Phone', selected.phone],['Subject', selected.subject],['Received', new Date(selected.createdAt).toLocaleString('en-IN')]].map(([l,v]) => v ? (
                  <div key={l} className="detail-field">
                    <div className="detail-field-label">{l}</div>
                    <div className="detail-field-value">{v}</div>
                  </div>
                ) : null)}
                <div className="detail-field">
                  <div className="detail-field-label">Message</div>
                  <div style={{ fontSize:14, color:'var(--text)', lineHeight:1.7, background:'#F8FAFC', border:'1px solid var(--border)', borderRadius:8, padding:'12px 14px' }}>{selected.message}</div>
                </div>
              </div>
              <div className="detail-drawer-foot">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject||'Your Enquiry'}`} className="btn btn-gold btn-sm">✉️ Reply via Email</a>
                <button className="btn btn-outline btn-sm" onClick={() => updateStatus(selected._id,'resolved')}><Check size={13}/>Mark Resolved</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
