'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Scale,
  CheckCircle2,
  LineChart,
  Wallet,
  ShieldCheck,
  LayoutDashboard,
  Target,
  ClipboardList,
  Building2,
  TrendingUp,
  Timer,
  Users,
  Cloud,
  Rocket,
  FileCheck,
  Expand,
  ArrowRight,
} from 'lucide-react';
import { useConsultationModal } from '@/components/city/indore/ConsultationModal';

const columns = [
  { key: 'inHouse', label: 'In-House Finance Chief', short: 'In-House CFO' },
  { key: 'accountant', label: 'Traditional Local Accountant', short: 'Local Accountant' },
  { key: 'finmates', label: 'FinMates Fractional Team', short: 'FinMates', featured: true },
] as const;

type ColumnKey = (typeof columns)[number]['key'];

const matrixRows: {
  criterion: string;
  icon: typeof Wallet;
  values: Record<ColumnKey, string>;
}[] = [
  {
    criterion: 'Yearly Cash Outlay',
    icon: Wallet,
    values: {
      inHouse: '₹4,000,000 to ₹12,000,000+ (Includes base salary, perks, and equity)',
      accountant: '₹120,000 to ₹300,000 (Basic retainer fee)',
      finmates: '₹120,000 to ₹900,000 annually (Cuts expenses by up to 85%)',
    },
  },
  {
    criterion: 'Setup and Launch Timeline',
    icon: Timer,
    values: {
      inHouse: 'Two to three months for recruiting and notice periods',
      accountant: 'Instant setup but restricted to entering basic receipts',
      finmates: 'Less than two days to get started',
    },
  },
  {
    criterion: 'Primary Day-to-Day Focus',
    icon: Target,
    values: {
      inHouse: 'Big-picture planning that remains detached from daily tasks',
      accountant: 'Past taxes, late GST filings, and basic yearly audits',
      finmates: 'Future growth maps, itemized profitability, and real-time cash tracking',
    },
  },
  {
    criterion: 'Expertise and Credentials',
    icon: Users,
    values: {
      inHouse: "A single person's viewpoint and limited experience",
      accountant: 'Standard tax preparers',
      finmates: 'Diverse specialists including former Big Four accountants, company secretaries, and legal experts',
    },
  },
  {
    criterion: 'Software and Systems',
    icon: Cloud,
    values: {
      inHouse: 'Limited by whatever internal tech budget exists',
      accountant: 'Hand-entered books and offline spreadsheets',
      finmates: 'Cloud-linked portals using Zoho, PowerBI, and RazorpayX',
    },
  },
  {
    criterion: 'Capital Raising Assistance',
    icon: Rocket,
    values: {
      inHouse: 'Managed entirely by your solo hire',
      accountant: 'Seldom offered by neighborhood firms',
      finmates: 'Complete support covering financial projections, secure investor folders, and business valuation',
    },
  },
  {
    criterion: 'Regulatory Compliance',
    icon: FileCheck,
    values: {
      inHouse: 'Overseen by your internal staff',
      accountant: 'Last-minute filings to avoid late fees',
      finmates: 'Year-round monitoring with strict internal financial controls',
    },
  },
  {
    criterion: 'Room to Grow',
    icon: Expand,
    values: {
      inHouse: 'Rigid multi-year commitment and severance risks',
      accountant: 'Inflexible contract limits',
      finmates: 'Fluid monthly agreements that adjust to your business milestones',
    },
  },
];

