import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './AnimatedBackground.css';

type BgVariant = 'hero' | 'dark' | 'light' | 'lavender' | 'gold-accent' | 'subtle';

interface AnimatedBackgroundProps {
  variant?: BgVariant;
  className?: string;
}

export default function AnimatedBackground({ variant = 'subtle', className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lightweight canvas particle effect only for hero/dark variants
  useEffect(() => {
    if (variant !== 'hero' && variant !== 'dark') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
    const count = window.innerWidth < 768 ? 18 : 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,164,93,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [variant]);

  return (
    <div className={`anim-bg anim-bg--${variant} ${className}`} aria-hidden="true">
      {/* Floating orbs */}
      <div className="anim-bg__orb anim-bg__orb--1" />
      <div className="anim-bg__orb anim-bg__orb--2" />
      <div className="anim-bg__orb anim-bg__orb--3" />

      {/* Decorative SVG curves */}
      <svg className="anim-bg__curves" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <motion.path
          d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200"
          stroke="rgba(197,164,93,0.12)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,280 C360,180 720,360 1080,260 C1260,210 1380,300 1440,280"
          stroke="rgba(197,164,93,0.07)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
        />
        {variant === 'hero' || variant === 'dark' ? (
          <>
            <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(197,164,93,0.08)" strokeWidth="1" />
            <circle cx="1360" cy="320" r="90" fill="none" stroke="rgba(197,164,93,0.06)" strokeWidth="1" />
          </>
        ) : null}
      </svg>

      {/* Canvas particles (hero/dark only) */}
      {(variant === 'hero' || variant === 'dark') && (
        <canvas ref={canvasRef} className="anim-bg__canvas" />
      )}

      {/* Rotating decorative ring */}
      {(variant === 'hero' || variant === 'gold-accent') && (
        <div className="anim-bg__ring" />
      )}
    </div>
  );
}
