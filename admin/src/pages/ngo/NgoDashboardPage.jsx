import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Calendar, Image as ImageIcon, Droplet } from 'lucide-react';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const DEFAULT_NGO_STATS = { teamCount: 0, bloodDonorsCount: 0, eventsCount: 0, volunteersCount: 0, galleryByInitiative: {} };

function StatCard({ n, label, icon: Icon, color, onClick }) {
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
      </div>
    </motion.div>
  );
}

export default function NgoDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(DEFAULT_NGO_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/ngo/stats')
      .then(d => setStats(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">NGO Overview</h1>
        <p className="page-subtitle">At-a-glance metrics for DMS Aarohi Social Initiatives</p>
      </div>

      <div className="stat-grid">
        <StatCard n={stats.volunteersCount} label="Volunteers" icon={Users} color="green" onClick={() => navigate('/ngo/volunteers')} />
        <StatCard n={stats.bloodDonorsCount} label="Blood Donors" icon={Droplet} color="red" onClick={() => navigate('/ngo/blood-donors')} />
        <StatCard n={stats.eventsCount} label="NGO Events" icon={Calendar} color="blue" onClick={() => navigate('/ngo/events')} />
        <StatCard n={stats.teamCount} label="NGO Team Members" icon={Heart} color="gold" onClick={() => navigate('/ngo/team')} />
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <div className="card-title">Gallery by Initiative</div>
        </div>
        <div className="card-body">
          {Object.keys(stats.galleryByInitiative).length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {Object.entries(stats.galleryByInitiative).map(([initiative, count]) => (
                <div key={initiative} style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{initiative.replace('-', ' ')}</span>
                  <span style={{ background: 'var(--green-bg)', color: 'var(--green)', padding: '4px 8px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{count} items</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-soft)' }}>No gallery images uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
