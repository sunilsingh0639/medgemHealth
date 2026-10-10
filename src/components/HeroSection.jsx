import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Star, Shield, Users, Globe, ChevronDown } from 'lucide-react';
import './HeroSection.css';

const HERO_VIDEO_SRC = 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4';
const HERO_VIDEO_POSTER =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80';

const words = ['Your Health.', 'Our Global', 'Commitment.'];

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const parallaxX = useTransform(springX, [-1, 1], [-15, 15]);
  const parallaxY = useTransform(springY, [-1, 1], [-10, 10]);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouse);
    return () => el?.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    video.play().catch((error) => {
      console.warn('Hero video autoplay failed; the poster will remain visible.', error);
    });
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_VIDEO_POSTER}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="hero__overlay" />
        <div className="hero__header-grad" />
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Shield size={14} />
            <span>Personalised Healthcare Assistance</span>
          </motion.div>

          <h1 className="hero__title">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="hero__title-line"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                {i === 1 ? <span className="hero__title-gold">{word}</span> : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Discover trusted healthcare, world-class specialists and personalised medical travel assistance with Medgem Global Healthcare.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, type: 'spring', stiffness: 100 }}
          >
            <Link to="/treatments" className="btn-gold hero__btn-primary">
              Explore Treatments <ArrowRight size={18} />
            </Link>
            <Link to="/consultation" className="hero__btn-secondary">
              Get Free Consultation
            </Link>
          </motion.div>

          <motion.div
            className="hero__trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {[
              { icon: Users, value: '10,000+', label: 'Patients Assisted' },
              { icon: Globe, value: '40+', label: 'Countries' },
              { icon: Star, value: '200+', label: 'Partner Hospitals' },
            ].map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                className="hero__trust-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                <Icon size={16} className="hero__trust-icon" />
                <strong>{value}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="hero__visual">
          <motion.div
            className="hero__image-wrap"
            style={{ x: parallaxX, y: parallaxY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="hero__glow" />
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85"
              alt="Healthcare specialist"
              className="hero__img"
              loading="eager"
            />
            <div className="hero__img-overlay" />

            <motion.div
              className="hero__card hero__card--consult glass"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              whileHover={{ y: -4 }}
            >
              <div className="hero__card-avatar">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&q=80" alt="Specialist" />
                <span className="hero__card-online" />
              </div>
              <div>
                <p className="hero__card-name">Dr. Arjun Mehta</p>
                <p className="hero__card-role">Cardiologist · Available Now</p>
              </div>
              <Link to="/consultation" className="hero__card-btn">Consult</Link>
            </motion.div>

            <motion.div
              className="hero__card hero__card--stats glass"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              whileHover={{ y: -4 }}
            >
              <div className="hero__stat">
                <span className="hero__stat-num">98%</span>
                <span className="hero__stat-label">Patient Satisfaction</span>
              </div>
              <div className="hero__stat-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C5A45D" color="#C5A45D" />)}
              </div>
            </motion.div>

            <motion.div
              className="hero__card hero__card--dest glass"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              whileHover={{ y: -4 }}
            >
              <Globe size={16} color="#C5A45D" />
              <span>8 Global Destinations</span>
            </motion.div>
          </motion.div>

          <div className="hero__deco hero__deco--ring animate-spin-slow" />
          <div className="hero__deco hero__deco--dot animate-float" />
          <div className="hero__deco hero__deco--cross animate-float-reverse" />
        </div>
      </div>

      <motion.a
        href="#search"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
}
