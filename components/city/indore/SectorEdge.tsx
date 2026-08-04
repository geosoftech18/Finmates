'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Pill,
  Cog,
  Factory,
  ShoppingBag,
  MapPin,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useConsultationModal } from '@/components/city/indore/ConsultationModal';

const sectors = [
  {
    id: 'pharma',
    icon: Pill,
    name: 'Pharma & Healthcare Manufacturing',
    shortName: 'Pharma & Healthcare',
    location: 'Pithampur, Rau Pharma Cluster',
    accent: '#008bd0',
    bg: 'rgba(0,139,208,0.06)',
    border: 'rgba(0,139,208,0.16)',
    edge: ['Batch-wise costing accuracy', 'Regulatory capex planning', 'Export incentive tracking'],
    obstacles:
      "Formulation and API units around Pithampur and Rau carry heavy working capital locked in raw material stockpiling and long regulatory approval cycles. USFDA/WHO-GMP upgrades demand large capex outlays, while export-heavy revenue exposes margins to currency swings and delayed incentive disbursals.",
    solution:
      'We build batch-level costing models tied to your production runs, structure capex financing for compliance upgrades, and set up dedicated tracking for duty drawback, RoDTEP, and other export incentive claims so nothing is left uncollected.',
  },
  {
    id: 'auto',
    icon: Cog,
    name: 'Auto Components & Ancillary Manufacturing',
    shortName: 'Auto Components',
    location: 'Pithampur Industrial Area, AB Road',
    accent: '#323a85',
    bg: 'rgba(50,58,133,0.06)',
    border: 'rgba(50,58,133,0.16)',
    edge: ['OEM payment cycle tracking', 'Tooling & capex amortisation', 'Vendor rating compliance'],
    obstacles:
      "Ancillary units supplying Pithampur's auto OEMs routinely wait 60-90 days for payment while raw material and tooling costs are due upfront. Vendor rating audits, quality certifications, and just-in-time delivery pressure squeeze both cash and margins simultaneously.",
    solution:
      'We build OEM-wise receivable ageing dashboards, structure bill discounting against confirmed purchase orders, and model tooling amortisation schedules so capex spend is recovered before the next model changeover.',
  },
  {
    id: 'foodfmcg',
    icon: Factory,
    name: 'Food Processing, FMCG & Wholesale Trading',
    shortName: 'Food, FMCG & Trading',
    location: 'Ring Road, Rajwada & Sarafa Markets',
    accent: '#b45309',
    bg: 'rgba(180,83,9,0.06)',
    border: 'rgba(180,83,9,0.16)',
    edge: ['Perishable inventory turns', 'Mandi & distributor credit terms', 'Multi-state GST reconciliation'],
    obstacles:
      "Namkeen, snack, and packaged food units alongside Indore's grain and oilseed trading houses deal with thin margins, seasonal commodity price swings, and distributor credit that ties up cash for weeks. Multi-state dispatches also complicate GST input credit reconciliation.",
    solution:
      'We install daily stock-to-sales tracking, renegotiate distributor and mandi payment terms, and centralise multi-state GST reconciliation so input credit is never lost in the paperwork.',
  },
  {
    id: 'd2cretail',
    icon: ShoppingBag,
    name: 'D2C, Retail, Textiles & EdTech',
    shortName: 'D2C, Retail & EdTech',
    location: 'Vijay Nagar, Scheme 54, AB Road',
    accent: '#0d7e56',
    bg: 'rgba(13,126,86,0.06)',
    border: 'rgba(13,126,86,0.16)',
    edge: ['Channel-wise margin tracking', 'Garment inventory ageing', 'Fee-cycle cash planning'],
    obstacles:
      "Retail and garment brands around Vijay Nagar and Scheme 54 juggle marketplace fees, seasonal stock ageing, and showroom rentals, while EdTech and coaching businesses on AB Road face lumpy fee-cycle cash flows and high customer acquisition costs.",
    solution:
      'We build channel-wise contribution margin trackers, set inventory ageing alerts for garment and retail stock, and design term-wise cash flow models so fee-based businesses never run short between admission cycles.',
  },
];

