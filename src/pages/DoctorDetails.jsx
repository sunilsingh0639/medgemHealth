import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Languages, Phone, GraduationCap } from 'lucide-react';
import { doctors } from '../data/doctors';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function DoctorDetails() {
  const { id } = useParams();
  const doc = doctors.find(x => x.id === Number(id));
  if (!doc) return <div className="page"><div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}><h2>Doctor not found</h2><Link to="/doctors" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Back to Doctors</Link></div></div>;

  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">{doc.specialty}</span>
          <h1 className="page-hero__title">{doc.name}</h1>
          <p><MapPin size={14} style={{ display: 'inline' }} /> {doc.hospital}</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <Link to="/doctors" className="back-link"><ArrowLeft size={16} /> Back to Doctors</Link>
          <div className="detail-grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <img src={doc.image} alt={doc.name} className="detail-img" style={{ height: '360px', objectPosition: 'top' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>{doc.name}</h2>
              <p style={{ color: 'var(--royal-purple)', fontWeight: 600, marginBottom: '1rem' }}>{doc.specialty}</p>
              <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>{doc.about}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {doc.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)', fontStyle: 'italic' }}>
                This is an illustrative demo profile. Not a real medical professional listing.
              </p>
            </motion.div>
            <div className="detail-sidebar">
              <h3>Specialist Overview</h3>
              <div className="sidebar-info">
                <div className="sidebar-info-item"><span>Specialty</span><span>{doc.specialty}</span></div>
                <div className="sidebar-info-item"><span>Hospital</span><span>{doc.hospital}</span></div>
                <div className="sidebar-info-item"><span>Country</span><span>{doc.country}</span></div>
                <div className="sidebar-info-item"><span>Experience</span><span>{doc.experience}</span></div>
                <div className="sidebar-info-item"><span><Languages size={13} /> Languages</span><span>{doc.languages.join(', ')}</span></div>
                <div className="sidebar-info-item"><span><GraduationCap size={13} /> Education</span><span style={{ fontSize: '0.78rem' }}>{doc.education}</span></div>
              </div>
              <Link to="/consultation" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Phone size={16} /> Request Consultation
              </Link>
              <Link to="/second-opinion" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Get Second Opinion
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
