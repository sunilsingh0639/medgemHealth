import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Camera, Link2, PlayCircle, Mail, Phone, MapPin } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import { footerApi, type PublicFooterData } from '../api';
import './Footer.css';

// Static fallback — used only when API is unavailable
const FALLBACK_LINKS = [
  { heading: 'Quick Links', links: [['Home','/'],['About Us','/about'],['Treatments','/treatments'],['Hospitals','/hospitals'],['Doctors','/doctors'],['Wellness','/wellness'],['Contact','/contact']] },
  { heading: 'Treatments', links: [['Cardiology','/treatments?cat=Cardiology'],['Orthopaedics','/treatments?cat=Orthopaedics'],['Oncology','/treatments?cat=Oncology'],['Neurology','/treatments?cat=Neurology'],['Cosmetic Surgery','/treatments?cat=Cosmetic+Surgery'],['Fertility & IVF','/treatments?cat=Fertility'],['Dental Care','/treatments?cat=Dental+Care'],['Hair Transplant','/treatments?cat=Hair+Transplant']] },
  { heading: 'Destinations', links: [['India','/destinations/india'],['Thailand','/destinations/thailand'],['Singapore','/destinations/singapore'],['Germany','/destinations/germany'],['UAE','/destinations/uae'],['Malaysia','/destinations/malaysia'],['Turkey','/destinations/turkey'],['United Kingdom','/destinations/united-kingdom']] },
];

export default function Footer() {
  const [data, setData] = useState<PublicFooterData | null>(null);

  useEffect(() => {
    footerApi.getPublic()
      .then(r => setData(r.data.data))
      .catch(() => { /* use static fallback silently */ });
  }, []);

  const companyDesc = data?.config.companyDescription ?? 'Medgem Global Healthcare assists patients in discovering and coordinating access to quality medical care across leading international destinations.';
  const ctaLabel = data?.config.ctaLabel ?? 'Free Consultation';
  const ctaUrl = data?.config.ctaUrl ?? '/consultation';
  const copyright = data?.config.copyrightText ?? 'Medgem Global Healthcare. All rights reserved.';
  const privacyUrl = data?.config.privacyPolicyUrl ?? '#';
  const termsUrl = data?.config.termsUrl ?? '#';
  const cookieUrl = data?.config.cookiePolicyUrl ?? '#';
  const email = data?.settings.contactEmail || 'info@medgemhealthcare.com';
  const phone = data?.settings.contactPhone || '+1 (000) 000-0000';
  const address = data?.settings.address || 'Address to be confirmed';
  const whatsapp = data?.settings.whatsAppNumber || '10000000000';

  const socialLinks = data ? [
    { Icon: Share2, url: data.settings.facebookUrl || '#', label: 'Facebook' },
    { Icon: MessageCircle, url: data.settings.twitterUrl || '#', label: 'Twitter' },
    { Icon: Camera, url: data.settings.instagramUrl || '#', label: 'Instagram' },
    { Icon: Link2, url: data.settings.linkedInUrl || '#', label: 'LinkedIn' },
    { Icon: PlayCircle, url: data.settings.youtubeUrl || '#', label: 'YouTube' },
  ] : [Share2, MessageCircle, Camera, Link2, PlayCircle].map((Icon, i) => ({ Icon, url: '#', label: `Social ${i}` }));

  // Use API columns if available, otherwise static fallback
  const columns = data?.columns.length
    ? data.columns.map(col => ({
        heading: col.heading,
        links: col.links.map(l => [l.label, l.url, l.isExternal] as [string, string, boolean]),
      }))
    : FALLBACK_LINKS.map(c => ({ heading: c.heading, links: c.links.map(l => [l[0], l[1], false] as [string, string, boolean]) }));

  return (
    <footer className="footer">
      <AnimatedBackground variant="dark" />
      <div className="footer__main container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Brand column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="logo-mark"><span className="logo-gem">M</span></div>
            <div className="logo-text">
              <span className="logo-name" style={{ color: 'var(--white)' }}>Medgem</span>
              <span className="logo-sub">Global Healthcare</span>
            </div>
          </div>
          <p className="footer__desc">{companyDesc}</p>
          <div className="footer__social">
            {socialLinks.map(({ Icon, url, label }) => (
              <a key={label} href={url} className="social-btn" aria-label={label}
                target={url !== '#' ? '_blank' : undefined}
                rel={url !== '#' ? 'noopener noreferrer' : undefined}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic link columns */}
        {columns.map(col => (
          <div key={col.heading} className="footer__col">
            <h4 className="footer__heading">{col.heading}</h4>
            <ul className="footer__links">
              {col.links.map(([label, url, isExternal]) => (
                <li key={label}>
                  {isExternal
                    ? <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
                    : <Link to={url}>{label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact column */}
        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__contact">
            <li><Mail size={14} /><span>{email}</span></li>
            <li><Phone size={14} /><span>{phone}</span></li>
            <li><MapPin size={14} /><span>{address}</span></li>
          </ul>
          <Link to={ctaUrl} className="btn-gold" style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '10px 20px' }}>
            {ctaLabel}
          </Link>
        </div>
      </div>

      <div className="footer__bottom" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} {copyright}</p>
          <div className="footer__legal">
            <a href={privacyUrl}>Privacy Policy</a>
            <a href={termsUrl}>Terms &amp; Conditions</a>
            <a href={cookieUrl}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
