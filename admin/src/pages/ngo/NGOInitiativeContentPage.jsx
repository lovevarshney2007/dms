import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RefreshCw, BookOpen, X, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';

const INITIATIVES = [
  { key: 'blood-donation',     label: '🩸 Blood Donation & Healthcare' },
  { key: 'child-education',    label: '📚 Child Education' },
  { key: 'beti-bachao',        label: '👧 Beti Bachao Initiative' },
  { key: 'cloth-distribution', label: '👕 Cloth Distribution' },
  { key: 'senior-citizen',     label: '🤝 Senior Citizen Welfare' },
  { key: 'environment',        label: '🌿 Environment Awareness' },
];

const EMPTY_FORM = {
  heroTitle: '', heroTagline: '', heroImage: '',
  aboutText: '', aboutImage: '',
  ctaTitle: '', ctaBody: '', ctaButtonLabel: '',
};

export default function NGOInitiativeContentPage() {
  const [slug, setSlug]       = useState(INITIATIVES[0].key);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/ngo/content/${slug}`)
      .then(d => setForm({ ...EMPTY_FORM, ...(d || {}) }))
      .catch(() => setForm(EMPTY_FORM))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/ngo/content/${slug}`, form);
      showToast('Initiative content saved — live on website', 'success');
    } catch (err) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const inputCls = {
    width: '100%', padding: '9px 13px', borderRadius: 8, border: '1px solid var(--border)',
    fontSize: 13, color: 'var(--text)', background: 'var(--bg)', outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color .15s',
  };
  const labelCls = { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-soft)', marginBottom: 5, display: 'block' };
  const Section = ({ label, color }) => (
    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color, marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${color}20` }}>
      {label}
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">Initiative Text Content</h1>
            <p className="page-subtitle">Edit hero, about, and CTA text for each NGO initiative page</p>
            <div className="page-divider green" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Reload</button>
            <button className="btn btn-green btn-sm" onClick={save} disabled={saving}><Save size={13} />{saving ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </div>
      </div>

      {/* Initiative selector tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {INITIATIVES.map(i => (
          <button key={i.key} onClick={() => setSlug(i.key)}
            style={{
              padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, background: slug === i.key ? 'var(--green)' : 'var(--card-bg)',
              color: slug === i.key ? '#fff' : 'var(--text-muted)', transition: 'all .15s',
            }}>
            {i.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)', fontWeight: 500 }}>Loading content…</div>
      ) : (
        <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Hero Section */}
          <div>
            <Section label="🎯 Hero Section" color="var(--gold)" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelCls}>Hero Title</label>
                <input style={inputCls} value={form.heroTitle} onChange={e => set('heroTitle', e.target.value)} placeholder="e.g. Blood Donation Drives" />
              </div>
              <div>
                <label style={labelCls}>Hero Tagline</label>
                <input style={inputCls} value={form.heroTagline} onChange={e => set('heroTagline', e.target.value)} placeholder="e.g. Saving Lives, One Drop at a Time" />
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* About Section */}
          <div>
            <Section label="ℹ️ About Section" color="var(--green)" />
            <div>
              <label style={labelCls}>About Text (one paragraph per line)</label>
              <textarea
                rows={6}
                style={{ ...inputCls, resize: 'vertical', lineHeight: 1.7 }}
                value={form.aboutText}
                onChange={e => set('aboutText', e.target.value)}
                placeholder="Each line becomes one paragraph on the website…"
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={labelCls}>About Section Image URL</label>
              <input style={inputCls} value={form.aboutImage} onChange={e => set('aboutImage', e.target.value)} placeholder="https://…" />
              {form.aboutImage && (
                <div style={{ marginTop: 8, width: 120, height: 80, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={form.aboutImage} alt="About section" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* CTA Section */}
          <div>
            <Section label="📣 Call To Action Section" color="#8b5cf6" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelCls}>CTA Title</label>
                <input style={inputCls} value={form.ctaTitle} onChange={e => set('ctaTitle', e.target.value)} placeholder="e.g. Become a Donor Today" />
              </div>
              <div>
                <label style={labelCls}>CTA Button Label</label>
                <input style={inputCls} value={form.ctaButtonLabel} onChange={e => set('ctaButtonLabel', e.target.value)} placeholder="e.g. Register Now" />
              </div>
            </div>
            <div>
              <label style={labelCls}>CTA Body Text</label>
              <textarea
                rows={3}
                style={{ ...inputCls, resize: 'vertical' }}
                value={form.ctaBody}
                onChange={e => set('ctaBody', e.target.value)}
                placeholder="Short paragraph shown in the call-to-action section…"
              />
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-green" onClick={save} disabled={saving} style={{ padding: '10px 28px', fontSize: 14 }}>
              <Save size={15} />{saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
