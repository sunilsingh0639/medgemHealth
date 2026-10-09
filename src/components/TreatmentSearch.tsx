import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, HelpCircle } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import './TreatmentSearch.css';

const treatmentOptions = ['Cardiology','Orthopaedics','Oncology','Neurology','Cosmetic & Plastic Surgery','Dental Care','Fertility & IVF','Organ Transplant','Bariatric Surgery','Eye Care','Hair Transplant','General Surgery','Health Checkups','Wellness'];
const destinationOptions = ['India','Thailand','Singapore','Germany','UAE','Malaysia','Turkey','United Kingdom'];
const typeOptions = ['Surgical','Non-Surgical','Diagnostic','Wellness','Consultation'];

interface SearchForm { treatment: string; destination: string; type: string; }

export default function TreatmentSearch() {
  const [form, setForm] = useState<SearchForm>({ treatment: '', destination: '', type: '' });
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.treatment) params.set('cat', form.treatment);
    if (form.destination) params.set('dest', form.destination);
    navigate(`/treatments?${params.toString()}`);
  };

  return (
    <section className="search-section" id="search">
      <div className="container">
        <motion.div
          className="search-panel glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <AnimatedBackground variant="subtle" />
          <div className="search-panel__header" style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="search-panel__title">Find Your Treatment</h2>
            <a href="/treatments" className="search-panel__helper">
              <HelpCircle size={14} /> Not sure which treatment?
            </a>
          </div>
          <form className="search-form" onSubmit={handleSearch} style={{ position: 'relative', zIndex: 1 }}>
            <div className="search-field">
              <label className="search-label">Treatment / Specialty</label>
              <select className="search-select" value={form.treatment} onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}>
                <option value="">Select Treatment</option>
                {treatmentOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <label className="search-label">Preferred Destination</label>
              <select className="search-select" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}>
                <option value="">Any Destination</option>
                {destinationOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <label className="search-label">Treatment Type</label>
              <select className="search-select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="">Any Type</option>
                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <motion.button type="submit" className="search-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Search size={18} /><span>Search</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
