import { useState, useEffect } from 'react';
import { Save, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { showToast } from '../components/Toast';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from '../components/SocialIcons';
import { api } from '../lib/api';

const INIT = {
  phone: '+91 9810225442', email: 'dmsaarohi@gmail.com', address: 'A5, 272, Paschim Vihar, New Delhi',
  facebook: 'https://www.facebook.com/dms.aarohi', youtube: 'https://www.youtube.com/@dmsaarohi5483',
  instagram: 'https://instagram.com/dmsaarohi', twitter: 'https://twitter.com/dmsaarohi',
  registrationOpen: true, currentSeason: '4', regCloseDate: '2026-08-31',
  heroAnnouncement: 'Season 4 Grand Finale — July 4, 2026 at Pearey Lal Bhawan, ITO',
};

export default function SettingsPage() {
  const [form, setForm] = useState(INIT);
  const [saving, setSaving] = useState(false);
  const [dbRecords, setDbRecords] = useState({});

  useEffect(() => {
    api.get('/admin/content/website-setting')
      .then(data => {
        const items = Array.isArray(data) ? data : (data.items || []);
        if (items.length === 0) return;
        
        const loadedSettings = { ...INIT };
        const records = {};
        items.forEach(item => {
          if (item.settingKey) {
            records[item.settingKey] = item._id;
            if (item.settingKey === 'registrationOpen') {
              loadedSettings[item.settingKey] = item.settingValue === 'true';
            } else {
              loadedSettings[item.settingKey] = item.settingValue;
            }
          }
        });
        setForm(loadedSettings);
        setDbRecords(records);
      })
      .catch(err => {
        console.error(err);
        showToast('Failed to load settings', 'error');
      });
  }, []);

  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const updates = Object.keys(form).map(async (key) => {
        const val = typeof form[key] === 'boolean' ? String(form[key]) : String(form[key] || '');
        const payload = { settingKey: key, settingValue: val };
        
        if (dbRecords[key]) {
          await api.put(`/admin/content/${dbRecords[key]}`, payload);
        } else {
          const created = await api.post('/admin/content/website-setting', payload);
          return { key, id: created._id };
        }
        return null;
      });
      
      const results = await Promise.all(updates);
      
      const newRecords = { ...dbRecords };
      let updatedRecords = false;
      results.forEach(res => {
        if (res) {
          newRecords[res.key] = res.id;
          updatedRecords = true;
        }
      });
      if (updatedRecords) setDbRecords(newRecords);
      
      showToast('Settings saved successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const Section = ({ title, icon: Icon, children, accent = 'gold' }) => (
    <div className="card" style={{ marginBottom: 20 }}>
      <div className="card-header" style={{ background: accent==='green' ? 'var(--green-bg)' : 'var(--gold-bg)', borderRadius:'14px 14px 0 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          {Icon && <Icon size={16} style={{ color: accent==='green' ? 'var(--green)' : 'var(--gold)' }} />}
          <span className="card-title" style={{ color: accent==='green' ? 'var(--green)' : 'var(--gold)' }}>{title}</span>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Website Settings</h1>
            <p className="page-subtitle">Global settings for both DMS Aarohi websites</p>
            <div className="page-divider" />
          </div>
          <button className="btn btn-gold" onClick={save} disabled={saving}>
            {saving ? '⏳ Saving…' : <><Save size={14}/>Save Changes</>}
          </button>
        </div>
      </div>

      <Section title="Contact Information" icon={Phone}>
        <div className="form-row-3">
          <div className="form-group">
            <label className="form-label">📞 Phone</label>
            <input className="form-input" name="phone" value={form.phone} onChange={h} />
          </div>
          <div className="form-group">
            <label className="form-label">✉️ Email</label>
            <input className="form-input" name="email" value={form.email} onChange={h} />
          </div>
          <div className="form-group">
            <label className="form-label">📍 Address</label>
            <input className="form-input" name="address" value={form.address} onChange={h} />
          </div>
        </div>
      </Section>

      <Section title="Social Media Links" icon={Globe}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Facebook</label>
            <input className="form-input" name="facebook" value={form.facebook} onChange={h} />
          </div>
          <div className="form-group">
            <label className="form-label">YouTube</label>
            <input className="form-input" name="youtube" value={form.youtube} onChange={h} />
          </div>
          <div className="form-group">
            <label className="form-label">Instagram</label>
            <input className="form-input" name="instagram" value={form.instagram} onChange={h} />
          </div>
          <div className="form-group">
            <label className="form-label">Twitter / X</label>
            <input className="form-input" name="twitter" value={form.twitter} onChange={h} />
          </div>
        </div>
      </Section>

      <Section title="Talent Hunt Settings" icon={null} accent="gold">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Current Season</label>
            <input className="form-input" name="currentSeason" value={form.currentSeason} onChange={h} placeholder="e.g. 4" />
          </div>
          <div className="form-group">
            <label className="form-label">Registration Close Date</label>
            <input className="form-input" type="date" name="regCloseDate" value={form.regCloseDate} onChange={h} />
          </div>
        </div>
        <div style={{ marginTop:16, padding:'14px 16px', borderRadius:10, border:'1.5px solid var(--gold-border)', background:'var(--gold-bg)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, color:'var(--text)' }}>Registrations Open</div>
            <div style={{ fontSize:13, color:'var(--text-soft)' }}>Toggle Season {form.currentSeason} registrations on/off</div>
          </div>
          <label style={{ position:'relative', width:46, height:26, cursor:'pointer', display:'inline-block' }}>
            <input type="checkbox" name="registrationOpen" checked={form.registrationOpen} onChange={h} style={{ opacity:0, width:0, height:0 }} />
            <span style={{
              position:'absolute', inset:0, borderRadius:13, transition:'.3s',
              background: form.registrationOpen ? 'var(--gold)' : '#CBD5E1',
            }} />
            <span style={{
              position:'absolute', top:3, left: form.registrationOpen ? 23 : 3, width:20, height:20,
              borderRadius:'50%', background:'#fff', transition:'.3s',
              boxShadow:'0 1px 4px rgba(0,0,0,.2)',
            }} />
          </label>
        </div>
      </Section>

      <Section title="Hero Announcement Banner" icon={null}>
        <div className="form-group">
          <label className="form-label">Announcement text (shown on common page hero)</label>
          <input className="form-input" name="heroAnnouncement" value={form.heroAnnouncement} onChange={h} placeholder="Leave blank to hide" />
          <span className="form-hint">This appears as a pill above the hero headline.</span>
        </div>
      </Section>
    </div>
  );
}
