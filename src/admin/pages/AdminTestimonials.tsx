import { useEffect, useState } from 'react';
import { testimonialsApi, type Testimonial } from '../../api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const empty: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', country: '', treatment: '', avatar: '', text: '', rating: 5, note: '', status: 'published', displayOrder: 0,
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);

  const load = () => { setLoading(true); testimonialsApi.getAll().then(r => setItems(r.data.data)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setModal(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ name: t.name, country: t.country, treatment: t.treatment, avatar: t.avatar, text: t.text, rating: t.rating, note: t.note, status: t.status, displayOrder: t.displayOrder }); setModal(true); };
  const save = async () => { setSaving(true); try { if (editing) await testimonialsApi.update(editing.id, form); else await testimonialsApi.create(form); setModal(false); load(); } finally { setSaving(false); } };
  const del = async (id: number) => { if (!confirm('Delete?')) return; await testimonialsApi.delete(id); load(); };
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="admin-page-header"><h1>Testimonials</h1><button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add Testimonial</button></div>
      <div className="admin-card">
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Country</th><th>Treatment</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{items.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.name}</strong></td><td>{t.country}</td><td>{t.treatment}</td>
                  <td>{'★'.repeat(t.rating)}</td><td><span className={`badge badge--${t.status}`}>{t.status}</span></td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(t)}><Pencil size={13} /></button>
                    <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(t.id)}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <div className="admin-modal-overlay"><div className="admin-modal">
          <div className="admin-modal__header"><h2>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(false)}><X size={14} /></button></div>
          <div className="admin-form">
            <div className="admin-form-row"><div className="admin-form-group"><label>Name</label><input value={form.name} onChange={e => set('name', e.target.value)} /></div><div className="admin-form-group"><label>Country</label><input value={form.country} onChange={e => set('country', e.target.value)} /></div></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Treatment</label><input value={form.treatment} onChange={e => set('treatment', e.target.value)} /></div><div className="admin-form-group"><label>Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => set('rating', +e.target.value)} /></div></div>
            <div className="admin-form-group"><label>Testimonial Text</label><textarea value={form.text} onChange={e => set('text', e.target.value)} rows={4} /></div>
            <div className="admin-form-group"><label>Avatar URL</label><input value={form.avatar} onChange={e => set('avatar', e.target.value)} /></div>
            <div className="admin-form-group"><label>Note (e.g. demo disclaimer)</label><input value={form.note} onChange={e => set('note', e.target.value)} /></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => set('status', e.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></div><div className="admin-form-group"><label>Display Order</label><input type="number" value={form.displayOrder} onChange={e => set('displayOrder', +e.target.value)} /></div></div>
          </div>
          <div className="admin-modal__footer"><button className="admin-btn admin-btn--secondary" onClick={() => setModal(false)}>Cancel</button><button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
        </div></div>
      )}
    </div>
  );
}
