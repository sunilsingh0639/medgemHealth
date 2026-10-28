import { useEffect, useState } from 'react';
import { destinationsApi, type Destination } from '../../api';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';

const empty: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'> = {
  country: '', city: '', slug: '', tagline: '', description: '', image: '',
  treatments: '[]', hospitals: 0, specialists: 0, flag: '', highlights: '[]',
  status: 'published', displayOrder: 0, seoTitle: '', seoDescription: '',
};

export default function AdminDestinations() {
  const [items, setItems] = useState<Destination[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const load = () => { setLoading(true); destinationsApi.getAll().then(r => { setItems(r.data.data.items); setTotal(r.data.data.total); }).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setError(''); setModal(true); };
  const openEdit = (d: Destination) => { setEditing(d); setForm({ country: d.country, city: d.city, slug: d.slug, tagline: d.tagline, description: d.description, image: d.image, treatments: d.treatments, hospitals: d.hospitals, specialists: d.specialists, flag: d.flag, highlights: d.highlights, status: d.status, displayOrder: d.displayOrder, seoTitle: d.seoTitle, seoDescription: d.seoDescription }); setError(''); setModal(true); };

  const save = async () => {
    setSaving(true); setError('');
    try { if (editing) await destinationsApi.update(editing.id, form); else await destinationsApi.create(form); setModal(false); load(); }
    catch (e: unknown) { setError((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => { if (!confirm('Delete?')) return; await destinationsApi.delete(id); load(); };
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  const filtered = items.filter(d => d.country.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="admin-page-header"><h1>Destinations ({total})</h1><button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add Destination</button></div>
      <div className="admin-card">
        <div className="admin-toolbar"><div className="admin-search"><Search size={16} /><input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div></div>
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Country</th><th>City</th><th>Hospitals</th><th>Specialists</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{filtered.map(d => (
                <tr key={d.id}>
                  <td><strong>{d.flag} {d.country}</strong></td><td>{d.city}</td>
                  <td>{d.hospitals}</td><td>{d.specialists}</td>
                  <td><span className={`badge badge--${d.status}`}>{d.status}</span></td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(d)}><Pencil size={13} /></button>
                    <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(d.id)}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <div className="admin-modal-overlay"><div className="admin-modal">
          <div className="admin-modal__header"><h2>{editing ? 'Edit Destination' : 'Add Destination'}</h2><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(false)}><X size={14} /></button></div>
          <div className="admin-form">
            <div className="admin-form-row"><div className="admin-form-group"><label>Country *</label><input value={form.country} onChange={e => set('country', e.target.value)} /></div><div className="admin-form-group"><label>Slug *</label><input value={form.slug} onChange={e => set('slug', e.target.value)} /></div></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>City</label><input value={form.city} onChange={e => set('city', e.target.value)} /></div><div className="admin-form-group"><label>Flag Emoji</label><input value={form.flag} onChange={e => set('flag', e.target.value)} /></div></div>
            <div className="admin-form-group"><label>Tagline</label><input value={form.tagline} onChange={e => set('tagline', e.target.value)} /></div>
            <div className="admin-form-group"><label>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} /></div>
            <div className="admin-form-group"><label>Image URL</label><input value={form.image} onChange={e => set('image', e.target.value)} /></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Hospitals Count</label><input type="number" value={form.hospitals} onChange={e => set('hospitals', +e.target.value)} /></div><div className="admin-form-group"><label>Specialists Count</label><input type="number" value={form.specialists} onChange={e => set('specialists', +e.target.value)} /></div></div>
            <div className="admin-form-group"><label>Treatments (JSON array)</label><input value={form.treatments} onChange={e => set('treatments', e.target.value)} /></div>
            <div className="admin-form-group"><label>Highlights (JSON array)</label><input value={form.highlights} onChange={e => set('highlights', e.target.value)} /></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => set('status', e.target.value)}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></div><div className="admin-form-group"><label>Display Order</label><input type="number" value={form.displayOrder} onChange={e => set('displayOrder', +e.target.value)} /></div></div>
            {error && <p style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{error}</p>}
          </div>
          <div className="admin-modal__footer"><button className="admin-btn admin-btn--secondary" onClick={() => setModal(false)}>Cancel</button><button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
        </div></div>
      )}
    </div>
  );
}
