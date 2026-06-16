import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import { postJson, setAdminToken } from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../../components/common/FormNotice";

function AdminLoginPage() {
  const [email, setEmail] = useState("sde1rajat@gmail.com");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const result = await postJson("/api/admin/login", { email, password });
      setAdminToken(result.token);
      setStatus({ type: "success", message: "Logged in successfully." });
      navigate("/admin");
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell basePath="/admin">
      <section className="mx-auto max-w-xl rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-700">Admin</p>
          <h1 className="font-serif text-4xl text-stone-900">Login</h1>
          <p className="text-sm text-stone-600">Enter the admin password to access the panel.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Email
            <input
              className={renderInputClassNames(true)}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Password
            <input
              className={renderInputClassNames(true)}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="space-y-4">
            <FormNotice status={status} />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Signing in..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </PageShell>
  );
}

export default AdminLoginPage;
