import { useEffect, useState } from 'react';
import { navigationApi, type NavItemData } from '../../api';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

const empty: Omit<NavItemData, 'id' | 'children'> = {
  label: '', path: '', isHighlight: false, isVisible: true, displayOrder: 0, parentId: null,
};

export default function AdminNavigation() {
  const [items, setItems] = useState<NavItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<NavItemData | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    navigationApi.getAll().then(r => setItems(r.data.data)).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openCreate = (parentId?: number) => {
    setEditing(null);
    setForm({ ...empty, parentId: parentId ?? null });
    setError(''); setModal(true);
  };
  const openEdit = (item: NavItemData) => {
    setEditing(item);
    setForm({ label: item.label, path: item.path, isHighlight: item.isHighlight, isVisible: item.isVisible, displayOrder: item.displayOrder, parentId: item.parentId });
    setError(''); setModal(true);
  };

  const save = async () => {
    if (!form.label.trim() || !form.path.trim()) { setError('Label and path are required'); return; }
    setSaving(true); setError('');
    try {
      if (editing) await navigationApi.update(editing.id, form);
      else await navigationApi.create(form);
      setModal(false); load();
    } catch { setError('Save failed'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this nav item and all its children?')) return;
    await navigationApi.delete(id); load();
  };

  const set = (k: string, v: string | number | boolean | null) => setForm(f => ({ ...f, [k]: v }));

  // Flatten for display: top-level items then their children indented
  const allTopLevel = items.filter(i => !i.parentId);

  return (
    <div>
      <div className="admin-page-header">
        <h1>Navigation</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => openCreate()}><Plus size={16} /> Add Top-Level Item</button>
      </div>
      <div className="admin-card">
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Label</th><th>Path</th><th>Highlight</th><th>Visible</th><th>Order</th><th>Actions</th></tr></thead>
              <tbody>
                {allTopLevel.map(item => (
                  <>
                    <tr key={item.id} style={{ background: '#f8f6f8' }}>
                      <td><strong>{item.label}</strong></td>
                      <td style={{ fontSize: '0.8rem', color: '#718096' }}>{item.path}</td>
                      <td>{item.isHighlight ? '★' : '—'}</td>
                      <td>{item.isVisible ? <Eye size={14} color="#38a169" /> : <EyeOff size={14} color="#718096" />}</td>
                      <td>{item.displayOrder}</td>
                      <td style={{ display: 'flex', gap: 6 }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openCreate(item.id)} title="Add child"><Plus size={12} /></button>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(item)}><Pencil size={13} /></button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(item.id)}><Trash2 size={13} /></button>
                      </td>
                    </tr>
                    {item.children.map(child => (
                      <tr key={child.id}>
                        <td style={{ paddingLeft: '2rem' }}>↳ {child.label}{child.isHighlight && <span style={{ marginLeft: 6, fontSize: '0.7rem', color: '#7B426F', fontWeight: 700 }}>HIGHLIGHT</span>}</td>
                        <td style={{ fontSize: '0.8rem', color: '#718096' }}>{child.path}</td>
                        <td>{child.isHighlight ? '★' : '—'}</td>
                        <td>{child.isVisible ? <Eye size={14} color="#38a169" /> : <EyeOff size={14} color="#718096" />}</td>
                        <td>{child.displayOrder}</td>
                        <td style={{ display: 'flex', gap: 6 }}>
                          <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(child)}><Pencil size={13} /></button>
                          <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(child.id)}><Trash2 size={13} /></button>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
                {allTopLevel.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>No navigation items</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h2>{editing ? 'Edit Nav Item' : form.parentId ? 'Add Dropdown Item' : 'Add Nav Item'}</h2>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(false)}><X size={14} /></button>
            </div>
            <div className="admin-form">
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Label *</label><input value={form.label} onChange={e => set('label', e.target.value)} placeholder="e.g. Treatments" /></div>
                <div className="admin-form-group"><label>Path *</label><input value={form.path} onChange={e => set('path', e.target.value)} placeholder="e.g. /treatments" /></div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Display Order</label><input type="number" value={form.displayOrder} onChange={e => set('displayOrder', +e.target.value)} /></div>
                <div className="admin-form-group" style={{ justifyContent: 'flex-end', gap: '1rem', flexDirection: 'row', alignItems: 'center', paddingTop: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isVisible} onChange={e => set('isVisible', e.target.checked)} /> Visible
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isHighlight} onChange={e => set('isHighlight', e.target.checked)} /> Highlight
                  </label>
                </div>
              </div>
              {error && <p style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{error}</p>}
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
