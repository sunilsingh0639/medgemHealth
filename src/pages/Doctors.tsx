import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Languages, ArrowRight, Search } from 'lucide-react';
import { doctors, specialties } from '../data/doctors';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function Doctors() {
  const [query, setQuery] = useState('');
  const [spec, setSpec] = useState('All');
  const filtered = doctors.filter(d => {
    const matchS = spec === 'All' || d.specialty.toLowerCase().includes(spec.toLowerCase());
    const matchQ = !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase());
    return matchS && matchQ;
  });
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Medical Specialists</span>
          <h1 className="page-hero__title">Find a Specialist</h1>
          <p>Explore our sample directory of medical specialists. All profiles are illustrative demo data.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="page-toolbar">
            <div className="page-search"><Search size={16} /><input placeholder="Search doctors..." value={query} onChange={e => setQuery(e.target.value)} /></div>
            <div className="page-filters">{specialties.map(s => <button key={s} className={`filter-btn ${spec === s ? 'filter-btn--active' : ''}`} onClick={() => setSpec(s)}>{s}</button>)}</div>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state"><p>No doctors found. <button onClick={() => { setSpec('All'); setQuery(''); }} className="link-btn">Clear filters</button></p></div>
          ) : (
            <motion.div className="grid-listing" variants={staggerContainer} initial="hidden" animate="visible">
              {filtered.map(doc => (
                <motion.div key={doc.id} className="doctor-card" variants={fadeUp} style={{ flex: 'none' }}>
                  <div className="doctor-card__img-wrap"><img src={doc.image} alt={doc.name} loading="lazy" className="doctor-card__img" /></div>
                  <div className="doctor-card__body">
                    <h3 className="doctor-card__name">{doc.name}</h3>
                    <p className="doctor-card__spec">{doc.specialty}</p>
                    <p className="doctor-card__hospital"><MapPin size={12} /> {doc.hospital}</p>
                    <p className="doctor-card__exp">Experience: {doc.experience}</p>
                    <div className="doctor-card__langs"><Languages size={12} /><span>{doc.languages.join(', ')}</span></div>
                    <div className="doctor-card__actions">
                      <Link to={`/doctors/${doc.id}`} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>View Profile</Link>
                      <Link to="/consultation" className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>Consult</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
