import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Globe, Users, Shield, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeLeft, fadeRight, fadeUp, staggerContainer, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

interface Value { icon: LucideIcon; title: string; desc: string; }
const values: Value[] = [
  { icon: Heart, title: 'Patient-Centred', desc: 'Every decision we make is guided by the best interests of the patients we serve.' },
  { icon: Globe, title: 'Global Reach', desc: 'We connect patients with healthcare options across leading international medical destinations.' },
  { icon: Users, title: 'Personalised Support', desc: "We provide tailored assistance that respects each patient's unique needs and circumstances." },
  { icon: Shield, title: 'Trusted Guidance', desc: 'We are committed to providing honest, transparent and reliable healthcare navigation support.' },
];

export default function About() {
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">About Us</span>
          <h1 className="page-hero__title">About Medgem Global Healthcare</h1>
          <p>Your trusted partner in navigating international healthcare options.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <span className="section-label">Our Mission</span>
              <h2 className="section-title">Connecting Patients to <span>Quality Healthcare</span></h2>
              <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>Medgem Global Healthcare is dedicated to helping patients discover and access quality medical care across leading international destinations. We understand that navigating healthcare options can be complex and overwhelming, particularly when seeking treatment abroad.</p>
              <p style={{ lineHeight: 1.8, marginBottom: '2rem', color: 'var(--muted-text)' }}>Our team provides personalised assistance to help patients explore treatment options, connect with qualified specialists and coordinate the practical aspects of their medical journey with confidence and clarity.</p>
              <Link to="/consultation" className="btn-primary">Get Free Consultation <ArrowRight size={16} /></Link>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" alt="About Medgem" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} loading="lazy" />
            </motion.div>
          </div>
          <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What Guides <span>Everything We Do</span></h2>
          </motion.div>
          <motion.div className="why-grid" style={{ marginTop: '2rem' }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} className="why-card" variants={fadeUp} whileHover={{ y: -6 }}>
                <div className="why-card__icon"><Icon size={26} /></div>
                <h3 className="why-card__title">{title}</h3>
                <p className="why-card__desc">{desc}</p>
                <div className="why-card__accent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
