'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useConsultationModal } from '@/components/city/indore/ConsultationModal';
import LinkifyVirtualCfo from '@/components/seo/LinkifyVirtualCfo';

const faqs = [
  {
    id: 'q1',
    question: ' What is the difference between a Virtual CFO and an in-house accountant for my Indore business? ',
    answer: `A traditional in-house accountant is a backward-looking function — recording what has already happened, filing GST returns, and maintaining clean books. This work is essential, but it is reactive. 

A Virtual CFO operates in an entirely different dimension. The focus is forward-looking financial strategy: building 12-month cash flow forecasts, stress-testing margins before you sign new vendor contracts, structuring your working capital proactively, and preparing investor-grade MIS that holds up under due diligence. 

Think of it this way: your accountant is your financial historian. Your Virtual CFO is your financial architect.  `,
    category: 'Role & Value',
  },
  {
    id: 'q2',
    question: 'How much do Virtual CFO services cost in Indore, and how does it compare to hiring a full-time CFO? ',
    answer: `Virtual CFO services are structured across two models: 

Monthly retainer: Typically ₹25,000 to ₹1,00,000 per month depending on scope — covering ongoing financial oversight, MIS preparation, board reporting, compliance management, and strategic advisory. This suits startups, MSMEs, and manufacturing units with consistent complexity. 

Project-based: For discrete, high-stakes engagements such as Series A fundraise preparation, M&A due diligence, or one-time financial restructuring exercises. 

A qualified CFO in Indore commands ₹28–55 lakh per annum in CTC — before PF, gratuity, ESOP, and overhead. For most businesses below ₹25 crore in revenue, that cost is difficult to justify. Our outsourced CFO services deliver the same strategic depth at 15–25% of that cost, with no long-term employment liability and the flexibility to scale scope as your needs evolve. `,
    category: 'Pricing',
  },
  {
    id: 'q3',
    question: 'How does a Virtual CFO handle Madhya Pradesh\'s tax and compliance requirements? ',
    answer: `Madhya Pradesh has its own layer of state-level obligations on top of central compliance. An Indore-registered business must manage central requirements — TDS, GSTR-1/3B, advance tax, annual ITR — alongside state-level requirements including Madhya Pradesh Professional Tax, MP GST return filings, and Shop & Establishment renewals under the MP Shops & Establishments Act. 

Our approach operates on four levels: dedicated compliance specialists tracking regulatory updates from the CBDT, CBIC, and the Madhya Pradesh GST authority in real time; a forward-looking compliance calendar issued to every client at onboarding; sector-specific compliance leads for pharma, auto ancillary, and food processing businesses; and active coordination with your statutory auditors. The result is zero compliance surprises and an audit-ready financial posture throughout the year. `,
    category: 'Compliance',
  },
  {
    id: 'q4',
    question: 'Can a Virtual CFO support our fundraising process or SME IPO preparation? ',
    answer: `Yes — fundraising and capital market advisory are core strengths of the FinMates team. We have supported over 40 fundraising processes for Indore-based startups and growth-stage MSMEs, covering Series A/B equity rounds, structured debt financing, and SME IPO listing readiness. 

Every engagement begins with a comprehensive Non-Disclosure Agreement and a Data Processing Agreement compliant with India's Digital Personal Data Protection Act, 2023. We work within your existing accounting environment — Zoho Books, QuickBooks, or Tally Prime — meaning your data never migrates to an unfamiliar system.  `,
    category: 'Security',
  },
  {
    id: 'q5',
    question: 'Is my company\'s financial data secure when working with an outsourced CFO team? ',
    answer: `Data security is treated as a non-negotiable. Our infrastructure is hosted on enterprise-grade cloud platforms — Microsoft Azure and AWS — with AES-256 encryption at rest and TLS 1.3 in transit. Access to client data is strictly role-based: only team members directly assigned to your engagement can view your files, and all access events are logged and auditable. 

Our fundraising support includes pitch deck architecture, financial model preparation, investor-grade MIS structuring, data room management, and term sheet review. For SME IPO readiness, we coordinate SEBI compliance preparation, investor-ready annual report design, and due diligence support. Our clients consistently raise faster, at stronger valuations, with less friction. `,
    category: 'Security',
  },
  {
    id: 'q6',
    question: 'Understanding the role of a Virtual CFO and how this service operates within your business',
    answer: `A Virtual CFO delivers senior-grade fiscal leadership, overseeing cash runways, budgets, board decks, and regulatory adherence on a fractional or retainer basis. This avoids the heavy salary overhead of an in-house executive.

Your business gains a collective of seasoned accountants who plug into your setup via remote tools and periodic in-person huddles.`,
    category: 'Role & Value',
  },
  {
    id: 'q7',
    question: 'Pricing structures for Virtual CFO services in the Indore market',
    answer: `FinMates provides tiered, modular service levels matching your business scale and current operational friction. Retainers typically start near ₹12,000 monthly for young ventures, climbing past ₹65,000 for mature mid-market manufacturers and traders needing help with capital raises and heavy board interactions.

This path slashes typical executive payroll burdens by eighty to eighty-five per cent compared to hiring a full-time leader locally.`,
    category: 'Pricing',
  },
  {
    id: 'q8',
    question: 'Distinguishing the forward-looking role of a Virtual CFO from traditional Chartered Accountant services',
    answer: `Traditional accountants look backwards, keeping your ledger straight, filing tax returns, and handling audits. A Virtual CFO steers the windshield, not the rearview mirror.

We map out future scenarios, hunt for hidden margin leakages, assist with equity rounds, and decode daily metrics to fuel top-line and bottom-line expansion.`,
    category: 'Role & Value',
  },
  {
    id: 'q9',
    question: 'Legal requirements regarding full-time CFO appointments under the Companies Act',
    answer: `Section 203 of the Companies Act, 2013 mandates a whole-time Chief Financial Officer only for listed entities and public firms with paid-up capital crossing ₹10 Crore. Private outfits and expanding smaller enterprises falling below this mark have zero legal obligation to hire a permanent executive.

They can freely employ fractional financial experts to govern their books.`,
    category: 'Compliance',
  },
  {
    id: 'q10',
    question: 'Onboarding timelines and initial steps when partnering with FinMates',
    answer: `Getting started takes under forty-eight hours. We kick off with a swift thirty-minute diagnostic talk, request read-only entry to your ledger systems like Tally or Zoho, and pinpoint immediate cash leaks or compliance risks.

From there, we hand over the reins to your dedicated lead advisor.`,
    category: 'Onboarding',
  },
  {
    id: 'q11',
    question: 'Availability of in-person attendance for board reviews and investor presentations in Indore',
    answer: `Physical presence is part of our package. Our core team operates out of Indore.

We travel directly to your office or neutral venues for board sessions, debt talks, and pitch meets across Vijay Nagar, Palasia, AB Road, and the Pithampur-Rau industrial belt.`,
    category: 'Service Delivery',
  },
  {
    id: 'q12',
    question: 'Software integrations and ERP compatibility',
    answer: `Our workflows sync directly with standard accounting platforms, payment gateways, and business intelligence systems. This includes setups like Tally Prime, Zoho, SAP Business One, RazorpayX, and Power BI.

If your firm still relies on paper ledgers, we can guide the transition to cloud-based systems.`,
    category: 'Integrations',
  },
  {
    id: 'q13',
    question: 'Security protocols and measures protecting your proprietary financial information',
    answer: `Data protection remains a non-negotiable priority. We sign mutual non-disclosure pacts before touching a single spreadsheet.

Your files, projections, and reports live on encrypted cloud vaults with restricted entry, accessible only to the specific advisory team assigned to your account.`,
    category: 'Security',
  },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Role & Value': { bg: 'rgba(0,139,208,0.08)', text: '#008bd0', border: 'rgba(0,139,208,0.2)' },
  'Pricing': { bg: 'rgba(13,126,86,0.08)', text: '#0d7e56', border: 'rgba(13,126,86,0.2)' },
  'Compliance': { bg: 'rgba(180,83,9,0.08)', text: '#b45309', border: 'rgba(180,83,9,0.2)' },
  'Onboarding': { bg: 'rgba(8,145,178,0.08)', text: '#0891b2', border: 'rgba(8,145,178,0.2)' },
  'Service Delivery': { bg: 'rgba(124,58,237,0.08)', text: '#7c3aed', border: 'rgba(124,58,237,0.2)' },
  'Integrations': { bg: 'rgba(190,24,93,0.08)', text: '#be185d', border: 'rgba(190,24,93,0.2)' },
  'Security': { bg: 'rgba(50,58,133,0.1)', text: '#323a85', border: 'rgba(50,58,133,0.2)' },
};

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
  visible,
}: {
  faq: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  visible: boolean;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const cat = categoryColors[faq.category];

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        border: isOpen ? `1px solid ${cat.border}` : '1px solid #e2e8f0',
        backgroundColor: isOpen ? 'rgba(255,255,255,1)' : '#fff',
        boxShadow: isOpen ? '0 4px 24px rgba(0,0,0,0.07)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Trigger row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-body-${faq.id}`}
        id={`faq-trigger-${faq.id}`}
        className="w-full text-left flex items-start gap-4 px-6 py-5 group"
      >
        {/* Index number */}
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-colors"
          style={{
            backgroundColor: isOpen ? cat.bg : '#f1f5f9',
            color: isOpen ? cat.text : '#94a3b8',
            border: isOpen ? `1px solid ${cat.border}` : '1px solid transparent',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question text + category badge */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}
            >
              {faq.category}
            </span>
          </div>
          <h3 className="text-base sm:text-[1.05rem] font-bold leading-snug pr-4 transition-colors"
            style={{ color: isOpen ? '#002244' : '#1e293b' }}
          >
            {faq.question}
          </h3>
        </div>

        {/* Plus / Minus indicator */}
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
          style={{
            backgroundColor: isOpen ? cat.bg : '#f8fafc',
            color: isOpen ? cat.text : '#94a3b8',
            border: isOpen ? `1px solid ${cat.border}` : '1px solid #e2e8f0',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)',
          }}
        >
          {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </button>

      {/* Expandable answer body */}
      <div
        id={`faq-body-${faq.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${faq.id}`}
        ref={bodyRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? `${bodyRef.current?.scrollHeight ?? 2000}px` : '0px',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className="px-6 pb-6 pt-0 ml-11"
          style={{ borderTop: `1px solid ${cat.border}` }}
        >
          <div className="pt-5">
            {faq.answer.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-sm sm:text-[0.9rem] text-gray-600 leading-[1.85] mb-3 last:mb-0"
              >
                {para.trim() ? <LinkifyVirtualCfo text={para.trim()} /> : null}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openId, setOpenId] = useState<string | null>('q1');
  const { open: openModal } = useConsultationModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  // FAQPage JSON-LD structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/\n\n/g, ' ').trim(),
      },
    })),
  };

  return (
    <>
      {/* FAQPage JSON-LD — enables Google rich snippet accordion in SERPs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
      />

      <section
        ref={sectionRef}
        id="faq"
        aria-labelledby="faq-heading"
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#f8fafc' }}
      >
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl"
            style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl"
            style={{ background: 'radial-gradient(circle, #323a85, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{
                backgroundColor: 'rgba(0,139,208,0.07)',
                border: '1px solid rgba(0,139,208,0.18)',
                color: '#008bd0',
              }}
            >
              <HelpCircle size={11} strokeWidth={2.5} />
              Frequently Asked Questions
            </div>

            <h2
              id="faq-heading"
              className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-4"
              style={{ color: '#002244' }}
            >
              Frequently Asked Questions About {" "}
              <span className="md:block mt-1">
                <a
                  href="/services/cfo-services"
                  className="font-bold underline underline-offset-4 decoration-[#008bd0]/50 hover:opacity-90"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Virtual CFO Services in Indore
                </a>
              </span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
              Direct answers to the questions Indore business owners ask most when evaluating
              outsourced financial leadership.
            </p>
          </div>

          {/* ── Accordion Stack ── */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* ── Footer nudge ── */}
          <div
            className={`mt-12 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              background: 'linear-gradient(135deg, #002244 0%, #323a85 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div>
              <p className="text-white font-bold text-base mb-1">Still have questions?</p>
              <p className="text-white/50 text-sm">
                Schedule a no-obligation 30-minute discovery call with our Indore CFO team.
              </p>
            </div>
            <button
              onClick={openModal}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95 whitespace-nowrap"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
