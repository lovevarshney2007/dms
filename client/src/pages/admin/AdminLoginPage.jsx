import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJson, setAdminToken } from "../../lib/api";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await postJson("/api/admin/login", { email, password });
      setAdminToken(result.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          background: #0b0f1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
        }
        .login-brand {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-brand-badge {
          display: inline-flex;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(251,191,36,0.12);
          border: 1px solid rgba(251,191,36,0.25);
          color: #fbbf24;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 12px;
        }
        .login-title {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .login-sub {
          font-size: 13px;
          color: #475569;
          margin-top: 6px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .login-label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .login-input {
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
          width: 100%;
          box-sizing: border-box;
          font-family: inherit;
        }
        .login-input:focus {
          border-color: rgba(251,191,36,0.5);
          background: rgba(255,255,255,0.07);
        }
        .login-input::placeholder { color: #334155; }
        .login-error {
          padding: 10px 14px;
          border-radius: 8px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          font-size: 13px;
        }
        .login-btn {
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #000;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          margin-top: 4px;
        }
        .login-btn:hover { box-shadow: 0 4px 16px rgba(245,158,11,0.35); transform: translateY(-1px); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <div className="login-brand">
            <div className="login-brand-badge">Admin Portal</div>
            <h1 className="login-title">DMS Aarohi</h1>
            <p className="login-sub">Sign in to manage your website</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">
              Email
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="username"
              />
            </label>
            <label className="login-label">
              Password
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </label>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
