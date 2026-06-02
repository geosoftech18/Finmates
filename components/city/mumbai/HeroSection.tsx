'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, TrendingUp, Shield, Clock } from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';

const valuePoints = [
  { line1: 'Strategic CFO', line2: 'Advisory' },
  { line1: 'Dedicated Finance', line2: 'Expert' },
  { line1: 'Monthly Board-Level', line2: 'Reporting' },
];

const trustBadges = [
  { label: '150+ Businesses Served', icon: CheckCircle2 },
  { label: 'Avg. 32% Cost Reduction', icon: TrendingUp },
  { label: 'Mumbai-Based Experts', icon: Shield },
  { label: '48-Hour Onboarding', icon: Clock },
];

const chartBars = [
  { month: 'Jan', revenue: 42, profit: 18 },
  { month: 'Feb', revenue: 55, profit: 22 },
  { month: 'Mar', revenue: 48, profit: 20 },
  { month: 'Apr', revenue: 70, profit: 32 },
  { month: 'May', revenue: 65, profit: 28 },
  { month: 'Jun', revenue: 88, profit: 44 },
];

const kpiCards = [
  { label: 'Revenue Growth', value: '+38%', sub: 'YoY', color: '#008bd0' },
  { label: 'Burn Rate', value: '↓24%', sub: 'vs last Q', color: '#323a85' },
  { label: 'Runway', value: '18 mo', sub: 'projected', color: '#2563ea' },
];

