import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Loader } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6fb', fontFamily: 'Manrope, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: 16, padding: '2.5rem', width: '100%', maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
          <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#7B426F,#D0B16B)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>M</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1a202c' }}>Medgem Admin</div>
            <div style={{ fontSize: '0.75rem', color: '#718096' }}>Content Management System</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="admin@medgem.com"
              style={{ padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a202c' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{ padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          {error && <p style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ padding: '11px', background: 'linear-gradient(135deg,#7B426F,#59304F)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? <><Loader size={16} /> Signing in...</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
