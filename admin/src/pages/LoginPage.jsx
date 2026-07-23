import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';
import { api, setToken } from '../lib/api';
import { showToast } from '../components/Toast';
import ToastProvider from '../components/Toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ username: '', password: '' });
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/admin/login', {
        email: form.username,
        password: form.password
      });
      setToken(res.token);
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      {/* Background glows matching website gold/green theme */}
      <div className="login-bg-glow" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, #B8860B, transparent)',
        top: -200, left: -200,
      }} />
      <div className="login-bg-glow" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, #1B6B3A, transparent)',
        bottom: -150, right: -100,
      }} />

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Top dark section */}
        <div className="login-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <img src="/logo.png" alt="DMS Aarohi" style={{ height: 38, opacity: 0.92 }}
              onError={e => e.target.style.display='none'} />
            <div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 17, color: '#F1F5F9' }}>
                DMS Aarohi
              </div>
              <div style={{ fontSize: 10, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#64748B' }}>
                Admin Panel
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(184,134,11,.15)', border: '1px solid rgba(184,134,11,.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#D4A017',
            }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: '#E2E8F0' }}>
                Secure Admin Access
              </div>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                Manages NGO + Talent Hunt websites
              </div>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="login-bottom">
          <p style={{ fontSize: 13, color: 'var(--text-soft)', marginBottom: 24, lineHeight: 1.6 }}>
            Sign in to manage content, registrations, volunteers and more across both DMS Aarohi websites.
          </p>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                name="username" value={form.username} onChange={handle}
                required autoFocus autoComplete="username"
                placeholder="Enter username"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password" type={show ? 'text' : 'password'}
                  value={form.password} onChange={handle}
                  required autoComplete="current-password"
                  placeholder="Enter password"
                  className="form-input"
                  style={{ paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShow(!show)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--text-muted)',
                    cursor: 'pointer', display: 'flex', padding: 2,
                  }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '12px', marginTop: 4 }}
            >
              {loading
                ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Signing in…</>
                : <><LogIn size={16} /> Sign In</>
              }
            </button>
          </form>

          {/* Footer note */}
          <div style={{
            marginTop: 24, padding: '12px 14px',
            background: '#F8FAFC', border: '1px solid var(--border)',
            borderRadius: 8, fontSize: 12, color: 'var(--text-soft)', lineHeight: 1.6,
          }}>
            🔒 Access restricted to authorised DMS Aarohi administrators only.
          </div>
        </div>
      </motion.div>

      <ToastProvider />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
