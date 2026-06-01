'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { useConsultationModal } from '@/components/city/mumbai/ConsultationModal';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#how-we-work' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openModal } = useConsultationModal();

  const handleConsultation = () => {
    setMobileOpen(false);
    openModal();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#002244]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#008bd0] to-[#323a85] flex items-center justify-center">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <span className="text-white font-bold text-lg">
              Fin<span className="text-[#60c8f0]">Mates</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+912269004200"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <button
              type="button"
              onClick={handleConsultation}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #008bd0, #323a85)' }}
            >
              Book Consultation
            </button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-white"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white px-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+912269004200"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-1"
            >
              <Phone className="w-4 h-4" />
              +91 22 6900 4200
            </a>
            <button
              type="button"
              onClick={handleConsultation}
              className="w-full py-2.5 rounded-lg text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #008bd0, #323a85)' }}
            >
              Book Consultation
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
