import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './JourneySection.css';

const steps = [
  { num: '01', title: 'Share Your Requirements', desc: 'Tell us about your health condition, treatment needs and preferences through our simple enquiry form.' },
  { num: '02', title: 'Explore Treatment Options', desc: 'We help you discover suitable treatment options and medical centres that match your specific needs.' },
  { num: '03', title: 'Connect With Specialists', desc: 'We facilitate connections with qualified medical specialists for consultations and case reviews.' },
  { num: '04', title: 'Coordinate Appointments', desc: 'Our team assists with appointment scheduling, travel planning and accommodation coordination.' },
  { num: '05', title: 'Receive Follow-up Support', desc: 'We provide ongoing assistance and follow-up coordination throughout your recovery journey.' },
];

export default function JourneySection() {
  return (
    <section className="journey-section section-padding">
      <div className="container">
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <span className="section-label">Patient Journey</span>
          <h2 className="section-title">Your Healthcare Journey <span>With Medgem</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>
            We guide you through every stage of your medical journey with personalised support and coordination.
          </p>
        </motion.div>

        <motion.div
          className="journey-timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {steps.map((step, i) => (
            <motion.div key={step.num} className="journey-step" variants={fadeUp}>
              <div className="journey-step__connector">
                <div className="journey-step__num">{step.num}</div>
                {i < steps.length - 1 && <div className="journey-step__line" />}
              </div>
              <div className="journey-step__content">
                <h3 className="journey-step__title">{step.title}</h3>
                <p className="journey-step__desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
