import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Search } from 'lucide-react';
import { treatments, categories } from '../data/treatments';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

export default function Treatments() {
  const [params] = useSearchParams();
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const cat = params.get('cat');
    if (cat) {
      const match = categories.find(c => c.toLowerCase().includes(cat.toLowerCase()));
      if (match) setActive(match);
    }
  }, [params]);

  const filtered = treatments.filter(t => {
    const matchCat = active === 'All' || t.category === active;
    const matchQ = !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.category.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">{active !== 'All' ? active : 'Medical Treatments'}</span>
          <h1 className="page-hero__title">Explore Treatment Options</h1>
          <p>Discover a wide range of medical specialties and procedures available across leading international destinations.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="page-toolbar">
            <div className="page-search">
              <Search size={16} />
              <input placeholder="Search treatments..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="page-filters">
              {categories.map(cat => (
                <button key={cat} className={`filter-btn ${active === cat ? 'filter-btn--active' : ''}`} onClick={() => setActive(cat)}>{cat}</button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state"><p>No treatments found. <button onClick={() => { setActive('All'); setQuery(''); }} className="link-btn">Clear filters</button></p></div>
          ) : (
            <motion.div className="treatments-grid" variants={staggerContainer} initial="hidden" animate="visible">
              {filtered.map(t => (
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
                      <div className="treatment-card__cta">Explore Treatment <ArrowRight size={14} /></div>
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
