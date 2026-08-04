'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BadgeIndianRupee,
  Rocket,
  TrendingUp,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';

const plans = [
  {
    id: 'growth',
    icon: Rocket,
    name: 'Growth CFO',
    stage: 'Early-stage Startups & SMEs',
    turnover: 'Turnover: Up to ₹5 Crore',
    price: '₹25,000 – ₹50,000',
    period: '/ month',
    featured: false,
    accent: '#008bd0',
    bg: 'rgba(0,139,208,0.05)',
    border: 'rgba(0,139,208,0.18)',
    deliverables: [
      'Monthly MIS reports and profit-and-loss statements',
      'Routine cash flow tracking',
      'Basic tax and compliance timelines',
      'Twice-monthly CFO consultation calls',
    ],
  },
  {
    id: 'expansion',
    icon: TrendingUp,
    name: 'Expansion CFO',
    stage: 'Expanding Mid-Market Firms',
    turnover: 'Turnover: ₹5 Cr – ₹25 Crore',
    price: '₹50,000 – ₹1,00,000',
    period: '/ month',
    featured: true,
    badge: 'Most Popular',
    accent: '#323a85',
    bg: 'rgba(50,58,133,0.05)',
    border: 'rgba(50,58,133,0.2)',
    deliverables: [
      'All features from the entry tier',
      '13-week rolling cash forecasts',
      'Budget versus actual discrepancy analysis',
      'Working capital management and debt sourcing',
      'Weekly advisor planning sessions',
    ],
  },
  {
    id: 'enterprise',
    icon: Building2,
    name: 'Enterprise CFO',
    stage: 'High-Growth / VC-Backed',
    turnover: 'Turnover: ₹25 Cr – ₹100 Cr+',
    price: '₹1,00,000 – ₹2,00,000',
    period: '/ month',
    featured: false,
    accent: '#0d7e56',
    bg: 'rgba(13,126,86,0.05)',
    border: 'rgba(13,126,86,0.18)',
    deliverables: [
      'All provisions from the mid-market tier',
      'Assigned senior chartered accountant and support crew',
      'Boardroom presence and formal presentations',
      'Capital raising and business valuation assistance',
      'In-person planning sessions at your Mumbai offices',
    ],
  },
];

export default function PricingTiers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { open: openModal } = useConsultationModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #ffffff 0%, #f4f8fc 40%, #f8fafc 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-28 right-0 w-[480px] h-[480px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-16 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(circle, #323a85, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div
          className={`max-w-3xl mx-auto text-center mb-12 lg:mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            style={{
              backgroundColor: 'rgba(0,139,208,0.07)',
              border: '1px solid rgba(0,139,208,0.18)',
              color: '#008bd0',
            }}
          >
            <BadgeIndianRupee size={11} strokeWidth={2.5} />
            Transparent Pricing
          </div>

          <h2
            id="pricing-heading"
            className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-5"
            style={{ color: '#002244' }}
          >
            Straightforward Rates &amp;{' '}
            <span
              className="md:block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Service Structures
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            High-tier fiscal guidance should not be a luxury or a guessing game. We built a modular
            rate setup. It adapts naturally as your business volume and operational intricacies
            expand.
          </p>
        </div>

        {/* Plan cards */}
        <div
          className={`grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured ? 'shadow-xl md:-mt-2 md:mb-0 md:pb-0' : 'shadow-sm'
                }`}
                style={{
                  borderColor: plan.featured ? plan.accent : 'rgba(0,34,68,0.08)',
                  boxShadow: plan.featured
                    ? `0 20px 40px ${plan.bg}, 0 0 0 1px ${plan.accent}`
                    : undefined,
                }}
              >
                {plan.featured && (
                  <div
                    className="absolute top-0 inset-x-0 h-1"
                    style={{ background: `linear-gradient(90deg, #008bd0, ${plan.accent})` }}
                  />
                )}

                <div
                  className="px-6 pt-7 pb-5"
                  style={{ backgroundColor: plan.featured ? plan.bg : undefined }}
                >
                  {plan.featured && (
                    <span
                      className="inline-flex items-center gap-1 mb-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white"
                      style={{ backgroundColor: plan.accent }}
                    >
                      <Sparkles size={10} />
                      {plan.badge}
                    </span>
                  )}

                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: plan.bg,
                      color: plan.accent,
                      border: `1px solid ${plan.border}`,
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>

                  <h3 className="text-xl font-bold mb-1" style={{ color: '#002244' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm font-medium mb-0.5" style={{ color: plan.accent }}>
                    {plan.stage}
                  </p>
                  <p className="text-xs text-slate-500 mb-5">{plan.turnover}</p>

                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-2xl sm:text-[1.65rem] font-bold tracking-tight" style={{ color: '#002244' }}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Estimated monthly retainer</p>
                </div>

                <div className="flex-1 px-6 py-5 border-t" style={{ borderColor: 'rgba(0,34,68,0.06)' }}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Core Deliverables Included
                  </p>
                  <ul className="space-y-2.5">
                    {plan.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: plan.accent }}
                        />
                        <span className="text-sm text-slate-600 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 pb-6">
                  <button
                    type="button"
                    onClick={openModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{
                      backgroundColor: plan.featured ? plan.accent : '#fff',
                      color: plan.featured ? '#fff' : '#002244',
                      border: plan.featured ? 'none' : '1px solid rgba(0,34,68,0.12)',
                    }}
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note + CTA */}
        <div
          className={`mt-10 text-center transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-slate-500 mb-5 max-w-xl mx-auto">
            Not sure which tier fits? We'll map your turnover, complexity, and goals in a free
            30-minute call — no obligation.
          </p>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
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
