'use client';

import { useEffect, useRef, useState } from 'react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Train,
  Car,
  Building2,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

const NAP = {
  name: 'FinMates',
  legalName: 'Finmate Business Solutions Pvt Ltd',
  addressLine1: 'B-715, Jaswanti Allied Business Center',
  addressLine2: 'Ramchandra Lane, Kanchpada, Malad West',
  city: 'Mumbai',
  state: 'Maharashtra',
  pin: '400064',
  country: 'India',
  phone: '+91 98339 43776',
  email: 'info@finmates.in',
  website: 'https://www.finmates.in',
};

const hours = [
  { day: 'Monday – Saturday', time: '10:00 AM – 6:00 PM IST' },
  { day: 'Sunday', time: 'Closed' },
];

/** Opens in browser / “Get Directions” — not valid as iframe src */
const GOOGLE_MAPS_PLACE_URL =
  'https://www.google.com/maps/place/FinMate+Business+Solutions+Pvt+Ltd/@19.1899435,72.8382085,17z/data=!4m6!3m5!1s0x3be7b758aa3e3a65:0x59367728835180d8!8m2!3d19.1899435!4d72.8382085!16s%2Fg%2F11j7yhk_vr';

/** Embed URL from Google Maps → Share → Embed a map (required for iframe) */
const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.789!2d72.8356336!3d19.1899435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b758aa3e3a65%3A0x59367728835180d8!2sFinMate%20Business%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1735689600000!5m2!1sen!2sin';

const directions = [
  {
    icon: Train,
    label: 'By Metro',
    detail: 'Malad Metro Station — short auto or cab ride to Kanchpada, Malad West',
  },
  {
    icon: Train,
    label: 'By Train',
    detail: 'Malad railway station — 8–10 min by cab via Ramchandra Lane',
  },
  {
    icon: Car,
    label: 'By Road / Cab',
    detail: 'Jaswanti Allied Business Center on Ramchandra Lane, Kanchpada, Malad West',
  },
  {
    icon: Car,
    label: 'Parking',
    detail: 'Visitor parking available at Jaswanti Allied Business Center',
  },
];

const badges = [
  'GST Registered',
  'MSME Recognised',
  'ISO 9001:2015',
  'ICAI Empanelled',
];

