"use client"
import { Building2, Users, TrendingUp, HandCoins, ChevronLeft, ChevronRight, Linkedin, Mail, Phone } from "lucide-react"
import { useState, useEffect ,useMemo} from "react"
import MagneticCursor from "@/components/MagneticCursor"
import { TimelineCarousel } from "@/components/timeline-carousel"
import JourneySection from "@/components/journey-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FinmatesHeader from "@/components/header2"
import { TestimonialSlider } from "@/components/testimonials/slider"
import { testimonials } from "@/components/testimonials/data"


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTimelineStep, setCurrentTimelineStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [showProgressCard, setShowProgressCard] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInTimeline, setIsMouseInTimeline] = useState(false)
  const [hoveredJourneyStep, setHoveredJourneyStep] = useState<number | null>(null)
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0)
  const [hoveredTeamMember, setHoveredTeamMember] = useState<number | null>(null)
  const [currentCaseSlide, setCurrentCaseSlide] = useState(0)
  const [hoveredCase, setHoveredCase] = useState<number | null>(null)
  const [isCarouselHovered, setIsCarouselHovered] = useState(false)
  const [currentTeamMobile, setCurrentTeamMobile] = useState(0)
  const [currentCaseMobile, setCurrentCaseMobile] = useState(0)

  const slides = [
    {
      subtitle: "Shaping Financial Landscapes",
      title: "Who We Are: FinMates Leadership Perspective",
      bullets: ["Leadership Excellence", "Industry Inclusivity"],
      buttonText: "Meet Our Leadership",
      image: "/about/slider1.png",
    },
    {
      subtitle: "FinMates: Your Strategic Financial Partner",
      title: "Empowering Financial Futures",
      bullets: ["Seasoned Expertise", "Diverse Indusrty Focus"],
      buttonText: "Discover Our Expertise",
      image: "/about/slider2.png",
    },
    {
      subtitle: "Navigeting Financial Excellence",
      title: "Who We Are: FinMates in a Glance",
      bullets: ["Leadership Insight", "Client-Centric Approach"],
      buttonText: "Explore Our Journey",
      image: "/about/slider1.png",
    },
    {
      subtitle: "Innovative Financial Solutions",
      title: "Meet FinMates: Pionners in Financial Innovation",
      bullets: ["Leadership Insight", "Client-Centric Approach"],
      buttonText: "Read Client Stories",
      image: "/about/slider2.png",
    },
    {
      subtitle: "Navigeting Financial Excellence",
      title: "Who We Are: FinMates in a Glance",
      bullets: ["Leadership Insight", "Client-Centric Approach"],
      buttonText: "Explore Our Journey",
      image: "/about/slider1.png",
    },
  ]

  // Auto-scroll functionality for carousel
  useEffect(() => {
    if (isCarouselHovered) return; // Pause auto-scroll when hovered

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isCarouselHovered, slides.length]);

  // Smooth transition effect for slide changes
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset the auto-scroll timer by briefly setting hover state
    setIsCarouselHovered(true);
    setTimeout(() => setIsCarouselHovered(false), 100);
    
    // Remove transition class after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Progress bar for auto-scroll
  useEffect(() => {
    if (isCarouselHovered) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (5000 / 50)); // Update every 50ms for smooth progress
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  const storySlides = [
    {
      subtitle: "Our Story",
      title: "Shaping Financial Journeys",
      description:
        "Embark on the FinMates journey, a narrative woven with expertise, innovation, and financial prowess. Founded by Pinkesh Jain, a seasoned professional with over 16 years of corporate experience, our story unfolds as a testament to transforming businesses through strategic financial solutions. Since our inception, FinMates has:",
      stats: [
        {
          icon: "/about/story1.png",
          number: "10 +",
          text: "Served Diverse Industries",
        },
        {
          icon: "/about/story2.png",
          number: "50 +",
          text: "Supported Clients in growth story",
        },
        {
          icon: "/about/story3.png",
          number: "5 +",
          text: "Facilitated 5+ SME IPO Listings",
        },
        {
          icon: "/about/story4.png",
          number: "100 +",
          text: "Raised 100+ cr fund through IPO/Equity/Debt",
        },
      ],
    },
  ]

  const timelineSteps = [
    {
      title: "Inception",
      date: "2018",
      description:
        "The FinMates journey began with a vision to redefine financial solutions, guided by founder Pinkesh Jain's expertise.",
      position: "top",
    },
    {
      title: "Early Growth",
      date: "2021",
      description: "Expanded our client base and established key partnerships in the financial sector.",
      position: "top",
    },
    {
      title: "Milestone Achievements",
      date: "2022",
      description: "Achieved significant milestones in IPO facilitation and equity fundraising.",
      position: "top",
    },
    {
      title: "Global Impact",
      date: "2023",
      description: "Extended our reach globally, impacting diverse industries and markets.",
      position: "top",
    },
  ]

  
  const teamMembers = [
    {
      name: "Pinkesh Jain",
      position: "Founder & CFO Lead",
      image: "/team/pinkesh jain.png?height=200&width=300",
      bio: "Seasoned professional with over 16 years of corporate experience in financial solutions and strategic business development.",
      expertise: ["Financial Strategy", "Corporate Finance", "Business Development", "IPO Management"],
      contact: {
        linkedin: "#",
        email: "pinkesh@finmates.com",
        phone: "+91-XXXXXXXXXX",
      },
    },
    {
      name: "Sumit Khasgiwala",
      position: "Co Founder & Lead Taxation",
      image: "/team/CA Sumit Khasgiwala.png?height=200&width=300",
      bio: "Expert in taxation and regulatory compliance with extensive experience in helping businesses navigate complex tax landscapes.",
      expertise: ["Tax Planning", "Regulatory Compliance", "GST Advisory", "Corporate Taxation"],
      contact: {
        linkedin: "#",
        email: "sumit@finmates.com",
        phone: "+91-XXXXXXXXXX",
      },
    },
    {
      name: "Rajat Jain",
      position: "Chartered Accountant",
      image: "/team/CA Rajat Jain.png?height=200&width=300",
      bio: "Qualified Chartered Accountant specializing in financial reporting, audit, and strategic financial planning for growing businesses.",
      expertise: ["Financial Reporting", "Audit & Assurance", "Strategic Planning", "Risk Management"],
      contact: {
        linkedin: "#",
        email: "rajat@finmates.com",
        phone: "+91-XXXXXXXXXX",
      },
    },
    {
      name: "Varsha Jain",
      position: "Lead Outsourcing Accountant",
      image: "/team/Varsha Jain.png?height=200&width=300",
      bio: "Experienced Chartered Accountant with a strong background in outsourced accounting services, financial management, and compliance solutions. She helps businesses streamline financial operations and maintain accuracy across multi-client portfolios.",
      expertise: [
        "Outsourced Accounting",
        "Financial Management",
        "Compliance & Reporting",
        "Process Optimization"
      ],
      contact: {
        linkedin: "#",
        email: "rajat@finmates.com",
        phone: "+91-XXXXXXXXXX",
      },
    },
    {
      name: "CS Jaymin",
      position: "Corporate Legal & Governance Advisor",
      image: "/team/jaymin.jpg?height=200&width=300",
      bio: "Company Secretary and corporate legal expert with deep expertise in corporate governance, regulatory compliance, and business structuring. Provides strategic legal advisory to ensure organizations remain compliant and well-governed.",
      expertise: [
        "Corporate Governance",
        "Regulatory Compliance",
        "Legal Advisory",
        "Business Structuring"
      ],
      contact: {
        linkedin: "#",
        email: "rajat@finmates.com",
        phone: "+91-XXXXXXXXXX",
      },
    }
    
  ]
  const caseStudies = [
    {
      title: "Make better decisions",
      clientRole: "CEO",
      description:
        "Strategic financial planning that transformed decision-making processes and improved business outcomes.",
      image: "/about/casestudy.png",
      industry: "Technology",
      duration: "6 months",
      metrics: {
        value: "₹50M",
        label: "Value Added",
        growth: "+150%",
      },
      tags: ["IPO", "Strategy", "Growth"],
    },
    {
      title: "Scale operations efficiently",
      clientRole: "COO",
      description:
        "Operational excellence through financial restructuring and process optimization for sustainable growth.",
      image:"/about/casestudy.png",
      industry: "Manufacturing",
      duration: "8 months",
      metrics: {
        value: "₹75M",
        label: "Cost Saved",
        growth: "+200%",
      },
      tags: ["Operations", "Efficiency", "Scale"],
    },
    {
      title: "Maximize market potential",
      clientRole: "CMO",
      description: "Market expansion strategy backed by comprehensive financial analysis and risk assessment.",
      image: "/about/casestudy.png",
      industry: "Retail",
      duration: "4 months",
      metrics: {
        value: "₹100M",
        label: "Revenue",
        growth: "+300%",
      },
      tags: ["Market", "Expansion", "Revenue"],
    },
    {
      title: "Optimize financial structure",
      clientRole: "CFO",
      description:
        "Complete financial restructuring that improved cash flow and reduced operational costs significantly.",
      image:"/about/casestudy.png",
      industry: "Healthcare",
      duration: "12 months",
      metrics: {
        value: "₹25M",
        label: "Savings",
        growth: "+120%",
      },
      tags: ["Finance", "Structure", "Optimization"],
    },
    {
      title: "Drive innovation forward",
      clientRole: "CTO",
      description: "Technology-driven financial solutions that enabled rapid innovation and competitive advantage.",
      image: "/about/casestudy.png",
      industry: "Fintech",
      duration: "10 months",
      metrics: {
        value: "₹200M",
        label: "Valuation",
        growth: "+400%",
      },
      tags: ["Innovation", "Technology", "Fintech"],
    },
    {
      title: "Enhance customer experience",
      clientRole: "CEO",
      description: "Customer-centric financial strategies that improved satisfaction and increased retention rates.",
      image: "/about/casestudy.png",
      industry: "E-commerce",
      duration: "6 months",
      metrics: {
        value: "₹80M",
        label: "Revenue",
        growth: "+250%",
      },
      tags: ["Customer", "Experience", "Retention"],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimelineStep((prev) => (prev + 1) % timelineSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const categories = useMemo(() => {
    const set = new Set<string>()
    testimonials.forEach((t) => t.category && set.add(t.category))
    return ["All", ...Array.from(set)]
  }, [])


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (isMouseInTimeline) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMouseInTimeline])

  const nextTimelineStep = () => {
    setCurrentTimelineStep((prev) => (prev + 1) % timelineSteps.length)
  }

  const prevTimelineStep = () => {
    setCurrentTimelineStep((prev) => (prev - 1 + timelineSteps.length) % timelineSteps.length)
  }

  const nextTeamSlide = () => {
    setCurrentTeamSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3))
  }

  const prevTeamSlide = () => {
    setCurrentTeamSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 3)) % Math.ceil(teamMembers.length / 3))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTeamSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextCaseSlide = () => {
    setCurrentCaseSlide((prev) => (prev + 1) % Math.ceil(caseStudies.length / 4))
  }

  const prevCaseSlide = () => {
    setCurrentCaseSlide((prev) => (prev - 1 + Math.ceil(caseStudies.length / 4)) % Math.ceil(caseStudies.length / 4))
  }

  return (
    
    <main className="min-h-screen bg-background">
        <MagneticCursor/>

       <FinmatesHeader/>
     

       <section 
         className="container mx-auto px-4 py-20"
         onMouseEnter={() => setIsCarouselHovered(true)}
         onMouseLeave={() => setIsCarouselHovered(false)}
       >
         <div className="max-w-7xl mx-auto">
           <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-500 ease-in-out ${
             isTransitioning ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'
           }`}>
                         {/* Left Content */}
             <div className="space-y-8">
               <div className="space-y-4">
                 <p className={`text-[#008bd0] font-bold text-base uppercase tracking-wide transition-all duration-500 ease-in-out ${
                   isTransitioning ? 'translate-y-2 opacity-70' : 'translate-y-0 opacity-100'
                 }`}>
                   {slides[currentSlide].subtitle}
                 </p>
                 <h1 className={`text-3xl lg:text-5xl font-bold text-slate-900 leading-tight transition-all duration-500 ease-in-out ${
                   isTransitioning ? 'translate-y-2 opacity-70' : 'translate-y-0 opacity-100'
                 }`}>
                   {slides[currentSlide].title}
                 </h1>
               </div>

                             <div className="space-y-4">
                 {slides[currentSlide].bullets.map((bullet, index) => (
                   <div 
                     key={index} 
                     className={`flex items-center gap-3 transition-all duration-500 ease-in-out ${
                       isTransitioning ? 'translate-x-2 opacity-70' : 'translate-x-0 opacity-100'
                     }`}
                     style={{ transitionDelay: `${index * 100}ms` }}
                   >
                     <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                       <svg className="w-6 h-6 text-[#008bd0]" fill="currentColor" viewBox="0 0 20 20">
                         <path
                           fillRule="evenodd"
                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                           clipRule="evenodd"
                         />
                       </svg>
                     </div>
                     <span className="text-slate-700 font-bold">{bullet}</span>
                   </div>
                 ))}
               </div>

                             <button className={`bg-[#003b8d] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-500 ease-in-out ${
                 isTransitioning ? 'translate-y-2 opacity-70 scale-95' : 'translate-y-0 opacity-100 scale-100'
               }`}>
                 {slides[currentSlide].buttonText}
               </button>
             </div>

             {/* Right Content - Image */}
             <div className="relative">
               <img
                src={slides[currentSlide].image}
                 alt="Professional collaboration"
                 className={`w-full h-auto rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
                   isTransitioning ? 'scale-105 opacity-70' : 'scale-100 opacity-100'
                 }`}
               />
             </div>
          </div>

                     <div className="flex items-center justify-center mt-12">
             <div className="flex gap-2">
               {slides.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => goToSlide(index)}
                   className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out hover:scale-125 ${
                     index === currentSlide 
                       ? "bg-[#008bd0] w-6 shadow-lg" 
                       : "bg-gray-300 hover:bg-gray-400"
                   }`}
                 />
               ))}
             </div>
           </div>
        </div>
      </section>

      <section className=" mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[#008bd0] font-medium text-base  tracking-wide">Our story</p>
                <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 ">
                  Shaping Financial Journeys
                </h2>
              </div>

              <p className="text-slate-600   text-xl">
                Embark on the FinMates journey, a narrative woven with expertise, innovation, and financial prowess.
                Founded by Pinkesh Jain, a seasoned professional with over 16 years of corporate experience, our story
                unfolds as a testament to transforming businesses through strategic financial solutions. Since our
                inception, FinMates has:
              </p>
            </div>

            {/* Right Content - Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {storySlides[0].stats.map((stat, index) => {
                
                return (
                  <div
                    key={index}
                    className="bg-white/100 rounded-lg rounded-bl-4xl p-6 shadow-lg border border-gray-100 text-center space-y-5"
                  >
                    <div className="flex justify-center">
                        <img src={stat.icon} alt={stat.text} width={45} height={45} />
                     
                    </div>
                    <div className="text-2xl font-bold text-[#003b8d]">{stat.number}</div>
                    <div className="text-sm text-slate-600 leading-tight">{stat.text}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>


      <JourneySection/>
      
     

       {/* Team Section */}

       <section className=" mx-auto px-4 py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Users className="w-4 h-4" />
              Leadership Excellence
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Driven by expertise, united by vision - meet the leaders shaping the future of financial solutions
            </p>
          </div>

          {/* Team Carousel Container */}
          {/* Mobile: single-card carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentTeamMobile * 100}%)` }}>
              {teamMembers.map((member, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="relative overflow-hidden">
                      <div className={`aspect-square bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-500`}>
                        <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full " />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className={`text-xl font-bold`}>{member.name}</h3>
                        <p className="text-blue-600 font-medium text-sm">{member.position}</p>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{skill}</span>
                        ))}
                        {member.expertise.length > 2 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">+{member.expertise.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile arrows */}
            <button onClick={() => setCurrentTeamMobile((p) => (p - 1 + teamMembers.length) % teamMembers.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center text-slate-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentTeamMobile((p) => (p + 1) % teamMembers.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center text-slate-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop/Tablet */}
          <div className="hidden md:block relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentTeamSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.slice(slideIndex * 3, slideIndex * 3 + 3).map((member, memberIndex) => {
                      const globalIndex = slideIndex * 3 + memberIndex
                      return (
                        <div
                          key={globalIndex}
                          className="group relative"
                          onMouseEnter={() => setHoveredTeamMember(globalIndex)}
                          onMouseLeave={() => setHoveredTeamMember(null)}
                        >
                          {/* Team Member Card */}
                          <div
                            className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                              hoveredTeamMember === globalIndex
                                ? "shadow-2xl -translate-y-4 scale-105"
                                : "hover:shadow-xl hover:-translate-y-2"
                            }`}
                          >
                            {/* Profile Image Container */}
                            <div className="relative overflow-hidden">
                              <div
                                className={`aspect-square bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-500 ${
                                  hoveredTeamMember === globalIndex ? "scale-110" : "group-hover:scale-105"
                                }`}
                              >
                                <img
                                  src={member.image || "/placeholder.svg"}
                                  alt={member.name}
                                  className="w-full h-full "
                                />
                              </div>

                              {/* Overlay with contact info - appears on hover */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                                  hoveredTeamMember === globalIndex ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                <div className="absolute bottom-4 left-4 right-4">
                                  <div className="flex justify-center gap-3">
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                      <Linkedin className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                      <Mail className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                      <Phone className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                              {/* Name and Position */}
                              <div className="mb-4">
                                <h3
                                  className={`text-xl font-bold transition-colors duration-300 ${
                                    hoveredTeamMember === globalIndex ? "text-blue-700" : "text-slate-900"
                                  }`}
                                >
                                  {member.name}
                                </h3>
                                <p className="text-blue-600 font-medium text-sm">{member.position}</p>
                              </div>

                              {/* Bio */}
                              <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.bio}</p>

                              {/* Expertise Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                      hoveredTeamMember === globalIndex
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {member.expertise.length > 2 && (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    +{member.expertise.length - 2} more
                                  </span>
                                )}
                              </div>

                              {/* Expanded Info - shows on hover */}
                              {/* <div
                                className={`transition-all duration-500 overflow-hidden ${
                                  hoveredTeamMember === globalIndex ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                }`}
                              >
                                <div className="border-t border-gray-100 pt-4">
                                  <h4 className="text-sm font-semibold text-slate-900 mb-2">All Expertise:</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {member.expertise.map((skill, skillIndex) => (
                                      <span
                                        key={skillIndex}
                                        className="px-2 py-1 rounded text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 border border-blue-200"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div> */}
                            </div>

                            {/* Decorative Elements */}
                            <div
                              className={`absolute top-4 right-4 w-8 h-8 rounded-full transition-all duration-300 ${
                                hoveredTeamMember === globalIndex
                                  ? "bg-gradient-to-br from-blue-400 to-purple-600 opacity-60 scale-125"
                                  : "bg-gradient-to-br from-blue-300 to-blue-500 opacity-20"
                              }`}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTeamSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTeamSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTeamSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTeamSlide ? "bg-blue-600 w-6 scale-125" : "bg-gray-300 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-7xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Work With Us?</h3>
              <p className="text-slate-600 mb-6">
                Connect with our expert team to discuss your financial goals and discover how we can help your business
                thrive.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

       {/* Testimonials Section */}
       <section className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
             {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003b8d] mb-4">Our Testimonials</h2>
            <p className="text-xl text-[#45556c]">Your Strategic Financial Partner</p>
          </div>


        <TestimonialSlider
          items={testimonials}
          layout="split" // "split" | "full" | "grid"
          autoplay
          autoplayDelay={5000}
          transition="slide" // "slide" | "fade" | "zoom" | "flip3d"
          showDots
          showArrows
          showProgress
          enableFiltering
          categories={categories}
          tickerColumns={3}
        />
      </section>

            {/* case study */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-16">
            <div>
              <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-4">Portfolio</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Case Studies
              </h2>
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-300 hover:scale-105 flex items-center gap-2">
              View All Cases
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Case Studies Carousel Container */}
          {/* Mobile: single-card carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentCaseMobile * 100}%)` }}>
              {caseStudies.map((caseStudy, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="relative overflow-hidden aspect-video">
                      <img src={caseStudy.image || "/placeholder.svg"} alt={caseStudy.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                      <p className="text-blue-600 font-medium text-sm mb-3">{caseStudy.clientRole}</p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{caseStudy.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile arrows */}
            <button onClick={() => setCurrentCaseMobile((p) => (p - 1 + caseStudies.length) % caseStudies.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center text-slate-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentCaseMobile((p) => (p + 1) % caseStudies.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center text-slate-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop/Tablet */}
          <div className="hidden md:block relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentCaseSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(caseStudies.length / 4) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {caseStudies.slice(slideIndex * 4, slideIndex * 4 + 4).map((caseStudy, caseIndex) => {
                      const globalIndex = slideIndex * 4 + caseIndex
                      return (
                        <div
                          key={globalIndex}
                          className="group relative"
                          onMouseEnter={() => setHoveredCase(globalIndex)}
                          onMouseLeave={() => setHoveredCase(null)}
                        >
                          {/* Case Study Card */}
                          <div
                            className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                              hoveredCase === globalIndex
                                ? "shadow-2xl -translate-y-1 scale-105"
                                : "hover:shadow-xl hover:-translate-y-1"
                            }`}
                          >
                            {/* Case Study Image */}
                            <div className="relative overflow-hidden aspect-video">
                              <img
                                src={caseStudy.image || "/placeholder.svg"}
                                alt={caseStudy.title}
                                className={`w-full h-full object-cover transition-all duration-500 ${
                                  hoveredCase === globalIndex ? "scale-110" : "group-hover:scale-105"
                                }`}
                              />

                              {/* Overlay with additional info - appears on hover */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                                  hoveredCase === globalIndex ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                <div className="absolute bottom-4 left-4 right-4">
                                  <div className="flex justify-between items-center">
                                    <div className="text-white">
                                      <p className="text-sm font-medium">{caseStudy.industry}</p>
                                      <p className="text-xs opacity-80">{caseStudy.duration}</p>
                                    </div>
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Success Badge */}
                              <div className="absolute top-4 right-4">
                                <div
                                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                                    hoveredCase === globalIndex
                                      ? "bg-green-600 text-white scale-110"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  Success
                                </div>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                              {/* Title */}
                              <h3
                                className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                  hoveredCase === globalIndex ? "text-blue-700" : "text-slate-900"
                                }`}
                              >
                                {caseStudy.title}
                              </h3>

                              {/* Client Role */}
                              <p className="text-blue-600 font-medium text-sm mb-3">{caseStudy.clientRole}</p>

                              {/* Description */}
                              <p className="text-slate-600 text-sm leading-relaxed mb-4">{caseStudy.description}</p>

                              {/* Key Metrics */}
                              <div className="flex justify-between items-center mb-4">
                                <div className="text-center">
                                  <div
                                    className={`text-lg font-bold transition-colors duration-300 ${
                                      hoveredCase === globalIndex ? "text-blue-600" : "text-slate-900"
                                    }`}
                                  >
                                    {caseStudy.metrics.value}
                                  </div>
                                  <div className="text-xs text-slate-500">{caseStudy.metrics.label}</div>
                                </div>
                                <div className="text-center">
                                  <div
                                    className={`text-lg font-bold transition-colors duration-300 ${
                                      hoveredCase === globalIndex ? "text-green-600" : "text-slate-900"
                                    }`}
                                  >
                                    {caseStudy.metrics.growth}
                                  </div>
                                  <div className="text-xs text-slate-500">Growth</div>
                                </div>
                              </div>

                              {/* Progress Bar */}
                              <div className="flex items-center gap-2 mb-4">
                                <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                      hoveredCase === globalIndex
                                        ? "bg-gradient-to-r from-blue-600 to-green-600"
                                        : "bg-gradient-to-r from-blue-500 to-blue-600"
                                    }`}
                                    style={{
                                      width: hoveredCase === globalIndex ? "100%" : "75%",
                                    }}
                                  ></div>
                                </div>
                                <span
                                  className={`text-xs font-semibold transition-colors duration-300 ${
                                    hoveredCase === globalIndex ? "text-green-600" : "text-blue-600"
                                  }`}
                                >
                                  {hoveredCase === globalIndex ? "100%" : "75%"}
                                </span>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2">
                                {caseStudy.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                      hoveredCase === globalIndex
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Decorative Elements */}
                            <div
                              className={`absolute top-4 left-4 w-6 h-6 rounded-full transition-all duration-300 ${
                                hoveredCase === globalIndex
                                  ? "bg-gradient-to-br from-blue-400 to-purple-600 opacity-60 scale-125"
                                  : "bg-gradient-to-br from-blue-300 to-blue-500 opacity-20"
                              }`}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevCaseSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCaseSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(caseStudies.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCaseSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCaseSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-7xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Create Your Success Story?</h3>
              <p className="text-slate-600 mb-6">
                Join our portfolio of successful clients and let us help you achieve remarkable financial outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Your Project
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105">
                  View All Cases
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-1/2 flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 hover:scale-110"
          style={{
            backgroundImage: `url(/about/about1.jpg)`,
            // backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tHN8kRxiTnseNhkgYEF2vethEDBRhM.png')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-blue-900/80" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className=" gap-12 items-center">
              {/* Left Content - Empty for image space */}
              

              {/* Right Content */}
              <div className="space-y-8 text-white">
                <div className="space-y-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in-up">
                    Establish Your New Territory
                    <span className="block text-blue-300">With Us</span>
                  </h1>

                  <p className="text-lg text-gray-40 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-200">
                    Embark on a transformative journey with FinMates, where financial success meets innovation. We guide
                    you through uncharted territories, offering tailored solutions for your unique business landscape.
                    Our commitment includes:
                  </p>

                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-400">
                    <span className="flex items-center gap-2">
                      Explore Your Potential
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Service Points */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  number: "01.",
                  title: "Strategic Financial Planning",
                  description: "Comprehensive roadmaps for sustainable growth",
                },
                {
                  number: "02.",
                  title: "Global Compliance Assurance",
                  description: "Navigate international regulations with confidence",
                },
                {
                  number: "03.",
                  title: "Tech-Driven Efficiency",
                  description: "Leverage cutting-edge technology for optimal results",
                },
                {
                  number: "04.",
                  title: "Client-Centric Approach",
                  description: "Personalized solutions tailored to your needs",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up"
                  style={{ animationDelay: `${600 + index * 150}ms` }}
                >
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors">
                      {service.number}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                      {service.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
                    </div>
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <Footer/>
    </main>
  )
}
