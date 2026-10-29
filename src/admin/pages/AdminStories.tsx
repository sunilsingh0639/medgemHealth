import { useEffect, useRef, useState } from 'react';
import { storiesApi, type PatientStory, type StoryPhoto, type StoryUpsertRequest } from '../../api';
import { Plus, Pencil, Trash2, X, Upload, Image, Play } from 'lucide-react';

const emptyForm: StoryUpsertRequest = {
  patientName: '', treatment: '', hospital: '', title: '', description: '',
  thumbnailUrl: '', videoUrl: '', videoTitle: '', videoProvider: 'youtube',
  isFeatured: false, status: 'draft', displayOrder: 0, consentGiven: false,
  publishedAt: new Date().toISOString(),
};

export default function AdminStories() {
  const [stories, setStories] = useState<PatientStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'form' | 'media' | null>(null);
  const [editing, setEditing] = useState<PatientStory | null>(null);
  const [form, setForm] = useState<StoryUpsertRequest>({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const thumbRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    storiesApi.getAll().then(r => setStories(r.data.data ?? [])).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setMsg(''); setModal('form'); };
  const openEdit = (s: PatientStory) => {
    setEditing(s);
    setForm({
      patientName: s.patientName, treatment: s.treatment, hospital: s.hospital,
      title: s.title, description: s.description, thumbnailUrl: s.thumbnailUrl,
      videoUrl: s.videoUrl, videoTitle: s.videoTitle, videoProvider: s.videoProvider,
      isFeatured: s.isFeatured, status: s.status, displayOrder: s.displayOrder,
      consentGiven: s.consentGiven, publishedAt: s.publishedAt,
    });
    setMsg(''); setModal('form');
  };
  const openMedia = (s: PatientStory) => { setEditing(s); setMsg(''); setModal('media'); };

  const save = async () => {
    if (!form.title.trim()) { setMsg('Title is required.'); return; }
    setSaving(true);
    try {
      if (editing) await storiesApi.update(editing.id, form);
      else await storiesApi.create(form);
      setModal(null); load();
    } catch { setMsg('Save failed. Check video URL format if using YouTube/Vimeo.'); }
    finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this story?')) return;
    await storiesApi.delete(id); load();
  };

  const delPhoto = async (photoId: number) => {
    if (!confirm('Delete this photo?')) return;
    await storiesApi.deletePhoto(photoId);
    setEditing(prev => prev ? { ...prev, photos: prev.photos.filter(p => p.id !== photoId) } : prev);
    load();
  };

  const uploadThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing || !e.target.files?.[0]) return;
    setUploading(true); setMsg('');
    try {
      const res = await storiesApi.uploadThumbnail(editing.id, e.target.files[0]);
      const url: string = res.data.data ?? '';
      setEditing(prev => prev ? { ...prev, thumbnailUrl: url } : prev);
      setForm(f => ({ ...f, thumbnailUrl: url }));
      setMsg('Thumbnail uploaded.');
      load();
    } catch { setMsg('Thumbnail upload failed.'); }
    finally { setUploading(false); if (thumbRef.current) thumbRef.current.value = ''; }
  };

  const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing || !e.target.files?.[0]) return;
    setUploading(true); setMsg('');
    try {
      const res = await storiesApi.uploadVideo(editing.id, e.target.files[0]);
      const url: string = res.data.data ?? '';
      setEditing(prev => prev ? { ...prev, videoUrl: url, videoProvider: 'upload' } : prev);
      setForm(f => ({ ...f, videoUrl: url, videoProvider: 'upload' }));
      setMsg('Video uploaded.');
      load();
    } catch { setMsg('Video upload failed. Max 200MB, MP4/WebM/OGG only.'); }
    finally { setUploading(false); if (videoRef.current) videoRef.current.value = ''; }
  };

  const uploadPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing || !e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setUploading(true); setMsg('');
    try {
      const res = await storiesApi.uploadPhotos(editing.id, files);
      const newPhotos: StoryPhoto[] = res.data.data ?? [];
      setEditing(prev => prev ? { ...prev, photos: [...prev.photos, ...newPhotos] } : prev);
      setMsg(`${newPhotos.length} photo(s) uploaded.`);
      load();
    } catch { setMsg('Photo upload failed.'); }
    finally { setUploading(false); if (photosRef.current) photosRef.current.value = ''; }
  };

  const set = (k: keyof StoryUpsertRequest, v: string | number | boolean) =>
    setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="admin-page-header">
        <h1>Patient Success Stories</h1>
        <button className="admin-btn admin-btn--primary" onClick={openCreate}><Plus size={16} /> Add Story</button>
      </div>

      <div className="admin-card">
        {loading ? <p style={{ color: '#718096' }}>Loading…</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Patient</th><th>Treatment</th><th>Video</th><th>Featured</th><th>Status</th><th>Consent</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {stories.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.title}</strong></td>
                    <td>{s.patientName}</td>
                    <td>{s.treatment}</td>
                    <td>{s.videoUrl ? <span style={{ color: '#38a169' }}>✓ {s.videoProvider}</span> : '—'}</td>
                    <td>{s.isFeatured ? '⭐' : '—'}</td>
                    <td><span className={`badge badge--${s.status}`}>{s.status}</span></td>
                    <td>{s.consentGiven ? '✅' : '❌'}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openMedia(s)} title="Media"><Image size={13} /></button>
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(s)}><Pencil size={13} /></button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(s.id)}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
                {stories.length === 0 && (
                  <tr><td colSpan={8} style={{ textAlign: 'center', color: '#718096' }}>No stories yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal === 'form' && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 720 }}>
            <div className="admin-modal__header">
              <h2>{editing ? 'Edit Story' : 'Add Story'}</h2>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(null)}><X size={14} /></button>
            </div>
            {msg && <div style={{ padding: '8px 12px', background: '#fff5f5', color: '#e53e3e', borderRadius: 8, marginBottom: '1rem', fontSize: '0.85rem' }}>{msg}</div>}
            <div className="admin-form">
              <div className="admin-form-group"><label>Title *</label><input value={form.title} onChange={e => set('title', e.target.value)} /></div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Patient Display Name</label><input value={form.patientName} onChange={e => set('patientName', e.target.value)} /></div>
                <div className="admin-form-group"><label>Treatment</label><input value={form.treatment} onChange={e => set('treatment', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Hospital / Destination</label><input value={form.hospital} onChange={e => set('hospital', e.target.value)} /></div>
              <div className="admin-form-group"><label>Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} /></div>
              <div className="admin-form-group"><label>Thumbnail URL (or upload via Media tab after saving)</label><input value={form.thumbnailUrl} onChange={e => set('thumbnailUrl', e.target.value)} placeholder="https://..." /></div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Video Provider</label>
                  <select value={form.videoProvider} onChange={e => set('videoProvider', e.target.value)}>
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="upload">Uploaded File</option>
                  </select>
                </div>
                <div className="admin-form-group"><label>Video Title</label><input value={form.videoTitle} onChange={e => set('videoTitle', e.target.value)} /></div>
              </div>
              {form.videoProvider !== 'upload' && (
                <div className="admin-form-group"><label>Video URL (YouTube or Vimeo)</label><input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." /></div>
              )}
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
              <div className="admin-form-group"><label>Published Date</label><input type="date" value={form.publishedAt.slice(0, 10)} onChange={e => set('publishedAt', new Date(e.target.value).toISOString())} /></div>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  <input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} style={{ width: 'auto' }} />
                  Feature on homepage
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  <input type="checkbox" checked={form.consentGiven} onChange={e => set('consentGiven', e.target.checked)} style={{ width: 'auto' }} />
                  Patient consent obtained
                </label>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'media' && editing && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 760 }}>
            <div className="admin-modal__header">
              <h2>Media — {editing.title}</h2>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setModal(null)}><X size={14} /></button>
            </div>
            {msg && (
              <div style={{ padding: '8px 12px', background: msg.includes('fail') ? '#fff5f5' : '#c6f6d5', color: msg.includes('fail') ? '#e53e3e' : '#276749', borderRadius: 8, marginBottom: '1rem', fontSize: '0.85rem' }}>{msg}</div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <label className="admin-btn admin-btn--secondary" style={{ cursor: 'pointer' }}>
                {uploading ? 'Uploading…' : <><Upload size={14} /> Upload Thumbnail</>}
                <input ref={thumbRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadThumbnail} disabled={uploading} />
              </label>
              <label className="admin-btn admin-btn--secondary" style={{ cursor: 'pointer' }}>
                {uploading ? 'Uploading…' : <><Play size={14} /> Upload Video</>}
                <input ref={videoRef} type="file" accept="video/mp4,video/webm,video/ogg" style={{ display: 'none' }} onChange={uploadVideo} disabled={uploading} />
              </label>
              <label className="admin-btn admin-btn--primary" style={{ cursor: 'pointer' }}>
                {uploading ? 'Uploading…' : <><Upload size={14} /> Upload Photos</>}
                <input ref={photosRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={uploadPhotos} disabled={uploading} />
              </label>
            </div>

            {editing.thumbnailUrl && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#718096', marginBottom: '0.5rem' }}>THUMBNAIL</p>
                <img src={editing.thumbnailUrl} alt="thumbnail" style={{ height: 100, borderRadius: 8, objectFit: 'cover' }} />
              </div>
            )}

            {editing.videoUrl && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#718096', marginBottom: '0.5rem' }}>VIDEO ({editing.videoProvider})</p>
                <p style={{ fontSize: '0.8rem', color: '#4a5568', wordBreak: 'break-all' }}>{editing.videoUrl}</p>
              </div>
            )}

            <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#718096', marginBottom: '0.5rem' }}>PHOTOS ({editing.photos.length})</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {editing.photos.map((p, idx) => (
                <div key={p.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img src={p.url} alt={p.altText || `Photo ${idx + 1}`} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                  <button onClick={() => delPhoto(p.id)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(229,62,62,0.9)', border: 'none', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              {editing.photos.length === 0 && <p style={{ color: '#718096', gridColumn: '1/-1' }}>No photos yet.</p>}
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
