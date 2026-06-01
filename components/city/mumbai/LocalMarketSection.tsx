'use client';

import { useEffect, useRef, useState } from 'react';
import { Waves, Scale, TrendingDown, TrendingUp, ShieldCheck, BarChart3, Landmark, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';

const painPoints = [
  {
    icon: Waves,
    title: 'Cash Flow Under Pressure',
    tag: 'Scaling Operations',
    body: `Mumbai's rapid-growth businesses routinely face a dangerous mismatch between receivables and operational burn. Average debtor cycles stretching 45–90 days across manufacturing, logistics, and professional services push founders to fund daily operations on personal credit — eroding the capital meant for growth. A Virtual CFO installs rolling 13-week cash flow models and working-capital guardrails so growth never stalls at the bank.`,
    stat: '68%',
    statLabel: 'of Mumbai SMEs cite cash flow as their #1 constraint',
    accent: '#008bd0',
    bgAccent: 'rgba(0,139,208,0.07)',
    borderAccent: 'rgba(0,139,208,0.18)',
  },
  {
    icon: Scale,
    title: 'Compliance & Tax Complexity',
    tag: 'Regulatory Landscape',
    body: `Operating under Maharashtra's layered regulatory environment means navigating GST reconciliation, Professional Tax compliance, STPI/SEZ norms for tech firms, and shifting FEMA obligations for foreign-investor-backed businesses. A missed advance-tax deadline or an incorrect ITC claim can trigger assessments that consume months of management bandwidth. Our Virtual CFOs maintain a proactive compliance calendar and coordinate directly with your statutory auditors.`,
    stat: '3.2×',
    statLabel: 'more compliance filings for Mumbai-registered entities vs. national avg.',
    accent: '#323a85',
    bgAccent: 'rgba(50,58,133,0.07)',
    borderAccent: 'rgba(50,58,133,0.18)',
  },
  {
    icon: TrendingDown,
    title: 'Margin Erosion at Scale',
    tag: 'Profitability Squeeze',
    body: `Mumbai's commercial real estate remains among the most expensive in Asia, and the talent war for mid-to-senior professionals shows no sign of easing. For service businesses, people costs alone can consume 55–70% of revenue — leaving dangerously thin margins that evaporate the moment a key client delays payment. Strategic CFO intervention through unit-economics modelling, vendor renegotiation, and pricing architecture routinely recovers 8–15% of margin within the first two quarters.`,
    stat: '↑22%',
    statLabel: 'avg. commercial rent increase in BKC & Lower Parel since 2022',
    accent: '#008bd0',
    bgAccent: 'rgba(37,99,234,0.07)',
    borderAccent: 'rgba(37,99,234,0.18)',
  },
];

/* ── Animated CFO Dashboard card ────────────────────────────────────────────
   Fully coded — no external image dependency. Uses SVG, CSS gradients, and
   Tailwind to render a cinematic glassmorphism visual card.
───────────────────────────────────────────────────────────────────────────── */

function FloatingCFOCard({ visible }: { visible: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, [visible]);

  /* sparkline data — shifts slightly on each tick for live feel */
  const base = [32, 48, 38, 62, 55, 74, 66, 85, 78, 92, 88, 100];
  const shifted = base.map((v, i) => Math.min(100, Math.max(8, v + (((tick + i) % 3) - 1) * 4)));
  const pts = shifted.map((v, i) => `${(i / (shifted.length - 1)) * 100},${100 - v}`).join(' ');

  const kpis = [
    { label: 'Revenue Growth', value: '+38%', up: true, color: '#34d399' },
    { label: 'Cost Savings', value: '↓24%', up: true, color: '#38bdf8' },
    { label: 'EBITDA Margin', value: '21.4%', up: true, color: '#a78bfa' },
  ];

  const metrics = [
    { icon: TrendingUp,   label: 'Strategic Forecasting',  pct: 92 },
    { icon: ShieldCheck,  label: 'Compliance Health',       pct: 98 },
    { icon: BarChart3,    label: 'Cash Runway',             pct: 76 },
    { icon: Landmark,     label: 'Fundraise Readiness',     pct: 84 },
  ];

  return (
    <div
      className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: '200ms' }}
    >
      {/* Outer glow halo */}
      <div
        className="absolute -inset-6 rounded-[36px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, rgba(0,139,208,0.22) 0%, rgba(50,58,133,0.14) 50%, transparent 75%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Card shell */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: '24px',
          background: 'linear-gradient(160deg, #020d1f 0%, #061638 35%, #0a1e4a 65%, #071229 100%)',
          border: '1px solid rgba(0,139,208,0.25)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.08) inset',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        {/* ── Skyline panorama ── */}
        <div className="relative w-full overflow-hidden" style={{ height: '210px' }}>
          {/* Sky gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #002244 0%, #003b8d 30%, #0a2150 55%, #1a3a6e 75%, #008bd0 100%)',
            }}
          />

          {/* Stars */}
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 4 === 0 ? '2px' : '1px',
                height: i % 4 === 0 ? '2px' : '1px',
                top: `${5 + (i * 17) % 45}%`,
                left: `${(i * 37 + 11) % 96}%`,
                background: '#fff',
                opacity: 0.4 + (i % 5) * 0.12,
                animation: `starTwinkle ${2 + (i % 3)}s ease-in-out ${(i * 0.3) % 2}s infinite alternate`,
              }}
            />
          ))}

          {/* Moon glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: '28px', height: '28px',
              top: '10%', right: '14%',
              background: 'radial-gradient(circle, #e8f4ff 0%, #b8d4f8 40%, transparent 75%)',
              boxShadow: '0 0 20px 8px rgba(184,212,248,0.3)',
            }}
          />

          {/* BKC skyline — SVG buildings */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 360 110"
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bldgGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a3a6e" />
                <stop offset="100%" stopColor="#0a1e40" />
              </linearGradient>
              <linearGradient id="bldgGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#162d58" />
                <stop offset="100%" stopColor="#081628" />
              </linearGradient>
              <linearGradient id="tallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e4080" />
                <stop offset="100%" stopColor="#0d1f42" />
              </linearGradient>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d2a52" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#061428" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Water reflection strip */}
            <rect x="0" y="90" width="360" height="20" fill="url(#waterGrad)" opacity="0.7" />

            {/* Background far buildings */}
            <rect x="0"   y="65" width="22" height="45" fill="url(#bldgGrad2)" opacity="0.6" />
            <rect x="18"  y="50" width="18" height="60" fill="url(#bldgGrad2)" opacity="0.5" />
            <rect x="32"  y="55" width="25" height="55" fill="url(#bldgGrad2)" opacity="0.55" />
            <rect x="310" y="60" width="20" height="50" fill="url(#bldgGrad2)" opacity="0.5" />
            <rect x="326" y="52" width="18" height="58" fill="url(#bldgGrad2)" opacity="0.6" />
            <rect x="340" y="64" width="20" height="46" fill="url(#bldgGrad2)" opacity="0.55" />

            {/* Mid-ground buildings */}
            <rect x="55"  y="42" width="30" height="68" fill="url(#bldgGrad1)" />
            <rect x="81"  y="30" width="24" height="80" fill="url(#tallGrad)" />
            <rect x="101" y="48" width="20" height="62" fill="url(#bldgGrad1)" />
            <rect x="117" y="36" width="28" height="74" fill="url(#bldgGrad1)" />
            <rect x="141" y="52" width="18" height="58" fill="url(#bldgGrad1)" />

            {/* BKC Signature tower (tallest, centre) */}
            <rect x="158" y="8"  width="36" height="102" fill="url(#tallGrad)" />
            {/* Tower antenna */}
            <rect x="173" y="2"  width="4"  height="10"  fill="#008bd0" opacity="0.8" />
            {/* Tower top glow */}
            <ellipse cx="175" cy="8" rx="10" ry="4" fill="#008bd0" opacity="0.25" />
            {/* Tower windows grid */}
            {[...Array(14)].map((_, row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={162 + col * 10}
                  y={14 + row * 6}
                  width="6"
                  height="3"
                  rx="0.5"
                  fill={row % 3 === (tick % 3) && col === 1 ? '#38bdf8' : '#1e4a88'}
                  opacity={row % 3 === (tick % 3) && col === 1 ? 0.9 : 0.55}
                />
              ))
            )}

            {/* Right cluster */}
            <rect x="196" y="28" width="26" height="82" fill="url(#bldgGrad1)" />
            <rect x="218" y="40" width="22" height="70" fill="url(#tallGrad)" />
            <rect x="236" y="34" width="30" height="76" fill="url(#bldgGrad1)" />
            <rect x="262" y="46" width="20" height="64" fill="url(#bldgGrad1)" />
            <rect x="278" y="38" width="26" height="72" fill="url(#tallGrad)" />
            <rect x="300" y="50" width="18" height="60" fill="url(#bldgGrad1)" />

            {/* Window lights scattered on mid buildings */}
            {[
              [60,50],[65,58],[64,66],[72,44],[72,56],[86,36],[86,46],[86,58],
              [90,36],[122,42],[122,54],[128,48],[200,34],[204,46],[200,58],
              [224,48],[228,56],[242,40],[248,50],[284,44],[284,56],[290,48],
            ].map(([x, y], i) => (
              <rect
                key={i}
                x={x} y={y} width="4" height="2.5" rx="0.4"
                fill={i % 4 === tick % 4 ? '#60c8f0' : '#2a5a9e'}
                opacity={i % 4 === tick % 4 ? 0.95 : 0.5}
              />
            ))}

            {/* Water shimmer lines */}
            <line x1="40"  y1="98" x2="100" y2="98" stroke="#1e5a9e" strokeWidth="1" opacity="0.4" />
            <line x1="130" y1="96" x2="200" y2="96" stroke="#1e5a9e" strokeWidth="1" opacity="0.3" />
            <line x1="220" y1="99" x2="300" y2="99" stroke="#1e5a9e" strokeWidth="1" opacity="0.35" />
          </svg>

          {/* Horizon glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, rgba(0,139,208,0.12) 0%, rgba(37,99,234,0.06) 50%, transparent 100%)',
            }}
          />

          {/* Location badge */}
          <div
            className="absolute top-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0,139,208,0.3)',
              color: '#60c8f0',
            }}
          >
            <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            BKC, Mumbai
          </div>

          {/* Live indicator */}
          <div
            className="absolute top-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(52,211,153,0.3)',
              color: '#34d399',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] inline-block" style={{ animation: 'livePulse 1.4s ease-in-out infinite' }} />
            LIVE
          </div>
        </div>

        {/* ── Glass dashboard body ── */}
        <div className="p-5 flex flex-col gap-4">

          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="flex flex-col items-center gap-1 rounded-xl py-3 px-1"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span className="text-[11px] font-bold" style={{ color: k.color }}>{k.value}</span>
                <span className="text-[9px] text-white/40 text-center leading-tight">{k.label}</span>
              </div>
            ))}
          </div>

          {/* Sparkline chart panel */}
          <div
            className="rounded-xl p-3.5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Revenue Trajectory</span>
              <span className="text-[10px] font-bold" style={{ color: '#34d399' }}>
                ↑ +38% YoY
              </span>
            </div>
            <svg viewBox="0 0 100 40" className="w-full" style={{ height: '52px' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#008bd0" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#008bd0" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#323a85" />
                  <stop offset="60%" stopColor="#008bd0" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              {/* Fill area */}
              <polyline
                points={`0,100 ${pts} 100,100`}
                fill="url(#sparkFill)"
                style={{ transition: 'all 1.2s ease' }}
              />
              {/* Line */}
              <polyline
                points={pts}
                fill="none"
                stroke="url(#sparkLine)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'all 1.2s ease' }}
              />
              {/* End dot */}
              <circle
                cx="100"
                cy={100 - shifted[shifted.length - 1]}
                r="2.5"
                fill="#34d399"
                style={{ transition: 'all 1.2s ease', filter: 'drop-shadow(0 0 4px #34d399)' }}
              />
            </svg>
            {/* Month labels */}
            <div className="flex justify-between mt-1">
              {['Jan','Apr','Jul','Oct','Now'].map((m) => (
                <span key={m} className="text-[8px] text-white/25">{m}</span>
              ))}
            </div>
          </div>

          {/* Metric bars */}
          <div className="flex flex-col gap-2.5">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              const colors = ['#008bd0', '#34d399', '#38bdf8', '#a78bfa'];
              const c = colors[i];
              return (
                <div key={m.label} className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${c}22`, border: `1px solid ${c}40` }}
                  >
                    <Icon size={11} style={{ color: c }} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-white/60 font-medium truncate">{m.label}</span>
                      <span className="text-[10px] font-bold ml-2 flex-shrink-0" style={{ color: c }}>{m.pct}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: visible ? `${m.pct}%` : '0%',
                          background: `linear-gradient(90deg, ${c}99, ${c})`,
                          transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${0.6 + i * 0.15}s`,
                          boxShadow: `0 0 6px ${c}80`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer tag */}
          <div
            className="flex items-center justify-between pt-3 mt-1"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-[10px] text-white/30 font-medium">Virtual CFO Dashboard · Q2 2026</span>
            <span
              className="flex items-center gap-1 text-[10px] font-semibold"
              style={{ color: '#008bd0' }}
            >
              Live Data <ArrowUpRight size={9} />
            </span>
          </div>
        </div>

        {/* Frosted overlay strip at image-body seam */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '190px',
            left: 0, right: 0,
            height: '32px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(6,22,56,0.85) 100%)',
          }}
        />

        {/* Corner decorative neon lines */}
        <svg className="absolute top-0 right-0 pointer-events-none" width="80" height="80" viewBox="0 0 80 80">
          <path d="M80 0 L80 30 M80 0 L50 0" stroke="rgba(0,139,208,0.25)" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-0 left-0 pointer-events-none" width="80" height="80" viewBox="0 0 80 80">
          <path d="M0 80 L0 50 M0 80 L30 80" stroke="rgba(50,58,133,0.3)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Floating mini badge — overlaps card from top */}
      <div
        className={`absolute -top-4 left-8 z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-1000 delay-500 ${visible ? 'opacity-100 -translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{
          background: 'linear-gradient(135deg, #002244, #323a85)',
          border: '1px solid rgba(0,139,208,0.35)',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset',
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#34d399] inline-block" style={{ animation: 'livePulse 1.4s ease-in-out infinite' }} />
        CFO Intelligence Active
      </div>

      <style>{`
        @keyframes starTwinkle {
          from { opacity: 0.2; }
          to   { opacity: 0.9; }
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.6); }
          50%       { box-shadow: 0 0 0 4px rgba(52,211,153,0); }
        }
      `}</style>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────────────────── */

export default function LocalMarketSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { open: openModal } = useConsultationModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="local-market"
      aria-labelledby="local-market-heading"
      className="relative bg-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 520 520" fill="none"><circle cx="520" cy="0" r="360" stroke="#323a85" strokeWidth="80" /></svg>
      </div>
      <div className="absolute bottom-0 left-0 w-[340px] h-[340px] pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 340 340" fill="none"><circle cx="0" cy="340" r="240" stroke="#008bd0" strokeWidth="60" /></svg>
      </div>
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: 'linear-gradient(#323a85 1px, transparent 1px), linear-gradient(90deg, #323a85 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══ Two-column hero layout ══ */}
        <div className="lg:grid lg:grid-cols-[380px_1fr] lg:gap-16 xl:gap-20 items-start mb-16">

          {/* ── LEFT: Floating CFO card (sticky on scroll) ── */}
          <div className="hidden lg:block relative" style={{ marginTop: '-2rem' }}>
            <div className="sticky top-24">
              <FloatingCFOCard visible={visible} />
            </div>
          </div>

          {/* ── RIGHT: Header copy ── */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div
              className={`inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                backgroundColor: 'rgba(50,58,133,0.08)',
                border: '1px solid rgba(50,58,133,0.2)',
                color: '#323a85',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#323a85] inline-block" />
              Local Market Intelligence
            </div>

            <h2
              id="local-market-heading"
              className={`text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ color: '#002244' }}
            >
              Navigating Mumbai's Unique
              <span
                className="block mt-1"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #323a85, #008bd0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Economic Growth Challenges
              </span>
            </h2>

            <p
              className={`text-base sm:text-lg text-gray-600 leading-[1.8] mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Mumbai sits at the intersection of India's most competitive talent market, its most
              dynamic capital ecosystem, and its most densely regulated commercial environment.
              Businesses spanning Andheri's tech corridor, the BKC financial district, and
              Dharavi's manufacturing clusters all share a common vulnerability: financial
              infrastructure that was built for survival, not for scale.
            </p>

            {/* Stats row */}
            <div
              className={`grid grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {[
                { val: '₹940B', sub: 'Mumbai metro GDP', color: '#008bd0' },
                { val: '12,000+', sub: 'registered startups', color: '#323a85' },
                { val: '48 hrs', sub: 'avg. CFO onboarding', color: '#008bd0' },
              ].map((s) => (
                <div
                  key={s.sub}
                  className="rounded-xl px-4 py-4 text-center"
                  style={{
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}22`,
                  }}
                >
                  <p className="text-xl font-bold leading-none mb-1" style={{ color: s.color }}>{s.val}</p>
                  <p className="text-[11px] text-gray-500 leading-snug">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* City marker divider */}
            <div
              className={`flex items-center gap-4 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
              <span
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(0,139,208,0.08)',
                  color: '#008bd0',
                  border: '1px solid rgba(0,139,208,0.2)',
                }}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Mumbai, Maharashtra
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-gray-200 to-transparent" />
            </div>

            {/* Mobile card — shown only on small screens */}
            <div className="lg:hidden mt-10">
              <FloatingCFOCard visible={visible} />
            </div>
          </div>
        </div>

        {/* ── Pain Point Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`group relative flex flex-col rounded-2xl p-7 transition-all duration-700 hover:shadow-xl hover:-translate-y-1 cursor-default ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  backgroundColor: card.bgAccent,
                  border: `1px solid ${card.borderAccent}`,
                  transitionDelay: `${400 + i * 120}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: card.accent, color: '#fff' }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      color: card.accent,
                      border: `1px solid ${card.borderAccent}`,
                    }}
                  >
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3" style={{ color: '#002244' }}>
                  {card.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed flex-1">{card.body}</p>

                <div
                  className="mt-6 pt-5 border-t flex items-end gap-3"
                  style={{ borderColor: card.borderAccent }}
                >
                  <span className="text-2xl font-bold leading-none" style={{ color: card.accent }}>
                    {card.stat}
                  </span>
                  <span className="text-xs text-gray-500 leading-snug pb-0.5">{card.statLabel}</span>
                </div>

                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: card.accent }}
                />
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ background: 'linear-gradient(135deg, #002244 0%, #323a85 100%)' }}
        >
          <div>
            <p className="text-white font-semibold text-base sm:text-lg">
              Does your business face one or more of these challenges?
            </p>
            <p className="text-white/60 text-sm mt-1">
              A 30-minute diagnostic call is all it takes to identify your highest-leverage financial fix.
            </p>
          </div>
          <button
            onClick={openModal}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95 whitespace-nowrap"
            style={{ backgroundColor: '#008bd0' }}
          >
            Book a Free Diagnostic Call
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
