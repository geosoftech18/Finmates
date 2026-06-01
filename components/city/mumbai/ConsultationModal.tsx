'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from 'react';
import { X, User, Mail, Phone, Clock, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

/* ─── Context ─────────────────────────────────────────────────────────────── */

type ModalContextType = { open: () => void };
const ModalContext = createContext<ModalContextType>({ open: () => {} });
export const useConsultationModal = () => useContext(ModalContext);

/* ─── Time slot options ───────────────────────────────────────────────────── */

const TIME_SLOTS = [
  'Monday – Morning (9 AM – 12 PM)',
  'Monday – Afternoon (1 PM – 4 PM)',
  'Tuesday – Morning (9 AM – 12 PM)',
  'Tuesday – Afternoon (1 PM – 4 PM)',
  'Wednesday – Morning (9 AM – 12 PM)',
  'Wednesday – Afternoon (1 PM – 4 PM)',
  'Thursday – Morning (9 AM – 12 PM)',
  'Thursday – Afternoon (1 PM – 4 PM)',
  'Friday – Morning (9 AM – 12 PM)',
  'Friday – Afternoon (1 PM – 4 PM)',
  'Saturday – Morning (10 AM – 12 PM)',
];

/* ─── Form state type ─────────────────────────────────────────────────────── */

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  preferred_time: string;
};

type FieldError = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = { full_name: '', email: '', phone: '', preferred_time: '' };

/* ─── Validation ──────────────────────────────────────────────────────────── */

function validate(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.full_name.trim()) errors.full_name = 'Please enter your name.';
  if (!data.email.trim()) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email.';
  if (!data.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!/^[+\d\s\-()]{7,15}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!data.preferred_time) errors.preferred_time = 'Please select a preferred time.';
  return errors;
}

/* ─── Modal UI ────────────────────────────────────────────────────────────── */

