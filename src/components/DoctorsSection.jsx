import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Languages } from 'lucide-react';
import { doctors } from '../data/doctors';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './DoctorsSection.css';

export default function DoctorsSection({ limit = 6 }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  return (
    <section className="doctors-section section-padding">
      <div className="container">
        <motion.div className="doctors-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <div>
            <span className="section-label">Medical Specialists</span>
            <h2 className="section-title">Featured <span>Doctors</span></h2>
            <p className="section-subtitle">Connect with experienced specialists across leading medical centres. All profiles are illustrative demo data.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="dest-ctrl" onClick={() => scroll(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
            <button className="dest-ctrl" onClick={() => scroll(1)} aria-label="Next"><ChevronRight size={20} /></button>
            <Link to="/doctors" className="btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>
        </motion.div>

        <motion.div
          className="doctors-track"
          ref={scrollRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          {doctors.slice(0, limit).map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-card__img-wrap">
                <img src={doc.image} alt={doc.name} loading="lazy" className="doctor-card__img" />
              </div>
              <div className="doctor-card__body">
                <h3 className="doctor-card__name">{doc.name}</h3>
                <p className="doctor-card__spec">{doc.specialty}</p>
                <p className="doctor-card__hospital"><MapPin size={12} /> {doc.hospital}</p>
                <p className="doctor-card__exp">Experience: {doc.experience}</p>
                <div className="doctor-card__langs">
                  <Languages size={12} />
                  <span>{doc.languages.slice(0, 2).join(', ')}</span>
                </div>
                <div className="doctor-card__actions">
                  <Link to={`/doctors/${doc.id}`} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                    View Profile
                  </Link>
                  <Link to="/consultation" className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                    Consult
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
