import { useState } from 'react';
import { Search, Eye, Check, X, Heart, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { showToast } from '../../components/Toast';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

const ROLES = ['all','Blood Donor','Event Organiser','Child Mentor / Tutor','Elderly Care Visitor','Social Media Volunteer','Logistics Support'];
const STATUS_OPTIONS = ['all','new','contacted','active','inactive'];

const MOCK = [
  { _id:'1', name:'Priya Singh',    email:'priya@email.com',   phone:'+91 98765 11111', city:'Noida',    role:'Blood Donor',              availability:'Weekends', message:'I want to donate blood regularly.', status:'active',    createdAt:'2026-07-10T09:00:00Z' },
  { _id:'2', name:'Amit Kumar',     email:'amit@email.com',    phone:'+91 87654 22222', city:'Gurgaon',  role:'Child Mentor / Tutor',      availability:'Weekdays evenings', message:'I can teach Math and Science.', status:'new',       createdAt:'2026-07-15T10:30:00Z' },
  { _id:'3', name:'Sunita Devi',    email:'sunita@email.com',  phone:'+91 76543 33333', city:'Delhi',    role:'Elderly Care Visitor',      availability:'Saturdays', message:'I want to visit old age homes.', status:'contacted',  createdAt:'2026-07-12T14:00:00Z' },
  { _id:'4', name:'Ravi Sharma',    email:'ravi@email.com',    phone:'+91 65432 44444', city:'Delhi',    role:'Event Organiser',           availability:'Flexible', message:'I have experience organising events.', status:'active', createdAt:'2026-07-08T11:00:00Z' },
  { _id:'5', name:'Neha Gupta',     email:'neha@email.com',    phone:'+91 54321 55555', city:'Faridabad',role:'Social Media Volunteer',     availability:'Daily', message:'I can manage Instagram and Facebook.', status:'new',    createdAt:'2026-07-16T08:00:00Z' },
  { _id:'6', name:'Mahesh Verma',   email:'mahesh@email.com',  phone:'+91 43210 66666', city:'Noida',    role:'Logistics Support',         availability:'Weekends', message:'Can help with collection and distribution.', status:'inactive', createdAt:'2026-07-01T09:00:00Z' },
];

const ROLE_ICONS = { 'Blood Donor':'🩸','Event Organiser':'📋','Child Mentor / Tutor':'📚','Elderly Care Visitor':'🤝','Social Media Volunteer':'📱','Logistics Support':'📦' };

export default function VolunteersPage() {
  const [rows] = useState(MOCK);
  const [search, setSearch] = useState('');
  const [roleF, setRoleF]   = useState('all');
  const [statusF, setStatusF] = useState('all');
  const [selected, setSelected] = useState(null);
  const [statuses, setStatuses] = useState({});

  const filtered = rows.filter(r => {
    const q = search.toLowerCase();
    const ms = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.city?.toLowerCase().includes(q);
    const mr = roleF === 'all' || r.role === roleF;
    const mst = statusF === 'all' || r.status === statusF;
    return ms && mr && mst;
  });

  const updateStatus = (id, status) => {
    setStatuses(s => ({ ...s, [id]: status }));
    if (selected?._id === id) setSelected(v => ({ ...v, status }));
    showToast(`Status updated to ${status}`, 'success');
  };

  const getStatus = (r) => statuses[r._id] || r.status;

  const exportCSV = () => {
    const head = 'Name,Email,Phone,City,Role,Availability,Status,Date';
    const body = filtered.map(r =>
      `"${r.name}","${r.email}","${r.phone}","${r.city}","${r.role}","${r.availability}","${getStatus(r)}","${new Date(r.createdAt).toLocaleDateString()}"`
    ).join('\n');
    const blob = new Blob([head+'\n'+body], { type:'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'volunteers.csv'; a.click();
    showToast('CSV downloaded', 'success');
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Volunteers</h1>
            <p className="page-subtitle">NGO volunteer registrations</p>
            <div className="page-divider green" />
          </div>
          <button className="btn btn-green btn-sm" onClick={exportCSV}><Download size={13}/>Export CSV</button>
        </div>
      </div>

      {/* Role summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10, marginBottom:22 }}>
        {ROLES.slice(1).map(r => {
          const count = rows.filter(x => x.role === r).length;
          return (
            <button key={r} onClick={() => setRoleF(r === roleF ? 'all' : r)}
              style={{
                padding:'12px 10px', borderRadius:10, border: roleF===r ? '2px solid var(--green)' : '1px solid var(--border)',
                background: roleF===r ? 'var(--green-bg)' : 'var(--card-bg)',
                cursor:'pointer', textAlign:'center', transition:'all .18s',
              }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{ROLE_ICONS[r]||'👤'}</div>
              <div style={{ fontSize:11, fontWeight:700, color: roleF===r ? 'var(--green)' : 'var(--text)', lineHeight:1.3 }}>{r}</div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{count}</div>
            </button>
          );
        })}
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input className="search-input" placeholder="Search name, city, email…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s==='all'?'All Status':s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        <span style={{ marginLeft:'auto', fontSize:13, color:'var(--text-soft)' }}>{filtered.length} volunteer{filtered.length!==1?'s':''}</span>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState icon={Heart} title="No volunteers found" desc="Try adjusting your filters" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Role</th><th>Contact</th><th>City</th><th>Availability</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r._id}>
                    <td><div className="td-name">{r.name}</div><div className="td-soft">{new Date(r.createdAt).toLocaleDateString('en-IN')}</div></td>
                    <td>
                      <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600 }}>
                        {ROLE_ICONS[r.role]||'👤'} {r.role}
                      </span>
                    </td>
                    <td><div style={{fontSize:13}}>{r.email}</div><div className="td-soft">{r.phone}</div></td>
                    <td><div className="td-soft">{r.city}</div></td>
                    <td><div className="td-soft">{r.availability}</div></td>
                    <td><StatusBadge status={getStatus(r)} /></td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn" title="View" onClick={() => setSelected(r)}><Eye size={14}/></button>
                        <a href={`mailto:${r.email}`} className="icon-btn" title="Email" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>✉️</a>
                        {getStatus(r) !== 'active' && <button className="icon-btn green" title="Mark active" onClick={() => updateStatus(r._id,'active')}><Check size={14}/></button>}
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
                  <div style={{ fontSize:22, marginBottom:4 }}>{ROLE_ICONS[selected.role]||'👤'}</div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16 }}>{selected.name}</div>
                  <StatusBadge status={getStatus(selected)} />
                </div>
                <button className="icon-btn" onClick={() => setSelected(null)}><X size={16}/></button>
              </div>
              <div className="detail-drawer-body">
                {[['Role', selected.role],['Email', selected.email],['Phone', selected.phone],['City', selected.city],['Availability', selected.availability],['Registered', new Date(selected.createdAt).toLocaleString('en-IN')]].map(([l,v]) => v ? (
                  <div key={l} className="detail-field">
                    <div className="detail-field-label">{l}</div>
                    <div className="detail-field-value">{v}</div>
                  </div>
                ) : null)}
                {selected.message && (
                  <div className="detail-field">
                    <div className="detail-field-label">Message</div>
                    <div style={{ fontSize:14, color:'var(--text)', lineHeight:1.7, background:'#F8FAFC', border:'1px solid var(--border)', borderRadius:8, padding:'12px 14px' }}>{selected.message}</div>
                  </div>
                )}
              </div>
              <div className="detail-drawer-foot">
                <a href={`mailto:${selected.email}`} className="btn btn-green btn-sm">✉️ Email Volunteer</a>
                <button className="btn btn-outline btn-sm" onClick={() => updateStatus(selected._id,'active')}><Check size={13}/>Mark Active</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
