'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

const industries = [
  {
    icon: '💻',
    name: 'SaaS & Technology',
    challenges: ['MRR/ARR tracking', 'Churn analysis', 'Burn rate optimization'],
    solution: 'SaaS-specific financial models, cohort analysis, and investor-ready unit economics built for Mumbai\'s growing tech ecosystem. .',
    img: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
  },
  {
    icon: '🚀',
    name: 'Startups',
    challenges: ['Runway forecasting', 'ESOP management', 'Seed/Series A prep'],
    solution: 'Burn analysis, fundraising support, and investor-grade financial modeling.',
    img: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
  },
  {
    icon: '🏭',
    name: 'Manufacturing',
    challenges: ['Working capital cycles', 'COGS optimization', 'Inventory management'],
    solution: 'Manufacturing cost accounting, capacity utilisation models, and margin improvement programs for Mumbai-region production businesses. ',
    img: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg',
  },
  {
    icon: '📦',
    name: 'D2C & E-commerce',
    challenges: ['CAC/LTV ratios', 'Return provisioning', 'SKU profitability'],
    solution: 'Channel-wise P&L, contribution margin tracking, and inventory financing advisory.',
    img: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg',
  },
  {
    icon: '🏥',
    name: 'Healthcare',
    challenges: ['Insurance receivables', 'Equipment finance', 'Compliance costs'],
    solution: 'Revenue cycle optimization, NABH compliance budgeting, and capex planning.',
    img: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
  },
  {
    icon: '🍽️',
    name: 'Restaurants & F&B',
    challenges: ['Food cost control', 'Outlet P&L', 'Franchise finance'],
    solution: 'Recipe costing, outlet-level dashboards, and expansion financial modelling for restaurant groups across Mumbai. ',
    img: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
  },
  {
    icon: '🎓',
    name: 'Education & EdTech',
    challenges: ['Fee cycle management', 'Capex planning', 'Scholarship budgeting'],
    solution: 'Term-wise cash planning, NAAC financial compliance, and edtech unit economics for educational institutions and learning platforms.',
    img: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg',
  },
  {
    icon: '☀️',
    name: 'Solar & Clean Energy',
    challenges: ['Project financing', 'DSCR modeling', 'Subsidy accounting'],
    solution: 'Project-level financial models, lender reporting, and off-take agreement analysis for commercial and industrial solar setups.',
    img: 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-159397.jpeg',
  },
  {
    icon: '🌐',
    name: 'Export & Trading',
    challenges: ['FEMA compliance', 'Forex risk', 'Trade finance'],
    solution: 'Forex hedging strategy, LC management advisory, and export incentive optimisation for global trading setups across Maharashtra ports.',
    img: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg',
  },
  {
    icon: '📣',
    name: 'Agencies & Services',
    challenges: ['Project profitability', 'Utilization rate tracking', 'Retainer cash flows'],
    solution: 'Billable hour tracking, client-wise P&L frameworks, and pricing strategy modelling for digital agencies and professional consultancies.',
    img: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
  },
  {
    icon: '🏗️',
    name: 'Real Estate',
    challenges: ['Project-level cash flows', 'RERA compliance', 'Construction finance'],
    solution: "Project-level IRR modelling, RERA separate bank account management, and bank guarantee advisory for Mumbai's residential and commercial builders.",
    img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
  },
  {
    icon: '🏋️',
    name: 'Wellness & Fitness',
    challenges: ['Membership churn', 'Expansion capex', 'Seasonal cash flows'],
    solution: 'Subscription economics framework, franchise financial modelling, and equipment inventory management for fitness studios and gym chains.',
    img: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
  },
];

const CARDS_PER_DESKTOP_SLIDE = 4;
const AUTO_SCROLL_MS = 5000;

type Industry = (typeof industries)[number];

function IndustryCard({ ind }: { ind: Industry }) {
  return (
    <div className="industry-card bg-white rounded-xl overflow-hidden border border-slate-100 group h-full">
      <div className="relative h-32 overflow-hidden">
        <img
          src={ind.img}
          alt={ind.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="text-xl">{ind.icon}</span>
          <span className="text-white font-semibold text-sm">{ind.name}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Key Challenges
          </p>
          {ind.challenges.map((c) => (
            <div key={c} className="flex items-center gap-1.5 mb-1">
              <div className="w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
              <span className="text-xs text-slate-600">{c}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed">{ind.solution}</p>
        </div>
      </div>
    </div>
  );
}

function MobileIndustriesSlider() {
  const [current, setCurrent] = useState(0);
  const total = industries.length;

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
          aria-label="Previous industry"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {industries.map((ind) => (
              <div key={ind.name} className="w-full flex-[0_0_100%] max-w-full box-border">
                <IndustryCard ind={ind} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next industry"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center items-center gap-1.5 mt-6 flex-wrap px-2">
        {industries.map((ind, i) => (
          <button
            key={ind.name}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${ind.name}`}
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

function DesktopIndustriesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const slides = useMemo(() => {
    const chunks: Industry[][] = [];
    for (let i = 0; i < industries.length; i += CARDS_PER_DESKTOP_SLIDE) {
      chunks.push(industries.slice(i, i + CARDS_PER_DESKTOP_SLIDE));
    }
    return chunks;
  }, []);

  const resetAuto = useCallback(() => {
    if (!api) return;
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      api.scrollNext();
    }, AUTO_SCROLL_MS);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    resetAuto();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [api, resetAuto]);

  return (
    <div className="hidden lg:block relative px-14">
      <button
        type="button"
        onClick={() => {
          api?.scrollPrev();
          resetAuto();
        }}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {slides.map((slide, slideIndex) => (
            <CarouselItem key={slideIndex} className="pl-4 basis-full min-w-0 shrink-0 grow-0">
              <div className="grid grid-cols-4 gap-4">
                {slide.map((ind) => (
                  <IndustryCard key={ind.name} ind={ind} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <button
        type="button"
        onClick={() => {
          api?.scrollNext();
          resetAuto();
        }}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center items-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              api?.scrollTo(i);
              resetAuto();
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={current === i ? 'true' : undefined}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === i ? '28px' : '8px',
              height: '8px',
              backgroundColor: current === i ? '#008bd0' : '#cbd5e1',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Industries() {
  return (
    <section id="industries" className="section-padding bg-slate-50 overflow-x-hidden">
      <div className="container-wide">
        <div className="text-center mb-12">
          <div className="section-label mx-auto">Industries We Serve</div>
          <h2 className="text-2xl md:text-4xl font-bold text-p-3 mb-4">
            Sector-Specific CFO Expertise{' '}
            <br className="md:block hidden" />
            <span className="text-p-2">Across 15+ Industries</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Generic financial templates don't work for complex businesses. We bring deep sector knowledge to every engagement — understanding your industry's unit economics, compliance obligations, and growth dynamics from day one.
          </p>
        </div>

        <MobileIndustriesSlider />
        <DesktopIndustriesCarousel />

        <div className="mt-10 text-center">
          <p className="text-slate-500 mb-4">Don't see your industry?</p>
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-p hover:bg-p-2 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            Discuss Your Sector <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
