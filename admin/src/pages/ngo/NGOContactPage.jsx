import { useState } from 'react';
import { Search, Eye, Check, X, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

const MOCK = [
  { _id:'1', name:'Rajesh Verma',  email:'rajesh@email.com',  phone:'+91 99887 11111', message:'I want to organise a blood donation camp in my society. How can DMS Aarohi help?', status:'new',      createdAt:'2026-07-16T08:00:00Z' },
  { _id:'2', name:'Sunita Kumari', email:'sunita2@email.com', phone:'+91 88776 22222', message:'My daughter needs blood urgently. Can you help connect with a donor?',               status:'replied',   createdAt:'2026-07-15T11:00:00Z' },
  { _id:'3', name:'Arun Mehta',    email:'arun@email.com',    phone:'+91 77665 33333', message:'We would like to partner with DMS Aarohi for our CSR activities.',                  status:'resolved',  createdAt:'2026-07-14T09:30:00Z' },
];

export default function NGOContactPage() {
  const [rows] = useState(MOCK);
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [selected, setSelected] = useState(null);
  const [statuses, setStatuses] = useState({});

  const getStatus = r => statuses[r._id] || r.status;
  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const ms = !q || r.name?.toLowerCase().includes(q) || r.message?.toLowerCase().includes(q);
    return ms && (statusF === 'all' || getStatus(r) === statusF);
  });

  const updateStatus = (id, status) => {
    setStatuses(s => ({ ...s, [id]: status }));
    if (selected?._id === id) setSelected(v => ({ ...v }));
    showToast('Status updated', 'success');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">NGO Contact Queries</h1>
        <p className="page-subtitle">Messages from the NGO website contact form</p>
        <div className="page-divider green" />
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input className="search-input" placeholder="Search name or message…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
          {['all','new','replied','resolved'].map(s => <option key={s} value={s}>{s==='all'?'All':s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState icon={MessageSquare} title="No queries" desc="No contact queries yet" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td><div className="td-name">{r.name}</div><div className="td-soft">{r.email}</div></td>
                    <td><div className="td-soft" style={{ maxWidth:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.message}</div></td>
                    <td><StatusBadge status={getStatus(r)} /></td>
                    <td><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" onClick={() => setSelected(r)}><Eye size={14}/></button>
                        <a href={`mailto:${r.email}`} className="icon-btn" style={{display:'flex',alignItems:'center',justifyContent:'center'}} title="Reply">✉️</a>
                        {getStatus(r) !== 'resolved' && <button className="icon-btn green" onClick={() => updateStatus(r._id,'resolved')}><Check size={14}/></button>}
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
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16 }}>{selected.name}</div>
                <button className="icon-btn" onClick={() => setSelected(null)}><X size={16}/></button>
              </div>
              <div className="detail-drawer-body">
                {[['Email',selected.email],['Phone',selected.phone],['Date',new Date(selected.createdAt).toLocaleString('en-IN')]].map(([l,v]) => v ? (
                  <div key={l} className="detail-field"><div className="detail-field-label">{l}</div><div className="detail-field-value">{v}</div></div>
                ):null)}
                <div className="detail-field">
                  <div className="detail-field-label">Message</div>
                  <div style={{ fontSize:14, color:'var(--text)', lineHeight:1.7, background:'#F8FAFC', border:'1px solid var(--border)', borderRadius:8, padding:'12px 14px' }}>{selected.message}</div>
                </div>
              </div>
              <div className="detail-drawer-foot">
                <a href={`mailto:${selected.email}`} className="btn btn-green btn-sm">✉️ Reply</a>
                <button className="btn btn-outline btn-sm" onClick={() => updateStatus(selected._id,'resolved')}><Check size={13}/>Resolved</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
