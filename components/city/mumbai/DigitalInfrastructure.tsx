'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Cpu,
  Calculator,
  Landmark,
  BarChart3,
  Wallet,
  Link2,
  Receipt,
  FileScan,
  LayoutDashboard,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';
import LinkifyVirtualCfo from '@/components/seo/LinkifyVirtualCfo';

const stackGroups = [
  {
    icon: Calculator,
    label: 'Core Accounting',
    accent: '#008bd0',
    bg: 'rgba(0,139,208,0.06)',
    border: 'rgba(0,139,208,0.16)',
    tools: ['Tally Prime', 'Zoho Books', 'QuickBooks', 'SAP Business 1'],
  },
  {
    icon: Landmark,
    label: 'Banking & Pay',
    accent: '#323a85',
    bg: 'rgba(50,58,133,0.06)',
    border: 'rgba(50,58,133,0.16)',
    tools: ['RazorpayX', 'Open Money', 'Corporate Net Banking API'],
  },
  {
    icon: BarChart3,
    label: 'Analytics & MIS',
    accent: '#0d7e56',
    bg: 'rgba(13,126,86,0.06)',
    border: 'rgba(13,126,86,0.16)',
    tools: ['Power BI', 'Tableau', 'Custom Excel Models'],
  },
  {
    icon: Wallet,
    label: 'Expense & Payroll',
    accent: '#b45309',
    bg: 'rgba(180,83,9,0.06)',
    border: 'rgba(180,83,9,0.16)',
    tools: ['Fyle', 'RazorpayX Payroll', 'Darwinbox'],
  },
];

const routines = [
  {
    icon: Link2,
    title: 'Direct Bank Feeds',
    body: 'We link your corporate bank accounts straight to your accounting core. This means ledger matching happens daily, automatically, and without human error. Transactions reconcile themselves while you sleep.',
  },
  {
    icon: Receipt,
    title: 'Automated Accounts Receivable',
    body: 'To keep cash moving, we set up self-running billing sequences. Customers get instant digital payment links alongside polite, automated reminders. If payments lag, the system triggers pre-set escalation steps immediately.',
  },
  {
    icon: FileScan,
    title: 'Smart Accounts Payable',
    body: 'On the outgoing side, smart optical character recognition handles the heavy lifting. The system reads incoming bills, routes them for sign-off, and flags double-billing. Your team gets clean, audit-ready records without manual data entry.',
  },
  {
    icon: LayoutDashboard,
    title: 'Interactive Visual Dashboards',
    body: 'Forget flat, outdated monthly PDF reports. We build interactive visual portals using tools like Power BI or Tableau. Board members can instantly filter numbers by division, product category, or territory to see the true story behind the cash.',
  },
];

export default function DigitalInfrastructure() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      id="digital-infrastructure"
      aria-labelledby="digital-infra-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: '#002244' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full opacity-[0.14] blur-3xl"
          style={{ background: 'radial-gradient(circle, #008bd0, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-[420px] h-[420px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: 'radial-gradient(circle, #323a85, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 78%)',
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
              backgroundColor: 'rgba(0,139,208,0.15)',
              border: '1px solid rgba(0,139,208,0.35)',
              color: '#5ec2f0',
            }}
          >
            <Cpu size={11} strokeWidth={2.5} />
            Digital Infrastructure
          </div>

          <h2
            id="digital-infra-heading"
            className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-5 text-white"
          >
            Digital Infrastructure and{' '}
            <span
              className="md:block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg, #5ec2f0, #8b94d6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Financial Systems
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            <LinkifyVirtualCfo
              text="The FinMates Virtual CFO service stands apart by embedding specialised digital systems directly into your daily monetary operations. We discard the chaotic patchwork of isolated spreadsheets. Instead, we establish a unified, cloud-based network that runs on autopilot."
              variant="light"
            />
          </p>
        </div>

        {/* Tech stack grid */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 lg:mb-20 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {stackGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.label}
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: group.bg, color: group.accent, border: `1px solid ${group.border}` }}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white/50 mb-4">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: group.accent }}
                      />
                      <span className="text-sm font-medium text-white/90">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Hands-off routines */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3 text-[#5ec2f0]">
              <Zap size={12} strokeWidth={2.5} />
              Runs on autopilot
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Hands-Off Financial Routines We Set Up
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
            {routines.map((routine, i) => {
              const Icon = routine.icon;
              return (
                <article
                  key={routine.title}
                  className="rounded-2xl p-6 lg:p-7 flex gap-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <span
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,139,208,0.22), rgba(50,58,133,0.22))',
                      color: '#5ec2f0',
                      border: '1px solid rgba(94,194,240,0.25)',
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">{routine.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{routine.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 rounded-2xl px-6 sm:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div>
            <p className="text-white font-bold text-base mb-1">
              Ready to put your finance stack on autopilot?
            </p>
            <p className="text-white/50 text-sm">
              We integrate your existing tools — or migrate you off spreadsheets — in under 48 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95 whitespace-nowrap"
            style={{ background: 'linear-gradient(90deg, #008bd0, #323a85)' }}
          >
            Book a Free Consultation
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
