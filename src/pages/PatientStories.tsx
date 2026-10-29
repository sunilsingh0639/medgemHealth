import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Stethoscope, Building2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { storiesApi, type PatientStory, type StoryPhoto } from '../api';
import { fadeUp, staggerContainer, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';
import './PatientStories.css';
import './PatientGallery.css';

function getEmbedUrl(url: string, provider: string): string {
  if (provider === 'youtube') {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
  }
  if (provider === 'vimeo') {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : url;
  }
  return url;
}

export default function PatientStories() {
  const [stories, setStories] = useState<PatientStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoModal, setVideoModal] = useState<PatientStory | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: StoryPhoto[]; index: number } | null>(null);

  useEffect(() => {
    storiesApi.getPublished()
      .then(r => setStories(r.data.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (videoModal && e.key === 'Escape') setVideoModal(null);
      if (lightbox) {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowLeft') setLightbox(l => l ? { ...l, index: (l.index - 1 + l.photos.length) % l.photos.length } : l);
        if (e.key === 'ArrowRight') setLightbox(l => l ? { ...l, index: (l.index + 1) % l.photos.length } : l);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Success Stories</span>
          <h1 className="page-hero__title">Patient Success Stories</h1>
          <p>Inspiring journeys from patients who trusted Medgem Global Healthcare.</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          {loading && <div className="empty-state"><p>Loading stories…</p></div>}
          {!loading && stories.length === 0 && (
            <div className="empty-state">
              <BookOpen size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No success stories published yet.</p>
            </div>
          )}
          {!loading && stories.length > 0 && (
            <motion.div className="stories-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              {stories.map(story => (
                <motion.div key={story.id} className="story-card" variants={fadeUp} whileHover={{ y: -4 }}>
                  <div className="story-card__thumb">
                    {story.thumbnailUrl
                      ? <img src={story.thumbnailUrl} alt={story.title} loading="lazy" />
                      : <div style={{ width: '100%', height: '100%', background: 'var(--light-lavender)' }} />
                    }
                    {story.videoUrl && (
                      <button className="story-card__play" onClick={() => setVideoModal(story)} aria-label="Play video">
                        <span className="story-card__play-icon"><Play size={22} fill="currentColor" /></span>
                      </button>
                    )}
                    {story.isFeatured && <span className="story-card__featured">Featured</span>}
                  </div>
                  <div className="story-card__body">
                    <h3 className="story-card__title">{story.title}</h3>
                    <div className="story-card__meta">
                      {story.patientName && <span>👤 {story.patientName}</span>}
                      {story.treatment && <span><Stethoscope size={12} />{story.treatment}</span>}
                      {story.hospital && <span><Building2 size={12} />{story.hospital}</span>}
                    </div>
                    {story.description && <p className="story-card__desc">{story.description}</p>}
                    {story.photos.length > 0 && (
                      <div className="story-detail-photos">
                        {story.photos.slice(0, 4).map((p, idx) => (
                          <button key={p.id} className="story-detail-photo" onClick={() => setLightbox({ photos: story.photos, index: idx })} aria-label={p.altText || `Photo ${idx + 1}`}>
                            <img src={p.url} alt={p.altText || story.title} loading="lazy" />
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="story-card__footer">
                      <span className="story-card__date">{new Date(story.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      {story.videoUrl && (
                        <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => setVideoModal(story)}>
                          <Play size={13} fill="currentColor" /> Watch Story
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div className="video-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoModal(null)}>
            <motion.div className="video-modal-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
              <button className="video-modal-close" onClick={() => setVideoModal(null)}><X size={20} /></button>
              {videoModal.videoProvider === 'upload'
                ? <video className="video-modal-player" src={videoModal.videoUrl} controls autoPlay />
                : <iframe className="video-modal-iframe" src={getEmbedUrl(videoModal.videoUrl, videoModal.videoProvider)} allow="autoplay; fullscreen" allowFullScreen title={videoModal.videoTitle || videoModal.title} />
              }
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setLightbox(null)}><X size={20} /></button>
              <img src={lightbox.photos[lightbox.index].url} alt={lightbox.photos[lightbox.index].altText || ''} className="lightbox-img" />
              {lightbox.photos[lightbox.index].caption && <p className="lightbox-caption">{lightbox.photos[lightbox.index].caption}</p>}
              {lightbox.photos.length > 1 && (
                <>
                  <button className="lightbox-nav lightbox-nav--prev" onClick={() => setLightbox(l => l ? { ...l, index: (l.index - 1 + l.photos.length) % l.photos.length } : l)}><ChevronLeft size={24} /></button>
                  <button className="lightbox-nav lightbox-nav--next" onClick={() => setLightbox(l => l ? { ...l, index: (l.index + 1) % l.photos.length } : l)}><ChevronRight size={24} /></button>
                  <span className="lightbox-counter">{lightbox.index + 1} / {lightbox.photos.length}</span>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
