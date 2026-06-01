'use client';

import { useState } from 'react';
import { Phone, Mail, MessageCircle, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const consultationBenefits = [
  'Free 45-minute strategic finance session',
  'Financial health assessment of your business',
  'Immediate identification of 3 key opportunities',
  'No obligation — no sales pitch',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
};

export default function CTASection() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/mumbai-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit your request. Please try again.');
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="consultation"
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #002244 0%, #003b8d 50%, #002244 100%)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px]" style={{ background: 'rgba(0, 139, 208, 0.12)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px]" style={{ background: 'rgba(0, 59, 141, 0.2)' }} />
      </div>

      <div className="container-wide relative z-10">
        <div className="text-center mb-12">
          <div className="section-label mx-auto !text-blue-300">Book Your Consultation</div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight mb-4 text-white">
            Get Strategic Financial Clarity {" "}
            <br className="md:block hidden" />
            <span className="text-p-2">for Your Business Today</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join 150+ Mumbai businesses who made the decision to take control of their financial
            future. Your first consultation is completely free.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <div className="mb-8">
              <h3 className="text-white font-bold text-xl mb-4">What You Get in Your Free Consultation</h3>
              <div className="space-y-3">
                {consultationBenefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-p-2 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-white/8 transition-colors group"
              >
                <div className="p-2.5 rounded-lg" style={{ background: 'rgba(0, 139, 208, 0.15)' }}>
                  <Phone className="w-5 h-5 text-p-2" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Call us directly</p>
                  <p className="text-white font-semibold">+91 9833943776</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-p-2 transition-colors" />
              </a>

              <a
                href="mailto:hello@finmates.in"
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-white/8 transition-colors group"
              >
                <div className="p-2.5 rounded-lg" style={{ background: 'rgba(0, 59, 141, 0.2)' }}>
                  <Mail className="w-5 h-5 text-p-2" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email us</p>
                  <p className="text-white font-semibold">info@finmates.in</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-p-2 transition-colors" />
              </a>

              <a
                href="https://wa.me/919833943776"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-white/8 transition-colors group"
              >
                <div className="p-2.5 bg-emerald-500/10 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">WhatsApp us</p>
                  <p className="text-white font-semibold">Chat with a CFO Expert</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>

           
          </div>

          {/* Right – Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-p-2 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-p-3 mb-2">Thank You!</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We've received your consultation request and sent a confirmation to your email. A
                  FinMates CFO expert will contact you within 2 business hours to schedule your session.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-p-3 text-lg mb-6">Book Your Free Consultation</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#008bd0] focus:ring-2 focus:ring-blue-100 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#008bd0] focus:ring-2 focus:ring-blue-100 transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#008bd0] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Name </label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#008bd0] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                
                  
                  {error && (
                    <p className="text-sm text-red-600 text-center" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-p-2 hover:bg-p text-white font-bold rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,139,208,0.35)] text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book My Free CFO Consultation'}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">
                    No spam. No sales pressure. Just genuine financial advice.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
