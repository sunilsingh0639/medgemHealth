import { useEffect, useState } from 'react';
import { contentApi, type SiteSettings } from '../../api';

export default function AdminSettings() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { contentApi.getSettings().then(r => setForm(r.data.data)); }, []);

  const set = (k: keyof SiteSettings, v: string) => setForm(f => f ? { ...f, [k]: v } : f);

  const save = async () => {
    if (!form) return;
    setSaving(true); setMsg('');
    try { await contentApi.updateSettings(form); setMsg('Saved successfully!'); }
    catch { setMsg('Save failed.'); }
    finally { setSaving(false); }
  };

  if (!form) return <p style={{ color: '#718096' }}>Loading...</p>;

  return (
    <div>
      <div className="admin-page-header">
        <h1>Site Settings</h1>
        <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
      {msg && <div style={{ padding: '10px 16px', background: msg.includes('success') ? '#c6f6d5' : '#fff5f5', color: msg.includes('success') ? '#276749' : '#e53e3e', borderRadius: 8, marginBottom: '1rem', fontSize: '0.875rem' }}>{msg}</div>}

      <div className="admin-card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>Company Information</h3>
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Company Name</label><input value={form.companyName} onChange={e => set('companyName', e.target.value)} /></div>
            <div className="admin-form-group"><label>Logo URL</label><input value={form.logoUrl} onChange={e => set('logoUrl', e.target.value)} /></div>
          </div>
          <div className="admin-form-group"><label>Address</label><textarea value={form.address} onChange={e => set('address', e.target.value)} rows={2} /></div>
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Contact Email</label><input type="email" value={form.contactEmail} onChange={e => set('contactEmail', e.target.value)} /></div>
            <div className="admin-form-group"><label>Contact Phone</label><input value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} /></div>
          </div>
          <div className="admin-form-group"><label>WhatsApp Number</label><input value={form.whatsAppNumber} onChange={e => set('whatsAppNumber', e.target.value)} /></div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>Social Media</h3>
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Facebook URL</label><input value={form.facebookUrl} onChange={e => set('facebookUrl', e.target.value)} /></div>
            <div className="admin-form-group"><label>Twitter/X URL</label><input value={form.twitterUrl} onChange={e => set('twitterUrl', e.target.value)} /></div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Instagram URL</label><input value={form.instagramUrl} onChange={e => set('instagramUrl', e.target.value)} /></div>
            <div className="admin-form-group"><label>LinkedIn URL</label><input value={form.linkedInUrl} onChange={e => set('linkedInUrl', e.target.value)} /></div>
          </div>
          <div className="admin-form-group"><label>YouTube URL</label><input value={form.youtubeUrl} onChange={e => set('youtubeUrl', e.target.value)} /></div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>SEO & Footer</h3>
        <div className="admin-form">
          <div className="admin-form-group"><label>Default SEO Title</label><input value={form.defaultSeoTitle} onChange={e => set('defaultSeoTitle', e.target.value)} /></div>
          <div className="admin-form-group"><label>Default SEO Description</label><textarea value={form.defaultSeoDescription} onChange={e => set('defaultSeoDescription', e.target.value)} /></div>
          <div className="admin-form-group"><label>Copyright Text</label><input value={form.copyrightText} onChange={e => set('copyrightText', e.target.value)} /></div>
        </div>
      </div>
    </div>
  );
}
