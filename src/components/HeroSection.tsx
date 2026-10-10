import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import './HeroSection.css';

const HERO_VIDEO_SRC =
  'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4';
const HERO_VIDEO_POSTER =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section className="hero">
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
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <div className="hero__badge">
            <Shield size={14} />
            <span>Personalised Healthcare Assistance</span>
          </div>

          <h1 className="hero__title">
            <span>Your Health.</span>
            <span><span className="hero__title-gold">Our Global</span> Commitment.</span>
          </h1>

          <p className="hero__subtitle">
            Discover trusted healthcare and personalised medical travel assistance.
          </p>

          <div className="hero__actions">
            <Link to="/treatments" className="hero__btn-primary">
              Explore Treatments <ArrowRight size={18} />
            </Link>
            <Link to="/consultation" className="hero__btn-secondary">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
