import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileSearch, ArrowRight, CheckCircle } from 'lucide-react';
import { fadeLeft, fadeRight, viewportConfig } from '../animations/motionVariants';
import './SecondOpinionSection.css';

const steps = [
  'Share your medical reports and diagnosis',
  'Our team reviews your case details',
  'We connect you with relevant specialists',
  'Receive a coordinated specialist perspective',
  'Make a more informed treatment decision',
];

export default function SecondOpinionSection() {
  return (
    <section className="second-opinion section-padding">
      <div className="container">
        <div className="second-opinion__inner">
          <motion.div className="second-opinion__content" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <span className="section-label">Medical Second Opinion</span>
            <h2 className="section-title">A Second Opinion Can Help You Make an <span>Informed Decision</span></h2>
            <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
              Before proceeding with a major medical procedure, gaining an independent specialist perspective can provide valuable clarity and confidence in your treatment path.
            </p>
            <ul className="second-opinion__steps">
              {steps.map((step, i) => (
                <motion.li
                  key={i}
                  className="second-opinion__step"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportConfig}
                  transition={{ delay: i * 0.1 }}
                >
                  <CheckCircle size={18} className="step-check" />
                  <span>{step}</span>
                </motion.li>
              ))}
            </ul>
            <Link to="/second-opinion" className="btn-primary" style={{ marginTop: '2rem', width: 'fit-content' }}>
              <FileSearch size={18} /> Request a Second Opinion
            </Link>
            <p className="second-opinion__disclaimer">
              This is a demo service. Medgem does not provide actual medical diagnoses or opinions.
            </p>
          </motion.div>

          <motion.div className="second-opinion__visual" variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <div className="second-opinion__img-wrap">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
                alt="Medical consultation"
                className="second-opinion__img"
                loading="lazy"
              />
              <div className="second-opinion__badge glass">
                <FileSearch size={20} color="#C5A45D" />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark-text)' }}>Expert Review</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>Coordinated specialist access</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
