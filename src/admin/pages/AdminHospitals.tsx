import { useEffect, useState } from 'react';
import { hospitalsApi, type Hospital } from '../../api';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';

const empty: Omit<Hospital, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', slug: '', city: '', country: '', image: '', specialties: '[]',
  accreditation: '', description: '', beds: 0, established: 2000, rating: 4.5,
  status: 'published', displayOrder: 0, seoTitle: '', seoDescription: '',
};

export default function AdminHospitals() {
  const [items, setItems] = useState<Hospital[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Hospital | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const load = () => { setLoading(true); hospitalsApi.getAll().then(r => { setItems(r.data.data.items); setTotal(r.data.data.total); }).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setError(''); setModal(true); };
  const openEdit = (h: Hospital) => { setEditing(h); setForm({ name: h.name, slug: h.slug, city: h.city, country: h.country, image: h.image, specialties: h.specialties, accreditation: h.accreditation, description: h.description, beds: h.beds, established: h.established, rating: h.rating, status: h.status, displayOrder: h.displayOrder, seoTitle: h.seoTitle, seoDescription: h.seoDescription }); setError(''); setModal(true); };

  const save = async () => {
    setSaving(true); setError('');
    try { if (editing) await hospitalsApi.update(editing.id, form); else await hospitalsApi.create(form); setModal(false); load(); }
    catch (e: unknown) { setError((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => { if (!confirm('Delete?')) return; await hospitalsApi.delete(id); load(); };
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  const filtered = items.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.country.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="admin-page-header"><h1>Hospitals ({total})</h1><button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add Hospital</button></div>
      <div className="admin-card">
        <div className="admin-toolbar"><div className="admin-search"><Search size={16} /><input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div></div>
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>City</th><th>Country</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{filtered.map(h => (
                <tr key={h.id}>
                  <td><strong>{h.name}</strong></td><td>{h.city}</td><td>{h.country}</td>
                  <td>{h.rating}</td><td><span className={`badge badge--${h.status}`}>{h.status}</span></td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(h)}><Pencil size={13} /></button>
                    <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(h.id)}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <div className="admin-modal-overlay"><div className="admin-modal">
          <div className="admin-modal__header"><h2>{editing ? 'Edit Hospital' : 'Add Hospital'}</h2><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(false)}><X size={14} /></button></div>
          <div className="admin-form">
            <div className="admin-form-row"><div className="admin-form-group"><label>Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} /></div><div className="admin-form-group"><label>Slug *</label><input value={form.slug} onChange={e => set('slug', e.target.value)} /></div></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>City</label><input value={form.city} onChange={e => set('city', e.target.value)} /></div><div className="admin-form-group"><label>Country</label><input value={form.country} onChange={e => set('country', e.target.value)} /></div></div>
            <div className="admin-form-group"><label>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} /></div>
            <div className="admin-form-group"><label>Image URL</label><input value={form.image} onChange={e => set('image', e.target.value)} /></div>
            <div className="admin-form-group"><label>Specialties (JSON array)</label><input value={form.specialties} onChange={e => set('specialties', e.target.value)} /></div>
            <div className="admin-form-group"><label>Accreditation</label><input value={form.accreditation} onChange={e => set('accreditation', e.target.value)} /></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Beds</label><input type="number" value={form.beds} onChange={e => set('beds', +e.target.value)} /></div><div className="admin-form-group"><label>Established</label><input type="number" value={form.established} onChange={e => set('established', +e.target.value)} /></div></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Rating</label><input type="number" step="0.1" value={form.rating} onChange={e => set('rating', +e.target.value)} /></div><div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => set('status', e.target.value)}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></div></div>
            {error && <p style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{error}</p>}
          </div>
          <div className="admin-modal__footer"><button className="admin-btn admin-btn--secondary" onClick={() => setModal(false)}>Cancel</button><button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
        </div></div>
      )}
    </div>
  );
}
