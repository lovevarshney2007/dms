import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postJson, setAdminToken } from "../../lib/api";

// Check if token is still valid (not expired)
function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function AdminLoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  // If already logged in with valid token → skip to admin dashboard
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (isTokenValid(token)) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await postJson("/api/admin/login", { email, password });
      setAdminToken(result.token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes loginOrbitA {
          0%   { transform: rotate(0deg)   translateX(160px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        @keyframes loginOrbitB {
          0%   { transform: rotate(120deg)   translateX(220px) rotate(-120deg); }
          100% { transform: rotate(480deg)   translateX(220px) rotate(-480deg); }
        }
        @keyframes loginOrbitC {
          0%   { transform: rotate(240deg)   translateX(130px) rotate(-240deg); }
          100% { transform: rotate(600deg)   translateX(130px) rotate(-600deg); }
        }
        @keyframes loginPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes loginGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.3); }
          50%       { box-shadow: 0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(234,88,12,0.3); }
        }
        @keyframes loginShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          min-height: 100vh;
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Outfit', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background glows */
        .lp-root::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
          animation: loginPulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .lp-root::after {
          content: '';
          position: absolute;
          bottom: -150px; left: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          animation: loginPulse 8s ease-in-out infinite 2s;
          pointer-events: none;
        }

        /* Orbit particles */
        .lp-orbit-wrap {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }
        .lp-orb {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
        }
        .lp-orb-a {
          width: 10px; height: 10px;
          background: #f59e0b;
          box-shadow: 0 0 12px #f59e0b;
          animation: loginOrbitA 12s linear infinite;
          margin: -5px;
        }
        .lp-orb-b {
          width: 6px; height: 6px;
          background: #6366f1;
          box-shadow: 0 0 10px #6366f1;
          animation: loginOrbitB 18s linear infinite;
          margin: -3px;
        }
        .lp-orb-c {
          width: 8px; height: 8px;
          background: #ec4899;
          box-shadow: 0 0 10px #ec4899;
          animation: loginOrbitC 14s linear infinite;
          margin: -4px;
        }

        /* Card */
        .lp-card {
          width: 100%;
          max-width: 440px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 48px 44px;
          box-shadow: 0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          position: relative;
          z-index: 1;
          animation: loginFadeIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-glow: loginGlow 3s ease-in-out infinite;
        }
        .lp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent);
          border-radius: 28px 28px 0 0;
        }

        /* Brand area */
        .lp-brand { text-align: center; margin-bottom: 40px; }
        .lp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 20px;
          color: #fbbf24;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .lp-badge::before { content: '●'; font-size: 8px; animation: loginPulse 2s infinite; }
        .lp-logo {
          font-size: 38px;
          font-weight: 900;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ec4899 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: loginShimmer 4s linear infinite;
          line-height: 1;
          margin-bottom: 8px;
        }
        .lp-sub {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Form */
        .lp-form { display: flex; flex-direction: column; gap: 20px; }

        .lp-field { display: flex; flex-direction: column; gap: 8px; }
        .lp-field-label {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .lp-input-wrap { position: relative; }
        .lp-input {
          width: 100%;
          padding: 14px 18px;
          padding-right: 48px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.3);
          color: #f1f5f9;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .lp-input:focus {
          border-color: rgba(245,158,11,0.5);
          background: rgba(0,0,0,0.5);
          box-shadow: 0 0 0 4px rgba(245,158,11,0.08), 0 0 20px rgba(245,158,11,0.1);
        }
        .lp-input::placeholder { color: #334155; }
        .lp-eye-btn {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #475569; cursor: pointer;
          font-size: 18px; line-height: 1;
          transition: color 0.2s;
          padding: 4px;
        }
        .lp-eye-btn:hover { color: #fbbf24; }

        /* Error */
        .lp-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          font-size: 13px;
          font-weight: 500;
          animation: loginFadeIn 0.4s ease-out;
        }
        .lp-error::before { content: '⚠'; font-size: 15px; }

        /* Submit btn */
        .lp-submit {
          padding: 16px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%);
          background-size: 200% auto;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.03em;
          box-shadow: 0 8px 24px rgba(234,88,12,0.4);
          position: relative;
          overflow: hidden;
          margin-top: 4px;
        }
        .lp-submit::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s;
          transform: skewX(-20deg);
        }
        .lp-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(234,88,12,0.6); background-position: right center; }
        .lp-submit:hover::before { left: 150%; }
        .lp-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .lp-submit:active { transform: translateY(0); }

        /* Spinner */
        .lp-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: loginOrbitA 0.8s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        /* Footer note */
        .lp-footer-note {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: #334155;
        }
        .lp-footer-note span { color: #475569; font-weight: 600; }
      `}</style>

      <div className="lp-root">
        {/* Orbit particles */}
        <div className="lp-orbit-wrap">
          <div className="lp-orb lp-orb-a" />
          <div className="lp-orb lp-orb-b" />
          <div className="lp-orb lp-orb-c" />
        </div>

        <div className="lp-card">
          <div className="lp-brand">
            <div className="lp-badge">Admin Portal</div>
            <div className="lp-logo">DMS Aarohi</div>
            <p className="lp-sub">Sign in to manage your website</p>
          </div>

          <form className="lp-form" onSubmit={handleSubmit}>
            <div className="lp-field">
              <label className="lp-field-label">Email Address</label>
              <div className="lp-input-wrap">
                <input
                  className="lp-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="lp-field">
              <label className="lp-field-label">Password</label>
              <div className="lp-input-wrap">
                <input
                  className="lp-input"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp-eye-btn"
                  onClick={() => setShowPass(v => !v)}
                  tabIndex={-1}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {error && <div className="lp-error">{error}</div>}

            <button type="submit" className="lp-submit" disabled={loading}>
              {loading ? <><span className="lp-spinner" />Signing In…</> : "Sign In to Dashboard"}
            </button>
          </form>

          <p className="lp-footer-note">
            Protected area &mdash; <span>DMS Aarohi Admin System</span>
          </p>
        </div>
      </div>
    </>
  );
}