const capabilities = [
  {
    id: 'fpa',
    label: 'FP&A & Unit Economics',
    shortLabel: 'FP&A',
    icon: LineChart,
    title: 'Financial Planning & Analysis (FP&A) and Unit Economics',
    lead: 'Growth can lie. Often, rapid expansion masks dying margins. We build bespoke financial models that focus on your true operational levers.',
    points: [
      {
        title: 'Operational Driver Modelling',
        body: 'We draft three-to-five-year financial projections. These forecasts rest on real unit economics like customer acquisition costs, lifetime value, gross margins, and payback durations.',
      },
      {
        title: 'Budget Variance Auditing',
        body: 'We run monthly operational reviews to compare projections with real spending. Catching overruns early protects your core earnings.',
      },
      {
        title: 'Capital Allocation and Asset Evaluation',
        body: 'Hard numbers must back major spending. We run painstaking return-on-investment reviews for new regional expansions, product launches, or major equipment purchases.',
      },
    ],
  },
  {
    id: 'cash',
    label: 'Cash Flow & Working Capital',
    shortLabel: 'Cash Flow',
    icon: Wallet,
    title: '13-Week Rolling Cash Flow & Working Capital Tuning',
    lead: 'Cash flow blocks break growing Indian companies. Profitable firms collapse when multi-tiered supply chains stall payments. These delays create massive cash gaps.',
    points: [
      {
        title: 'Thirteen-Week Cash Runways',
        body: 'This rolling forecast tracks daily incoming money against payroll, taxes, and vendor bills. You always know your runway.',
      },
      {
        title: 'Automated Debtor Management',
        body: 'We set up strict collection schedules and ageing reviews. This trims days sales outstanding by fifteen to thirty per cent.',
      },
      {
        title: 'Supplier and Inventory Balance',
        body: 'Do not let cash sit dead on shelves. We renegotiate vendor payment terms and match inventory turns to actual demand.',
      },
    ],
  },
  {
    id: 'compliance',
    label: 'Governance & Compliance',
    shortLabel: 'Compliance',
    icon: ShieldCheck,
    title: 'Corporate Governance, Statutory Tax & Legal Compliance',
    lead: "India's regulatory web is complex. State and central laws shift constantly. Keeping up requires multi-layered supervision.",
    points: [
      {
        title: 'Section 203 Companies Act Rules',
        body: 'We structure mid-sized firms legally. We help you choose between hiring full-time officers or using virtual finance leaders.',
      },
      {
        title: 'Tax Administration',
        body: 'Our team manages Madhya Pradesh GST, GSTR reconciliations, tax deduction filings, and advance tax preparation. We maximise your tax credit recoveries.',
      },
      {
        title: 'Cross-Border Commerce and FEMA',
        body: 'We manage foreign investments, RBI filings, and international transfer pricing files. Your overseas operations remain fully compliant.',
      },
    ],
  },
  {
    id: 'mis',
    label: 'MIS & Dashboards',
    shortLabel: 'MIS',
    icon: LayoutDashboard,
    title: 'Board-Level MIS Reporting & Executive Dashboards',
    lead: 'Manual spreadsheets breed errors. We build interactive financial dashboards instead. These tools turn messy transaction history into clear, useful guides.',
    points: [
      {
        title: 'Executive Board Packs',
        body: 'Get polished monthly reports by the fifth day of the month. These decks highlight cash levels, margins, and key performance trends.',
      },
      {
        title: 'Cloud Finance Connections',
        body: 'We link core accounting systems like Tally, Zoho, or SAP directly to visual platforms like Power BI. This creates direct, automated data links.',
      },
      {
        title: 'Decision-Ready Intelligence',
        body: 'Founders and boards get a single source of truth — not scattered files — so every growth call is grounded in live numbers.',
      },
    ],
  },
];

