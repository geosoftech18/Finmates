'use client';

import { useEffect, useRef, useState } from 'react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';
import {
  BarChart2,
  GitBranch,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    icon: BarChart2,
    title: 'Cash Flow Forecasting & Working Capital Management',
    tag: 'Liquidity Intelligence',
    body: `Staying solvent while scaling requires more than a monthly bank reconciliation. We install dynamic 13-week rolling cash flow models, AR/AP cycle optimisation, and liquidity structures calibrated to Mumbai's extended debtor cycles. Every significant cash movement is visible — so every growth decision is grounded in fact, not guesswork. `,
    link: '#cash-flow-forecasting',
    linkLabel: 'Explore Cash Flow Services',
    accent: '#008bd0',
    bg: 'rgba(0,139,208,0.05)',
    border: 'rgba(0,139,208,0.15)',
    iconBg: 'rgba(0,139,208,0.12)',
    features: ['13-week rolling forecast', 'Working capital optimisation', 'Daily liquidity tracking'],
  },
  {
    icon: GitBranch,
    title: 'Strategic Financial Modelling & Scenario Planning',
    tag: 'Growth Architecture',
    body: `Whether you're preparing for a capital raise or mapping a three-year market expansion, your Virtual CFO builds dynamic financial models with integrated scenario analysis. You negotiate with investors and lenders from a position of rigorous, defensible data — not optimistic projections.  `,
    link: '#financial-modelling',
    linkLabel: 'Explore Financial Modelling',
    accent: '#323a85',
    bg: 'rgba(50,58,133,0.05)',
    border: 'rgba(50,58,133,0.15)',
    iconBg: 'rgba(50,58,133,0.12)',
    features: ['Fundraising model preparation for Series A/B rounds', 'Debt & equity structuring', '3–5 year scenario forecasts with sensitivity analysis'],
  },
  {
    icon: ShieldCheck,
    title: 'Tax Strategy & Regulatory Compliance',
    tag: 'Risk Elimination',
    body: `Maharashtra's compliance landscape — spanning GST, Corporate Tax, Advance Tax, Professional Tax, FEMA, and STPI/SEZ certifications — demands a proactive finance team, not a reactive one. Our Virtual CFOs engineer legitimate tax optimisation positions that protect your operating margins all year round.  `,
    link: '#tax-compliance',
    linkLabel: 'Explore Compliance Services',
    accent: '#008bd0',
    bg: 'rgba(37,99,234,0.05)',
    border: 'rgba(37,99,234,0.15)',
    iconBg: 'rgba(37,99,234,0.12)',
    features: ['GST & direct tax optimisation', 'Maharashtra statutory compliance', 'Audit coordination & readiness'],
  },
  {
    icon: LayoutDashboard,
    title: 'Advanced MIS Reporting & Executive Dashboards',
    tag: 'Boardroom Intelligence',
    body: `Turn raw accounting data into clear, confident decisions. We design automated executive dashboards tracking key unit economics, contribution margins, and department-level burn — giving your board and investors a single, authoritative source of truth.   `,
    link: '#mis-reporting',
    linkLabel: 'Explore MIS & Reporting',
    accent: '#002244',
    bg: 'rgba(0,31,62,0.04)',
    border: 'rgba(0,31,62,0.12)',
    iconBg: 'rgba(0,31,62,0.1)',
    features: ['Real-time executive dashboards', 'Automated KPI & OKR tracking', 'Board-ready financial packs'],
  },
];

function ServiceCard({
  service,
  index,
  visible,
}: {
  service: (typeof services)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`service-card-shell group relative overflow-visible rounded-2xl transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${hovered ? 'shadow-xl -translate-y-1' : 'shadow-sm'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transitionProperty: 'opacity, transform, box-shadow',
      }}
    >
      <div
        className="relative flex h-full flex-col rounded-2xl p-7 transition-colors duration-300"
        style={{
          backgroundColor: hovered ? '#fff' : service.bg,
          border: hovered ? '1px solid transparent' : `1px solid ${service.border}`,
        }}
      >
        {/* Gradient animated border on hover — same as /services page */}
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
          <div className="absolute top-0 right-0 h-[2px] w-0 bg-gradient-to-l from-[#008bd0] to-[#003b8d] transition-all duration-500 ease-linear group-hover:w-full" />
          <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-[#008bd0] to-[#003b8d] transition-all duration-500 ease-linear group-hover:h-full" />
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#003b8d] to-[#008bd0] transition-all duration-500 ease-linear group-hover:w-full" />
          <div className="absolute bottom-0 left-0 w-[2px] h-0 bg-gradient-to-t from-[#003b8d] to-[#008bd0] transition-all duration-500 ease-linear group-hover:h-full" />
        </div>

        <div className="relative flex flex-1 flex-col">
      {/* Top: icon + tag */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: hovered ? service.accent : service.iconBg,
            color: hovered ? '#fff' : service.accent,
          }}
        >
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <span
          className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: service.iconBg,
            color: service.accent,
            border: `1px solid ${service.border}`,
          }}
        >
          {service.tag}
        </span>
      </div>

      {/* H3 — semantic heading for SEO hierarchy */}
      <h3
        className="text-[1.05rem] font-bold leading-snug mb-3"
        style={{ color: '#002244' }}
      >
        {service.title}
      </h3>

      {/* Body copy */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{service.body}</p>

      {/* Feature pill list */}
      <ul className="flex flex-col gap-1.5 mt-5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: service.accent }}
            />
            <span className="text-xs text-gray-500 font-medium">{f}</span>
          </li>
        ))}
      </ul>

      {/* Text-link CTA */}
      <a
        href={service.link}
        className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold transition-all duration-200 group/link"
        style={{ color: service.accent }}
        onClick={() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'service_card_click', {
              event_category: 'services_grid',
              event_label: service.linkLabel,
            });
          }
        }}
      >
        {service.linkLabel}
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover/link:translate-x-1"
        />
      </a>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full origin-left transition-transform duration-300"
        style={{
          backgroundColor: service.accent,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
        </div>
      </div>
    </article>
  );
}


export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { open: openModal } = useConsultationModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: '#f8fafc' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #323a85, transparent 65%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Centered Header ── */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            style={{
              backgroundColor: 'rgba(37,99,234,0.08)',
              border: '1px solid rgba(37,99,234,0.2)',
              color: '#008bd0',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#008bd0] inline-block" />
            What We Deliver
          </div>

          {/* Section H2 */}
          <h2
            id="services-heading"
            className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight mb-4"
            style={{ color: '#002244' }}
          >
            Enterprise-Grade CFO Services, {" "}
            <span
              className="md:block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #323a85, #008bd0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tailored for Mumbai Businesses 
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
          Four high-impact financial disciplines — delivered by senior CFO professionals who understand Mumbai's regulatory environment, competitive cost structure, and capital ecosystem as well as you do.  
          </p>
        </div>

        {/* ── 2×2 Service Card Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} visible={visible} />
          ))}
        </div>

        {/* ── Bottom strip: all-services CTA ── */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-gray-500 text-sm mb-4">
            Not sure which service is the right starting point for your business?
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
            style={{ background: 'linear-gradient(135deg, #323a85, #008bd0)' }}
          >
            Get Your Custom CFO Roadmap
            <ArrowRight size={16} />
          </button>
          <p className="text-gray-400 text-xs mt-3">
            Complimentary 30-minute scoping session &bull; No commitment required
          </p>
        </div>
      </div>
    </section>
  );
}
