'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';

const faqs = [
  {
    id: 'q1',
    question: 'What is the difference between a Virtual CFO and an in-house accountant for my Mumbai business?',
    answer: `This is one of the most important distinctions a growing Mumbai business can understand. A traditional in-house accountant — or even a part-time CA firm — is fundamentally a backward-looking function. Their mandate is to accurately record what has already happened: reconcile ledgers, file GST returns, prepare year-end financials, and keep your books clean for audit. This is essential work, but it is reactive by nature.

A Virtual CFO operates in an entirely different dimension. The focus is on forward-looking financial strategy — the kind that drives decisions before money moves, not after. For a business in Mumbai's competitive environment, that means building rolling 12-month cash flow forecasts, conducting sensitivity analysis on your margins before you sign a new vendor contract, structuring your working capital facilities proactively rather than scrambling for a CC limit when a payment cycle tightens, and preparing investor-grade MIS that can survive due diligence scrutiny.

Think of it this way: your accountant is your financial historian; your Virtual CFO is your financial architect. Mumbai businesses that have scaled past ₹2–3 crore in annual revenue typically find that retrospective bookkeeping alone can no longer answer their most pressing questions — "Can we afford to hire this team?", "Should we take on this order given our current liquidity?", "What does our runway look like if a major client delays payment?" A Virtual CFO answers those questions with data, models, and strategic discipline.`,
    category: 'Role & Value',
  },
  {
    id: 'q2',
    question: 'How is a Virtual CFO priced, and how does it compare to the cost of a full-time CFO in Mumbai?',
    answer: `Virtual CFO services are structured around two primary commercial models, and the right choice depends on where your business is in its growth journey.

Monthly retainer model: Typically ranging from ₹30,000 to ₹1,20,000 per month depending on scope. This provides ongoing access to a dedicated CFO team for continuous financial oversight, monthly MIS preparation, board-level reporting, compliance calendars, and strategic advisory. This model suits businesses with consistent complexity: funding-stage startups, manufacturers with multi-location operations, or services firms managing investor relationships.

Project-based model: Applies to discrete, high-stakes engagements such as Series A fundraise preparation, ERP implementation oversight, M&A financial due diligence, or a one-time restructuring exercise. These are scoped, time-bound, and priced on deliverables.

A qualified CFO in Mumbai — one with the pedigree to meaningfully guide your financial strategy — commands a CTC of ₹35 to ₹70 lakh per annum, before PF, gratuity, ESOP, and office overhead. For most businesses below ₹25 crore in revenue, that cost is economically indefensible. A Virtual CFO delivers the same strategic depth — often from a team of specialists rather than a single individual — at 15–25% of that cost, with no long-term employment liability and the flexibility to scale scope up or down as your needs evolve.

Now consider the alternative. A qualified CFO in Mumbai — one with the pedigree to meaningfully guide your financial strategy — commands a CTC of ₹35 to ₹70 lakh per annum, before PF, gratuity, ESOP, and office overhead. For most businesses below ₹25 crore in revenue, this cost is economically indefensible. A Virtual CFO delivers the same strategic depth — often from a team of specialists rather than a single individual — at 15–25% of that cost, with no long-term employment liability and the flexibility to scale scope up or down as your needs evolve.`,
    category: 'Pricing',
  },
  {
    id: 'q3',
    question: 'How does your Virtual CFO team stay current with Mumbai and Maharashtra tax and regulatory compliance requirements?',
    answer: `Maharashtra is one of India's most actively regulated commercial jurisdictions, and the compliance calendar for a Mumbai-based business is genuinely demanding. Between central obligations — quarterly TDS filings, monthly GSTR-1 and GSTR-3B, advance tax instalments, annual ITR and income tax audit deadlines — and state-level requirements such as Maharashtra Professional Tax (PT), MLWF contributions, PTRC and PTEC registration maintenance, and Shop & Establishment Act renewals, the exposure surface is wide.

Our approach operates on four levels: dedicated compliance specialists who track regulatory updates from the CBDT, CBIC, Maharashtra GST authority, and the MCA in real time; proprietary compliance calendars issued to every client at onboarding — a forward-looking schedule mapping every filing deadline and statutory renewal 12 months out; active representation before the GST Council and ICAI; and sector-specific compliance leads for specialised businesses such as healthcare operators navigating Clinical Establishment Act obligations or tech startups managing FEMA and ECB rules. The result is zero compliance surprises and an audit-ready financial posture year-round.`,
    category: 'Compliance',
  },
  {
    id: 'q4',
    question: 'How is my company\'s financial data kept secure and confidential when working with an outsourced CFO?',
    answer: `Data confidentiality is non-negotiable when a third party has visibility into your most sensitive financial information, and we treat this with the same rigour a listed company's audit committee would demand.

Our infrastructure is entirely cloud-hosted on enterprise-grade platforms — Microsoft Azure and AWS — with AES-256 encryption at rest and TLS 1.3 in transit. Access to client data is role-based and on the principle of least privilege: only team members directly assigned to your engagement can view your files, and all access events are logged and auditable.

Every client engagement begins with a comprehensive Non-Disclosure Agreement and a Data Processing Agreement compliant with India's Digital Personal Data Protection Act, 2023 — specifically naming the categories of data accessed, the permitted use, the retention period, and the deletion protocol at engagement end. Operationally, we use dedicated client workspaces within platforms like Zoho Books, QuickBooks, or Tally Prime — whichever your business already runs — meaning your data never moves to a new system. Annual third-party security audits and ISO 27001-aligned information security protocols ensure our posture remains current as the threat landscape evolves.`,
    category: 'Security',
  },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Role & Value': { bg: 'rgba(0,139,208,0.08)', text: '#008bd0', border: 'rgba(0,139,208,0.2)' },
  'Pricing': { bg: 'rgba(13,126,86,0.08)', text: '#0d7e56', border: 'rgba(13,126,86,0.2)' },
  'Compliance': { bg: 'rgba(180,83,9,0.08)', text: '#b45309', border: 'rgba(180,83,9,0.2)' },
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
                {para.trim()}
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
              <span
                className="md:block mt-1"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #008bd0, #323a85)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Virtual CFO Services in Mumbai
              </span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
              Direct answers to the questions Mumbai business owners ask most when evaluating
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
                Schedule a no-obligation 30-minute discovery call with our Mumbai CFO team.
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
