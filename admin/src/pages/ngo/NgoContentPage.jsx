import { useEffect, useState, useCallback } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';

const INITIATIVES = [
  { id: 'blood-donation', label: 'Blood Donation & Healthcare' },
  { id: 'child-education', label: 'Child Education' },
  { id: 'beti-bachao', label: 'Beti Bachao Initiative' },
  { id: 'cloth-distribution', label: 'Cloth Distribution' },
  { id: 'senior-citizen', label: 'Senior Citizen Welfare' },
  { id: 'environment', label: 'Environment Awareness' }
];

const INIT_FORM = {
  heroTitle: '', heroTagline: '',
  aboutText: '',
  ctaTitle: '', ctaBody: '', ctaButtonLabel: ''
};

export default function NgoContentPage() {
  const [initiative, setInitiative] = useState(INITIATIVES[0].id);
  const [form, setForm] = useState(INIT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/ngo/content/${initiative}`)
      .then(d => {
        if (d) setForm({ ...INIT_FORM, ...d });
        else setForm(INIT_FORM); // No content yet
      })
      .catch(() => showToast('Failed to load content', 'error'))
      .finally(() => setLoading(false));
  }, [initiative]);

  useEffect(() => { load(); }, [load]);

  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/ngo/content/${initiative}`, form);
      showToast('Content saved successfully', 'success');
    } catch {
      showToast('Failed to save content', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Initiative Content</h1>
            <p className="page-subtitle">Manage text and images for NGO initiative pages</p>
          </div>
          <button className="btn btn-green" onClick={save} disabled={saving || loading}>
            {saving ? <RefreshCw size={14} className="spin" /> : <Save size={14} />} Save Changes
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 8 }}>
        {INITIATIVES.map(tab => (
          <button
            key={tab.id}
            onClick={() => setInitiative(tab.id)}
            style={{
              padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
              background: initiative === tab.id ? 'var(--green)' : 'var(--bg-subtle)',
              color: initiative === tab.id ? '#fff' : 'var(--text-soft)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-soft)' }}>Loading content...</div>
      ) : (
        <div style={{ display: 'grid', gap: 24 }}>
          <div className="card">
            <div className="card-header" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="card-title">Hero Section</div>
            </div>
            <div className="card-body form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Hero Title</label>
                <input className="form-input" name="heroTitle" value={form.heroTitle || ''} onChange={h} placeholder="e.g. Donate Blood, Save Lives" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Hero Tagline</label>
                <textarea className="form-input" name="heroTagline" value={form.heroTagline || ''} onChange={h} rows="2" placeholder="Brief tagline..." />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="card-title">About Section</div>
            </div>
            <div className="card-body form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">About Text</label>
                <textarea className="form-input" name="aboutText" value={form.aboutText || ''} onChange={h} rows="5" placeholder="Detailed description of the initiative..." />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="card-title">Call to Action (CTA)</div>
            </div>
            <div className="card-body form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">CTA Title</label>
                <input className="form-input" name="ctaTitle" value={form.ctaTitle || ''} onChange={h} placeholder="e.g. Ready to make an impact?" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">CTA Body Text</label>
                <textarea className="form-input" name="ctaBody" value={form.ctaBody || ''} onChange={h} rows="2" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">CTA Button Label</label>
                <input className="form-input" name="ctaButtonLabel" value={form.ctaButtonLabel || ''} onChange={h} placeholder="e.g. Join the Initiative" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8, marginBottom: 40 }}>
            <button className="btn btn-outline" onClick={load} disabled={saving || loading}>
              <RefreshCw size={14} /> Discard Changes
            </button>
            <button className="btn btn-green" onClick={save} disabled={saving || loading}>
              {saving ? <RefreshCw size={14} className="spin" /> : <Save size={14} />} Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
