import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Calendar, Mic2, TrendingUp, ExternalLink, ArrowRight, UserSquare2, Droplet } from 'lucide-react';
import { api } from '../lib/api';
import { TALENT_SITE, NGO_SITE } from '../config';
import { useNavigate } from 'react-router-dom';

const DEFAULT_STATS = {
  totalRegistrations: 0, newRegistrations: 0,
  talentQueries: 0, ngoVolunteers: 0, ngoQueries: 0,
  upcomingEvents: 0, totalSeasons: 0,
  recentActivity: []
};
const DEFAULT_NGO_STATS = { teamCount: 0, bloodDonorsCount: 0 };

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 2592000)} mo ago`;
}

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
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [ngoStats, setNgoStats] = useState(DEFAULT_NGO_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(d => setStats(s => ({ ...s, ...d })))
      .catch(() => {})
      .finally(() => setLoading(false));
    api.get('/admin/ngo/stats')
      .then(d => setNgoStats(d))
      .catch(() => {});
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
          <button onClick={() => navigate('/talent/registrations')}
            className="topbar-action-btn gold" style={{ padding: '10px 20px', fontSize: '14px', border: '1px solid var(--gold)' }}>
            Enter Talent Hunt Console <ArrowRight size={16} style={{ marginLeft: 6 }} />
          </button>
          <button onClick={() => navigate('/ngo/dashboard')}
            className="topbar-action-btn green" style={{ padding: '10px 20px', fontSize: '14px', border: '1px solid #4ADE80' }}>
            Enter NGO Console <ArrowRight size={16} style={{ marginLeft: 6 }} />
          </button>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="stat-grid">
        <StatCard n={stats.totalRegistrations} label="Total Registrations" icon={Users} color="gold" change={stats.newRegistrations} onClick={() => navigate('/talent/registrations')} />
        <StatCard n={stats.ngoVolunteers}      label="NGO Volunteers"      icon={Heart} color="green" onClick={() => navigate('/ngo/dashboard')} />
        <StatCard n={stats.talentQueries}      label="Talent Queries"      icon={MessageSquare} color="blue" onClick={() => navigate('/talent/contact')} />
        <StatCard n={stats.ngoQueries}         label="NGO Queries"         icon={MessageSquare} color="purple" onClick={() => navigate('/ngo/dashboard')} />
        <StatCard n={stats.upcomingEvents}     label="Talent Events"       icon={Calendar} color="blue" onClick={() => navigate('/talent/events')} />
        <StatCard n={`S${stats.totalSeasons}`} label="Current Season"      icon={Mic2} color="gold" onClick={() => navigate('/talent/seasons')} />
        <StatCard n={ngoStats.teamCount}       label="NGO Team Members"    icon={UserSquare2} color="green" onClick={() => navigate('/ngo/team')} />
        <StatCard n={ngoStats.bloodDonorsCount} label="Blood Donors"       icon={Droplet} color="purple" onClick={() => navigate('/ngo/donors')} />
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
            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map(a => (
                <div key={a.id} className="activity-item">
                  <div className={`activity-dot ${a.dot}`} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.5 }}>{a.msg}</div>
                    <div className="activity-time">{timeAgo(a.time)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No recent activity.
              </div>
            )}
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
              <button onClick={() => navigate('/ngo/dashboard')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '12px', borderRadius: 8, border: '1px solid #4ADE80',
                  background: 'var(--green-bg)', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  color: 'var(--green)', transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif', width: '100%'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4ADE80'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--green-bg)'; e.currentTarget.style.color = 'var(--green)'; }}
              >
                Launch Dedicated NGO Console <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
