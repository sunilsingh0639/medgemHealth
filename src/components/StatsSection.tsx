import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Globe, Stethoscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './StatsSection.css';

interface StatItem { icon: LucideIcon; value: number; suffix: string; label: string; note: string; }

const stats: StatItem[] = [
  { icon: Users, value: 10000, suffix: '+', label: 'Patients Assisted', note: '(Sample figure)' },
  { icon: Building2, value: 200, suffix: '+', label: 'Healthcare Partners', note: '(Sample figure)' },
  { icon: Globe, value: 40, suffix: '+', label: 'Countries Covered', note: '(Sample figure)' },
  { icon: Stethoscope, value: 70, suffix: '+', label: 'Medical Specialties', note: '(Sample figure)' },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <AnimatedBackground variant="dark" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div className="stats-header text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <span className="section-label">Our Reach</span>
          <h2 className="section-title">Connecting Patients to <span>World-Class Care</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Medgem Global Healthcare assists patients in discovering and coordinating access to specialist medical care across the globe. All figures shown are illustrative sample data.
          </p>
        </motion.div>
        <motion.div className="stats-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          {stats.map(({ icon: Icon, value, suffix, label, note }) => (
            <motion.div key={label} className="stat-card" variants={fadeUp} whileHover={{ y: -6, scale: 1.02 }}>
              <div className="stat-card__icon"><Icon size={28} /></div>
              <div className="stat-card__value"><Counter target={value} suffix={suffix} inView={inView} /></div>
              <div className="stat-card__label">{label}</div>
              <div className="stat-card__note">{note}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
