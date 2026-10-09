import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './TestimonialSlider.css';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef(null);

  const go = (d) => {
    setDir(d);
    setCurrent(c => (c + d + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    timer.current = setInterval(() => go(1), 5000);
    return () => clearInterval(timer.current);
  }, []);

  const t = testimonials[current];

  return (
    <section className="testimonials-section section-padding">
      <div className="testimonials-bg" />
      <div className="container">
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <span className="section-label">Patient Stories</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>What Patients <span style={{ color: 'var(--champagne-gold)' }}>Say</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
            The following are illustrative demo testimonials. Not verified reviews.
          </p>
        </motion.div>

        <div className="testimonials-slider">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              className="testimonial-card glass"
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <Quote size={32} className="testimonial-quote" />
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-footer">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-meta">{t.country} · {t.treatment}</p>
                  <div className="testimonial-stars">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#C5A45D" color="#C5A45D" />)}
                  </div>
                </div>
                <span className="testimonial-note">{t.note}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonials-controls">
            <button className="dest-ctrl" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
            <div className="testimonials-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === current ? 'testimonial-dot--active' : ''}`}
                  onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="dest-ctrl" onClick={() => go(1)} aria-label="Next"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
