import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Phone, Building2 } from 'lucide-react';
import { hospitals } from '../data/hospitals';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function HospitalDetails() {
  const { id } = useParams<{ id: string }>();
  const h = hospitals.find(x => x.id === Number(id));
  if (!h) return <div className="page"><div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}><h2>Hospital not found</h2><Link to="/hospitals" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Back to Hospitals</Link></div></div>;
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">{h.country}</span>
          <h1 className="page-hero__title">{h.name}</h1>
          <p><MapPin size={14} style={{ display: 'inline' }} /> {h.city}, {h.country}</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <Link to="/hospitals" className="back-link"><ArrowLeft size={16} /> Back to Hospitals</Link>
          <div className="detail-grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <img src={h.image} alt={h.name} className="detail-img" />
              <h2 style={{ marginBottom: '1rem' }}>About {h.name}</h2>
              <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>{h.description}</p>
              <p style={{ lineHeight: 1.8, color: 'var(--muted-text)', marginBottom: '1.5rem' }}>This is a sample hospital listing for demonstration purposes. Medgem can help coordinate access to suitable medical centres based on your specific treatment needs and preferences.</p>
              <div className="detail-tags">{h.specialties.map(s => <span key={s} className="tag">{s}</span>)}</div>
            </motion.div>
            <div className="detail-sidebar">
              <h3>Hospital Overview</h3>
              <div className="sidebar-info">
                <div className="sidebar-info-item"><span>Location</span><span>{h.city}, {h.country}</span></div>
                <div className="sidebar-info-item"><span>Established</span><span>{h.established}</span></div>
                <div className="sidebar-info-item"><span>Beds</span><span>{h.beds}+</span></div>
                <div className="sidebar-info-item"><span>Accreditation</span><span>{h.accreditation}</span></div>
                <div className="sidebar-info-item"><span>Rating</span><span><Star size={13} fill="#C5A45D" color="#C5A45D" /> {h.rating} / 5</span></div>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)', marginBottom: '1.5rem', fontStyle: 'italic' }}>Sample data only. Not a verified hospital listing.</p>
              <Link to="/consultation" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}><Phone size={16} /> Enquire About This Hospital</Link>
              <Link to="/hospitals" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}><Building2 size={16} /> View All Hospitals</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
