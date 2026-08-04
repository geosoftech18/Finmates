import {  ArrowRight } from 'lucide-react';





export default function FooterTop() {
  return (
    <footer className="bg-p-3 border-t border-white/8">
      {/* Mini CTA strip */}
      <div className="border-b border-white/8 py-8">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">Ready to transform your finances?</p>
            <p className="text-slate-400 text-sm">Join 100+ businesses who chose FinMates as their financial growth partner.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1fb956] text-white font-semibold rounded-xl transition-all text-sm"
            >
              WhatsApp Expert
            </a>
            <a
              href="#consultation"
              className="flex items-center gap-2 px-5 py-2.5 bg-p-2 hover:bg-p text-white font-semibold rounded-xl transition-all text-sm"
            >
              Book Consultation <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    
    </footer>
  );
}
