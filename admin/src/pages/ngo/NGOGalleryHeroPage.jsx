import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Image, X, RefreshCw, Upload, Layers } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import EmptyState from '../../components/EmptyState';

const INITIATIVES = [
  { key: 'home',               label: 'Homepage' },
  { key: 'blood-donation',     label: 'Blood Donation & Healthcare' },
  { key: 'child-education',    label: 'Child Education' },
  { key: 'beti-bachao',        label: 'Beti Bachao Initiative' },
  { key: 'cloth-distribution', label: 'Cloth Distribution' },
  { key: 'senior-citizen',     label: 'Senior Citizen Welfare' },
  { key: 'environment',        label: 'Environment Awareness' },
];

const TABS = [
  { id: 'gallery', label: '🖼️ Per-Initiative Gallery', desc: 'Images shown in each initiative page gallery' },
  { id: 'hero',    label: '🎯 Hero Slides',           desc: 'Rotating hero images at the top of each page' },
];

// ── Per-Initiative Gallery ────────────────────────────────────────────────
function GallerySection() {
  const [initiative, setInitiative] = useState('home');
  const [images, setImages]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [newUrl, setNewUrl]         = useState('');
  const [uploading, setUploading]   = useState(false);
  const fileRef = useRef(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/ngo/gallery/${initiative}`)
      .then(d => setImages(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load gallery', 'error'))
      .finally(() => setLoading(false));
  }, [initiative]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = localStorage.getItem('dms_admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5051/api'}/upload`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      await api.post(`/admin/ngo/gallery/${initiative}`, { url: data.url });
      load();
      showToast('Image uploaded and added', 'success');
    } catch (err) { showToast(err.message || 'Upload failed', 'error'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const addByUrl = async () => {
    if (!newUrl.trim()) return;
    try {
      await api.post(`/admin/ngo/gallery/${initiative}`, { url: newUrl.trim() });
      setNewUrl('');
      load();
      showToast('Image added', 'success');
    } catch (err) { showToast(err.message || 'Failed', 'error'); }
  };

  const remove = async id => {
    try {
      await api.delete(`/admin/ngo/gallery/${initiative}/${id}`);
      setImages(imgs => imgs.filter(i => i._id !== id));
      showToast('Image removed', 'success');
    } catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-soft)' }}>Initiative:</span>
        <select value={initiative} onChange={e => setInitiative(e.target.value)} className="filter-select" style={{ width: 260 }}>
          {INITIATIVES.map(i => <option key={i.key} value={i.key}>{i.label}</option>)}
        </select>
        <button className="btn btn-outline btn-sm" onClick={load} style={{ marginLeft: 'auto' }}><RefreshCw size={13} />Refresh</button>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Add New Image</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input type="text" value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Paste image URL…"
              className="search-input" style={{ flex: 1, minWidth: 200 }} onKeyDown={e => e.key === 'Enter' && addByUrl()} />
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
            <button type="button" className="btn btn-outline btn-sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
              <Upload size={12} />{uploading ? 'Uploading…' : 'Upload'}
            </button>
            <button type="button" className="btn btn-green btn-sm" onClick={addByUrl} disabled={!newUrl.trim()}>
              <Plus size={12} />Add URL
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : images.length === 0 ? (
          <EmptyState icon={Image} title="No images yet" desc="Add images for this initiative above" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12, padding: 16 }}>
            {images.map(img => (
              <div key={img._id} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '1', border: '1px solid var(--border)' }}>
                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity = '0.3'} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background .2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; e.currentTarget.querySelector('button').style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; e.currentTarget.querySelector('button').style.opacity = '0'; }}>
                  <button onClick={() => remove(img._id)} style={{ opacity: 0, transition: 'opacity .2s', background: '#ef4444', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Hero Slides ───────────────────────────────────────────────────────────
function HeroSection() {
  const [initiative, setInitiative] = useState('home');
  const [slides, setSlides]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [form, setForm]             = useState({ image: '', title: '', subtitle: '' });
  const [uploading, setUploading]   = useState(false);
  const fileRef = useRef(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/ngo/hero/${initiative}`)
      .then(d => setSlides(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load slides', 'error'))
      .finally(() => setLoading(false));
  }, [initiative]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = localStorage.getItem('dms_admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5051/api'}/upload`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      setForm(f => ({ ...f, image: data.url }));
      showToast('Image uploaded', 'success');
    } catch (err) { showToast(err.message || 'Upload failed', 'error'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const addSlide = async () => {
    if (!form.image.trim()) return;
    try {
      await api.post(`/admin/ngo/hero/${initiative}`, form);
      setForm({ image: '', title: '', subtitle: '' });
      load();
      showToast('Hero slide added', 'success');
    } catch (err) { showToast(err.message || 'Failed', 'error'); }
  };

  const removeSlide = async id => {
    try {
      await api.delete(`/admin/ngo/hero/${initiative}/${id}`);
      setSlides(s => s.filter(sl => sl._id !== id));
      showToast('Slide removed', 'success');
    } catch { showToast('Delete failed', 'error'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-soft)' }}>Initiative:</span>
        <select value={initiative} onChange={e => setInitiative(e.target.value)} className="filter-select" style={{ width: 260 }}>
          {INITIATIVES.map(i => <option key={i.key} value={i.key}>{i.label}</option>)}
        </select>
        <button className="btn btn-outline btn-sm" onClick={load} style={{ marginLeft: 'auto' }}><RefreshCw size={13} />Refresh</button>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Add Hero Slide</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Slide title (optional)" className="form-input" />
            <input type="text" value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Slide subtitle (optional)" className="form-input" />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input type="text" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="Paste image URL…"
              className="search-input" style={{ flex: 1, minWidth: 200 }} />
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
            <button type="button" className="btn btn-outline btn-sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
              <Upload size={12} />{uploading ? 'Uploading…' : 'Upload'}
            </button>
            <button type="button" className="btn btn-green btn-sm" onClick={addSlide} disabled={!form.image.trim()}>
              <Plus size={12} />Add Slide
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : slides.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            No custom slides yet — the page shows its built-in default slides.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12, padding: 16 }}>
            {slides.map(s => (
              <div key={s._id} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', border: '1px solid var(--border)' }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 40%, transparent)' }} />
                {s.title && <div style={{ position: 'absolute', bottom: 28, left: 8, right: 8, color: '#fff', fontSize: 11, fontWeight: 700 }}>{s.title}</div>}
                {s.subtitle && <div style={{ position: 'absolute', bottom: 12, left: 8, right: 8, color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>{s.subtitle}</div>}
                <button onClick={() => removeSlide(s._id)}
                  style={{ position: 'absolute', top: 8, right: 8, background: '#ef4444', border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function NGOGalleryHeroPage() {
  const [activeTab, setActiveTab] = useState('gallery');
  const current = TABS.find(t => t.id === activeTab);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">NGO Gallery & Hero</h1>
          <p className="page-subtitle">{current?.desc}</p>
          <div className="page-divider green" />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: activeTab === t.id ? 'var(--green)' : 'var(--card-bg)',
                color: activeTab === t.id ? '#fff' : 'var(--text-muted)', transition: 'all .15s'
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'gallery' && <GallerySection />}
      {activeTab === 'hero'    && <HeroSection />}
    </div>
  );
}
