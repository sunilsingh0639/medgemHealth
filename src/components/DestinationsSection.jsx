import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Stethoscope } from 'lucide-react';
import { destinations } from '../data/destinations';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './DestinationsSection.css';

export default function DestinationsSection() {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="destinations-section section-padding">
      <div className="container">
        <motion.div className="destinations-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <div>
            <span className="section-label">Global Destinations</span>
            <h2 className="section-title">Explore Medical <span>Destinations</span></h2>
            <p className="section-subtitle">Discover world-class healthcare across leading international medical destinations.</p>
          </div>
          <div className="destinations-controls">
            <button className="dest-ctrl" onClick={() => scroll(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
            <button className="dest-ctrl" onClick={() => scroll(1)} aria-label="Next"><ChevronRight size={20} /></button>
            <Link to="/destinations" className="btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>
        </motion.div>

        <motion.div
          className="destinations-track"
          ref={scrollRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          {destinations.map((dest) => (
            <Link key={dest.id} to={`/destinations/${dest.id}`} className="dest-card">
              <div className="dest-card__img-wrap">
                <img src={dest.image} alt={dest.country} loading="lazy" className="dest-card__img" />
                <div className="dest-card__overlay" />
                <div className="dest-card__flag">{dest.flag}</div>
                <div className="dest-card__content">
                  <h3 className="dest-card__country">{dest.country}</h3>
                  <p className="dest-card__tagline">{dest.tagline}</p>
                  <div className="dest-card__meta">
                    <span><Building2 size={12} /> {dest.hospitals} Hospitals</span>
                    <span><Stethoscope size={12} /> {dest.specialists} Specialists</span>
                  </div>
                  <div className="dest-card__treatments">
                    {dest.treatments.slice(0, 3).map(t => <span key={t} className="dest-tag">{t}</span>)}
                  </div>
                  <div className="dest-card__cta">Explore <ArrowRight size={14} /></div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
