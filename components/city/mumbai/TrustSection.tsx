'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const certifications = [
  { abbr: 'CA', sublabel: 'Chartered Accountant', body: 'ICAI Certified' },
  { abbr: 'CFA', sublabel: 'Chartered Financial Analyst', body: 'CFA Institute' },
  { abbr: 'CS', sublabel: 'Company Secretary', body: 'ICSI Member' },
  { abbr: 'CPA', sublabel: 'Certified Public Accountant', body: 'AICPA Member' },
  { abbr: 'FICCI', sublabel: 'Industry Council', body: 'FICCI Member' },
  { abbr: 'NASSCOM', sublabel: 'Tech Sector Partner', body: 'Certified Partner' },
];

const testimonials = [
  {
    quote: `Before engaging the Virtual CFO team, our Bhiwandi warehouse operation was haemorrhaging working capital in ways we simply couldn't see. Within the first quarter, they restructured our vendor payment cycles, renegotiated three major supply agreements, and built a cash flow model that finally gave us 90-day visibility. We reduced operational overhead by 17% without a single headcount cut. As a Mumbai-based logistics operator competing on thin margins, this was transformational. I genuinely can't imagine running our P&L without them now.`,
    author: 'Rajesh Mehta',
    title: 'Managing Director & CEO',
    company: 'Mehta Logistics Solutions Pvt. Ltd.',
    location: 'Bhiwandi, Mumbai',
    initials: 'RM',
    color: '#008bd0',
    avatarBg: 'rgba(0,139,208,0.12)',
    stars: 5,
    result: '17% reduction in operational overhead',
    sector: 'Logistics & Supply Chain',
  },
  {
    quote: `We were 60 days from a Series A close and our MIS was, frankly, a mess of Excel files that no institutional investor would take seriously. The Virtual CFO team came in, designed a clean three-statement model with scenario analysis, built automated dashboards integrated with our Zoho Books, and prepared a full investor data room. Our lead VC specifically called out the financial reporting quality during due diligence. We closed ₹18 crore from a Bandra Kurla Complex-based fund two months later. Worth every rupee.`,
    author: 'Priya Nambiar',
    title: 'Founder & CEO',
    company: 'Klarity Technologies',
    location: 'Andheri East, Mumbai',
    initials: 'PN',
    color: '#323a85',
    avatarBg: 'rgba(50,58,133,0.12)',
    stars: 5,
    result: '₹18 Cr Series A closed successfully',
    sector: 'B2B SaaS',
  },
  {
    quote: `Our retail group across Malad and Goregaon had no unified financial reporting — each store ran on its own books, and our CA only showed up at year-end. The Virtual CFO team consolidated everything into a single MIS dashboard, identified SKU-level margin leakages, and restructured our working capital with a revolving credit facility that freed up ₹2.2 crore in idle inventory. We now run monthly board reviews with the kind of data discipline I associate with listed companies. Exceptional team.`,
    author: 'Sunita Kapoor',
    title: 'Director — Finance & Operations',
    company: 'Kapoor Retail Group',
    location: 'Malad West, Mumbai',
    initials: 'SK',
    color: '#0d7e56',
    avatarBg: 'rgba(13,126,86,0.1)',
    stars: 5,
    result: '₹2.2 Cr working capital unlocked',
    sector: 'Retail & Consumer',
  },
  {
    quote: `Scaling a healthcare diagnostics network across Thane and Navi Mumbai without proper financial controls was a ticking time bomb. Our Virtual CFO mapped every revenue leakage point — unbilled lab panels, delayed insurance reconciliations, supplier credit terms left on the table — and built a compliance framework that brought our GST filing accuracy to 100%. More importantly, when we went to Axis Bank for a term loan, our financial documentation was so tight they fast-tracked approval. Best operational investment we've made.`,
    author: 'Dr. Arvind Shetty',
    title: 'Founder & Managing Partner',
    company: 'DiagnoCare Health Networks',
    location: 'Thane, Mumbai',
    initials: 'AS',
    color: '#b45309',
    avatarBg: 'rgba(180,83,9,0.08)',
    stars: 5,
    result: '100% GST accuracy + loan fast-tracked',
    sector: 'Healthcare & Diagnostics',
  },
];

