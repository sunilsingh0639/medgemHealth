import { useEffect, useState } from 'react';
import { faqsApi, type Faq } from '../../api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const empty: Omit<Faq, 'id' | 'createdAt' | 'updatedAt'> = { question: '', answer: '', category: 'General', status: 'published', displayOrder: 0 };

export default function AdminFaqs() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);

  const load = () => { setLoading(true); faqsApi.getAll().then(r => setItems(r.data.data)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setModal(true); };
  const openEdit = (f: Faq) => { setEditing(f); setForm({ question: f.question, answer: f.answer, category: f.category, status: f.status, displayOrder: f.displayOrder }); setModal(true); };
  const save = async () => { setSaving(true); try { if (editing) await faqsApi.update(editing.id, form); else await faqsApi.create(form); setModal(false); load(); } finally { setSaving(false); } };
  const del = async (id: number) => { if (!confirm('Delete?')) return; await faqsApi.delete(id); load(); };
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="admin-page-header"><h1>FAQs</h1><button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add FAQ</button></div>
      <div className="admin-card">
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Question</th><th>Category</th><th>Status</th><th>Order</th><th>Actions</th></tr></thead>
              <tbody>{items.map(f => (
                <tr key={f.id}>
                  <td style={{ maxWidth: 400 }}>{f.question}</td><td>{f.category}</td>
                  <td><span className={`badge badge--${f.status}`}>{f.status}</span></td><td>{f.displayOrder}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(f)}><Pencil size={13} /></button>
                    <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(f.id)}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <div className="admin-modal-overlay"><div className="admin-modal">
          <div className="admin-modal__header"><h2>{editing ? 'Edit FAQ' : 'Add FAQ'}</h2><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(false)}><X size={14} /></button></div>
          <div className="admin-form">
            <div className="admin-form-group"><label>Question *</label><input value={form.question} onChange={e => set('question', e.target.value)} /></div>
            <div className="admin-form-group"><label>Answer *</label><textarea value={form.answer} onChange={e => set('answer', e.target.value)} rows={4} /></div>
            <div className="admin-form-row"><div className="admin-form-group"><label>Category</label><input value={form.category} onChange={e => set('category', e.target.value)} /></div><div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => set('status', e.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></div></div>
            <div className="admin-form-group"><label>Display Order</label><input type="number" value={form.displayOrder} onChange={e => set('displayOrder', +e.target.value)} /></div>
          </div>
          <div className="admin-modal__footer"><button className="admin-btn admin-btn--secondary" onClick={() => setModal(false)}>Cancel</button><button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
        </div></div>
      )}
    </div>
  );
}
