import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Search } from 'lucide-react';
import { hospitals } from '../data/hospitals';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function Hospitals() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All');
  const countries = ['All', ...Array.from(new Set(hospitals.map(h => h.country)))];
  const filtered = hospitals.filter(h => {
    const matchC = country === 'All' || h.country === country;
    const matchQ = !query || h.name.toLowerCase().includes(query.toLowerCase()) || h.country.toLowerCase().includes(query.toLowerCase());
    return matchC && matchQ;
  });
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Partner Hospitals</span>
          <h1 className="page-hero__title">Explore Medical Centres</h1>
          <p>Discover internationally recognised hospitals across leading medical destinations. All listings are sample demo data.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="page-toolbar">
            <div className="page-search"><Search size={16} /><input placeholder="Search hospitals..." value={query} onChange={e => setQuery(e.target.value)} /></div>
            <div className="page-filters">{countries.map(c => <button key={c} className={`filter-btn ${country === c ? 'filter-btn--active' : ''}`} onClick={() => setCountry(c)}>{c}</button>)}</div>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state"><p>No hospitals found. <button onClick={() => { setCountry('All'); setQuery(''); }} className="link-btn">Clear filters</button></p></div>
          ) : (
            <motion.div className="grid-listing" variants={staggerContainer} initial="hidden" animate="visible">
              {filtered.map(h => (
                <motion.div key={h.id} variants={fadeUp}>
                  <Link to={`/hospitals/${h.id}`} className="hospital-card" style={{ display: 'block' }}>
                    <div className="hospital-card__img-wrap"><img src={h.image} alt={h.name} loading="lazy" className="hospital-card__img" /><span className="hospital-card__badge">{h.accreditation}</span></div>
                    <div className="hospital-card__body">
                      <h3 className="hospital-card__name">{h.name}</h3>
                      <p className="hospital-card__loc"><MapPin size={13} /> {h.city}, {h.country}</p>
                      <p className="hospital-card__desc">{h.description}</p>
                      <div className="hospital-card__specs">{h.specialties.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}</div>
                      <div className="hospital-card__footer">
                        <span className="hospital-card__rating"><Star size={13} fill="#C5A45D" color="#C5A45D" /> {h.rating}</span>
                        <span className="hospital-card__cta">View Hospital <ArrowRight size={14} /></span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
