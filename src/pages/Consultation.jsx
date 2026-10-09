import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Loader, Phone, Mail, User, FileText, Upload } from 'lucide-react';
import { fadeUp, viewportConfig } from '../animations/motionVariants';
import './PageStyles.css';

const steps = ['Contact Info', 'Treatment', 'Case Details', 'Documents', 'Review'];

export default function Consultation() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', treatment: '', specialty: '', description: '', file: null });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Required';
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
      if (!form.phone.trim()) e.phone = 'Required';
    }
    if (step === 1 && !form.treatment) e.treatment = 'Please select a treatment';
    if (step === 2 && !form.description.trim()) e.description = 'Please describe your case';
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (step < 4) setStep(s => s + 1);
    else {
      setStatus('loading');
      setTimeout(() => setStatus('success'), 2000);
    }
  };

  if (status === 'success') return (
    <div className="page">
      <section className="section-padding">
        <div className="container">
          <motion.div className="contact-success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle size={64} color="#22c55e" />
            <h3>Consultation Request Submitted!</h3>
            <p>Thank you for your enquiry. Our team will review your request and be in touch shortly. This is a demo — no data has been transmitted or stored.</p>
            <button className="btn-primary" onClick={() => { setStatus('idle'); setStep(0); setForm({ name: '', email: '', phone: '', country: '', treatment: '', specialty: '', description: '', file: null }); }}>
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="page">
      <div className="page-hero page-hero--sm">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <span className="section-label">Free Consultation</span>
          <h1 className="page-hero__title">Request a Consultation</h1>
          <p>Share your requirements and our team will help you explore suitable healthcare options.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="consult-steps">
            {steps.map((s, i) => (
              <div key={s} className={`consult-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="consult-step__num">{i < step ? <CheckCircle size={16} /> : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>

          <motion.div className="contact-form glass" style={{ marginTop: '2rem' }} key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <>
                <h3 className="contact-form__title"><User size={20} /> Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className={errors.name ? 'error' : ''} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 000 000 0000" className={errors.phone ? 'error' : ''} />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="Your country" />
                  </div>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h3 className="contact-form__title"><Phone size={20} /> Treatment Selection</h3>
                <div className="form-group">
                  <label>Treatment of Interest *</label>
                  <select value={form.treatment} onChange={e => set('treatment', e.target.value)} className={errors.treatment ? 'error' : ''}>
                    <option value="">Select a treatment</option>
                    {['Cardiology', 'Orthopaedics', 'Oncology', 'Neurology', 'Cosmetic Surgery', 'Dental Care', 'Fertility & IVF', 'Organ Transplant', 'Bariatric Surgery', 'Eye Care', 'Hair Transplant', 'Health Checkup', 'Wellness', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.treatment && <span className="form-error">{errors.treatment}</span>}
                </div>
                <div className="form-group">
                  <label>Preferred Destination</label>
                  <select value={form.specialty} onChange={e => set('specialty', e.target.value)}>
                    <option value="">Any destination</option>
                    {['India', 'Thailand', 'Singapore', 'Germany', 'UAE', 'Malaysia', 'Turkey', 'United Kingdom'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="contact-form__title"><FileText size={20} /> Case Description</h3>
                <div className="form-group">
                  <label>Brief Case Description *</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Please describe your medical condition, current diagnosis and what you are looking for..." rows={6} className={errors.description ? 'error' : ''} />
                  {errors.description && <span className="form-error">{errors.description}</span>}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3 className="contact-form__title"><Upload size={20} /> Medical Documents (Optional)</h3>
                <div className="upload-area">
                  <Upload size={32} color="var(--muted-text)" />
                  <p>Upload medical reports, scans or test results</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>Demo only — no files are uploaded or stored</p>
                  <input type="file" style={{ display: 'none' }} id="file-upload" onChange={e => set('file', e.target.files[0])} />
                  <label htmlFor="file-upload" className="btn-secondary" style={{ cursor: 'pointer', marginTop: '1rem' }}>
                    Choose File
                  </label>
                  {form.file && <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--royal-purple)' }}>Selected: {form.file.name}</p>}
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h3 className="contact-form__title"><CheckCircle size={20} /> Review Your Request</h3>
                <div className="sidebar-info">
                  <div className="sidebar-info-item"><span>Name</span><span>{form.name}</span></div>
                  <div className="sidebar-info-item"><span>Email</span><span>{form.email}</span></div>
                  <div className="sidebar-info-item"><span>Phone</span><span>{form.phone}</span></div>
                  <div className="sidebar-info-item"><span>Treatment</span><span>{form.treatment || 'Not specified'}</span></div>
                  <div className="sidebar-info-item"><span>Destination</span><span>{form.specialty || 'Any'}</span></div>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)', fontStyle: 'italic', marginTop: '1rem' }}>
                  Demo only. No data will be transmitted or stored.
                </p>
              </>
            )}

            <div className="consult-nav">
              {step > 0 && <button className="btn-secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft size={16} /> Back</button>}
              <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={next} disabled={status === 'loading'}>
                {status === 'loading' ? <><Loader size={16} className="spin" /> Submitting...</> : step === 4 ? <>Submit Request <CheckCircle size={16} /></> : <>Next <ArrowRight size={16} /></>}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
