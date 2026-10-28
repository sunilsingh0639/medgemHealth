import { useEffect, useRef, useState } from 'react';
import { mediaApi } from '../../api';
import { Upload, Trash2, Copy } from 'lucide-react';

interface MediaItem { id: number; fileName: string; originalName: string; url: string; altText: string; caption: string; mimeType: string; fileSize: number; createdAt: string; }

export default function AdminMedia() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => { setLoading(true); mediaApi.getAll().then(r => setItems(r.data.data)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setMsg('');
    try { await mediaApi.upload(file); setMsg('Uploaded!'); load(); }
    catch { setMsg('Upload failed. Check file type and size (max 10MB).'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const del = async (id: number) => { if (!confirm('Delete this file?')) return; await mediaApi.delete(id); load(); };
  const copy = (url: string) => { navigator.clipboard.writeText(url); setMsg('URL copied!'); };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Media Library</h1>
        <label className="admin-btn admin-btn--primary" style={{ cursor: 'pointer' }}>
          {uploading ? 'Uploading...' : <><Upload size={16} /> Upload File</>}
          <input ref={fileRef} type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={upload} disabled={uploading} />
        </label>
      </div>
      {msg && <div style={{ padding: '10px 16px', background: msg.includes('fail') ? '#fff5f5' : '#c6f6d5', color: msg.includes('fail') ? '#e53e3e' : '#276749', borderRadius: 8, marginBottom: '1rem', fontSize: '0.875rem' }}>{msg}</div>}
      {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {items.map(m => (
            <div key={m.id} className="admin-card" style={{ padding: '0.75rem' }}>
              {m.mimeType.startsWith('image/') ? (
                <img src={m.url} alt={m.altText || m.originalName} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: '0.5rem' }} />
              ) : (
                <div style={{ width: '100%', height: 120, background: '#f4f6fb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', fontSize: '0.75rem', color: '#718096' }}>PDF</div>
              )}
              <p style={{ fontSize: '0.72rem', color: '#718096', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.5rem' }}>{m.originalName}</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => copy(m.url)} style={{ flex: 1 }}><Copy size={12} /> Copy URL</button>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(m.id)}><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: '#718096', gridColumn: '1/-1' }}>No media uploaded yet.</p>}
        </div>
      )}
    </div>
  );
}
