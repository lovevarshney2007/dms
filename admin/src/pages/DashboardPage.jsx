import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Calendar, Mic2, TrendingUp, ExternalLink, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { TALENT_SITE, NGO_SITE } from '../config';
import { useNavigate } from 'react-router-dom';

const MOCK_STATS = {
  totalRegistrations: 247, newRegistrations: 18,
  talentQueries: 14, ngoVolunteers: 63, ngoQueries: 9,
  upcomingEvents: 2, totalSeasons: 4,
};

const MOCK_ACTIVITY = [
  { id: 1, type: 'talent', msg: 'New registration — Rahul Sharma (Classical, Delhi)', time: '5 min ago', dot: 'gold' },
  { id: 2, type: 'ngo',    msg: 'New volunteer — Priya Singh (Blood Donor, Noida)', time: '18 min ago', dot: 'green' },
  { id: 3, type: 'talent', msg: 'Contact query — "When is Season 5 starting?"', time: '42 min ago', dot: 'gold' },
  { id: 4, type: 'ngo',    msg: 'New volunteer — Amit Kumar (Child Mentor, Gurgaon)', time: '1 hr ago', dot: 'green' },
  { id: 5, type: 'talent', msg: 'Registration approved — Deepshikha (Senior Category)', time: '2 hr ago', dot: 'gold' },
  { id: 6, type: 'ngo',    msg: 'Contact query — "How to organise a blood camp?"', time: '3 hr ago', dot: 'green' },
];

function StatCard({ n, label, icon: Icon, color, change, onClick }) {
  return (
    <motion.div
      className={`stat-card ${color}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className={`stat-icon ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="stat-n">{n}</div>
        <div className="stat-label">{label}</div>
        {change && <div className="stat-change up">↑ {change} this week</div>}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(MOCK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(d => setStats(s => ({ ...s, ...d })))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: 16, padding: '28px 32px', marginBottom: 26,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
          border: '1px solid rgba(184,134,11,.2)',
          boxShadow: '0 4px 24px rgba(0,0,0,.2)',
        }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold-lt)', marginBottom: 6 }}>
            Welcome Back
          </div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.6rem', color: '#F1F5F9', marginBottom: 6 }}>
            DMS Aarohi Admin
          </h1>
          <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.6 }}>
            Managing <span style={{ color: 'var(--gold-lt)', fontWeight: 600 }}>Talent Hunt</span> &nbsp;&amp;&nbsp;
            <span style={{ color: '#4ADE80', fontWeight: 600 }}>NGO Initiative</span> from one place.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href={TALENT_SITE} target="_blank" rel="noopener noreferrer"
            className="topbar-action-btn gold">
            <ExternalLink size={13} /> Talent Site
          </a>
          <a href={NGO_SITE} target="_blank" rel="noopener noreferrer"
            className="topbar-action-btn green">
            <ExternalLink size={13} /> NGO Site
          </a>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="stat-grid">
        <StatCard n={stats.totalRegistrations} label="Total Registrations" icon={Users} color="gold" change={stats.newRegistrations} onClick={() => navigate('/talent/registrations')} />
        <StatCard n={stats.ngoVolunteers}      label="NGO Volunteers"      icon={Heart} color="green" onClick={() => navigate('/ngo/volunteers')} />
        <StatCard n={stats.talentQueries}      label="Talent Queries"      icon={MessageSquare} color="blue" onClick={() => navigate('/talent/contact')} />
        <StatCard n={stats.ngoQueries}         label="NGO Queries"         icon={MessageSquare} color="purple" onClick={() => navigate('/ngo/contact')} />
        <StatCard n={stats.upcomingEvents}     label="Upcoming Events"     icon={Calendar} color="blue" onClick={() => navigate('/talent/events')} />
        <StatCard n={`S${stats.totalSeasons}`} label="Current Season"      icon={Mic2} color="gold" onClick={() => navigate('/talent/seasons')} />
      </div>

      {/* Two column: Activity + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>

        {/* Activity Feed */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
            <TrendingUp size={16} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className="card-body" style={{ padding: '8px 22px' }}>
            {MOCK_ACTIVITY.map(a => (
              <div key={a.id} className="activity-item">
                <div className={`activity-dot ${a.dot}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.5 }}>{a.msg}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Talent Section */}
          <div className="card">
            <div className="card-header" style={{ background: 'var(--gold-bg)', borderRadius: '14px 14px 0 0' }}>
              <span className="card-title" style={{ color: 'var(--gold)' }}>🎤 Talent Hunt</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'View Registrations', path: '/talent/registrations' },
                { label: 'Manage Events', path: '/talent/events' },
                { label: 'Contact Queries', path: '/talent/contact' },
                { label: 'Gallery', path: '/talent/gallery' },
              ].map(q => (
                <button key={q.path} onClick={() => navigate(q.path)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)',
                    background: 'transparent', cursor: 'pointer', fontSize: 13,
                    color: 'var(--text)', transition: 'all 0.18s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'var(--gold-bg)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  {q.label} <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>

          {/* NGO Section */}
          <div className="card">
            <div className="card-header" style={{ background: 'var(--green-bg)', borderRadius: '14px 14px 0 0' }}>
              <span className="card-title" style={{ color: 'var(--green)' }}>🤝 NGO</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'Volunteers', path: '/ngo/volunteers' },
                { label: 'Camps & Events', path: '/ngo/events' },
                { label: 'Initiatives Content', path: '/ngo/initiatives' },
                { label: 'Contact Queries', path: '/ngo/contact' },
              ].map(q => (
                <button key={q.path} onClick={() => navigate(q.path)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)',
                    background: 'transparent', cursor: 'pointer', fontSize: 13,
                    color: 'var(--text)', transition: 'all 0.18s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.background = 'var(--green-bg)'; e.currentTarget.style.color = 'var(--green)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  {q.label} <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
