const areas = [
  {
    name: 'Indore',
    highlight: true,
    desc: 'Full Virtual CFO services with optional on-site consultations across all Indore zones.',
    zones: ['Vijay Nagar', 'Palasia', 'AB Road', 'Scheme 54/74'],
  },
  {
    name: 'Pithampur',
    highlight: false,
    desc: 'Specialized support for auto components and manufacturing businesses across the Pithampur industrial belt.',
    zones: ['Sector 1', 'Sector 2', 'Sector 3', 'Dewas Road'],
  },
  {
    name: 'Dewas',
    highlight: false,
    desc: 'Growing SME and trading ecosystem support across the Indore-Dewas industrial corridor.',
    zones: ['Dewas City', 'Industrial Area', 'Ujjain Road', 'Sanwer Road'],
  },
  {
    name: 'Pan India (Remote)',
    highlight: false,
    desc: 'Fully remote Virtual CFO services for businesses across India with weekly virtual meetings.',
    zones: ['Bhopal', 'Bangalore', 'Delhi NCR', 'Hyderabad'],
  },
];

const microAreas = [
  { area: 'Vijay Nagar', specialty: 'IT companies, startups & corporate offices' },
  { area: 'Super Corridor', specialty: 'Startups, IT parks & new-age businesses' },
  { area: 'Palasia', specialty: 'Trading, wholesale & professional services businesses' },
  { area: 'AB Road', specialty: 'Auto ancillary, showrooms & logistics businesses' },
  { area: 'Sapna Sangeeta', specialty: 'Retail, hospitality & consumer businesses' },
  { area: 'Rajendra Nagar', specialty: 'Wholesale trading & distribution businesses' },
  { area: 'Bhawarkuan', specialty: 'SME manufacturing & food processing businesses' },
  { area: 'Pithampur', specialty: 'Auto components, pharma & industrial manufacturing' },
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
            <span className="text-p-2">Indore & Central Madhya Pradesh</span>
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

        {/* Indore micro-areas */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="font-bold text-slate-800 text-lg mb-6 text-center">
            Indore Area Specialists
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