const stats = [
  { value: '85+', label: 'Mumbai Clients Served' },
  { value: '₹340 Cr+', label: 'Capital Raised for Clients' },
  { value: '4.9 / 5', label: 'Average Client Rating' },
  { value: '6 yrs', label: 'Average Engagement Length' },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-[#008bd0] text-p-2" />
      ))}
    </div>
  );
}

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  const count = testimonials.length;

  const goTo = useCallback(
    (idx: number) => setActive(((idx % count) + count) % count),
    [count]
  );
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setActive((a) => (a + 1) % count), 5000);
  }, [count]);

  useEffect(() => {
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [resetAuto]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Touch / mouse drag
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragDelta.current < -50) { next(); resetAuto(); }
    else if (dragDelta.current > 50) { prev(); resetAuto(); }
    dragDelta.current = 0;
  };

  const t = testimonials[active];
  const previewVisible = 3;
  const previewMaxOffset = Math.max(0, count - previewVisible);
  const previewOffset = Math.min(Math.max(active - 1, 0), previewMaxOffset);

  return (
    <section
      ref={sectionRef}
      id="trust"
      aria-labelledby="trust-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: '#020b18' }}
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: 'radial-gradient(circle, #323a85, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tgrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tgrid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div
          className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#93c5fd',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#93c5fd] inline-block" />
            Credentials & Client Results
          </div>
          <h2
            id="trust-heading"
            className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight mb-4 text-white"
          >
            The Financial Strategy {" "}
            <span
              className="md:block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #93c5fd, #008bd0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Driving Success in Mumbai
            </span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Backed by India's highest financial certifications and trusted by Mumbai's fastest-growing
            businesses across logistics, technology, and manufacturing.
          </p>
        </div>

       

        {/* ── Testimonial Carousel ── */}
        <div
          className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Progress dots + controls header */}
          <div className="flex items-center justify-between mb-6">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); resetAuto(); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: active === i ? '28px' : '8px',
                    height: '8px',
                    backgroundColor: active === i ? testimonials[i].color : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { prev(); resetAuto(); }}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => { next(); resetAuto(); }}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Carousel track — drag-enabled */}
          <div
            ref={trackRef}
            className="relative select-none cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Main large card */}
            <div
              key={active}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${t.color}44`,
                backdropFilter: 'blur(16px)',
                animation: 'fadeSlideIn 0.4s ease both',
              }}
            >
              {/* Top accent line */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}55)` }} />

              <div className="p-6 sm:p-8 lg:p-10 grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-10">
                {/* Left: quote content */}
                <div className="flex flex-col">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: `${t.color}18`,
                        color: t.color,
                        border: `1px solid ${t.color}35`,
                      }}
                    >
                      <ArrowUpRight size={11} />
                      {t.result}
                    </span>
                    <span
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }}
                    >
                      {t.sector}
                    </span>
                  </div>

                  {/* Quote icon */}
                  <Quote size={36} strokeWidth={1.5} style={{ color: t.color, opacity: 0.25 }} className="mb-4" />

                  {/* Blockquote */}
                  <blockquote className="text-[0.95rem] sm:text-base leading-[1.9] text-white/75 italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Stars */}
                  <div className="mt-6">
                    <StarRating count={t.stars} />
                  </div>
                </div>

                {/* Right: author card */}
                <div
                  className="flex flex-col justify-between rounded-xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Avatar + identity */}
                  <div>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-4"
                      style={{
                        backgroundColor: t.avatarBg,
                        color: t.color,
                        border: `2px solid ${t.color}40`,
                        boxShadow: `0 0 0 4px ${t.color}12`,
                      }}
                    >
                      {t.initials}
                    </div>
                    <p className="text-white font-bold text-base leading-tight">{t.author}</p>
                    <p className="text-white/45 text-xs mt-1 leading-snug">{t.title}</p>
                  </div>

                  {/* Company info */}
                  <div
                    className="mt-6 pt-5 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      Company
                    </p>
                    <p className="font-semibold text-sm leading-snug" style={{ color: t.color }}>
                      {t.company}
                    </p>
                    <p className="text-white/35 text-xs mt-1">{t.location}</p>
                  </div>

                  {/* Carousel position */}
                  <div
                    className="mt-6 pt-4 border-t flex items-center gap-1.5"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-xs font-bold text-white/50">
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          backgroundColor: t.color,
                          width: `${((active + 1) / count) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white/25">
                      {String(count).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview carousel — synced with main testimonial + auto-scroll */}
            <div className="hidden lg:block mt-4 overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  width: `${(count / previewVisible) * 100}%`,
                  transform: `translateX(-${(previewOffset / count) * 100}%)`,
                }}
              >
                {testimonials.map((tItem, i) => (
                  <div
                    key={i}
                    role="button"
                    tabIndex={0}
                    onClick={() => { goTo(i); resetAuto(); }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goTo(i);
                        resetAuto();
                      }
                    }}
                    className="flex-shrink-0 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-white/20"
                    style={{
                      width: `${100 / count}%`,
                      background: active === i ? `${tItem.color}14` : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${active === i ? tItem.color + '40' : 'rgba(255,255,255,0.06)'}`,
                      opacity: active === i ? 1 : 0.65,
                      transform: active === i ? 'scale(1)' : 'scale(0.98)',
                    }}
                    aria-label={`View testimonial from ${tItem.author}`}
                    aria-current={active === i ? 'true' : undefined}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: tItem.avatarBg, color: tItem.color }}
                      >
                        {tItem.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white/80 truncate">{tItem.author}</p>
                        <p className="text-[10px] text-white/35 truncate">{tItem.company}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/40 mt-2 leading-relaxed line-clamp-2 italic">
                      &ldquo;{tItem.quote.slice(0, 80)}&hellip;&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

       
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
