import { useEffect, useState } from 'react';
import { treatmentsApi, type Treatment } from '../../api';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';

const empty: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '', slug: '', category: '', description: '', image: '', icon: '',
  duration: '', destinations: '[]', tags: '[]', status: 'published',
  displayOrder: 0, seoTitle: '', seoDescription: '',
};

export default function AdminTreatments() {
  const [items, setItems] = useState<Treatment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    treatmentsApi.getAll().then(r => {
      setItems(r.data.data.items);
      setTotal(r.data.data.total);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setError(''); setModal(true); };
  const openEdit = (t: Treatment) => {
    setEditing(t);
    setForm({ title: t.title, slug: t.slug, category: t.category, description: t.description, image: t.image, icon: t.icon, duration: t.duration, destinations: t.destinations, tags: t.tags, status: t.status, displayOrder: t.displayOrder, seoTitle: t.seoTitle, seoDescription: t.seoDescription });
    setError(''); setModal(true);
  };

  const save = async () => {
    setSaving(true); setError('');
    try {
      if (editing) await treatmentsApi.update(editing.id, form);
      else await treatmentsApi.create(form);
      setModal(false); load();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Save failed');
    } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this treatment?')) return;
    await treatmentsApi.delete(id);
    load();
  };

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  const filtered = items.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="admin-page-header">
        <h1>Treatments ({total})</h1>
        <button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add Treatment</button>
      </div>
      <div className="admin-card">
        <div className="admin-toolbar">
          <div className="admin-search"><Search size={16} /><input placeholder="Search treatments..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        </div>
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Category</th><th>Duration</th><th>Status</th><th>Order</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id}>
                    <td><strong>{t.title}</strong><br /><span style={{ fontSize: '0.75rem', color: '#718096' }}>{t.slug}</span></td>
                    <td>{t.category}</td>
                    <td>{t.duration}</td>
                    <td><span className={`badge badge--${t.status}`}>{t.status}</span></td>
                    <td>{t.displayOrder}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(t)}><Pencil size={13} /></button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(t.id)}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h2>{editing ? 'Edit Treatment' : 'Add Treatment'}</h2>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(false)}><X size={14} /></button>
            </div>
            <div className="admin-form">
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title *</label><input value={form.title} onChange={e => set('title', e.target.value)} /></div>
                <div className="admin-form-group"><label>Slug *</label><input value={form.slug} onChange={e => set('slug', e.target.value)} /></div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Category</label><input value={form.category} onChange={e => set('category', e.target.value)} /></div>
                <div className="admin-form-group"><label>Duration</label><input value={form.duration} onChange={e => set('duration', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} /></div>
              <div className="admin-form-group"><label>Image URL</label><input value={form.image} onChange={e => set('image', e.target.value)} /></div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Icon</label><input value={form.icon} onChange={e => set('icon', e.target.value)} /></div>
                <div className="admin-form-group"><label>Display Order</label><input type="number" value={form.displayOrder} onChange={e => set('displayOrder', +e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Destinations (JSON array)</label><input value={form.destinations} onChange={e => set('destinations', e.target.value)} /></div>
              <div className="admin-form-group"><label>Tags (JSON array)</label><input value={form.tags} onChange={e => set('tags', e.target.value)} /></div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="admin-form-group"><label>SEO Title</label><input value={form.seoTitle} onChange={e => set('seoTitle', e.target.value)} /></div>
              <div className="admin-form-group"><label>SEO Description</label><textarea value={form.seoDescription} onChange={e => set('seoDescription', e.target.value)} /></div>
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
