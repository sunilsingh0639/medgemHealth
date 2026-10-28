import { useEffect, useState } from 'react';
import { contentApi, type HomePageContent } from '../../api';

export default function AdminHomePage() {
  const [form, setForm] = useState<HomePageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    contentApi.getHomePage().then(r => setForm(r.data.data));
  }, []);

  const set = (k: keyof HomePageContent, v: string | number) =>
    setForm(f => f ? { ...f, [k]: v } : f);

  const save = async () => {
    if (!form) return;
    setSaving(true); setMsg('');
    try {
      await contentApi.updateHomePage(form);
      setMsg('Saved successfully!');
    } catch { setMsg('Save failed.'); }
    finally { setSaving(false); }
  };

  if (!form) return <p style={{ color: '#718096' }}>Loading...</p>;

  return (
    <div>
      <div className="admin-page-header">
        <h1>Home Page Content</h1>
        <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
      {msg && <div style={{ padding: '10px 16px', background: msg.includes('success') ? '#c6f6d5' : '#fff5f5', color: msg.includes('success') ? '#276749' : '#e53e3e', borderRadius: 8, marginBottom: '1rem', fontSize: '0.875rem' }}>{msg}</div>}

      <div className="admin-card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>Hero Section</h3>
        <div className="admin-form">
          <div className="admin-form-group"><label>Badge Text</label><input value={form.heroBadgeText} onChange={e => set('heroBadgeText', e.target.value)} /></div>
          <div className="admin-form-group"><label>Main Heading</label><input value={form.heroHeading} onChange={e => set('heroHeading', e.target.value)} /></div>
          <div className="admin-form-group"><label>Subheading</label><input value={form.heroSubheading} onChange={e => set('heroSubheading', e.target.value)} /></div>
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Primary CTA Label</label><input value={form.heroCtaPrimaryLabel} onChange={e => set('heroCtaPrimaryLabel', e.target.value)} /></div>
            <div className="admin-form-group"><label>Primary CTA URL</label><input value={form.heroCtaPrimaryUrl} onChange={e => set('heroCtaPrimaryUrl', e.target.value)} /></div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Secondary CTA Label</label><input value={form.heroCtaSecondaryLabel} onChange={e => set('heroCtaSecondaryLabel', e.target.value)} /></div>
            <div className="admin-form-group"><label>Secondary CTA URL</label><input value={form.heroCtaSecondaryUrl} onChange={e => set('heroCtaSecondaryUrl', e.target.value)} /></div>
          </div>
          <div className="admin-form-group"><label>Video URL</label><input value={form.heroVideoUrl} onChange={e => set('heroVideoUrl', e.target.value)} /></div>
          <div className="admin-form-group"><label>Poster Image URL</label><input value={form.heroPosterUrl} onChange={e => set('heroPosterUrl', e.target.value)} /></div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>Statistics</h3>
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Patients Assisted</label><input type="number" value={form.statPatients} onChange={e => set('statPatients', +e.target.value)} /></div>
            <div className="admin-form-group"><label>Healthcare Partners</label><input type="number" value={form.statPartners} onChange={e => set('statPartners', +e.target.value)} /></div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group"><label>Countries Covered</label><input type="number" value={form.statCountries} onChange={e => set('statCountries', +e.target.value)} /></div>
            <div className="admin-form-group"><label>Medical Specialties</label><input type="number" value={form.statSpecialties} onChange={e => set('statSpecialties', +e.target.value)} /></div>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>Why Choose Us Section</h3>
        <div className="admin-form">
          <div className="admin-form-group"><label>Heading</label><input value={form.whyHeading} onChange={e => set('whyHeading', e.target.value)} /></div>
          <div className="admin-form-group"><label>Subheading</label><textarea value={form.whySubheading} onChange={e => set('whySubheading', e.target.value)} /></div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>Second Opinion Section</h3>
        <div className="admin-form">
          <div className="admin-form-group"><label>Heading</label><input value={form.secondOpinionHeading} onChange={e => set('secondOpinionHeading', e.target.value)} /></div>
          <div className="admin-form-group"><label>Subheading</label><textarea value={form.secondOpinionSubheading} onChange={e => set('secondOpinionSubheading', e.target.value)} /></div>
          <div className="admin-form-group"><label>Image URL</label><input value={form.secondOpinionImage} onChange={e => set('secondOpinionImage', e.target.value)} /></div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>Contact Banner</h3>
        <div className="admin-form">
          <div className="admin-form-group"><label>Heading</label><input value={form.contactBannerHeading} onChange={e => set('contactBannerHeading', e.target.value)} /></div>
          <div className="admin-form-group"><label>Subheading</label><textarea value={form.contactBannerSubheading} onChange={e => set('contactBannerSubheading', e.target.value)} /></div>
        </div>
      </div>
    </div>
  );
}
