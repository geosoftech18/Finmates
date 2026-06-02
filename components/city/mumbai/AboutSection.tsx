import { Target, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';

const pillars = [
  { icon: Target, title: 'Strategic Focus', desc: 'Beyond numbers — we drive decisions that accelerate growth.' },
  { icon: Lightbulb, title: 'Founder-First Advisory', desc: 'Built for entrepreneurs who need a trusted financial co-pilot.' },
  { icon: TrendingUp, title: 'Growth-Oriented Finance', desc: 'Every system we design is built to scale with your business.' },
];

const differentiators = [
  'Ex-CFOs and Big-4 trained finance professionals',
  'Deep expertise in Mumbai startup and SME ecosystem',
  'Technology-driven dashboards and automation workflows',
  'Sector-specific financial frameworks — not generic templates',
  'Transparent, milestone-based engagement model with no hidden retainers',
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white max-w-7xl mx-auto">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="section-label">About FinMates</div>
            <h2 className="text-3xl md:text-4xl font-bold text-p-3 leading-tight mb-6">
              Your Growth-Focused
              <br />
              <span className="text-p-2">Finance Partner</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
            FinMates was founded with a clear mission: give every ambitious founder and business leader access to the kind of strategic financial guidance that was once exclusive to large corporates with deep pockets. 
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
            We are not just accountants. We are strategic finance partners who sit alongside your leadership team, analyze what is actually driving your business, and build the financial systems that translate ambition into measurable outcomes.  
            </p>

            <div className="space-y-3 mb-8">
              {differentiators.map((d) => (
                <div key={d} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-p-2 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{d}</span>
                </div>
              ))}
            </div>

            <a
              href="#consultation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-p hover:bg-p-2 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              Meet Our CFO Team
            </a>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="FinMates team strategic consultation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Pillars row */}
            <div className="grid grid-cols-3 gap-3">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <Icon className="w-5 h-5 text-p-2 mb-2" />
                    <p className="text-xs font-semibold text-slate-800 mb-1">{p.title}</p>
                    <p className="text-[11px] text-slate-500 leading-tight">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
