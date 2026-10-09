import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import './PageStyles.css';

export default function NotFound() {
  return (
    <div className="page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: 'clamp(6rem, 15vw, 10rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
            404
          </div>
          <h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Page Not Found</h2>
          <p style={{ marginBottom: '2rem', maxWidth: 400, margin: '0 auto 2rem' }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-primary"><Home size={16} /> Go Home</Link>
            <Link to="/treatments" className="btn-secondary">Explore Treatments <ArrowRight size={16} /></Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
