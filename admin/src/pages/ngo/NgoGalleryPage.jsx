import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, RefreshCw, Image as ImageIcon } from 'lucide-react';
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

export default function NgoGalleryPage() {
  const [initiative, setInitiative] = useState(INITIATIVES[0].id);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/ngo/gallery/${initiative}`)
      .then(d => setImages(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load gallery', 'error'))
      .finally(() => setLoading(false));
  }, [initiative]);

  useEffect(() => { load(); }, [load]);

  const save = async (e) => {
    e.preventDefault();
    if (!url) return;
    setSaving(true);
    try {
      const res = await api.post(`/admin/ngo/gallery/${initiative}`, { url });
      setImages(img => [...img, res]);
      showToast('Image added', 'success');
      setShowModal(false);
      setUrl('');
    } catch {
      showToast('Failed to add image', 'error');
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this image from gallery?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/ngo/gallery/${initiative}/${id}`);
      setImages(img => img.filter(x => x._id !== id));
      showToast('Image deleted', 'success');
    } catch {
      showToast('Failed to delete', 'error');
    } finally {
      setDeleting('');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">NGO Gallery</h1>
            <p className="page-subtitle">Manage images for various social initiatives</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" onClick={load}>
              <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
            </button>
            <button className="btn btn-green" onClick={() => setShowModal(true)}>
              <Plus size={14} /> Add Image
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 8 }}>
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

      <div className="card" style={{ minHeight: 400 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-soft)' }}>Loading gallery...</div>
        ) : images.length === 0 ? (
          <EmptyState icon={ImageIcon} title={`No images for ${INITIATIVES.find(i => i.id === initiative)?.label}`} subtitle="Upload some images to showcase this initiative." />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {images.map(img => (
              <div key={img._id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3', border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <img src={resolveImg(img.url)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={() => del(img._id)}
                  disabled={deleting === img._id}
                  style={{
                    position: 'absolute', top: 8, right: 8, width: 32, height: 32,
                    background: 'rgba(239,68,68,0.9)', color: '#fff', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'
                  }}
                  title="Delete Image"
                >
                  {deleting === img._id ? <RefreshCw size={16} className="spin" /> : <Trash2 size={16} />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Image to Gallery">
        <form onSubmit={save} className="form-grid">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Image URL *</label>
            <input className="form-input" value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://..." />
            <span className="form-hint">Provide an external URL or Cloudinary link.</span>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
            <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-green" disabled={saving}>
              {saving ? 'Adding...' : 'Add Image'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
