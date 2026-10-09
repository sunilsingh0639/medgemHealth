import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { hospitals } from '../data/hospitals';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './HospitalsSection.css';

export default function HospitalsSection({ limit = 6 }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  const display = hospitals.slice(0, limit);

  return (
    <section className="hospitals-section section-padding">
      <div className="container">
        <motion.div className="hospitals-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <div>
            <span className="section-label">Partner Hospitals</span>
            <h2 className="section-title">Featured <span>Medical Centres</span></h2>
            <p className="section-subtitle">Explore internationally recognised hospitals across leading medical destinations. All listings are sample demo data.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="dest-ctrl" onClick={() => scroll(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
            <button className="dest-ctrl" onClick={() => scroll(1)} aria-label="Next"><ChevronRight size={20} /></button>
            <Link to="/hospitals" className="btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>
        </motion.div>

        <motion.div
          className="hospitals-track"
          ref={scrollRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          {display.map((h) => (
            <Link key={h.id} to={`/hospitals/${h.id}`} className="hospital-card">
              <div className="hospital-card__img-wrap">
                <img src={h.image} alt={h.name} loading="lazy" className="hospital-card__img" />
                <span className="hospital-card__badge">{h.accreditation}</span>
              </div>
              <div className="hospital-card__body">
                <h3 className="hospital-card__name">{h.name}</h3>
                <p className="hospital-card__loc"><MapPin size={13} /> {h.city}, {h.country}</p>
                <p className="hospital-card__desc">{h.description}</p>
                <div className="hospital-card__specs">
                  {h.specialties.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
                </div>
                <div className="hospital-card__footer">
                  <span className="hospital-card__rating"><Star size={13} fill="#C5A45D" color="#C5A45D" /> {h.rating}</span>
                  <span className="hospital-card__cta">View Hospital <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
