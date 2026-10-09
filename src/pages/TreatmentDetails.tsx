import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Phone } from 'lucide-react';
import { treatments } from '../data/treatments';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function TreatmentDetails() {
  const { id } = useParams<{ id: string }>();
  const t = treatments.find(x => x.id === Number(id));
  if (!t) return (
    <div className="page"><div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
      <h2>Treatment not found</h2>
      <Link to="/treatments" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Back to Treatments</Link>
    </div></div>
  );
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">{t.category}</span>
          <h1 className="page-hero__title">{t.title}</h1>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <Link to="/treatments" className="back-link"><ArrowLeft size={16} /> Back to Treatments</Link>
          <div className="detail-grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <img src={t.image} alt={t.title} className="detail-img" />
              <h2 style={{ marginBottom: '1rem' }}>About {t.title}</h2>
              <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>{t.description}</p>
              <p style={{ lineHeight: 1.8, color: 'var(--muted-text)' }}>This treatment is available across multiple internationally recognised medical centres. Our team can help you explore suitable options and coordinate your medical journey. All information presented is for illustrative purposes only.</p>
              <div className="detail-tags">{t.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
              <div className="detail-tags">{t.destinations.map(d => <span key={d} className="tag"><MapPin size={12} /> {d}</span>)}</div>
            </motion.div>
            <div className="detail-sidebar">
              <h3>Treatment Overview</h3>
              <div className="sidebar-info">
                <div className="sidebar-info-item"><span>Category</span><span>{t.category}</span></div>
                <div className="sidebar-info-item"><span>Typical Duration</span><span><Clock size={13} /> {t.duration}</span></div>
                <div className="sidebar-info-item"><span>Top Destinations</span><span>{t.destinations.join(', ')}</span></div>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)', marginBottom: '1.5rem', fontStyle: 'italic' }}>Sample information only. Actual treatment details vary by patient and provider.</p>
              <Link to="/consultation" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}><Phone size={16} /> Request Consultation</Link>
              <Link to="/second-opinion" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Get Second Opinion</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
