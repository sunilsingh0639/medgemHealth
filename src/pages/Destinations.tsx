import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Stethoscope } from 'lucide-react';
import { destinations } from '../data/destinations';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function Destinations() {
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Medical Tourism</span>
          <h1 className="page-hero__title">Global Medical Destinations</h1>
          <p>Explore leading international healthcare destinations and discover world-class medical facilities.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <motion.div className="grid-listing" variants={staggerContainer} initial="hidden" animate="visible">
            {destinations.map(dest => (
              <motion.div key={dest.id} variants={fadeUp}>
                <Link to={`/destinations/${dest.id}`} className="dest-card" style={{ display: 'block' }}>
                  <div className="dest-card__img-wrap" style={{ height: '320px' }}>
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
                      <div className="dest-card__treatments">{dest.treatments.slice(0, 3).map(t => <span key={t} className="dest-tag">{t}</span>)}</div>
                      <div className="dest-card__cta">Explore <ArrowRight size={14} /></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
