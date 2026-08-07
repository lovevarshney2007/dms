import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, RefreshCw, Save, Image as ImageIcon } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

const INITIATIVES = [
  { id: 'home', label: 'Homepage' },
  { id: 'blood-donation', label: 'Blood Donation & Healthcare' },
  { id: 'child-education', label: 'Child Education' },
  { id: 'beti-bachao', label: 'Beti Bachao Initiative' },
  { id: 'cloth-distribution', label: 'Cloth Distribution' },
  { id: 'senior-citizen', label: 'Senior Citizen Welfare' },
  { id: 'environment', label: 'Environment Awareness' }
];

export default function NgoHeroPage() {
  const [initiative, setInitiative] = useState(INITIATIVES[0].id);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [aboutImage, setAboutImage] = useState("");
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [savingAbout, setSavingAbout] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    setLoadingAbout(true);
    
    // Load slides
    api.get(`/admin/ngo/hero/${initiative}`)
      .then(d => setSlides(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load slides', 'error'))
      .finally(() => setLoading(false));

    // Load about image
    api.get(`/admin/ngo/content/${initiative}`)
      .then(d => setAboutImage(d?.aboutImage || ""))
      .catch(() => setAboutImage(""))
      .finally(() => setLoadingAbout(false));
  }, [initiative]);

  useEffect(() => { load(); }, [load]);

  const saveSlide = async (e) => {
    e.preventDefault();
    if (!form.image) return;
    setSaving(true);
    try {
      const res = await api.post(`/admin/ngo/hero/${initiative}`, form);
      setSlides(s => [...s, res]);
      showToast('Slide added successfully', 'success');
      setShowModal(false);
      setForm({ title: '', subtitle: '', image: '' });
    } catch {
      showToast('Failed to add slide', 'error');
    } finally {
      setSaving(false);
    }
  };

  const delSlide = async (id) => {
    if (!window.confirm('Delete this hero slide?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/ngo/hero/${initiative}/${id}`);
      setSlides(s => s.filter(x => x._id !== id));
      showToast('Slide deleted', 'success');
    } catch {
      showToast('Failed to delete slide', 'error');
    } finally {
      setDeleting('');
    }
  };

  const saveAboutUrl = async () => {
    setSavingAbout(true);
    try {
      await api.put(`/admin/ngo/content/${initiative}`, { aboutImage });
      showToast("About image updated successfully", "success");
    } catch (err) {
      showToast("Failed to save about image", "error");
    } finally {
      setSavingAbout(false);
    }
  };

  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Hero & About Images</h1>
            <p className="page-subtitle">Manage the rotating hero slider and the About section photo</p>
          </div>
          <button className="btn btn-outline" onClick={load}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
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
              background: initiative === tab.id ? 'var(--gold)' : 'var(--bg-subtle)',
              color: initiative === tab.id ? '#1a1a2e' : 'var(--text-soft)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Slides */}
      <div className="card mb-6">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="card-title">Hero Slider Images</div>
          <button className="btn btn-gold btn-sm" onClick={() => setShowModal(true)}>
            <Plus size={14} /> Add Slide
          </button>
        </div>
        
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-soft)' }}>Loading slides...</div>
        ) : slides.length === 0 ? (
          <EmptyState icon={ImageIcon} title="No custom slides" subtitle="The page is showing its built-in default slides." />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: 16 }}>
            {slides.map(slide => (
              <div key={slide._id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '4/5', border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <img src={resolveImg(slide.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: 12 }}>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slide.title || 'Untitled'}</div>
                </div>
                <button 
                  onClick={() => delSlide(slide._id)}
                  disabled={deleting === slide._id}
                  style={{
                    position: 'absolute', top: 8, right: 8, width: 30, height: 30,
                    background: 'rgba(239,68,68,0.9)', color: '#fff', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'
                  }}
                  title="Delete Slide"
                >
                  {deleting === slide._id ? <RefreshCw size={14} className="spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About Section Image */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">About Section Image</div>
        </div>
        {loadingAbout ? (
          <div style={{ padding: 20, color: 'var(--text-soft)' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 160px) 1fr', gap: 24, alignItems: 'start', marginTop: 16 }}>
            <div style={{ aspectRatio: '4/5', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              {aboutImage ? (
                <img src={resolveImg(aboutImage)} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-soft)' }}>
                  <ImageIcon size={24} />
                </div>
              )}
            </div>
            <div>
              <p style={{ fontSize: 13, color: 'var(--text-soft)', marginBottom: 12 }}>
                {aboutImage ? "This image is live on the website." : "No custom image set — the page is using its built-in default photo."}
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <input 
                  className="form-input" 
                  value={aboutImage} 
                  onChange={e => setAboutImage(e.target.value)} 
                  placeholder="Paste image URL here" 
                  style={{ flex: 1 }}
                />
                <button className="btn btn-green" onClick={saveAboutUrl} disabled={savingAbout}>
                  {savingAbout ? <RefreshCw size={14} className="spin" /> : <Save size={14} />} Save Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Hero Slide">
        <form onSubmit={saveSlide} className="form-grid">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Slide Title</label>
            <input className="form-input" name="title" value={form.title} onChange={h} placeholder="e.g. Save Lives Today" />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Slide Subtitle</label>
            <input className="form-input" name="subtitle" value={form.subtitle} onChange={h} placeholder="e.g. Join our blood donation drive" />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Image URL *</label>
            <input className="form-input" name="image" value={form.image} onChange={h} required placeholder="https://..." />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
            <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-gold" disabled={saving}>
              {saving ? 'Adding...' : 'Add Slide'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
