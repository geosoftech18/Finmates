"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Award, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Quote,
  Building2,
  Handshake,
  Star,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:bg-[#0077b5]' },
  { name: 'Email', icon: Mail, href: 'mailto:info@finmates.in', color: 'hover:bg-[#008bd0]' },
  { name: 'Phone', icon: Phone, href: 'tel:+919833943776', color: 'hover:bg-[#003b8d]' },

];

const achievements = [
  {
    icon: Building2,
    label: "Years of Experience",
    value: "16+",
    description: "Corporate finance leadership"
  },
  {
    icon: TrendingUp,
    label: "Businesses Served",
    value: "300+",
    description: "Across multiple industries"
  },
  {
    icon: Award,
    label: "Projects Delivered",
    value: "1200+",
    description: "Finance and strategy engagements"
  },
  {
    icon: Target,
    label: "Client Satisfaction",
    value: "99%",
    description: "Trusted long-term partnerships"
  },
];

const values = [
  {
    icon: Handshake,
    title: "Customer First",
    description: "Building lasting partnerships through trust and reliability"
  },
  {
    icon: Star,
    title: "Quality Excellence",
    description: "Uncompromising commitment to manufacturing standards"
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description: "Continuous improvement in technology and processes"
  },
];

export default function AboutFounder() {
  const headerReveal = useScrollReveal();
  const contentReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#17288508_1px,transparent_1px),linear-gradient(to_bottom,#17288508_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#003b8d]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#008bd0]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#003b8d]/10 border border-[#003b8d]/20 mb-6">
            <User className="w-4 h-4 text-[#003b8d]" />
            <span className="text-sm font-semibold text-[#003b8d]">Leadership</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Founder{" "}
            <span className="text-[#003b8d]">Leadership</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Driving financial clarity, compliance confidence, and business growth
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div
          ref={contentReveal.ref}
          className={`grid lg:grid-cols-5 gap-8 mb-20 transition-all duration-1000 delay-200 ${
            contentReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Left Side - Image with Social Links */}
          <div className="lg:col-span-2 relative">
            <div className="sticky top-24">
              <Card className="relative bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-500">
                
             {/* Image Section */}
             <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-[#172885]/10 via-[#C51119]/5 to-[#172885]/10">
                  {/* Founder Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full max-w-xs">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#003b8d] to-[#008bd0] rounded-3xl transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500" />
                      <img
                        src="/team/pinkesh jain.png?height=500&width=500"
                        alt="Pinkesh Jain - Founder & CFO Lead"
                        className="relative w-full h-full object-cover object-top rounded-3xl shadow-2xl"
                      />
                    </div>
                  </div>
                  
                  {/* Social Links - Overlay on Image */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-full px-4 py-3 shadow-xl border border-slate-200">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded-full bg-slate-100 ${social.color} text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                            aria-label={social.name}
                          >
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Decorative Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#003b8d] flex items-center justify-center shadow-xl">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                 {/* Founder Info */}
                 <div className="p-4 bg-white">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                      Pinkesh Jain
                    </h3>
                    <p className="text-base text-[#7C7C7C] font-medium mb-4">
                    Founder & CFO Lead
                    </p>
                    <div className="h-1 w-20 bg-gradient-to-r from-[#003b8d] to-[#008bd0] rounded-full mx-auto" />
                  </div>
                </div>
                
                
             

               
              </Card>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-3 space-y-8">
                {/* Story Section */}
            <Card className="p-8 bg-white border-2 border-slate-200 hover:border-[#003b8d]/30 transition-all duration-300">
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p className="text-lg">
                  With over <span className="font-bold text-[#008bd0]">16 years</span> of corporate finance experience,
                  Pinkesh Jain has helped businesses build strong financial foundations through strategic planning,
                  process discipline, and result-oriented execution.
                </p>
                <p>
                  Under his leadership, FinMates has supported startups and SMEs across CFO services, taxation,
                  outsourcing, and fundraising with a clear focus on compliance, growth, and
                  <span className="font-bold text-[#003b8d]"> long-term value creation</span>.
                </p>
              </div>
            </Card>
            
            {/* Quote Card */}
            <Card className="p-8 bg-gradient-to-br from-[#002244] to-[#003b8d] border-0 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#008bd0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Quote className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xl  text-white leading-relaxed mb-4 italic font-medium">
                      "Our mission is simple: empower founders with financial clarity and strategic control so they can
                      make better decisions, scale sustainably, and build resilient businesses."
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <div className="h-1 w-20 bg-white/40 rounded-full" />
                      <span className="text-blue-100 text-sm">- Pinkesh Jain, Founder & CFO Lead</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

        

         
          </div>
        </div>

        {/* Achievements Grid */}
        {/* <div
          ref={statsReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-400 ${
            statsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-[#172885]/50 hover:shadow-2xl transition-all duration-300 group text-center relative overflow-hidden"
              style={{
                animation: statsReveal.isVisible
                  ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  : "none",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C51119]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#003b8d] to-[#008bd0] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#003b8d] mb-2">
                  {achievement.value}
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-slate-500">
                  {achievement.description}
                </div>
              </div>
            </Card>
          ))}
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
