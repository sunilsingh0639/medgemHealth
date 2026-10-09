import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Leaf, Sun, Activity, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

const programs = [
  { icon: Heart, title: 'Preventive Health Checkups', desc: 'Comprehensive health screening packages designed to detect potential health issues early and support proactive wellness management.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80' },
  { icon: Leaf, title: 'Wellness Programmes', desc: 'Holistic wellness programmes combining nutrition guidance, lifestyle coaching and preventive care for long-term health optimisation.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80' },
  { icon: Sun, title: 'Lifestyle & Nutrition', desc: 'Personalised lifestyle and nutrition consultations to support your health goals and overall wellbeing.', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80' },
  { icon: Activity, title: 'Personalised Health Assistance', desc: 'Tailored healthcare assistance to help you navigate your health journey with expert guidance and coordinated support.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80' },
];

export default function Wellness() {
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Wellness & Prevention</span>
          <h1 className="page-hero__title">Wellness & Health Programmes</h1>
          <p>Explore preventive healthcare, wellness programmes and personalised health assistance options.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <motion.div className="grid-listing" variants={staggerContainer} initial="hidden" animate="visible">
            {programs.map(({ icon: Icon, title, desc, image }) => (
              <motion.div key={title} className="card" variants={fadeUp} whileHover={{ y: -6 }}>
                <img src={image} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ width: 48, height: 48, background: 'var(--light-lavender)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--royal-purple)' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ marginBottom: '0.75rem' }}>{title}</h3>
                  <p style={{ marginBottom: '1.25rem' }}>{desc}</p>
                  <Link to="/consultation" className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                    Explore <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
