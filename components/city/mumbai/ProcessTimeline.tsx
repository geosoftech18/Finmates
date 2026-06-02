'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, Compass, Repeat2, ArrowRight } from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';

const steps = [
  {
    number: '01',
    icon: Search,
    phase: 'Financial Health Audit & Diagnosis',
    duration: 'Week 1–2',
    tag: 'Discovery',
    body: `•	 We begin with a rigorous, no-assumptions deep dive into your business's financial anatomy. Our CFOs analyze three years of historical ledgers, reconcile your balance sheet line-by-line, and map every material cash flow gap—identifying hidden capital leakages that most founders never knew existed. 

   We benchmark your unit economics, working-capital cycle, and cost structure against Mumbai sector peers.  `,
    deliverables: ['Financial Health Report', 'Capital leakage map', 'Benchmark analysis', 'Intervention priority list'],
    accent: '#008bd0',
    light: 'rgba(0,139,208,0.08)',
    border: 'rgba(0,139,208,0.2)',
  },
  {
    number: '02',
    icon: Compass,
    phase: 'Strategic Blueprint & System Setup',
    duration: 'Week 3–5',
    tag: 'Architecture',
    body: `With the diagnostic complete, we move from insight to infrastructure. Your assigned Virtual CFO architects a fully customised financial operating model — dynamic 12-month projections with scenario branches, a rolling cash flow forecast calibrated to your specific revenue cycle, and a structured cap table and funding strategy if required.

Simultaneously, we design and deploy your executive MIS dashboard: a single, real-time view of your P&L, cash position, burn rate, and operational KPIs — built to the precision standards expected by institutional investors and lenders. By the end of this phase, your financial reporting will be indistinguishable from that of a company ten times your size.`,
    deliverables: ['Custom 12-month financial model', 'Rolling cash flow framework', 'Executive MIS dashboard', 'Investor-ready reporting pack'],
    accent: '#323a85',
    light: 'rgba(50,58,133,0.08)',
    border: 'rgba(50,58,133,0.2)',
  },
  {
    number: '03',
    icon: Repeat2,
    phase: 'Ongoing Advisory & Execution',
    duration: 'Month 2 onwards',
    tag: 'Partnership',
    body: `This is where long-term financial transformation happens. Your Virtual CFO becomes a permanent fixture in your leadership rhythm — attending weekly finance reviews, monthly board meetings, and quarterly strategic planning sessions. We actively manage compliance calendars across GST, advance tax, and Maharashtra statutory filings so nothing surprises you at year-end.

As your business grows, we evolve your financial architecture with it: renegotiating vendor terms, supporting fundraising rounds, stress-testing new market entries, and continuously recalibrating your cash reserves to ensure your runway stays firmly in your control. You gain a seasoned financial co-pilot without the ₹60–80L annual cost of a full-time CFO hire.`,
    deliverables: ['Weekly & monthly CFO reviews', 'Proactive compliance management', 'Fundraising & investor support', 'Ongoing model recalibration'],
    accent: '#008bd0',
    light: 'rgba(37,99,234,0.08)',
    border: 'rgba(37,99,234,0.2)',
  },
];

