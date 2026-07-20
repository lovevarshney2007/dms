import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, Image, MessageSquare,
  Star, Settings, LogOut, ChevronRight, Handshake,
  Heart, BookOpen, Award, Menu, X, ExternalLink, Mic2
} from 'lucide-react';
import { clearToken } from '../lib/api';
import { TALENT_SITE, NGO_SITE } from '../config';
import ToastProvider from './Toast';

const NAV = [
  { group: 'Overview', items: [
    { id: 'dashboard',            path: '/dashboard',            label: 'Dashboard',         icon: LayoutDashboard, site: 'both'   },
  ]},
  { group: '🎤 Talent Hunt', items: [
    { id: 'registrations',        path: '/talent/registrations', label: 'Registrations',      icon: Users,          site: 'talent', badge: 'reg'   },
    { id: 'talent-events',        path: '/talent/events',        label: 'Shows & Events',     icon: Calendar,       site: 'talent' },
    { id: 'seasons',              path: '/talent/seasons',       label: 'Seasons & Finalists', icon: Mic2,          site: 'talent' },
    { id: 'success-stories',      path: '/talent/success-stories',label: 'Success Stories',   icon: Award,          site: 'talent' },
    { id: 'talent-gallery',       path: '/talent/gallery',       label: 'Gallery',            icon: Image,          site: 'talent' },
    { id: 'sponsors',             path: '/talent/sponsors',      label: 'Sponsors',           icon: Handshake,      site: 'talent' },
    { id: 'talent-contact',       path: '/talent/contact',       label: 'Contact Queries',    icon: MessageSquare,  site: 'talent', badge: 'tc'    },
  ]},
  { group: '🤝 NGO Initiative', items: [
    { id: 'volunteers',           path: '/ngo/volunteers',       label: 'Volunteers',         icon: Heart,          site: 'ngo',    badge: 'vol'   },
    { id: 'initiatives',          path: '/ngo/initiatives',      label: 'Initiatives Content', icon: BookOpen,      site: 'ngo'    },
    { id: 'ngo-events',           path: '/ngo/events',           label: 'Camps & Events',     icon: Calendar,       site: 'ngo'    },
    { id: 'ngo-gallery',          path: '/ngo/gallery',          label: 'NGO Gallery',        icon: Image,          site: 'ngo'    },
    { id: 'ngo-contact',          path: '/ngo/contact',          label: 'Contact Queries',    icon: MessageSquare,  site: 'ngo',    badge: 'nc'    },
  ]},
  { group: 'System', items: [
    { id: 'settings',             path: '/settings',             label: 'Website Settings',   icon: Settings,       site: 'both'   },
  ]},
];

const SITE_COLOR = { talent: 'gold', ngo: 'green', both: 'blue' };

export default function Layout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  const logout = () => { clearToken(); navigate('/login'); };

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="sidebar-logo">
        <img src="/logo.png" alt="DMS Aarohi" onError={e => e.target.style.display='none'} />
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-name">DMS Aarohi</div>
          <div className="sidebar-logo-sub">Admin Panel</div>
        </div>
        <span className="sidebar-badge">v2</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV.map(grp => (
          <div key={grp.group}>
            <div className="sidebar-group-label">{grp.group}</div>
            {grp.items.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const isNgo = item.site === 'ngo';
              return (
                <button
                  key={item.id}
                  className={`sidebar-item ${isNgo ? 'sidebar-item-green' : ''} ${active ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon size={15} className="sidebar-icon" />
                  <span>{item.label}</span>
                  {active && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Quick links */}
      <div style={{ padding: '0 12px 8px' }}>
        <div className="sidebar-group-label">Live Sites</div>
        <a href={TALENT_SITE} target="_blank" rel="noopener noreferrer"
          className="sidebar-item" style={{ textDecoration: 'none', display: 'flex' }}>
          <ExternalLink size={13} className="sidebar-icon" />
          <span>Talent Hunt ↗</span>
        </a>
        <a href={NGO_SITE} target="_blank" rel="noopener noreferrer"
          className="sidebar-item" style={{ textDecoration: 'none', display: 'flex' }}>
          <ExternalLink size={13} className="sidebar-icon" />
          <span>NGO Site ↗</span>
        </a>
      </div>

      {/* User footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={logout} title="Logout">
          <div className="sidebar-avatar">A</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Admin</div>
            <div className="sidebar-user-role">Super Admin</div>
          </div>
          <LogOut size={14} style={{ color: '#64748B', flexShrink: 0 }} />
        </div>
      </div>
    </>
  );

  // Determine current page info
  const allItems = NAV.flatMap(g => g.items);
  const current  = allItems.find(i => isActive(i.path)) || allItems[0];
  const siteTag  = current?.site || 'both';

  return (
    <div className="admin-shell">
      {/* Desktop Sidebar */}
      <aside className="sidebar" style={{ display: 'flex' }}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              className="sidebar open"
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ duration: 0.25 }}
              style={{ zIndex: 100 }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <button className="icon-btn" onClick={() => setMobileOpen(true)}
              style={{ display: 'none' }} aria-label="Open menu">
              <Menu size={16} />
            </button>
            <span className={`topbar-breadcrumb-site ${SITE_COLOR[siteTag]}`}>
              {siteTag === 'talent' ? '🎤 Talent Hunt' : siteTag === 'ngo' ? '🤝 NGO' : '⚙️ Admin'}
            </span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="topbar-title">{current?.label || 'Dashboard'}</span>
          </div>
          <div className="topbar-right">
            <a href={TALENT_SITE} target="_blank" rel="noopener noreferrer"
              className="topbar-action-btn outline" style={{ fontSize: 12 }}>
              <ExternalLink size={13} /> Talent Site
            </a>
            <a href={NGO_SITE} target="_blank" rel="noopener noreferrer"
              className="topbar-action-btn outline" style={{ fontSize: 12 }}>
              <ExternalLink size={13} /> NGO Site
            </a>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>

      {/* Toast notifications */}
      <ToastProvider />
    </div>
  );
}
