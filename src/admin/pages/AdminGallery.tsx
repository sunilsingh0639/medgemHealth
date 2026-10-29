import { useEffect, useRef, useState } from 'react';
import { galleryApi, type GalleryEntry, type GalleryImage, type GalleryUpsertRequest } from '../../api';
import { Plus, Pencil, Trash2, X, Upload, Image } from 'lucide-react';

const emptyForm: GalleryUpsertRequest = {
  patientName: '', treatmentName: '', title: '', description: '',
  location: '', status: 'draft', displayOrder: 0, consentGiven: false,
};

export default function AdminGallery() {
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'form' | 'images' | null>(null);
  const [editing, setEditing] = useState<GalleryEntry | null>(null);
  const [form, setForm] = useState<GalleryUpsertRequest>({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    galleryApi.getAll().then(r => setEntries(r.data.data ?? [])).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setMsg(''); setModal('form'); };
  const openEdit = (e: GalleryEntry) => {
    setEditing(e);
    setForm({ patientName: e.patientName, treatmentName: e.treatmentName, title: e.title, description: e.description, location: e.location, status: e.status, displayOrder: e.displayOrder, consentGiven: e.consentGiven });
    setMsg(''); setModal('form');
  };
  const openImages = (e: GalleryEntry) => { setEditing(e); setMsg(''); setModal('images'); };

  const save = async () => {
    if (!form.title.trim()) { setMsg('Title is required.'); return; }
    setSaving(true);
    try {
      if (editing) await galleryApi.update(editing.id, form);
      else await galleryApi.create(form);
      setModal(null); load();
    } catch { setMsg('Save failed.'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this gallery entry and all its images?')) return;
    await galleryApi.delete(id); load();
  };

  const delImage = async (imgId: number) => {
    if (!confirm('Delete this image?')) return;
    await galleryApi.deleteImage(imgId);
    setEditing(prev => prev ? { ...prev, images: prev.images.filter(i => i.id !== imgId) } : prev);
    load();
  };

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing || !e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setUploading(true); setMsg('');
    try {
      const res = await galleryApi.uploadImages(editing.id, files);
      const newImgs: GalleryImage[] = res.data.data ?? [];
      setEditing(prev => prev ? { ...prev, images: [...prev.images, ...newImgs] } : prev);
      setMsg(`${newImgs.length} image(s) uploaded.`);
      load();
    } catch { setMsg('Upload failed. Check file types and size (max 10MB each).'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const set = (k: keyof GalleryUpsertRequest, v: string | number | boolean) =>
    setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="admin-page-header">
        <h1>Patient Gallery</h1>
        <button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add Gallery Entry</button>
      </div>

      <div className="admin-card">
        {loading ? <p style={{ color: '#718096' }}>Loading…</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Patient</th><th>Treatment</th><th>Images</th><th>Status</th><th>Consent</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {entries.map(e => (
                  <tr key={e.id}>
                    <td><strong>{e.title}</strong></td>
                    <td>{e.patientName}</td>
                    <td>{e.treatmentName}</td>
                    <td>{e.images.length}</td>
                    <td><span className={`badge badge--${e.status}`}>{e.status}</span></td>
                    <td>{e.consentGiven ? '✅' : '❌'}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openImages(e)} title="Manage Images"><Image size={13} /></button>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(e)}><Pencil size={13} /></button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(e.id)}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: 'center', color: '#718096' }}>No gallery entries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal === 'form' && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 680 }}>
            <div className="admin-modal__header">
              <h2>{editing ? 'Edit Gallery Entry' : 'Add Gallery Entry'}</h2>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(null)}><X size={14} /></button>
            </div>
            {msg && <div style={{ padding: '8px 12px', background: '#fff5f5', color: '#e53e3e', borderRadius: 8, marginBottom: '1rem', fontSize: '0.85rem' }}>{msg}</div>}
            <div className="admin-form">
              <div className="admin-form-group"><label>Title *</label><input value={form.title} onChange={e => set('title', e.target.value)} /></div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Patient Display Name</label><input value={form.patientName} onChange={e => set('patientName', e.target.value)} /></div>
                <div className="admin-form-group"><label>Treatment Name</label><input value={form.treatmentName} onChange={e => set('treatmentName', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Location</label><input value={form.location} onChange={e => set('location', e.target.value)} /></div>
              <div className="admin-form-group"><label>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} /></div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="admin-form-group"><label>Display Order</label><input type="number" value={form.displayOrder} onChange={e => set('displayOrder', +e.target.value)} /></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" id="consent-g" checked={form.consentGiven} onChange={e => set('consentGiven', e.target.checked)} style={{ width: 'auto' }} />
                <label htmlFor="consent-g" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Patient consent obtained and recorded</label>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'images' && editing && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 760 }}>
            <div className="admin-modal__header">
              <h2>Manage Images — {editing.title}</h2>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(null)}><X size={14} /></button>
            </div>
            {msg && (
              <div style={{ padding: '8px 12px', background: msg.includes('fail') ? '#fff5f5' : '#c6f6d5', color: msg.includes('fail') ? '#e53e3e' : '#276749', borderRadius: 8, marginBottom: '1rem', fontSize: '0.85rem' }}>{msg}</div>
            )}
            <label className="admin-btn admin-btn--primary" style={{ cursor: 'pointer', marginBottom: '1rem', display: 'inline-flex' }}>
              {uploading ? 'Uploading…' : <><Upload size={15} /> Upload Images</>}
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={uploadImages} disabled={uploading} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
              {editing.images.map((img, idx) => (
                <div key={img.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img src={img.url} alt={img.altText || `Image ${idx + 1}`} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                  <button onClick={() => delImage(img.id)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(229,62,62,0.9)', border: 'none', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                    <Trash2 size={12} />
                  </button>
                  {img.caption && <p style={{ fontSize: '0.7rem', padding: '4px 6px', background: '#f4f6fb', color: '#718096', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.caption}</p>}
                </div>
              ))}
              {editing.images.length === 0 && <p style={{ color: '#718096', gridColumn: '1/-1' }}>No images yet. Upload some above.</p>}
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
