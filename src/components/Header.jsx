import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Phone } from 'lucide-react';
import './Header.css';

const treatmentLinks = [
  { label: 'Cardiology', path: '/treatments?cat=Cardiology' },
  { label: 'Orthopaedics', path: '/treatments?cat=Orthopaedics' },
  { label: 'Oncology', path: '/treatments?cat=Oncology' },
  { label: 'Neurology', path: '/treatments?cat=Neurology' },
  { label: 'Cosmetic Surgery', path: '/treatments?cat=Cosmetic' },
  { label: 'Fertility & IVF', path: '/treatments?cat=Fertility' },
  { label: 'View All Treatments', path: '/treatments', highlight: true },
];

const destinationLinks = [
  { label: '🇮🇳 India', path: '/destinations/1' },
  { label: '🇹🇭 Thailand', path: '/destinations/2' },
  { label: '🇸🇬 Singapore', path: '/destinations/3' },
  { label: '🇩🇪 Germany', path: '/destinations/4' },
  { label: '🇦🇪 UAE', path: '/destinations/5' },
  { label: '🇹🇷 Turkey', path: '/destinations/7' },
  { label: 'All Destinations', path: '/destinations', highlight: true },
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Treatments', path: '/treatments', dropdown: treatmentLinks },
  { label: 'Hospitals', path: '/hospitals' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Destinations', path: '/destinations', dropdown: destinationLinks },
  { label: 'Wellness', path: '/wellness' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const dropdownTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropdownEnter = (label) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };
  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="header__inner container">
          <Link to="/" className="header__logo">
            <div className="logo-mark">
              <img src="/HealthcareEmblem.png" alt="Healthcare Logo" />
            </div>
            <div className="logo-text">
              <span className={`logo-name ${!scrolled ? 'logo-name--light' : ''}`}>Medgem</span>
              <span className="logo-sub">Global Healthcare</span>
            </div>
          </Link>

          <nav className="header__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="nav-item"
                onMouseEnter={() => link.dropdown && handleDropdownEnter(link.label)}
                onMouseLeave={() => link.dropdown && handleDropdownLeave()}
              >
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'nav-link--active' : ''} ${!scrolled ? 'nav-link--hero' : ''}`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className={`nav-chevron ${activeDropdown === link.label ? 'nav-chevron--open' : ''}`} />}
                </Link>
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      className="dropdown"
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.dropdown.map((item) => (
                        <Link key={item.label} to={item.path} className={`dropdown-item ${item.highlight ? 'dropdown-item--highlight' : ''}`}>
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="header__actions">
            <button className={`lang-btn ${!scrolled ? 'lang-btn--hero' : ''}`} aria-label="Language selector">
              <Globe size={16} />
              <span>EN</span>
            </button>
            <Link to="/consultation" className="btn-primary header__cta">
              <Phone size={15} />
              Free Consultation
            </Link>
            <button
              className={`hamburger ${!scrolled ? 'hamburger--hero' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.div animate={mobileOpen ? 'open' : 'closed'}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="mobile-drawer__header">
                <div className="logo-mark"><span className="logo-gem">M</span></div>
                <div className="logo-text">
                  <span className="logo-name">Medgem</span>
                  <span className="logo-sub">Global Healthcare</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="mobile-close" aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="mobile-nav">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.dropdown ? (
                      <>
                        <button
                          className={`mobile-nav-link ${mobileExpanded === link.label ? 'mobile-nav-link--active' : ''}`}
                          onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        >
                          {link.label}
                          <ChevronDown size={16} className={mobileExpanded === link.label ? 'rotate-180' : ''} />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.label && (
                            <motion.div
                              className="mobile-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              {link.dropdown.map((item) => (
                                <Link key={item.label} to={item.path} className={`mobile-submenu-item ${item.highlight ? 'mobile-submenu-item--highlight' : ''}`}>
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={link.path} className={`mobile-nav-link ${isActive(link.path) ? 'mobile-nav-link--active' : ''}`}>
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              <div className="mobile-drawer__footer">
                <Link to="/consultation" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Phone size={16} /> Get Free Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
