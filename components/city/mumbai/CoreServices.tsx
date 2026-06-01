'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  FileText,
  Target,
  PieChart,
  Calculator,
  Scissors,
  LayoutDashboard,
  Receipt,
  Shield,
  Rocket,
  LineChart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Financial Planning & Analysis',
    desc: 'Annual budgets, rolling forecasts, and scenario planning aligned to your business strategy.',
    tag: 'Core',
  },
  {
    icon: BarChart3,
    title: 'Cash Flow Management',
    desc: 'Real-time cash monitoring, 13-week rolling forecasts, and working capital optimization.',
    tag: 'Critical',
  },
  {
    icon: FileText,
    title: 'MIS Reporting',
    desc: 'Custom management information systems with weekly and monthly board-ready reports.',
    tag: 'Core',
  },
  {
    icon: Target,
    title: 'Budgeting & Cost Control',
    desc: 'Department-level budgets, variance analysis, and spend governance frameworks.',
    tag: 'Core',
  },
  {
    icon: PieChart,
    title: 'Investor Reporting',
    desc: 'Quarterly investor updates, cap table management, and fundraising data rooms.',
    tag: 'Premium',
  },
  {
    icon: LineChart,
    title: 'Financial Modeling',
    desc: '3-statement models, DCF valuations, and unit economics frameworks for decision-making.',
    tag: 'Premium',
  },
  {
    icon: Scissors,
    title: 'Cost Optimization',
    desc: 'Margin leakage identification, vendor renegotiation support, and overhead reduction.',
    tag: 'Core',
  },
  {
    icon: LayoutDashboard,
    title: 'KPI Dashboards',
    desc: 'Real-time business health dashboards connecting finance, operations, and sales.',
    tag: 'Core',
  },
  {
    icon: Receipt,
    title: 'Tax Planning & Compliance',
    desc: 'Proactive tax strategy, GST optimization, and advance tax planning to minimize liability.',
    tag: 'Compliance',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    desc: 'Financial risk identification, hedging strategies, and internal controls implementation.',
    tag: 'Premium',
  },
  {
    icon: Rocket,
    title: 'Fundraising Support',
    desc: 'Pitch deck financials, data room preparation, due diligence management, and term sheet review.',
    tag: 'Premium',
  },
  {
    icon: Calculator,
    title: 'Business Forecasting',
    desc: 'Revenue projections, market sizing models, and growth scenario planning for 3–5 year horizons.',
    tag: 'Core',
  },
] as const;

type Service = (typeof services)[number];

const tagColors: Record<string, string> = {
  Core: 'bg-sky-50 text-sky-700 border-sky-200',
  Critical: 'bg-rose-50 text-rose-700 border-rose-200',
  Premium: 'bg-blue-50 text-p border-blue-100',
  Compliance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const AUTO_SCROLL_MS = 5000;

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <div className="service-card w-full bg-[#fdfbe6] border-2 border-blue-200 rounded-xl p-6 hover:border-blue-100">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-p rounded-xl">
          <Icon className="w-5 h-5 text-p-2" />
        </div>
        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${tagColors[service.tag]}`}
        >
          {service.tag}
        </span>
      </div>
      <h3 className="font-semibold text-slate-800 mb-2 text-base">{service.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{service.desc}</p>
      <a
        href="#consultation"
        className="inline-flex items-center gap-1.5 text-p-2 hover:text-p text-sm font-medium transition-colors"
      >
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function MobileServicesSlider() {
  const [current, setCurrent] = useState(0);
  const total = services.length;

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div className="lg:hidden">
      <div className="relative px-11">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous service"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="overflow-hidden w-full" aria-roledescription="carousel">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="w-full flex-[0_0_100%] max-w-full box-border"
                aria-roledescription="slide"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next service"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center items-center gap-1.5 mt-6 flex-wrap px-2">
        {services.map((service, i) => (
          <button
            key={service.title}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${service.title}`}
            aria-current={current === i ? 'true' : undefined}
            className="rounded-full transition-all duration-300 shrink-0"
            style={{
              width: current === i ? '20px' : '6px',
              height: '6px',
              backgroundColor: current === i ? '#008bd0' : '#cbd5e1',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CoreServices() {
  return (
    <section id="services" className="section-padding bg-slate-50 overflow-x-hidden">
      <div className="container-wide">
        <div className="text-center mb-12">
          <div className="section-label mx-auto">Our Services</div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight mb-4">
            Comprehensive CFO Services{' '}
            <br className="md:block hidden" />
            <span className="text-p-2">Tailored for Mumbai Businesses</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            From financial planning to investor readiness — every service is designed to drive
            measurable business outcomes, not just compliance.
          </p>
        </div>

        <MobileServicesSlider />

        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-p hover:bg-p-2 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl"
          >
            Explore All CFO Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
