import { motion } from 'framer-motion';
import { Heart, MessageSquare, FileSearch, Hospital, Plane, Users } from 'lucide-react';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './WhyChooseUs.css';

const features = [
  { icon: Heart, title: 'Personalised Healthcare Assistance', desc: 'We take time to understand your unique health needs and help you explore the most suitable treatment options available globally.' },
  { icon: MessageSquare, title: 'Specialist Consultation Support', desc: 'Connect with experienced medical specialists across multiple disciplines to discuss your condition and treatment possibilities.' },
  { icon: FileSearch, title: 'Medical Second Opinion', desc: 'Gain confidence in your diagnosis by coordinating access to independent specialist opinions from leading medical centres.' },
  { icon: Hospital, title: 'Hospital & Doctor Discovery', desc: 'Explore a curated network of internationally recognised hospitals and qualified specialists across key medical destinations.' },
  { icon: Plane, title: 'Medical Travel Assistance', desc: 'We help coordinate the practical aspects of your medical journey, including appointment scheduling and travel planning support.' },
  { icon: Users, title: 'Patient Journey Coordination', desc: 'From your first enquiry to post-treatment follow-up, our team provides continuous support throughout your healthcare journey.' },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section section-padding">
      <div className="container">
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <span className="section-label">Why Medgem</span>
          <h2 className="section-title">Your Trusted Healthcare <span>Navigation Partner</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>
            We are dedicated to helping patients access quality healthcare with confidence, clarity and compassionate support at every step.
          </p>
        </motion.div>
        <motion.div
          className="why-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} className="why-card" variants={fadeUp} whileHover={{ y: -6 }}>
              <div className="why-card__icon">
                <Icon size={26} />
              </div>
              <h3 className="why-card__title">{title}</h3>
              <p className="why-card__desc">{desc}</p>
              <div className="why-card__accent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
