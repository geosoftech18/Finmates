const areas = [
  {
    name: 'Mumbai',
    highlight: true,
    desc: 'Full Virtual CFO services with optional on-site consultations across all Mumbai zones.',
    zones: ['South Mumbai', 'Central Mumbai', 'Western Suburbs', 'Eastern Suburbs'],
  },
  {
    name: 'Navi Mumbai',
    highlight: false,
    desc: 'Specialized support for manufacturing and trading businesses in Navi Mumbai industrial zones.',
    zones: ['Vashi', 'Nerul', 'Belapur', 'Taloja MIDC'],
  },
  {
    name: 'Thane',
    highlight: false,
    desc: 'Growing SME and real estate ecosystem support across the Thane district.',
    zones: ['Thane City', 'Dombivli', 'Kalyan', 'Ambarnath'],
  },
  {
    name: 'Pan India (Remote)',
    highlight: false,
    desc: 'Fully remote Virtual CFO services for businesses across India with weekly virtual meetings.',
    zones: ['Pune', 'Bangalore', 'Delhi NCR', 'Hyderabad'],
  },
];

const microAreas = [
  { area: 'BKC', specialty: 'VC-backed startups & NBFCs' },
  { area: 'Powai', specialty: 'Tech companies & IIT incubated startups' },
  { area: 'Andheri East', specialty: 'Export businesses & media agencies' },
  { area: 'Lower Parel', specialty: 'D2C brands, agencies & co-working businesses' },
  { area: 'Worli / Parel', specialty: 'Pharma, healthcare & FMCG companies' },
  { area: 'Goregaon', specialty: 'Media, entertainment & e-commerce' },
  { area: 'Malad / Kandivali', specialty: 'Trading, retail & distribution businesses' },
  { area: 'Borivali', specialty: 'SME manufacturing & food businesses' },
];

export default function ServiceAreas() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <div className="section-label mx-auto">Service Areas</div>
          <h2 className="text-2xl md:text-4xl font-bold text-p-3 mb-4">
            We Serve Businesses Across {" "}
            <br className="md:block hidden" />
            <span className="text-p-2">Mumbai Metropolitan Region</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {areas.map((a) => (
            <div
              key={a.name}
              className={`rounded-xl p-6 border transition-all duration-200 ${
                a.highlight
                  ? 'bg-p-3 border-[#003b8d] hover:border-p-2/50'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-100'
              }`}
            >
              <h3 className={`font-bold mb-2 ${a.highlight ? 'text-p-2' : 'text-slate-800'}`}>
                {a.name}
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${a.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                {a.desc}
              </p>
              <div className="space-y-1">
                {a.zones.map((z) => (
                  <div key={z} className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full flex-shrink-0 ${a.highlight ? 'bg-p-2' : 'bg-slate-400'}`} />
                    <span className={`text-xs ${a.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{z}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mumbai micro-areas */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="font-bold text-slate-800 text-lg mb-6 text-center">
            Mumbai Area Specialists
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {microAreas.map((m) => (
              <div
                key={m.area}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-100 hover:shadow-sm transition-all duration-200"
              >
                <p className="font-semibold text-slate-800 text-sm mb-1">{m.area}</p>
                <p className="text-xs text-slate-500">{m.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
