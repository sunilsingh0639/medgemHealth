import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Camera, Link2, PlayCircle, Mail, Phone, MapPin } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <AnimatedBackground variant="dark" />
      <div className="footer__main container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="logo-mark"><span className="logo-gem">M</span></div>
            <div className="logo-text">
              <span className="logo-name" style={{ color: 'var(--white)' }}>Medgem</span>
              <span className="logo-sub">Global Healthcare</span>
            </div>
          </div>
          <p className="footer__desc">Medgem Global Healthcare assists patients in discovering and coordinating access to quality medical care across leading international destinations.</p>
          <div className="footer__social">
            {[Share2, MessageCircle, Camera, Link2, PlayCircle].map((Icon, i) => (
              <a key={i} href="#" className="social-btn" aria-label="Social media link"><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__links">
            {[['Home','/'],['About Us','/about'],['Treatments','/treatments'],['Hospitals','/hospitals'],['Doctors','/doctors'],['Wellness','/wellness'],['Contact','/contact']].map(([label, path]) => (
              <li key={label}><Link to={path}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading">Treatments</h4>
          <ul className="footer__links">
            {['Cardiology','Orthopaedics','Oncology','Neurology','Cosmetic Surgery','Fertility & IVF','Dental Care','Hair Transplant'].map(t => (
              <li key={t}><Link to={`/treatments?cat=${t}`}>{t}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading">Destinations</h4>
          <ul className="footer__links">
            {['India','Thailand','Singapore','Germany','UAE','Malaysia','Turkey','United Kingdom'].map((d, i) => (
              <li key={d}><Link to={`/destinations/${i + 1}`}>{d}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__contact">
            <li><Mail size={14} /><span>info@medgemhealthcare.com (Placeholder)</span></li>
            <li><Phone size={14} /><span>+1 (000) 000-0000 (Placeholder)</span></li>
            <li><MapPin size={14} /><span>Address to be confirmed</span></li>
          </ul>
          <Link to="/consultation" className="btn-gold" style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '10px 20px' }}>Free Consultation</Link>
        </div>
      </div>
      <div className="footer__bottom" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Medgem Global Healthcare. All rights reserved. This is a demo website.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
