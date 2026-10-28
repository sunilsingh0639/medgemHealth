import { useEffect, useState } from 'react';
import { footerApi, type FooterConfigData, type FooterColumnData, type FooterLinkData } from '../../api';
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronRight } from 'lucide-react';

export default function AdminFooter() {
  const [config, setConfig] = useState<FooterConfigData | null>(null);
  const [columns, setColumns] = useState<FooterColumnData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [expandedCol, setExpandedCol] = useState<number | null>(null);

  // Column modal
  const [colModal, setColModal] = useState(false);
  const [editingCol, setEditingCol] = useState<FooterColumnData | null>(null);
  const [colForm, setColForm] = useState({ heading: '', displayOrder: 0, isVisible: true });

  // Link modal
  const [linkModal, setLinkModal] = useState(false);
  const [editingLink, setEditingLink] = useState<FooterLinkData | null>(null);
  const [linkColId, setLinkColId] = useState(0);
  const [linkForm, setLinkForm] = useState({ label: '', url: '', isExternal: false, isVisible: true, displayOrder: 0 });

  const load = () => {
    setLoading(true);
    Promise.all([footerApi.getConfig(), footerApi.getColumns()])
      .then(([c, cols]) => { setConfig(c.data.data); setColumns(cols.data.data); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const saveConfig = async () => {
    if (!config) return;
    setSaving(true); setMsg('');
    try { await footerApi.updateConfig(config); setMsg('Footer config saved!'); }
    catch { setMsg('Save failed.'); }
    finally { setSaving(false); }
  };

  // Column CRUD
  const openCreateCol = () => { setEditingCol(null); setColForm({ heading: '', displayOrder: columns.length + 1, isVisible: true }); setColModal(true); };
  const openEditCol = (c: FooterColumnData) => { setEditingCol(c); setColForm({ heading: c.heading, displayOrder: c.displayOrder, isVisible: c.isVisible }); setColModal(true); };
  const saveCol = async () => {
    setSaving(true);
    try {
      if (editingCol) await footerApi.updateColumn(editingCol.id, colForm);
      else await footerApi.createColumn(colForm);
      setColModal(false); load();
    } finally { setSaving(false); }
  };
  const delCol = async (id: number) => { if (!confirm('Delete column and all its links?')) return; await footerApi.deleteColumn(id); load(); };

  // Link CRUD
  const openCreateLink = (colId: number) => { setEditingLink(null); setLinkColId(colId); setLinkForm({ label: '', url: '', isExternal: false, isVisible: true, displayOrder: 0 }); setLinkModal(true); };
  const openEditLink = (link: FooterLinkData) => { setEditingLink(link); setLinkColId(link.footerColumnId); setLinkForm({ label: link.label, url: link.url, isExternal: link.isExternal, isVisible: link.isVisible, displayOrder: link.displayOrder }); setLinkModal(true); };
  const saveLink = async () => {
    setSaving(true);
    try {
      if (editingLink) await footerApi.updateLink(editingLink.id, { ...linkForm, footerColumnId: linkColId });
      else await footerApi.createLink({ ...linkForm, footerColumnId: linkColId });
      setLinkModal(false); load();
    } finally { setSaving(false); }
  };
  const delLink = async (id: number) => { if (!confirm('Delete link?')) return; await footerApi.deleteLink(id); load(); };

  if (loading) return <p style={{ color: '#718096' }}>Loading...</p>;

  return (
    <div>
      <div className="admin-page-header"><h1>Footer Management</h1></div>
      {msg && <div style={{ padding: '10px 16px', background: msg.includes('fail') ? '#fff5f5' : '#c6f6d5', color: msg.includes('fail') ? '#e53e3e' : '#276749', borderRadius: 8, marginBottom: '1rem', fontSize: '0.875rem' }}>{msg}</div>}

      {/* Footer Config */}
      {config && (
        <div className="admin-card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Footer Settings</h3>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={saveConfig} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
          <div className="admin-form">
            <div className="admin-form-group"><label>Company Description</label><textarea value={config.companyDescription} onChange={e => setConfig({ ...config, companyDescription: e.target.value })} rows={3} /></div>
            <div className="admin-form-row">
              <div className="admin-form-group"><label>CTA Button Label</label><input value={config.ctaLabel} onChange={e => setConfig({ ...config, ctaLabel: e.target.value })} /></div>
              <div className="admin-form-group"><label>CTA Button URL</label><input value={config.ctaUrl} onChange={e => setConfig({ ...config, ctaUrl: e.target.value })} /></div>
            </div>
            <div className="admin-form-group"><label>Copyright Text</label><input value={config.copyrightText} onChange={e => setConfig({ ...config, copyrightText: e.target.value })} /></div>
            <div className="admin-form-row">
              <div className="admin-form-group"><label>Privacy Policy URL</label><input value={config.privacyPolicyUrl} onChange={e => setConfig({ ...config, privacyPolicyUrl: e.target.value })} /></div>
              <div className="admin-form-group"><label>Terms URL</label><input value={config.termsUrl} onChange={e => setConfig({ ...config, termsUrl: e.target.value })} /></div>
            </div>
            <div className="admin-form-group"><label>Cookie Policy URL</label><input value={config.cookiePolicyUrl} onChange={e => setConfig({ ...config, cookiePolicyUrl: e.target.value })} /></div>
          </div>
        </div>
      )}

      {/* Footer Columns */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Footer Columns & Links</h3>
          <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openCreateCol}><Plus size={14} /> Add Column</button>
        </div>
        {columns.map(col => (
          <div key={col.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: '0.75rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8f6f8', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setExpandedCol(expandedCol === col.id ? null : col.id)}>
              {expandedCol === col.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <strong style={{ flex: 1 }}>{col.heading}</strong>
              <span style={{ fontSize: '0.75rem', color: '#718096' }}>{col.links.length} links</span>
              <span className={`badge badge--${col.isVisible ? 'published' : 'archived'}`}>{col.isVisible ? 'visible' : 'hidden'}</span>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={e => { e.stopPropagation(); openEditCol(col); }}><Pencil size={12} /></button>
              <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={e => { e.stopPropagation(); delCol(col.id); }}><Trash2 size={12} /></button>
            </div>
            {expandedCol === col.id && (
              <div style={{ padding: '0.75rem 1rem' }}>
                <button className="admin-btn admin-btn--secondary admin-btn--sm" style={{ marginBottom: '0.75rem' }} onClick={() => openCreateLink(col.id)}><Plus size={12} /> Add Link</button>
                <table className="admin-table">
                  <thead><tr><th>Label</th><th>URL</th><th>External</th><th>Visible</th><th>Order</th><th>Actions</th></tr></thead>
                  <tbody>
                    {col.links.map(link => (
                      <tr key={link.id}>
                        <td>{link.label}</td>
                        <td style={{ fontSize: '0.78rem', color: '#718096' }}>{link.url}</td>
                        <td>{link.isExternal ? '↗' : '—'}</td>
                        <td>{link.isVisible ? '✓' : '✗'}</td>
                        <td>{link.displayOrder}</td>
                        <td style={{ display: 'flex', gap: 6 }}>
                          <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEditLink(link)}><Pencil size={12} /></button>
                          <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => delLink(link.id)}><Trash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                    {col.links.length === 0 && <tr><td colSpan={6} style={{ color: '#718096', textAlign: 'center' }}>No links</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
        {columns.length === 0 && <p style={{ color: '#718096' }}>No footer columns yet.</p>}
      </div>

      {/* Column Modal */}
      {colModal && (
        <div className="admin-modal-overlay"><div className="admin-modal">
          <div className="admin-modal__header"><h2>{editingCol ? 'Edit Column' : 'Add Column'}</h2><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setColModal(false)}><X size={14} /></button></div>
          <div className="admin-form">
            <div className="admin-form-group"><label>Heading *</label><input value={colForm.heading} onChange={e => setColForm(f => ({ ...f, heading: e.target.value }))} /></div>
            <div className="admin-form-row">
              <div className="admin-form-group"><label>Display Order</label><input type="number" value={colForm.displayOrder} onChange={e => setColForm(f => ({ ...f, displayOrder: +e.target.value }))} /></div>
              <div className="admin-form-group" style={{ justifyContent: 'flex-end', paddingTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={colForm.isVisible} onChange={e => setColForm(f => ({ ...f, isVisible: e.target.checked }))} /> Visible
                </label>
              </div>
            </div>
          </div>
          <div className="admin-modal__footer"><button className="admin-btn admin-btn--secondary" onClick={() => setColModal(false)}>Cancel</button><button className="admin-btn admin-btn--primary" onClick={saveCol} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
        </div></div>
      )}

      {/* Link Modal */}
      {linkModal && (
        <div className="admin-modal-overlay"><div className="admin-modal">
          <div className="admin-modal__header"><h2>{editingLink ? 'Edit Link' : 'Add Link'}</h2><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setLinkModal(false)}><X size={14} /></button></div>
          <div className="admin-form">
            <div className="admin-form-row">
              <div className="admin-form-group"><label>Label *</label><input value={linkForm.label} onChange={e => setLinkForm(f => ({ ...f, label: e.target.value }))} /></div>
              <div className="admin-form-group"><label>URL *</label><input value={linkForm.url} onChange={e => setLinkForm(f => ({ ...f, url: e.target.value }))} /></div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group"><label>Display Order</label><input type="number" value={linkForm.displayOrder} onChange={e => setLinkForm(f => ({ ...f, displayOrder: +e.target.value }))} /></div>
              <div className="admin-form-group" style={{ flexDirection: 'row', gap: '1rem', alignItems: 'center', paddingTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={linkForm.isExternal} onChange={e => setLinkForm(f => ({ ...f, isExternal: e.target.checked }))} /> External</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={linkForm.isVisible} onChange={e => setLinkForm(f => ({ ...f, isVisible: e.target.checked }))} /> Visible</label>
              </div>
            </div>
          </div>
          <div className="admin-modal__footer"><button className="admin-btn admin-btn--secondary" onClick={() => setLinkModal(false)}>Cancel</button><button className="admin-btn admin-btn--primary" onClick={saveLink} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></div>
        </div></div>
      )}
    </div>
  );
}
