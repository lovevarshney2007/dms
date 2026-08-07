import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Users } from 'lucide-react';
import { api } from '../../lib/api';
import { showToast } from '../../components/Toast';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import { resolveImg } from '../../config';

const EMPTY_TEAM = { name: '', role: '', image: '', order: 0 };

export default function NgoTeamPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_TEAM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.get('/admin/ngo/team')
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => showToast('Failed to load team', 'error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm(EMPTY_TEAM); setShowModal(true); };
  const openEdit = (r) => { setEditing(r); setForm({ ...EMPTY_TEAM, ...r }); setShowModal(true); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await api.put(`/admin/ngo/team/${editing._id}`, form);
        setRows(r => r.map(x => x._id === editing._id ? res : x));
        showToast('Team member updated', 'success');
      } else {
        const res = await api.post('/admin/ngo/team', form);
        setRows(r => [res, ...r]);
        showToast('Team member created', 'success');
      }
      setShowModal(false);
    } catch {
      showToast('Failed to save team member', 'error');
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/ngo/team/${id}`);
      setRows(r => r.filter(x => x._id !== id));
      showToast('Team member deleted', 'success');
    } catch {
      showToast('Failed to delete', 'error');
    } finally {
      setDeleting('');
    }
  };

  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">NGO Team</h1>
            <p className="page-subtitle">Manage core team members for social initiatives</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" onClick={load}>
              <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
            </button>
            <button className="btn btn-green" onClick={openAdd}>
              <Plus size={14} /> Add Member
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-soft)' }}>Loading team...</div>
        ) : rows.length === 0 ? (
          <EmptyState icon={Users} title="No team members found" subtitle="Click 'Add Member' to create one." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name & Role</th>
                  <th>Order</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r._id}>
                    <td>
                      {r.image ? (
                        <img src={resolveImg(r.image)} alt={r.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} />
                      ) : (
                        <div style={{ width: 40, height: 40, background: 'var(--bg-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Users size={16} className="text-soft" />
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="td-name">{r.name}</div>
                      <div className="td-soft">{r.role}</div>
                    </td>
                    <td>{r.order}</td>
                    <td align="right" style={{ whiteSpace: 'nowrap' }}>
                      <button className="icon-btn" onClick={() => openEdit(r)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="icon-btn danger" style={{ marginLeft: 6 }} onClick={() => del(r._id)} disabled={deleting === r._id} title="Delete">
                        {deleting === r._id ? <RefreshCw size={16} className="spin" /> : <Trash2 size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Team Member' : 'Add Team Member'}>
        <form onSubmit={save} className="form-grid">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Full Name *</label>
            <input className="form-input" name="name" value={form.name} onChange={h} required placeholder="e.g. John Doe" />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Role *</label>
            <input className="form-input" name="role" value={form.role} onChange={h} required placeholder="e.g. President" />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Image URL</label>
            <input className="form-input" name="image" value={form.image} onChange={h} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label className="form-label">Sort Order</label>
            <input type="number" className="form-input" name="order" value={form.order} onChange={h} />
            <span className="form-hint">Lower numbers appear first</span>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
            <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-green" disabled={saving}>
              {saving ? 'Saving...' : 'Save Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
