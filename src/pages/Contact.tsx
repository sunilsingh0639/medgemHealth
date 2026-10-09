import ContactBanner from '../components/ContactBanner';
import FAQSection from '../components/FAQSection';
import './PageStyles.css';

export default function Contact() {
  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Contact Us</span>
          <h1 className="page-hero__title">Get In Touch</h1>
          <p>We are here to help you explore your healthcare options. Send us an enquiry and our team will be in touch.</p>
        </div>
      </div>
      <ContactBanner />
      <FAQSection />
    </div>
  );
}
