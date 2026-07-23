import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Trophy, X, Check, RefreshCw, Star } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

const TABS = [
  { key: 'season', label: 'Seasons' },
  { key: 'qualified-contestant', label: 'Finalists' },
  { key: 'competition', label: 'Competitions' },
];

const EMPTY_SEASON = { title: '', subtitle: '', year: '', imageUrl: '', description: '' };
const EMPTY_FINALIST = { name: '', title: '', season: '', rank: '', talentCategory: '', imageUrl: '', description: '' };
const EMPTY_COMP = { title: '', subtitle: '', description: '', imageUrl: '' };

function getEmpty(tab) {
  if (tab === 'season') return EMPTY_SEASON;
  if (tab === 'qualified-contestant') return EMPTY_FINALIST;
  return EMPTY_COMP;
}

export default function SeasonsPage() {
  const [tab, setTab]           = useState('season');
  const [rows, setRows]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY_SEASON);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get(`/admin/content/${tab}`)
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setEditing(null); setForm(getEmpty(tab)); setShowModal(true); };
  const openEdit = r => { setEditing(r); setForm({ ...getEmpty(tab), ...r }); setShowModal(true); };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.put(`/admin/content/${editing._id}`, form);
        setRows(r => r.map(x => x._id === editing._id ? updated : x));
        showToast('Updated', 'success');
      } else {
        const created = await api.post(`/admin/content/${tab}`, form);
        setRows(r => [created, ...r]);
        showToast('Created', 'success');
      }
      setShowModal(false);
    } catch (err) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async id => {
    if (!window.confirm('Delete this item?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/content/${id}`);
      setRows(r => r.filter(x => x._id !== id));
      showToast('Deleted', 'success');
    } catch { showToast('Delete failed', 'error'); }
    finally { setDeleting(''); }
  };

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const fields = {
    'season': [
      ['title', 'Season Name', 'text'], ['subtitle', 'Subtitle', 'text'],
      ['year', 'Year', 'text'], ['imageUrl', 'Image URL', 'url'], ['description', 'Description', 'textarea']
    ],
    'qualified-contestant': [
      ['name', 'Contestant Name', 'text'], ['title', 'Achievement / Title', 'text'],
      ['season', 'Season', 'text'], ['rank', 'Rank', 'number'],
      ['talentCategory', 'Category', 'text'], ['imageUrl', 'Image URL', 'url'],
      ['description', 'About', 'textarea']
    ],
    'competition': [
      ['title', 'Competition Name', 'text'], ['subtitle', 'Subtitle', 'text'],
      ['description', 'Description', 'textarea'], ['imageUrl', 'Image URL', 'url']
    ]
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Seasons & Finalists</h1>
            <p className="page-subtitle">Manage Voice of Delhi NCR seasons and finalists</p>
            <div className="page-divider" />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={load}><RefreshCw size={13} />Refresh</button>
            <button className="btn btn-gold btn-sm" onClick={openAdd}><Plus size={13} />Add {TABS.find(t=>t.key===tab)?.label.slice(0,-1)}</button>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: tab === t.key ? 'var(--gold)' : 'var(--card-bg)',
                color: tab === t.key ? '#1a1a2e' : 'var(--text-muted)',
                transition: 'all .15s'
              }}>
              {t.label} {rows.length > 0 && tab === t.key ? `(${rows.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
        ) : rows.length === 0 ? (
          <EmptyState icon={Trophy} title={`No ${TABS.find(t=>t.key===tab)?.label} yet`} desc="Add one using the button above" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16, padding: 20 }}>
            {rows.map(r => (
              <div key={r._id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                {(r.imageUrl) && (
                  <div style={{ width: '100%', height: 140, overflow: 'hidden' }}>
                    <img src={resolveImg(r.imageUrl)} alt={r.title || r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                  </div>
                )}
                <div style={{ padding: 14 }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{r.title || r.name}</div>
                  {r.subtitle && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{r.subtitle}</div>}
                  {r.year && <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>📅 {r.year}</div>}
                  {r.season && <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>Season: {r.season}</div>}
                  {r.rank && <div style={{ fontSize: 12, color: 'var(--gold)' }}><Star size={10}/> Rank #{r.rank}</div>}
                  {r.talentCategory && <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>{r.talentCategory}</div>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => openEdit(r)}><Edit2 size={12} />Edit</button>
                    <button className="icon-btn danger" disabled={deleting === r._id} onClick={() => del(r._id)}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="detail-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} />
            <motion.div className="detail-drawer" style={{ width: 440 }} initial={{ x: 460 }} animate={{ x: 0 }} exit={{ x: 460 }} transition={{ duration: 0.28 }}>
              <div className="detail-drawer-head">
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16 }}>
                  {editing ? 'Edit' : 'Add'} {TABS.find(t => t.key === tab)?.label.slice(0, -1)}
                </div>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
              </div>
              <form onSubmit={save}>
                <div className="detail-drawer-body" style={{ gap: 14 }}>
                  {(fields[tab] || []).map(([name, label, type]) => (
                    <div key={name} className="detail-field">
                      <div className="detail-field-label">{label}</div>
                      {type === 'textarea' ? (
                        <textarea name={name} value={form[name] || ''} onChange={handle} rows={3}
                          className="form-input" style={{ fontSize: 13, padding: '8px 12px', resize: 'vertical' }} />
                      ) : (
                        <input name={name} type={type} value={form[name] || ''} onChange={handle}
                          className="form-input" style={{ fontSize: 13, padding: '8px 12px' }} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="detail-drawer-foot">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold btn-sm" disabled={saving}><Check size={13} />{saving ? 'Saving…' : (editing ? 'Update' : 'Create')}</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
