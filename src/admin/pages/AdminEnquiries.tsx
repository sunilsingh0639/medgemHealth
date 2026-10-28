import { useEffect, useState } from 'react';
import { enquiriesApi, type Enquiry } from '../../api';
import { Search, Eye, X } from 'lucide-react';

export default function AdminEnquiries() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    enquiriesApi.getAll({ search, status: statusFilter, type: typeFilter })
      .then(r => { setItems(r.data.data.items); setTotal(r.data.data.total); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [search, statusFilter, typeFilter]);

  const openDetail = (e: Enquiry) => { setSelected(e); setNotes(e.internalNotes); setStatus(e.status); };

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    await enquiriesApi.update(selected.id, { status, internalNotes: notes });
    setSaving(false);
    setSelected(null);
    load();
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Enquiries ({total})</h1>
      </div>
      <div className="admin-card">
        <div className="admin-toolbar">
          <div className="admin-search"><Search size={16} /><input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} /></div>
          <select className="admin-btn admin-btn--secondary" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select className="admin-btn admin-btn--secondary" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="contact">Contact</option>
            <option value="consultation">Consultation</option>
            <option value="second-opinion">Second Opinion</option>
          </select>
        </div>
        {loading ? <p style={{ color: '#718096' }}>Loading...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Type</th><th>Treatment</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(e => (
                  <tr key={e.id}>
                    <td><strong>{e.name}</strong></td>
                    <td>{e.email}</td>
                    <td><span className="badge badge--draft">{e.type}</span></td>
                    <td>{e.treatment || '—'}</td>
                    <td><span className={`badge badge--${e.status}`}>{e.status}</span></td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td><button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openDetail(e)}><Eye size={13} /></button></td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>No enquiries found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h2>Enquiry from {selected.name}</h2>
              <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => setSelected(null)}><X size={14} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {[['Email', selected.email], ['Phone', `${selected.phoneCode} ${selected.phone}`], ['Type', selected.type], ['Treatment', selected.treatment || '—'], ['Destination', selected.destination || '—'], ['Country', selected.country || '—']].map(([k, v]) => (
                <div key={k}><span style={{ color: '#718096', fontSize: '0.75rem' }}>{k}</span><br /><strong>{v}</strong></div>
              ))}
            </div>
            {selected.message && <div style={{ marginBottom: '0.75rem' }}><span style={{ fontSize: '0.75rem', color: '#718096' }}>Message</span><p style={{ fontSize: '0.875rem', marginTop: 4 }}>{selected.message}</p></div>}
            {selected.description && <div style={{ marginBottom: '0.75rem' }}><span style={{ fontSize: '0.75rem', color: '#718096' }}>Description</span><p style={{ fontSize: '0.875rem', marginTop: 4 }}>{selected.description}</p></div>}
            {selected.diagnosis && <div style={{ marginBottom: '0.75rem' }}><span style={{ fontSize: '0.75rem', color: '#718096' }}>Diagnosis</span><p style={{ fontSize: '0.875rem', marginTop: 4 }}>{selected.diagnosis}</p></div>}
            <div className="admin-form-group" style={{ marginBottom: '0.75rem' }}>
              <label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Internal Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setSelected(null)}>Close</button>
              <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
