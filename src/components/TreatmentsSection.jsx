import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { treatments, categories } from '../data/treatments';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './TreatmentsSection.css';

export default function TreatmentsSection({ limit = 6 }) {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? treatments.slice(0, limit) : treatments.filter(t => t.category === active).slice(0, limit);
  const displayCats = categories.slice(0, 8);

  return (
    <section className="treatments-section section-padding">
      <div className="container">
        <motion.div className="treatments-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <div>
            <span className="section-label">Medical Treatments</span>
            <h2 className="section-title">Explore <span>Treatment Options</span></h2>
          </div>
          <Link to="/treatments" className="btn-secondary">View All <ArrowRight size={16} /></Link>
        </motion.div>

        <motion.div className="treatments-filters" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          {displayCats.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="treatments-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {filtered.length > 0 ? filtered.map(t => (
            <motion.div key={t.id} variants={fadeUp}>
              <Link to={`/treatments/${t.id}`} className="treatment-card">
                <div className="treatment-card__img-wrap">
                  <img src={t.image} alt={t.title} loading="lazy" className="treatment-card__img" />
                  <div className="treatment-card__overlay" />
                  <span className="treatment-card__cat">{t.category}</span>
                </div>
                <div className="treatment-card__body">
                  <h3 className="treatment-card__title">{t.title}</h3>
                  <p className="treatment-card__desc">{t.description}</p>
                  <div className="treatment-card__meta">
                    <span><Clock size={13} /> {t.duration}</span>
                    <span><MapPin size={13} /> {t.destinations[0]}</span>
                  </div>
                  <div className="treatment-card__cta">
                    Explore Treatment <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          )) : (
            <div className="treatments-empty">
              <p>No treatments found for this category. <Link to="/treatments">View all treatments</Link></p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
