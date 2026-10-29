import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Stethoscope, Images } from 'lucide-react';
import { galleryApi, type GalleryEntry, type GalleryImage } from '../api';
import { fadeUp, staggerContainer, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';
import './PatientGallery.css';

export default function PatientGallery() {
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

  useEffect(() => {
    galleryApi.getPublished()
      .then(r => setEntries(r.data.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (images: GalleryImage[], index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const prev = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length });
  const next = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Patient Gallery</span>
          <h1 className="page-hero__title">Patient Photo Gallery</h1>
          <p>Real journeys, real results — shared with patient consent.</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          {loading && <div className="empty-state"><p>Loading gallery…</p></div>}
          {!loading && entries.length === 0 && (
            <div className="empty-state">
              <Images size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No gallery entries published yet.</p>
            </div>
          )}
          {!loading && entries.length > 0 && (
            <motion.div className="gallery-entries" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              {entries.map(entry => (
                <motion.div key={entry.id} className="gallery-entry" variants={fadeUp}>
                  <div className="gallery-entry__header">
                    <h2 className="gallery-entry__title">{entry.title}</h2>
                    <div className="gallery-entry__meta">
                      {entry.patientName && <span><span className="gallery-meta-icon">👤</span>{entry.patientName}</span>}
                      {entry.treatmentName && <span><Stethoscope size={13} />{entry.treatmentName}</span>}
                      {entry.location && <span><MapPin size={13} />{entry.location}</span>}
                    </div>
                    {entry.description && <p className="gallery-entry__desc">{entry.description}</p>}
                  </div>
                  {entry.images.length > 0 && (
                    <div className="gallery-grid">
                      {entry.images.map((img, idx) => (
                        <button key={img.id} className="gallery-thumb" onClick={() => openLightbox(entry.images, idx)} aria-label={img.altText || `Photo ${idx + 1}`}>
                          <img src={img.url} alt={img.altText || entry.title} loading="lazy" />
                          {img.caption && <span className="gallery-thumb__caption">{img.caption}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
            <motion.div className="lightbox-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}><X size={20} /></button>
              <img src={lightbox.images[lightbox.index].url} alt={lightbox.images[lightbox.index].altText || ''} className="lightbox-img" />
              {lightbox.images[lightbox.index].caption && (
                <p className="lightbox-caption">{lightbox.images[lightbox.index].caption}</p>
              )}
              {lightbox.images.length > 1 && (
                <>
                  <button className="lightbox-nav lightbox-nav--prev" onClick={prev}><ChevronLeft size={24} /></button>
                  <button className="lightbox-nav lightbox-nav--next" onClick={next}><ChevronRight size={24} /></button>
                  <span className="lightbox-counter">{lightbox.index + 1} / {lightbox.images.length}</span>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
