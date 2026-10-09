import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Loader, Upload } from 'lucide-react';
import './PageStyles.css';

const stepLabels = ['Contact Info', 'Treatment', 'Case Details', 'Documents', 'Review'];

interface SOForm { name: string; email: string; phone: string; treatment: string; diagnosis: string; description: string; file: File | null; }
type FormErrors = Partial<Record<keyof SOForm, string>>;
type Status = 'idle' | 'loading' | 'success';

export default function SecondOpinion() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SOForm>({ name: '', email: '', phone: '', treatment: '', diagnosis: '', description: '', file: null });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof SOForm, v: string | File | null) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined })); };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Required';
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    }
    if (step === 1 && !form.treatment) e.treatment = 'Required';
    if (step === 2 && !form.description.trim()) e.description = 'Required';
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (step < 4) setStep(s => s + 1);
    else { setStatus('loading'); setTimeout(() => setStatus('success'), 2000); }
  };

  if (status === 'success') return (
    <div className="page">
      <section className="section-padding">
        <div className="container">
          <motion.div className="contact-success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle size={64} color="#22c55e" />
            <h3>Second Opinion Request Submitted!</h3>
            <p>Our team will review your case and coordinate access to a relevant specialist perspective. This is a demo — no data has been transmitted. Medgem does not provide actual medical opinions.</p>
            <button className="btn-primary" onClick={() => { setStatus('idle'); setStep(0); }}>Submit Another Request</button>
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
          <span className="section-label">Medical Second Opinion</span>
          <h1 className="page-hero__title">Request a Second Opinion</h1>
          <p>A second opinion can help you make a more informed decision about your treatment. Demo service only.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="consult-steps">
            {stepLabels.map((s, i) => (
              <div key={s} className={`consult-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="consult-step__num">{i < step ? <CheckCircle size={16} /> : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div className="contact-form glass" style={{ marginTop: '2rem' }} key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 0 && (
                <>
                  <h3 className="contact-form__title">Your Contact Information</h3>
                  <div className="form-row">
                    <div className="form-group"><label>Full Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" className={errors.name ? 'error' : ''} />{errors.name && <span className="form-error">{errors.name}</span>}</div>
                    <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className={errors.email ? 'error' : ''} />{errors.email && <span className="form-error">{errors.email}</span>}</div>
                  </div>
                  <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 000 000 0000" /></div>
                </>
              )}
              {step === 1 && (
                <>
                  <h3 className="contact-form__title">Treatment & Specialty</h3>
                  <div className="form-group">
                    <label>Treatment / Specialty *</label>
                    <select value={form.treatment} onChange={e => set('treatment', e.target.value)} className={errors.treatment ? 'error' : ''}>
                      <option value="">Select specialty</option>
                      {['Cardiology','Oncology','Neurology','Orthopaedics','Fertility','General Surgery','Other'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.treatment && <span className="form-error">{errors.treatment}</span>}
                  </div>
                  <div className="form-group"><label>Current Diagnosis (if known)</label><input value={form.diagnosis} onChange={e => set('diagnosis', e.target.value)} placeholder="Your current diagnosis" /></div>
                </>
              )}
              {step === 2 && (
                <>
                  <h3 className="contact-form__title">Case Description</h3>
                  <div className="form-group">
                    <label>Describe Your Case *</label>
                    <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Please describe your medical situation, current diagnosis and what you would like a second opinion on..." rows={6} className={errors.description ? 'error' : ''} />
                    {errors.description && <span className="form-error">{errors.description}</span>}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h3 className="contact-form__title">Medical Documents (Optional)</h3>
                  <div className="upload-area">
                    <Upload size={32} color="var(--muted-text)" />
                    <p>Upload relevant medical reports or scans</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>Demo only — no files are uploaded or stored</p>
                    <input type="file" style={{ display: 'none' }} id="file-upload-2" onChange={e => set('file', e.target.files?.[0] ?? null)} />
                    <label htmlFor="file-upload-2" className="btn-secondary" style={{ cursor: 'pointer', marginTop: '1rem' }}>Choose File</label>
                    {form.file && <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--royal-purple)' }}>Selected: {(form.file as File).name}</p>}
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <h3 className="contact-form__title">Review Your Request</h3>
                  <div className="sidebar-info">
                    <div className="sidebar-info-item"><span>Name</span><span>{form.name}</span></div>
                    <div className="sidebar-info-item"><span>Email</span><span>{form.email}</span></div>
                    <div className="sidebar-info-item"><span>Treatment</span><span>{form.treatment}</span></div>
                    <div className="sidebar-info-item"><span>Diagnosis</span><span>{form.diagnosis || 'Not specified'}</span></div>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)', fontStyle: 'italic', marginTop: '1rem' }}>Demo only. Medgem does not provide actual medical opinions or diagnoses. No data will be transmitted.</p>
                </>
              )}
              <div className="consult-nav">
                {step > 0 && <button className="btn-secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft size={16} /> Back</button>}
                <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={next} disabled={status === 'loading'}>
                  {status === 'loading' ? <><Loader size={16} className="spin" /> Submitting...</> : step === 4 ? <>Submit <CheckCircle size={16} /></> : <>Next <ArrowRight size={16} /></>}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
