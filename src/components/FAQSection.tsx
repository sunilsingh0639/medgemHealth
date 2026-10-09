import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import { staggerContainer, fadeUp, viewportConfig } from '../animations/motionVariants';
import './FAQSection.css';

interface FAQ { q: string; a: string; }

const faqs: FAQ[] = [
  { q: 'How can I explore treatment options with Medgem?', a: 'You can browse our treatments section to discover a wide range of medical specialties and procedures. Use the search and filter tools to find treatments that match your needs, then submit an enquiry for personalised assistance.' },
  { q: 'How do I request a consultation?', a: 'Click the "Get Free Consultation" button in the header or visit our Consultation page. Fill in your details and treatment preferences, and our team will be in touch to discuss your requirements.' },
  { q: 'Can I explore hospitals in different countries?', a: 'Yes. Our Hospitals section features sample listings from multiple international destinations including India, Thailand, Singapore, Germany, UAE and more. You can filter by country and specialty.' },
  { q: 'What is a medical second opinion?', a: 'A medical second opinion involves seeking an independent assessment of your diagnosis or treatment plan from another qualified specialist. This can help you gain confidence and clarity before proceeding with a major medical decision.' },
  { q: 'Can I request medical travel assistance?', a: 'Medgem can help coordinate various aspects of your medical journey including appointment scheduling, travel planning support and accommodation assistance. Contact us to discuss your specific requirements.' },
  { q: 'How can I contact the Medgem team?', a: 'You can reach us through our Contact page, by submitting a consultation request, or via the WhatsApp button on our website. Our team is available to assist with your healthcare enquiries.' },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{faq.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
            <p>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="faq-section section-padding" style={{ position: 'relative' }}>
      <AnimatedBackground variant="subtle" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>Find answers to common questions about our healthcare assistance services.</p>
        </motion.div>
        <motion.div className="faq-list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FAQItem faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