function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Focus trap & reset on open
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY);
      setErrors({});
      setStatus('idle');
      setServerError('');
      setTimeout(() => firstFieldRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }

    setStatus('loading');
    setServerError('');

    try {
      // Storage/email integration can be wired here later (e.g. API route)
      await new Promise((resolve) => setTimeout(resolve, 400));
      setStatus('success');
    } catch {
      setServerError('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.08)',
          maxHeight: '95dvh',
          overflowY: 'auto',
          animation: 'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #008bd0, #323a85)' }} />

        {/* Header */}
        <div className="px-7 pt-7 pb-5 flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: '#008bd0' }}
            >
              No-Obligation · 30 Minutes · Free
            </p>
            <h2
              id="modal-title"
              className="text-xl sm:text-2xl font-bold leading-tight"
              style={{ color: '#002244' }}
            >
              Book a Free Consultation
            </h2>
            <p className="text-sm text-gray-500 mt-1 leading-snug">
              Our Mumbai CFO team will reach out within one business day to confirm.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100 active:scale-90 mt-0.5"
            style={{ color: '#94a3b8' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-7 h-px bg-gray-100" />

        {/* ── Success state ── */}
        {status === 'success' ? (
          <div className="px-7 py-8 flex flex-col items-center text-center gap-5">
            {/* Animated check */}
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,139,208,0.12), rgba(50,58,133,0.12))',
                  border: '2px solid rgba(0,139,208,0.25)',
                  animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
                }}
              >
                <CheckCircle size={38} style={{ color: '#008bd0' }} strokeWidth={1.75} />
              </div>
              {/* Pulse ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid rgba(0,139,208,0.2)',
                  animation: 'pulseRing 1.6s ease-out 0.3s infinite',
                }}
              />
            </div>

            {/* Headline & subtext */}
            <div className="flex flex-col gap-2 max-w-sm">
              <h3
                className="text-xl sm:text-2xl font-bold leading-tight"
                style={{ color: '#002244' }}
              >
                Thank You for Connecting With Us!
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We&apos;ve successfully received your details.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our team will review your requirement and get in touch with you shortly with the best
                possible solution for your business needs.
              </p>
            </div>

            {/* Divider with label */}
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Connect Directly
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Subtext before buttons */}
            <p className="text-xs text-gray-400 -mt-2 leading-relaxed max-w-xs">
              In the meantime, you can directly connect with us through the following channels for
              faster communication and instant support.
            </p>

            {/* Action buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+912269004200"
                className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #008bd0, #006fa8)',
                  boxShadow: '0 4px 16px rgba(0,139,208,0.3)',
                }}
              >
                <Phone size={16} strokeWidth={2.5} />
                Call Now
              </a>
              <a
                href="https://wa.me/912269004200?text=Hi%2C%20I%20just%20submitted%20a%20consultation%20request%20on%20your%20website%20and%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #25d366, #128c44)',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                }}
              >
                {/* WhatsApp icon */}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Chat
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1"
            >
              Close this window
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} noValidate className="px-7 py-6 flex flex-col gap-4">

            {/* Full Name */}
            <Field
              ref={firstFieldRef}
              id="full_name"
              label="Full Name"
              type="text"
              placeholder="e.g. Rajesh Mehta"
              icon={<User size={15} />}
              value={form.full_name}
              onChange={set('full_name')}
              error={errors.full_name}
              autoComplete="name"
            />

            {/* Email */}
            <Field
              id="email"
              label="Email Address"
              type="email"
              placeholder="e.g. rajesh@mehtalogistics.in"
              icon={<Mail size={15} />}
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />

            {/* Phone */}
            <Field
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="e.g. +91 98200 42001"
              icon={<Phone size={15} />}
              value={form.phone}
              onChange={set('phone')}
              error={errors.phone}
              autoComplete="tel"
            />

            {/* Preferred Time */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="preferred_time" className="text-sm font-semibold" style={{ color: '#002244' }}>
                Preferred Time Slot
              </label>
              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: errors.preferred_time ? '#dc2626' : '#94a3b8' }}
                >
                  <Clock size={15} />
                </span>
                <select
                  id="preferred_time"
                  value={form.preferred_time}
                  onChange={set('preferred_time')}
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none bg-white"
                  style={{
                    border: `1.5px solid ${errors.preferred_time ? '#fca5a5' : '#e2e8f0'}`,
                    color: form.preferred_time ? '#002244' : '#94a3b8',
                    boxShadow: errors.preferred_time ? '0 0 0 3px rgba(220,38,38,0.08)' : 'none',
                  }}
                  onFocus={(e) => {
                    if (!errors.preferred_time)
                      e.currentTarget.style.border = '1.5px solid #008bd0';
                    e.currentTarget.style.boxShadow = errors.preferred_time
                      ? '0 0 0 3px rgba(220,38,38,0.08)'
                      : '0 0 0 3px rgba(0,139,208,0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = `1.5px solid ${errors.preferred_time ? '#fca5a5' : '#e2e8f0'}`;
                    e.currentTarget.style.boxShadow = errors.preferred_time
                      ? '0 0 0 3px rgba(220,38,38,0.08)'
                      : 'none';
                  }}
                >
                  <option value="" disabled>Select a preferred time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {/* Custom chevron */}
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              {errors.preferred_time && (
                <p className="text-xs text-red-500 mt-0.5">{errors.preferred_time}</p>
              )}
            </div>

            {/* Server error */}
            {status === 'error' && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {serverError}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #008bd0 0%, #323a85 100%)' }}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Request My Free Consultation
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-gray-400">
              No spam. No commitment. We&apos;ll call you at your chosen time.
            </p>
          </form>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Reusable text input field ───────────────────────────────────────────── */

import { forwardRef } from 'react';

const Field = forwardRef<
  HTMLInputElement,
  {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    icon: ReactNode;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    autoComplete?: string;
  }
>(({ id, label, type, placeholder, icon, value, onChange, error, autoComplete }, ref) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold" style={{ color: '#002244' }}>
      {label}
    </label>
    <div className="relative">
      <span
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: error ? '#dc2626' : '#94a3b8' }}
      >
        {icon}
      </span>
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          border: `1.5px solid ${error ? '#fca5a5' : '#e2e8f0'}`,
          color: '#002244',
          boxShadow: error ? '0 0 0 3px rgba(220,38,38,0.08)' : 'none',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.border = '1.5px solid #008bd0';
          e.currentTarget.style.boxShadow = error
            ? '0 0 0 3px rgba(220,38,38,0.08)'
            : '0 0 0 3px rgba(0,139,208,0.12)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = `1.5px solid ${error ? '#fca5a5' : '#e2e8f0'}`;
          e.currentTarget.style.boxShadow = error ? '0 0 0 3px rgba(220,38,38,0.08)' : 'none';
        }}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
));
Field.displayName = 'Field';

/* ─── Provider ───────────────────────────────────────────────────────────── */

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ open }}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={close} />
    </ModalContext.Provider>
  );
}