export default function SectorEdge() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(sectors[0].id);
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

  const active = sectors.find((s) => s.id === activeId) ?? sectors[0];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      id="sector-edge"
      aria-labelledby="sector-edge-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full opacity-[0.05] blur-3xl"
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
            <Layers size={11} strokeWidth={2.5} />
            Indore Sector-Specific Edge
          </div>

          <h2
            id="sector-edge-heading"
            className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-5"
            style={{ color: '#002244' }}
          >
            Bespoke Virtual CFO Services for{' '}
            <span
              className="md:block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Indore's Major Business Sectors
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Indore thrives on commercial diversity — from Pithampur's pharma and auto belt to the
            Rajwada trading hubs and Vijay Nagar's retail corridor. Standardised financial
            management fails because cash drivers differ wildly from one trade to another. FinMates
            shapes each Virtual CFO partnership around the daily rhythm of your distinct market.
          </p>
        </div>

        {/* Sector edge cards (selectable) */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {sectors.map((sector) => {
            const Icon = sector.icon;
            const isActive = sector.id === activeId;
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => setActiveId(sector.id)}
                aria-pressed={isActive}
                className="text-left rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: isActive ? '#fff' : sector.bg,
                  borderColor: isActive ? sector.accent : sector.border,
                  boxShadow: isActive
                    ? `0 12px 30px ${sector.bg}, 0 0 0 1px ${sector.accent}`
                    : '0 1px 3px rgba(0,0,0,0.03)',
                }}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: isActive ? sector.bg : '#fff',
                    color: sector.accent,
                    border: `1px solid ${sector.border}`,
                  }}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="text-sm font-bold leading-snug mb-1.5" style={{ color: '#002244' }}>
                  {sector.shortName}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin size={11} style={{ color: sector.accent }} />
                  <span className="text-[11px] font-medium text-slate-500">{sector.location}</span>
                </div>
                <ul className="space-y-1.5">
                  {sector.edge.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ backgroundColor: sector.accent }}
                      />
                      <span className="text-xs text-slate-600 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Deep-dive detail panel */}
        <div
          className={`rounded-2xl border bg-white overflow-hidden shadow-sm transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ borderColor: 'rgba(0,34,68,0.08)' }}
        >
          {/* Panel header */}
          <div
            className="flex items-center gap-4 px-6 sm:px-8 py-5"
            style={{
              background: `linear-gradient(135deg, ${active.bg}, transparent)`,
              borderBottom: `1px solid ${active.border}`,
            }}
          >
            <span
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#fff', color: active.accent, border: `1px solid ${active.border}` }}
            >
              <ActiveIcon size={22} strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold leading-snug" style={{ color: '#002244' }}>
                {active.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={12} style={{ color: active.accent }} />
                <span className="text-xs font-medium text-slate-500">{active.location}</span>
              </div>
            </div>
          </div>

          {/* Panel body */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'rgba(0,34,68,0.06)' }}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(180,83,9,0.1)', color: '#b45309' }}
                >
                  <AlertTriangle size={15} strokeWidth={2.2} />
                </span>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#b45309' }}>
                  Operating Obstacles
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{active.obstacles}</p>
            </div>

            <div className="p-6 sm:p-8" style={{ backgroundColor: active.bg }}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#fff', color: active.accent, border: `1px solid ${active.border}` }}
                >
                  <Sparkles size={15} strokeWidth={2.2} />
                </span>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                  How We Step In
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#0c4a6e' }}>
                {active.solution}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 rounded-2xl px-6 sm:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            background: 'linear-gradient(135deg, #002244 0%, #323a85 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div>
            <p className="text-white font-bold text-base mb-1">
              Want a CFO who already knows your sector's cash rhythm?
            </p>
            <p className="text-white/50 text-sm">
              Book a free 30-minute call and we'll map the financial levers specific to your trade.
            </p>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95 whitespace-nowrap"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            Book a Free Consultation
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