const STEP_INTERVAL_MS = 6000;

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>();
  const { open: openModal } = useConsultationModal();

  const resetAuto = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, STEP_INTERVAL_MS);
  }, []);

  const selectStep = useCallback(
    (index: number) => {
      setActiveStep(index);
      resetAuto();
    },
    [resetAuto]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      return;
    }
    resetAuto();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [visible, resetAuto]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-labelledby="process-heading"
      className="relative py-20 lg:py-28 overflow-hidden bg-white"
    >
      {/* Background grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#323a85" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 lg:mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            style={{
              backgroundColor: 'rgba(0,139,208,0.08)',
              border: '1px solid rgba(0,139,208,0.2)',
              color: '#008bd0',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#008bd0] inline-block" />
            Transparent Process
          </div>

          <h2
            id="process-heading"
            className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight mb-4"
            style={{ color: '#002244' }}
          >
            Your Roadmap to Financial Clarity: {" "}
            <span
              className="md:block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              How It Works
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
         Your Roadmap to Financial Clarity: How It Works Sub-text: From the first diagnostic call to a long-term strategic partnership—a clear, structured path with defined deliverables at every milestone.  
          </p>
        </div>

        {/* ── Desktop: Horizontal connector bar ── */}
        <div className="hidden lg:block relative mb-10">
          <div className="flex items-center justify-between relative">
            {/* Track line */}
            <div
              className="absolute top-8 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-0.5"
              style={{ backgroundColor: '#e2e8f0' }}
            />
            {/* Animated fill */}
            <div
              className="absolute top-8 left-[calc(16.67%-1px)] h-0.5 transition-all duration-700 ease-out"
              style={{
                backgroundColor: steps[activeStep].accent,
                width: visible
                  ? activeStep === 0
                    ? '0%'
                    : activeStep === 1
                    ? '33.33%'
                    : '66.66%'
                  : '0%',
                boxShadow: `0 0 8px ${steps[activeStep].accent}66`,
              }}
            />

            {/* Step indicator nodes */}
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => selectStep(i)}
                className="flex flex-col items-center gap-3 flex-1 group focus:outline-none"
                aria-label={`View step ${step.number}: ${step.phase}`}
              >
                {/* Node circle */}
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 z-10 border-2"
                  style={{
                    backgroundColor: activeStep >= i ? step.accent : '#fff',
                    borderColor: activeStep >= i ? step.accent : '#e2e8f0',
                    color: activeStep >= i ? '#fff' : '#94a3b8',
                    boxShadow: activeStep === i ? `0 0 0 6px ${step.accent}22` : 'none',
                    transform: activeStep === i ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {step.number}
                </div>
                {/* Phase label */}
                <div className="text-center px-2">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider block mb-0.5 transition-colors duration-200"
                    style={{ color: activeStep === i ? step.accent : '#94a3b8' }}
                  >
                    {step.tag}
                  </span>
                  <span
                    className="text-sm font-semibold leading-snug block transition-colors duration-200"
                    style={{ color: activeStep === i ? '#002244' : '#64748b' }}
                  >
                    {step.phase}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5 block">{step.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Desktop: Active step expanded card ── */}
        <div className="hidden lg:block">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-y-0 block' : 'opacity-0 translate-y-4 hidden'}`}
              >
                <div
                  className="rounded-2xl p-8 lg:p-10 flex gap-10 items-start"
                  style={{
                    backgroundColor: step.light,
                    border: `1px solid ${step.border}`,
                  }}
                >
                  {/* Left: number + icon */}
                  <div className="flex flex-col items-center gap-4 flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: step.accent }}
                    >
                      <Icon size={28} strokeWidth={1.75} color="#fff" />
                    </div>
                    <span
                      className="text-5xl font-black leading-none tracking-tighter opacity-20"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Center: copy */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${step.accent}18`,
                          color: step.accent,
                          border: `1px solid ${step.border}`,
                        }}
                      >
                        {step.tag}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{step.duration}</span>
                    </div>
                    <h3
                      className="text-xl lg:text-2xl font-bold mb-4"
                      style={{ color: '#002244' }}
                    >
                      {step.phase}
                    </h3>
                    <p className="text-base text-gray-600 leading-[1.8]">{step.body}</p>
                  </div>

                  {/* Right: deliverables */}
                  <div
                    className="w-64 flex-shrink-0 rounded-xl p-5"
                    style={{
                      backgroundColor: '#fff',
                      border: `1px solid ${step.border}`,
                    }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-4"
                      style={{ color: step.accent }}
                    >
                      Deliverables
                    </p>
                    <ul className="flex flex-col gap-3">
                      {step.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${step.accent}18` }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: step.accent }}
                            />
                          </span>
                          <span className="text-sm text-gray-600 font-medium leading-snug">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-4 px-2">
                  <button
                    onClick={() => selectStep(Math.max(0, i - 1))}
                    className={`text-sm font-medium flex items-center gap-1.5 transition-opacity ${i === 0 ? 'opacity-0 pointer-events-none' : 'opacity-60 hover:opacity-100'}`}
                    style={{ color: '#64748b' }}
                  >
                    <ArrowRight size={14} className="rotate-180" />
                    Previous phase
                  </button>
                  {i < steps.length - 1 ? (
                    <button
                      onClick={() => selectStep(i + 1)}
                      className="text-sm font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-80"
                      style={{ color: steps[i + 1].accent }}
                    >
                      Next: {steps[i + 1].phase}
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={openModal}
                      className="text-sm font-semibold flex items-center gap-1.5"
                      style={{ color: step.accent }}
                    >
                      Start your audit today
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile: Alternating vertical timeline ── */}
        <div className="lg:hidden relative">
          {/* Vertical track */}
          <div
            className="absolute left-7 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: '#e2e8f0' }}
          />
          {/* Animated fill overlay */}
          <div
            className="absolute left-7 top-0 w-0.5 transition-all duration-1000 ease-out"
            style={{
              backgroundColor: '#008bd0',
              height: visible ? '100%' : '0%',
              transitionDelay: '0.3s',
            }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`flex gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {/* Node */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-base z-10 border-2 text-white"
                      style={{
                        backgroundColor: step.accent,
                        borderColor: step.accent,
                        boxShadow: `0 0 0 4px ${step.accent}22`,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 rounded-2xl p-5 pb-6"
                    style={{
                      backgroundColor: step.light,
                      border: `1px solid ${step.border}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${step.accent}18`, color: step.accent }}
                      >
                        {step.tag}
                      </span>
                      <span className="text-xs text-gray-400">{step.duration}</span>
                    </div>
                    <h3
                      className="text-base font-bold mb-3 leading-snug"
                      style={{ color: '#002244' }}
                    >
                      {step.phase}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{step.body}</p>
                    <div className="border-t pt-4" style={{ borderColor: step.border }}>
                      <p
                        className="text-[11px] font-bold uppercase tracking-widest mb-2.5"
                        style={{ color: step.accent }}
                      >
                        Deliverables
                      </p>
                      <ul className="grid grid-cols-1 gap-1.5">
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: step.accent }}
                            />
                            <span className="text-xs text-gray-600 font-medium">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #002244 0%, #323a85 60%, #008bd0 100%)',
              boxShadow: '0 4px 20px rgba(50,58,133,0.3)',
            }}
          >
            Begin Your Financial Health Audit
            <ArrowRight size={17} />
          </button>
          <p className="text-gray-400 text-xs mt-3">
            Onboarding typically begins within 48 hours of your first call
          </p>
        </div>
      </div>
    </section>
  );
}
