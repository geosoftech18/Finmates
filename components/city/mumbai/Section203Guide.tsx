'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Scale,
  Building2,
  Landmark,
  Shield,
  Handshake,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';

const mandates = [
  {
    icon: Landmark,
    title: 'Every listed entity',
    body: 'Listed companies must appoint a whole-time Chief Financial Officer under Section 203.',
  },
  {
    icon: Building2,
    title: 'Public companies at ₹10 Cr+',
    body: 'Any public company with paid-up share capital of ten crore rupees or more is bound by the same rule.',
  },
];

const privateFirmPoints = [
  {
    icon: Shield,
    title: 'Statutory Flexibility',
    body: 'Private limited firms face no legal obligation to keep a full-time officer on their direct payroll.',
    accent: '#008bd0',
    bg: 'rgba(0,139,208,0.06)',
    border: 'rgba(0,139,208,0.16)',
  },
  {
    icon: Handshake,
    title: 'External Financial Leadership',
    body: 'Businesses can partner with an external financial firm to oversee books, manage internal financial controls, and represent the firm during audits. This setup bypasses the heavy payroll burdens associated with a full-time executive.',
    accent: '#323a85',
    bg: 'rgba(50,58,133,0.06)',
    border: 'rgba(50,58,133,0.16)',
  },
  {
    icon: TrendingUp,
    title: 'Growth Management',
    body: 'When an expanding business nears the statutory limit, FinMates guides this shift. We establish operational blueprints, manage the recruitment process, and transfer structured workflows to the incoming executive.',
    accent: '#0d7e56',
    bg: 'rgba(13,126,86,0.06)',
    border: 'rgba(13,126,86,0.16)',
  },
];

export default function Section203Guide() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { open: openModal } = useConsultationModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-203"
      aria-labelledby="section-203-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #323a85, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 -right-16 w-[380px] h-[380px] rounded-full opacity-[0.04] blur-3xl"
          style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div
          className={`max-w-3xl mb-12 lg:mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            style={{
              backgroundColor: 'rgba(50,58,133,0.07)',
              border: '1px solid rgba(50,58,133,0.18)',
              color: '#323a85',
            }}
          >
            <BookOpen size={11} strokeWidth={2.5} />
            Companies Act 2013
          </div>

          <h2
            id="section-203-heading"
            className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-5"
            style={{ color: '#002244' }}
          >
            Navigating Section 203 of the{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Companies Act 2013
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
            Indian corporate leaders scaling their operations often struggle to grasp the rules
            regarding mandatory Chief Financial Officer appointments. This legal requirement stems
            from the Companies Act of 2013. It remains a persistent source of confusion.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            Under Section 203 of the Act, combined with Rule 8 of the Appointment and Remuneration
            Rules of 2014, certain businesses must hire a full-time officer. This applies
            specifically to every listed entity. It also binds any public company holding a paid-up
            share capital of ten crore rupees or more.
          </p>
        </div>

        {/* Mandate callout + threshold badge */}
        <div
          className={`grid lg:grid-cols-12 gap-5 mb-14 lg:mb-16 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            className="lg:col-span-4 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(145deg, #002244 0%, #323a85 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">
                <AlertCircle size={13} />
                Legal threshold
              </div>
              <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                ₹10 Cr
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Paid-up share capital above which public companies must appoint a whole-time CFO.
              </p>
            </div>
            <div
              className="mt-6 pt-5 flex items-start gap-2.5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Scale size={16} className="text-[#008bd0] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/55 leading-relaxed">
                Section 203 · Rule 8, Appointment and Remuneration Rules, 2014
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {mandates.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-slate-50/80 p-6 flex flex-col"
                  style={{ borderColor: 'rgba(0,34,68,0.08)' }}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: 'rgba(0,139,208,0.1)',
                      color: '#008bd0',
                    }}
                  >
                    <Icon size={18} strokeWidth={2.1} />
                  </span>
                  <h3 className="text-base font-bold mb-2" style={{ color: '#002244' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{item.body}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#b45309' }}>
                    <CheckCircle2 size={13} />
                    Full-time CFO required
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How Virtual CFOs serve private firms */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-3xl mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{
                backgroundColor: 'rgba(0,139,208,0.07)',
                border: '1px solid rgba(0,139,208,0.18)',
                color: '#008bd0',
              }}
            >
              <Handshake size={11} strokeWidth={2.5} />
              For private &amp; smaller firms
            </div>
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3"
              style={{ color: '#002244' }}
            >
              How Virtual Financial Officers Serve Private Firms and Smaller Enterprises
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Startups, closely-held businesses, and private entities in Mumbai with paid-up capital
              below the ten crore threshold enjoy different rules. They do not face the same rigid
              structural demands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
            {privateFirmPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <article
                  key={point.title}
                  className="rounded-2xl border p-6 lg:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    backgroundColor: point.bg,
                    borderColor: point.border,
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: '#fff',
                      color: point.accent,
                      border: `1px solid ${point.border}`,
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <h4 className="text-base font-bold mb-2.5" style={{ color: '#002244' }}>
                    {point.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{point.body}</p>
                </article>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 rounded-2xl px-6 sm:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid rgba(0,34,68,0.08)',
          }}
        >
          <div>
            <p className="font-bold text-base mb-1" style={{ color: '#002244' }}>
              Unsure if Section 203 applies to your company?
            </p>
            <p className="text-slate-500 text-sm">
              Our Mumbai team can map your capital structure and recommend full-time vs fractional
              leadership.
            </p>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95 whitespace-nowrap"
            style={{ background: 'linear-gradient(90deg, #008bd0, #323a85)' }}
          >
            Book a Free Consultation
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
