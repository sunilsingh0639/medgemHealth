import { useEffect, useState } from 'react';
import { doctorsApi, type Doctor } from '../../api';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';

const empty: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', slug: '', specialty: '', hospital: '', country: '', experience: '',
  languages: '[]', image: '', education: '', about: '', tags: '[]',
  status: 'published', displayOrder: 0, seoTitle: '', seoDescription: '',
};

export default function AdminDoctors() {
  const [items, setItems] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const load = () => { setLoading(true); doctorsApi.getAll().then(r => { setItems(r.data.data.items); setTotal(r.data.data.total); }).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setError(''); setModal(true); };
  const openEdit = (d: Doctor) => { setEditing(d); setForm({ name: d.name, slug: d.slug, specialty: d.specialty, hospital: d.hospital, country: d.country, experience: d.experience, languages: d.languages, image: d.image, education: d.education, about: d.about, tags: d.tags, status: d.status, displayOrder: d.displayOrder, seoTitle: d.seoTitle, seoDescription: d.seoDescription }); setError(''); setModal(true); };

  const save = async () => {
    setSaving(true); setError('');
    try { if (editing) await doctorsApi.update(editing.id, form); else await doctorsApi.create(form); setModal(false); load(); }
    catch (e: unknown) { setError((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => { if (!confirm('Delete?')) return; await doctorsApi.delete(id); load(); };
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  const filtered = items.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="admin-page-header"><h1>Doctors ({total})</h1><button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add Doctor</button></div>
      <div className="admin-card">
        <div className="admin-toolbar"><div className="admin-search"><Search size={16} /><input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div></div>
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Specialty</th><th>Country</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{filtered.map(d => (
                <tr key={d.id}>
                  <td><strong>{d.name}</strong></td><td>{d.specialty}</td><td>{d.country}</td>
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
          <div className="admin-modal__header"><h2>{editing ? 'Edit Doctor' : 'Add Doctor'}</h2><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(false)}><X size={14} /></button></div>
          <div className="admin-form">
            <div className="admin-form-row"><div className="admin-form-group"><label>Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} /></div><div className="admin-form-group"><label>Slug *</label><input value={form.slug} onChange={e => set('slug', e.target.value)} /></div></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Specialty</label><input value={form.specialty} onChange={e => set('specialty', e.target.value)} /></div><div className="admin-form-group"><label>Country</label><input value={form.country} onChange={e => set('country', e.target.value)} /></div></div>
            <div className="admin-form-group"><label>Hospital</label><input value={form.hospital} onChange={e => set('hospital', e.target.value)} /></div>
            <div className="admin-form-group"><label>Experience</label><input value={form.experience} onChange={e => set('experience', e.target.value)} /></div>
            <div className="admin-form-group"><label>About</label><textarea value={form.about} onChange={e => set('about', e.target.value)} /></div>
            <div className="admin-form-group"><label>Education</label><input value={form.education} onChange={e => set('education', e.target.value)} /></div>
            <div className="admin-form-group"><label>Image URL</label><input value={form.image} onChange={e => set('image', e.target.value)} /></div>
            <div className="admin-form-group"><label>Languages (JSON array)</label><input value={form.languages} onChange={e => set('languages', e.target.value)} /></div>
            <div className="admin-form-group"><label>Tags (JSON array)</label><input value={form.tags} onChange={e => set('tags', e.target.value)} /></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => set('status', e.target.value)}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></div><div className="admin-form-group"><label>Display Order</label><input type="number" value={form.displayOrder} onChange={e => set('displayOrder', +e.target.value)} /></div></div>
            {error && <p style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{error}</p>}
          </div>
          <div className="admin-modal__footer"><button className="admin-btn admin-btn--secondary" onClick={() => setModal(false)}>Cancel</button><button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
        </div></div>
      )}
    </div>
  );
}