export default function CostCapabilityMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCap, setActiveCap] = useState(capabilities[0].id);
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

  const active = capabilities.find((c) => c.id === activeCap) ?? capabilities[0];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      id="cost-capability-matrix"
      aria-labelledby="cost-matrix-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #ffffff 0%, #f4f8fc 35%, #eef4fa 70%, #f8fafc 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 -left-24 w-[420px] h-[420px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(circle, #323a85, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,34,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,34,68,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div
          className={`max-w-3xl mx-auto text-center mb-12 lg:mb-16 transition-all duration-700 ${
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
            <Scale size={11} strokeWidth={2.5} />
            Cost &amp; Capability
          </div>

          <h2
            id="cost-matrix-heading"
            className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-5"
            style={{ color: '#002244' }}
          >
            Full-Time CFO vs. FinMates Virtual CFO:{' '}
            <span
              className="md:block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Cost &amp; Capability Matrix
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Expanding enterprises across Indore and its neighbouring industrial belts face a tough
            decision when managing their money. Selecting an expensive executive, relying on a
            neighbourhood accountant, or hiring a fractional finance chief will shape how fast they
            grow and how they manage cash. Each path carries distinct costs and long-term
            consequences for your balance sheet.
          </p>
        </div>

        {/* Desktop matrix */}
        <div
          className={`hidden lg:block mb-16 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            className="rounded-2xl overflow-hidden border shadow-sm"
            style={{ borderColor: 'rgba(0,34,68,0.08)', backgroundColor: '#fff' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr>
                    <th
                      className="sticky left-0 z-20 text-left px-5 py-5 text-xs font-bold uppercase tracking-wider w-[200px]"
                      style={{
                        backgroundColor: '#002244',
                        color: 'rgba(255,255,255,0.7)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      Scope of Operations
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-5 py-5 text-left align-bottom"
                        style={{
                          backgroundColor: col.featured ? '#008bd0' : '#002244',
                          borderBottom: '1px solid rgba(255,255,255,0.08)',
                          width: 'calc((100% - 200px) / 3)',
                        }}
                      >
                        {col.featured && (
                          <span className="inline-flex items-center gap-1 mb-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/20 text-white">
                            <TrendingUp size={10} />
                            Up to 85% cheaper
                          </span>
                        )}
                        <div className="text-sm font-bold text-white leading-snug">{col.label}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, i) => {
                    const RowIcon = row.icon;
                    return (
                      <tr key={row.criterion} className="group">
                        <th
                          className="sticky left-0 z-10 text-left px-5 py-4 align-top border-b"
                          style={{
                            backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff',
                            borderColor: 'rgba(0,34,68,0.06)',
                          }}
                        >
                          <div className="flex items-start gap-2.5">
                            <span
                              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                              style={{
                                backgroundColor: 'rgba(0,139,208,0.08)',
                                color: '#008bd0',
                              }}
                            >
                              <RowIcon size={14} strokeWidth={2.2} />
                            </span>
                            <span className="text-sm font-semibold leading-snug" style={{ color: '#002244' }}>
                              {row.criterion}
                            </span>
                          </div>
                        </th>
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className="px-5 py-4 align-top text-sm leading-relaxed border-b"
                            style={{
                              backgroundColor: col.featured
                                ? i % 2 === 0
                                  ? 'rgba(0,139,208,0.07)'
                                  : 'rgba(0,139,208,0.04)'
                                : i % 2 === 0
                                  ? '#f8fafc'
                                  : '#fff',
                              borderColor: col.featured
                                ? 'rgba(0,139,208,0.12)'
                                : 'rgba(0,34,68,0.06)',
                              color: col.featured ? '#0c4a6e' : '#475569',
                              fontWeight: col.featured ? 500 : 400,
                              boxShadow: col.featured
                                ? 'inset 2px 0 0 #008bd0, inset -2px 0 0 #008bd0'
                                : undefined,
                            }}
                          >
                            {col.featured ? (
                              <span className="flex items-start gap-2">
                                <CheckCircle2
                                  size={15}
                                  className="flex-shrink-0 mt-0.5"
                                  style={{ color: '#008bd0' }}
                                />
                                <span>{row.values[col.key]}</span>
                              </span>
                            ) : (
                              row.values[col.key]
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile matrix cards */}
        <div
          className={`lg:hidden space-y-4 mb-14 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {matrixRows.map((row) => {
            const RowIcon = row.icon;
            return (
              <article
                key={row.criterion}
                className="rounded-2xl border bg-white overflow-hidden shadow-sm"
                style={{ borderColor: 'rgba(0,34,68,0.08)' }}
              >
                <div
                  className="flex items-center gap-3 px-4 py-3.5 border-b"
                  style={{
                    backgroundColor: 'rgba(0,34,68,0.03)',
                    borderColor: 'rgba(0,34,68,0.06)',
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,139,208,0.1)', color: '#008bd0' }}
                  >
                    <RowIcon size={16} />
                  </span>
                  <h3 className="text-sm font-bold" style={{ color: '#002244' }}>
                    {row.criterion}
                  </h3>
                </div>
                <div className="divide-y" style={{ borderColor: 'rgba(0,34,68,0.06)' }}>
                  {columns.map((col) => (
                    <div
                      key={col.key}
                      className="px-4 py-3.5"
                      style={{
                        backgroundColor: col.featured ? 'rgba(0,139,208,0.05)' : undefined,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider"
                          style={{ color: col.featured ? '#008bd0' : '#94a3b8' }}
                        >
                          {col.short}
                        </span>
                        {col.featured && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'rgba(0,139,208,0.12)',
                              color: '#008bd0',
                            }}
                          >
                            Recommended
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: col.featured ? '#0c4a6e' : '#475569' }}
                      >
                        {row.values[col.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Capability deep-dives */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{
                backgroundColor: 'rgba(50,58,133,0.07)',
                border: '1px solid rgba(50,58,133,0.18)',
                color: '#323a85',
              }}
            >
              <Building2 size={11} strokeWidth={2.5} />
              What You Get
            </div>
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight"
              style={{ color: '#002244' }}
            >
              Capability Deep-Dives
            </h3>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Four pillars that turn fractional finance into board-ready operating muscle.
            </p>
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Capability areas"
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              const isActive = cap.id === activeCap;
              return (
                <button
                  key={cap.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`cap-panel-${cap.id}`}
                  id={`cap-tab-${cap.id}`}
                  onClick={() => setActiveCap(cap.id)}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? '#002244' : '#fff',
                    color: isActive ? '#fff' : '#475569',
                    border: isActive ? '1px solid #002244' : '1px solid rgba(0,34,68,0.1)',
                    boxShadow: isActive ? '0 8px 24px rgba(0,34,68,0.18)' : 'none',
                  }}
                >
                  <Icon size={14} strokeWidth={2.2} />
                  <span className="hidden sm:inline">{cap.label}</span>
                  <span className="sm:hidden">{cap.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Tab panel */}
          <div
            role="tabpanel"
            id={`cap-panel-${active.id}`}
            aria-labelledby={`cap-tab-${active.id}`}
            className="rounded-2xl border bg-white p-6 sm:p-8 lg:p-10 shadow-sm"
            style={{ borderColor: 'rgba(0,34,68,0.08)' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
              <div className="lg:w-[38%] flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,139,208,0.15), rgba(50,58,133,0.15))',
                    color: '#008bd0',
                  }}
                >
                  <ActiveIcon size={22} strokeWidth={2} />
                </div>
                <h4
                  className="text-lg sm:text-xl font-bold leading-snug mb-3"
                  style={{ color: '#002244' }}
                >
                  {active.title}
                </h4>
                <p className="text-sm sm:text-[0.95rem] text-slate-600 leading-relaxed">
                  {active.lead}
                </p>
              </div>

              <div className="flex-1 space-y-4">
                {active.points.map((point, i) => (
                  <div
                    key={point.title}
                    className="flex gap-3 sm:gap-4 p-4 rounded-xl border transition-colors"
                    style={{
                      borderColor: 'rgba(0,139,208,0.12)',
                      backgroundColor: i % 2 === 0 ? 'rgba(0,139,208,0.03)' : 'rgba(50,58,133,0.03)',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: 'rgba(0,139,208,0.12)',
                        color: '#008bd0',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <ClipboardList size={14} style={{ color: '#323a85' }} />
                        <p className="text-sm font-bold" style={{ color: '#002244' }}>
                          {point.title}
                        </p>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{point.body}</p>
                    </div>
                  </div>
                ))}
              </div>
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
              Ready to cut CFO costs without cutting capability?
            </p>
            <p className="text-white/50 text-sm">
              Compare your current finance setup with a FinMates fractional team in a free 30-minute
              call.
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
