import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader } from 'lucide-react';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './ContactBanner.css';

const treatments = ['Cardiology', 'Orthopaedics', 'Oncology', 'Neurology', 'Cosmetic Surgery', 'Dental Care', 'Fertility & IVF', 'Other'];
const destinations = ['India', 'Thailand', 'Singapore', 'Germany', 'UAE', 'Malaysia', 'Turkey', 'United Kingdom', 'Not Sure'];
const countryCodes = ['+1', '+44', '+91', '+971', '+65', '+60', '+90', '+49', '+966', '+20'];

export default function ContactBanner() {
  const [form, setForm] = useState({ name: '', email: '', code: '+1', phone: '', treatment: '', destination: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1800);
  };

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  if (status === 'success') return (
    <section className="contact-banner section-padding">
      <div className="container">
        <motion.div className="contact-success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle size={56} color="#22c55e" />
          <h3>Enquiry Received!</h3>
          <p>Thank you for reaching out. Our team will be in touch with you shortly. This is a demo — no data has been transmitted.</p>
          <button className="btn-primary" onClick={() => setStatus('idle')}>Send Another Enquiry</button>
        </motion.div>
      </div>
    </section>
  );

  return (
    <section className="contact-banner section-padding">
      <div className="contact-banner__bg" />
      <div className="container">
        <div className="contact-banner__inner">
          <motion.div className="contact-banner__content" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <span className="section-label" style={{ color: 'var(--soft-gold)' }}>Get In Touch</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>Start Your Healthcare <span style={{ color: 'var(--champagne-gold)' }}>Journey Today</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Share your requirements and our team will help you explore suitable healthcare options and coordinate your medical journey.
            </p>
            <div className="contact-features">
              {['Personalised Assistance', 'No Obligation Enquiry', 'Confidential & Secure'].map(f => (
                <div key={f} className="contact-feature">
                  <CheckCircle size={16} color="#C5A45D" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact-form glass"
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
          >
            <h3 className="contact-form__title">Send an Enquiry</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} className={errors.name ? 'error' : ''} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} className={errors.email ? 'error' : ''} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <div className="phone-input">
                <select value={form.code} onChange={e => set('code', e.target.value)} className="phone-code">
                  {countryCodes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="tel" placeholder="Phone number" value={form.phone} onChange={e => set('phone', e.target.value)} className={errors.phone ? 'error' : ''} />
              </div>
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Treatment of Interest</label>
                <select value={form.treatment} onChange={e => set('treatment', e.target.value)}>
                  <option value="">Select Treatment</option>
                  {treatments.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Destination</label>
                <select value={form.destination} onChange={e => set('destination', e.target.value)}>
                  <option value="">Select Destination</option>
                  {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your requirements..." value={form.message} onChange={e => set('message', e.target.value)} rows={3} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
              {status === 'loading' ? <><Loader size={18} className="spin" /> Sending...</> : <><Send size={18} /> Send Enquiry</>}
            </button>
            <p className="form-disclaimer">Demo only. No data is transmitted or stored.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