function DashboardMockup() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-3xl opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, #008bd0, transparent 70%)' }}
      />

      {/* Dashboard card */}
      <div className="relative w-full max-w-md bg-white/[0.07] backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Financial Overview</p>
            <p className="text-white font-semibold text-sm mt-0.5">Q2 FY 2025 — Mumbai</p>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {kpiCards.map((kpi, i) => (
            <div
              key={kpi.label}
              className={`rounded-xl p-3 transition-all duration-500 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              style={{
                backgroundColor: `${kpi.color}22`,
                border: `1px solid ${kpi.color}44`,
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <p className="text-white/60 text-xs mb-1 leading-tight">{kpi.label}</p>
              <p className="font-bold text-white text-base leading-none">{kpi.value}</p>
              <p style={{ color: kpi.color }} className="text-xs font-medium mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-white/[0.05] rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/70 text-xs font-medium">Revenue vs Profit (₹ Lakhs)</p>
            <div className="flex gap-3">
              <span className="flex items-center gap-1 text-xs text-white/50">
                <span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#008bd0' }} />
                Revenue
              </span>
              <span className="flex items-center gap-1 text-xs text-white/50">
                <span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#323a85' }} />
                Profit
              </span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-28">
            {chartBars.map((bar, i) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end h-24">
                  <div
                    className="flex-1 rounded-t-sm transition-all duration-700 ease-out"
                    style={{
                      backgroundColor: '#008bd0',
                      height: animated ? `${bar.revenue}%` : '0%',
                      transitionDelay: `${i * 80 + 200}ms`,
                      opacity: 0.85,
                    }}
                  />
                  <div
                    className="flex-1 rounded-t-sm transition-all duration-700 ease-out"
                    style={{
                      backgroundColor: '#323a85',
                      height: animated ? `${bar.profit}%` : '0%',
                      transitionDelay: `${i * 80 + 300}ms`,
                    }}
                  />
                </div>
                <p className="text-white/40 text-[10px]">{bar.month}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Line SVG */}
        <div className="bg-white/[0.05] rounded-xl p-4">
          <p className="text-white/70 text-xs font-medium mb-3">Cash Flow Trajectory</p>
          <svg viewBox="0 0 280 60" className="w-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#008bd0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2563ea" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#008bd0" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#008bd0" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path
              d="M 0 55 L 0 45 C 30 40 50 35 80 28 C 110 21 130 25 160 18 C 190 11 220 14 250 6 C 265 3 272 2 280 1 L 280 55 Z"
              fill="url(#areaGrad)"
              className={animated ? 'opacity-100' : 'opacity-0'}
              style={{ transition: 'opacity 1s ease-out 0.8s' }}
            />
            {/* Line */}
            <path
              d="M 0 45 C 30 40 50 35 80 28 C 110 21 130 25 160 18 C 190 11 220 14 250 6 C 265 3 272 2 280 1"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={animated ? 0 : 400}
              style={{ transition: 'stroke-dashoffset 1.5s ease-out 0.6s' }}
            />
            {/* Dot at end */}
            <circle
              cx="280" cy="1" r="4"
              fill="#2563ea"
              className={animated ? 'opacity-100' : 'opacity-0'}
              style={{ transition: 'opacity 0.3s ease-out 2s' }}
            />
            <circle
              cx="280" cy="1" r="8"
              fill="#2563ea"
              fillOpacity="0.25"
              className={animated ? 'opacity-100' : 'opacity-0'}
              style={{ transition: 'opacity 0.3s ease-out 2s' }}
            />
          </svg>
          <div className="flex justify-between mt-1">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
              <p key={m} className="text-white/30 text-[9px]">{m}</p>
            ))}
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 mt-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <p className="text-white/40 text-xs">Live dashboard · Updated just now</p>
        </div>
      </div>

      {/* Floating stat card */}
      <div
        className={`absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-gray-100 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '1.2s' }}
      >
        <p className="text-xs text-gray-500 font-medium">Cost Saved vs Full-Time CFO</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: '#323a85' }}>₹18.4L/yr</p>
        <p className="text-xs font-medium mt-0.5" style={{ color: '#008bd0' }}>avg. client saving</p>
      </div>

      {/* Floating badge top-right */}
      <div
        className={`absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-gray-100 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '1.4s' }}
      >
        <p className="text-xs text-gray-500 font-medium">Client NPS Score</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: '#2563ea' }}>92</p>
        <p className="text-xs text-gray-400 mt-0.5">out of 100</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { open: openModal } = useConsultationModal();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        event_category: 'hero_section',
        event_label: 'schedule_free_assessment',
        event_action: 'click',
      });
    }
    openModal();
  };

  const handleSecondaryCTAClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        event_category: 'hero_section',
        event_label: 'view_case_studies',
        event_action: 'click',
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Virtual CFO Services in Mumbai Hero Section"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #001f3e 0%, #323a85 45%, #1a2a6e 70%, #001830 100%)`,
      }}
    >
      {/* Background texture elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #2563ea, transparent 70%)' }}
        />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-16 items-center">

          {/* ── Column 1: Copy (60%) ── */}
          <div className="flex flex-col">
            {/* Eyebrow tag */}
            <div
              className={`inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                borderColor: 'rgba(0,139,208,0.5)',
                backgroundColor: 'rgba(0,139,208,0.1)',
                color: '#60c8f0',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#008bd0] inline-block" />
              Mumbai's Premier Virtual CFO Practice
            </div>

            {/* H1 — semantic, SEO-optimized */}
            <h1
              className={`text-2xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white leading-[1.12] tracking-tight mb-6 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Virtual CFO Services {" "}
              <span className="md:block mt-1" style={{ color: '#60c8f0' }}>
                in Mumbai {" "}
              </span>
              <span className="md:block text-white mt-1">
                Built for Ambitious{' '}
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #008bd0, #2563ea)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Growth
                </span>
              </span>
            </h1>

            {/* Value proposition paragraph */}
            <p
              className={`text-base sm:text-lg text-white/75 leading-relaxed max-w-xl mb-8 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
             You're scaling fast—your finances should keep up. Our Virtual CFO services give Mumbai businesses direct access to Fortune-500-grade financial strategy, proactive cash-flow management, and board-ready reporting at a fraction of the cost of a full-time executive hire.  
            </p>

            {/* Trust badges row */}
            <div
              className={`grid grid-cols-2 gap-3 mb-8 max-w-xl transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {trustBadges.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <Icon size={15} style={{ color: '#008bd0' }} className="flex-shrink-0" />
                  <span className="text-white/80 text-xs font-medium leading-snug">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Block */}
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {/* Primary CTA */}
              <div className="flex flex-col gap-1.5">
                <button
                  id="hero-cta-primary"
                  onClick={handleCTAClick}
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl text-white font-semibold text-sm sm:text-base shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #008bd0, #2563ea)',
                    boxShadow: '0 4px 24px rgba(0,139,208,0.4)',
                  }}
                >
                  Schedule a Free Financial Assessment
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
                {/* Micro-copy */}
                <p className="text-white/50 text-xs pl-1">
                  No obligation &bull; 30-minute strategic call &bull; Response within 2 hours
                </p>
              </div>

              {/* Secondary CTA */}
              <a
                href="#case-studies"
                id="hero-cta-secondary"
                data-event="hero_view_case_studies"
                onClick={handleSecondaryCTAClick}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-white/80 font-medium text-sm sm:text-base border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                View Case Studies
              </a>
            </div>

            {/* Value points */}
            <div
              className={`flex flex-col sm:flex-row flex-wrap items-start gap-5 sm:gap-8 mt-6 transition-all duration-700 delay-450 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {valuePoints.map(({ line1, line2 }) => (
                <div key={line1} className="flex items-center gap-2.5">
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#1B61A9' }}
                    aria-hidden
                  >
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <div className="text-sm leading-snug" style={{ color: 'rgba(148, 163, 184, 0.95)' }}>
                    <p>{line1}</p>
                    <p>{line2}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof strip */}
            <div
              className={`flex items-center gap-4 mt-10 pt-8 border-t border-white/10 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2.5">
                {[
                  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Client ${i + 1}`}
                    className="w-9 h-9 rounded-full border-2 object-cover"
                    style={{ borderColor: '#001f3e' }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#008bd0">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-xs">
                  Trusted by <span className="text-white font-semibold">150+ founders</span> across Mumbai
                </p>
              </div>
            </div>
          </div>

          {/* ── Column 2: Dashboard Mockup (40%) ── */}
          <div
            className={`relative -mt-60 hidden lg:flex items-center justify-center min-h-[500px] transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ display: 'block' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 L0 30 C240 60 480 10 720 30 C960 50 1200 10 1440 30 L1440 60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