export default function LocationSection() {
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

  const fullAddress = `${NAP.addressLine1}, ${NAP.addressLine2}, ${NAP.city}, ${NAP.state} ${NAP.pin}`;

  // JSON-LD schema — injected as dangerouslySetInnerHTML to preserve exact formatting
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: NAP.legalName,
    alternateName: NAP.name,
    image: `${NAP.website}/icon.png`,
    url: NAP.website,
    telephone: NAP.phone,
    email: NAP.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${NAP.addressLine1}, ${NAP.addressLine2}`,
      addressLocality: NAP.city,
      addressRegion: NAP.state,
      postalCode: NAP.pin,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.0596,
      longitude: 72.8656,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    priceRange: '₹₹₹',
    areaServed: {
      '@type': 'City',
      name: 'Mumbai',
    },
    serviceType: [
      'Virtual CFO Services',
      'Fractional CFO',
      'Financial Advisory',
      'MIS Reporting',
      'Cash Flow Management',
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
      />

      <section
        ref={sectionRef}
        id="location"
        aria-labelledby="location-heading"
        className="relative py-20 lg:py-28 overflow-hidden bg-white"
      >
        {/* Subtle top border accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #008bd0, #323a85, transparent)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <div
            className={`text-center max-w-xl mx-auto mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{
                backgroundColor: 'rgba(0,139,208,0.07)',
                border: '1px solid rgba(0,139,208,0.18)',
                color: '#008bd0',
              }}
            >
              <MapPin size={11} strokeWidth={2.5} />
              Verified Local Office
            </div>
            <h2
              id="location-heading"
              className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight mb-4"
              style={{ color: '#002244' }}
            >
              Our Mumbai {" "}
              <span
                className="md:block ml-2"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Financial Headquarters
              </span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed">
            Visit us at our Malad West office or connect remotely — your dedicated finance partner is available whenever you need strategic clarity, compliance guidance, or growth-focused advisory. <br /> <br />
            Visit us at our Malad West office or connect remotely — your dedicated finance partner is available whenever you need strategic clarity, compliance guidance, or growth-focused advisory. 
            </p>
          </div>

          {/* ── 50 / 50 Split Panel ── */}
          <div
            className={`rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 delay-150 flex flex-col lg:flex-row ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
              border: '1px solid #e2e8f0',
              minHeight: '600px',
            }}
          >
            {/* ── Column 1: Info Panel ── */}
            <div
              className="relative flex-1 lg:max-w-[50%] flex flex-col p-8 lg:p-10"
              style={{ backgroundColor: '#002244' }}
            >
              {/* Background grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="lgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#lgrid)" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full gap-8">

                {/* Office identity */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(0,139,208,0.2)', border: '1px solid rgba(0,139,208,0.3)' }}
                    >
                      <Building2 size={18} color="#008bd0" strokeWidth={1.75} />
                    </div>
                    <span className="text-white font-bold text-base">{NAP.name}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-[1.8]">
                    {NAP.legalName}  is based at Jaswant Allied Business Center in Malad West—a dedicated hub for Virtual CFO and finance advisory services across the Mumbai Metropolitan Region. We welcome our clients for on-site strategy reviews, financial roadmapping sessions, and board-level consultations, with convenient road, rail, and metro links nearby.  
                  </p>
                </div>

                {/* NAP Block — must match Google Business Profile exactly */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                  itemScope
                  itemType="https://schema.org/FinancialService"
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-4"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    Name, Address & Phone — NAP
                  </p>

                  <ul className="flex flex-col gap-3.5">
                    {/* Name */}
                    <li className="flex items-start gap-3">
                      <Building2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#008bd0' }} />
                      <span className="text-white text-sm font-semibold" itemProp="name">{NAP.name}</span>
                    </li>
                    {/* Address */}
                    <li className="flex items-start gap-3">
                      <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#008bd0' }} />
                      <address
                        className="not-italic text-white/75 text-sm leading-relaxed"
                        itemProp="address"
                        itemScope
                        itemType="https://schema.org/PostalAddress"
                      >
                        <span itemProp="streetAddress">{NAP.addressLine1},<br />{NAP.addressLine2},</span><br />
                        <span itemProp="addressLocality">{NAP.city}</span>,{' '}
                        <span itemProp="addressRegion">{NAP.state}</span>{' '}
                        <span itemProp="postalCode">{NAP.pin}</span>,{' '}
                        <span itemProp="addressCountry">{NAP.country}</span>
                      </address>
                    </li>
                    {/* Phone */}
                    <li className="flex items-center gap-3">
                      <Phone size={15} className="flex-shrink-0" style={{ color: '#008bd0' }} />
                      <a
                        href={`tel:${NAP.phone.replace(/\s/g, '')}`}
                        className="text-white text-sm font-medium hover:text-[#008bd0] transition-colors"
                        itemProp="telephone"
                      >
                        {NAP.phone}
                      </a>
                    </li>
                    {/* Email */}
                    <li className="flex items-center gap-3">
                      <Mail size={15} className="flex-shrink-0" style={{ color: '#008bd0' }} />
                      <a
                        href={`mailto:${NAP.email}`}
                        className="text-white/75 text-sm hover:text-[#008bd0] transition-colors"
                        itemProp="email"
                      >
                        {NAP.email}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={14} style={{ color: '#008bd0' }} />
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Office Hours (IST)
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {hours.map((h) => (
                      <li key={h.day} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-white/55">{h.day}</span>
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: h.time === 'Closed'
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(0,139,208,0.15)',
                            color: h.time === 'Closed' ? 'rgba(255,255,255,0.25)' : '#60c4f0',
                            border: `1px solid ${h.time === 'Closed' ? 'rgba(255,255,255,0.07)' : 'rgba(0,139,208,0.25)'}`,
                          }}
                        >
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

               

                {/* Credential badges */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.45)',
                      }}
                    >
                      <CheckCircle2 size={10} style={{ color: '#008bd0' }} />
                      {b}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={openModal}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #008bd0, #323a85)',
                    boxShadow: '0 4px 20px rgba(0,139,208,0.3)',
                  }}
                >
                  Book an In-Person Consultation
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>

            {/* ── Column 2: Map Panel ── */}
            <div className="relative flex-1 lg:max-w-[50%] min-h-[380px] lg:min-h-0 bg-slate-100 overflow-hidden">
              {/* Map overlay header chip */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg"
                style={{ backgroundColor: '#002244', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: '#008bd0' }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#008bd0' }} />
                </span>
                <span className="text-white text-xs font-semibold">Malad West, Mumbai</span>
              </div>

              {/* Get Directions button */}
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#002244', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                Get Directions
                <ArrowUpRight size={12} />
              </a>

              {/* Google Maps embed — must use /maps/embed?pb=… not /maps/place/… */}
              <iframe
                title="FinMates — Mumbai office location"
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  display: 'block',
                  minHeight: '380px',
                  height: '100%',
                  filter: 'saturate(0.9) contrast(1.05)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Map showing FinMates office at Jaswanti Allied Business Center, Malad West, Mumbai"
              />
            </div>
          </div>

          {/* ── Developer / SEO Note (visually hidden, for devs) ── */}
          {/*
            SEO DIRECTIVE: The NAP block above (name, streetAddress, addressLocality,
            addressRegion, postalCode, telephone, email) MUST match the Google Business
            Profile listing character-for-character, including comma placement and
            capitalisation. The JSON-LD FinancialService schema is injected via a
            <script type="application/ld+json"> tag rendered server-side in this
            component. Validate at: https://search.google.com/test/rich-results
          */}
        </div>
      </section>
    </>
  );
}
