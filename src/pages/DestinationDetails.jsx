import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Stethoscope, Phone, CheckCircle } from 'lucide-react';
import { destinations } from '../data/destinations';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function DestinationDetails() {
  const { id } = useParams();
  const dest = destinations.find(x => x.id === Number(id));
  if (!dest) return <div className="page"><div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}><h2>Destination not found</h2><Link to="/destinations" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Back to Destinations</Link></div></div>;

  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">{dest.flag} Medical Destination</span>
          <h1 className="page-hero__title">{dest.country}</h1>
          <p>{dest.tagline}</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <Link to="/destinations" className="back-link"><ArrowLeft size={16} /> Back to Destinations</Link>
          <div className="detail-grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <img src={dest.image} alt={dest.country} className="detail-img" />
              <h2 style={{ marginBottom: '1rem' }}>Healthcare in {dest.country}</h2>
              <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>{dest.description}</p>
              <h3 style={{ marginBottom: '1rem' }}>Key Highlights</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {dest.highlights.map(h => (
                  <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <CheckCircle size={16} color="var(--royal-purple)" /> {h}
                  </li>
                ))}
              </ul>
              <h3 style={{ marginBottom: '1rem' }}>Available Treatments</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {dest.treatments.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)', marginTop: '1.5rem', fontStyle: 'italic' }}>
                All figures and information are sample demo data.
              </p>
            </motion.div>
            <div className="detail-sidebar">
              <h3>Destination Overview</h3>
              <div className="sidebar-info">
                <div className="sidebar-info-item"><span>Country</span><span>{dest.flag} {dest.country}</span></div>
                <div className="sidebar-info-item"><span>Cities</span><span>{dest.city}</span></div>
                <div className="sidebar-info-item"><span><Building2 size={13} /> Hospitals</span><span>{dest.hospitals}+ (Sample)</span></div>
                <div className="sidebar-info-item"><span><Stethoscope size={13} /> Specialists</span><span>{dest.specialists}+ (Sample)</span></div>
              </div>
              <Link to="/consultation" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Phone size={16} /> Enquire About {dest.country}
              </Link>
              <Link to="/hospitals" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Building2 size={16} /> View Hospitals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
