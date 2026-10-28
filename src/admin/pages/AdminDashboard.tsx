import { useEffect, useState } from 'react';
import { contentApi, type DashboardData, type Enquiry } from '../../api';
import { Stethoscope, Building2, Users, Globe, MessageSquare, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    contentApi.getDashboard()
      .then(r => setData(r.data.data))
      .catch(() => setError('Failed to load dashboard data. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '2rem', color: '#718096' }}>Loading dashboard...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#e53e3e', background: '#fff5f5', borderRadius: 8 }}>{error}</div>;
  if (!data) return null;

  const stats = [
    { label: 'Treatments', value: data.totalTreatments, icon: Stethoscope, sub: `${data.publishedTreatments} published` },
    { label: 'Hospitals', value: data.totalHospitals, icon: Building2, sub: 'in database' },
    { label: 'Doctors', value: data.totalDoctors, icon: Users, sub: 'in database' },
    { label: 'Destinations', value: data.totalDestinations, icon: Globe, sub: 'in database' },
    { label: 'Total Enquiries', value: data.totalEnquiries, icon: MessageSquare, sub: `${data.newEnquiries} new` },
    { label: 'New Enquiries', value: data.newEnquiries, icon: AlertCircle, sub: 'awaiting response' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
      </div>
      <div className="admin-stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {stats.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="admin-stat-card">
            <div className="admin-stat-card__icon"><Icon size={22} /></div>
            <div>
              <div className="admin-stat-card__value">{value}</div>
              <div className="admin-stat-card__label">{label}</div>
              <div style={{ fontSize: '0.7rem', color: '#a0aec0', marginTop: 2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="admin-card">
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Enquiries</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Type</th><th>Treatment</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {data.recentEnquiries.map((e: Enquiry) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td><span className="badge badge--draft">{e.type}</span></td>
                  <td>{e.treatment || '—'}</td>
                  <td><span className={`badge badge--${e.status}`}>{e.status}</span></td>
                  <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {data.recentEnquiries.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>No enquiries yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
