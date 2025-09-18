"use client"
import MagneticCursor from "@/components/MagneticCursor"
import { Button } from "@/components/ui/button"
import { useState, useEffect ,useMemo} from "react"
import CountUp from "react-countup"
import {
  Check,
  Users,
  Shield,
  Lightbulb,
  Handshake,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
  HelpCircle, Linkedin, Mail, Phone 
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FinmatesHeader from "@/components/header2"
import { TestimonialCard } from "@/components/testimonials/testimonial-card"
import { TestimonialSlider } from "@/components/testimonials/slider"
import { testimonials } from "@/components/testimonials/data"

const slides = [
  {
    id: 1,
    title: "Strategic Financial Solutions with FinMates CFO Service",
    subtitle: "Empowering Businesses Through Virtual and onsite CFO Services and Beyond",
    buttonText: "Discover More",
    image: "/images/slide1.png",
  },
  {
    id: 2,
    title: "Our Comprehensive Financial and Accounting Solutions",
    subtitle: "Driving Excellence in Accounting, Taxation, and More",
    buttonText: "Get Started Today",
    image: "/images/slide2.png",
  },
  {
    id: 3,
    title: "Elevate Your Financial Game with FinMates SME IPO Readiness Service",
    subtitle: "Comprehensive Solutions for Today's Dynamic Business Landscape",
    buttonText: "Learn More",
    image: "/images/slide3.png",
  },
  {
    id: 4,
    title: "Transformative Accounting Services by FinMates",
    subtitle: "From Automation to IPO Guidance, We've Got You Covered",
    buttonText: "Learn More",
    image: "/images/slide4.png",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0)
  const [currentWhySlide, setCurrentWhySlide] = useState(0)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [startCountup, setStartCountup] = useState(false)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
  const [currentTimelineStep, setCurrentTimelineStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [showProgressCard, setShowProgressCard] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInTimeline, setIsMouseInTimeline] = useState(false)
  const [hoveredJourneyStep, setHoveredJourneyStep] = useState<number | null>(null)
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0)
  const [currentTeamMobile, setCurrentTeamMobile] = useState(0)
  const [hoveredTeamMember, setHoveredTeamMember] = useState<number | null>(null)
  const [currentCaseSlide, setCurrentCaseSlide] = useState(0)
  const [hoveredCase, setHoveredCase] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const boxes = document.querySelectorAll<HTMLElement>(".value-box");

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      const skew = Math.min(Math.max(diff * 0.2, -10), 10); // smooth tilt

      boxes.forEach((box) => {
        box.style.transform = `skewY(${skew}deg)`;
        box.style.transition = "transform 0.2s ease-out";
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-scroll for services section
  useEffect(() => {
    if (isAutoScrollPaused) return // Don't auto-scroll when paused
    
    const serviceTimer = setInterval(() => {
      setCurrentServiceSlide((prev) => (prev + 1) % services.length)
    }, 4000) // Auto-scroll every 4 seconds
    return () => clearInterval(serviceTimer)
  }, [isAutoScrollPaused])

  const services = [
    {
      id: 1,
      title: "CFO Services",
      subtitle: "Strategic Financial Leadership On-site & Virtually",
      description:
        "Unlock the expertise of seasoned CFOs to drive strategic decision-making and financial leadership. Whether on-site or virtual, our CFO services optimize cash flow, enhance profitability, and guide your business towards sustainable growth.",
      illustration: "/services/CFO_Services.jpg?height=200&width=200",
      link:"services/cfo-services"
    },
    {
      id: 2,
      title: "F&A Outsourcing",
      subtitle: "Efficient Finance and Accounting Solutions",
      description:
        "Efficient Finance and Accounting Solutions Transform your finance and accounting functions with FinMates' F&A outsourcing solutions. From meticulous management of Accounts Payable and Collections to seamless Period Closing and",
      illustration: "/services/F&A.png?height=200&width=200",
      link:"services/F&A-outsourcing"
    },
    {
      id: 3,
      title: "Direct tax and regulatory services",
      subtitle: "Expert Guidance for Complex Financial Transactions",
      description:
        "Trust FinMates for expert advisory services that navigate the intricacies of direct and indirect taxes, as well as mergers and acquisitions. Our team provides strategic advice to ensure compliance and success in a dynamic financial landscape.",
      illustration: "/services/tax.png?height=200&width=200",
      link:"services/direct-tax"
    },
    {
      id: 4,
      title: "Corporate Fundraising and M&A Advisory",
      subtitle: "Strategic Financial Services",
      description:
        "We provide end-to-end corporate finance solutions, including pitch deck creation, financial modeling, fundraising advisory, debt financing, due diligence, and M&A support, ensuring streamlined processes and optimal outcomes for our clients.",
      illustration: "/services/Office_of_CFO.jpg?height=200&width=200",
      link:"services/M&A-Advisory"
    },
    {
      id: 5,
      title: "SME IPO readness support",
      subtitle: "Guidance for Going Public",
      description:
        "Take the leap into the public domain with confidence through FinMates' SME IPO Listing services. Our expert guidance ensures compliance and success in navigating the complexities of going public, propelling your business to the next level.",
      illustration: "/services/SME_IPO_Listing.jpg?height=200&width=200",
      link:"services/SME-IPO"
    },
  
  ]

  const nextService = () => {
    setIsAutoScrollPaused(true)
    setCurrentServiceSlide((prev) => (prev + 1) % services.length)
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsAutoScrollPaused(false), 3000)
  }

  const prevService = () => {
    setIsAutoScrollPaused(true)
    setCurrentServiceSlide((prev) => (prev - 1 + services.length) % services.length)
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsAutoScrollPaused(false), 3000)
  }

  const goToService = (index: number) => {
    setIsAutoScrollPaused(true)
    setCurrentServiceSlide(index)
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsAutoScrollPaused(false), 3000)

  }

  const nextTeamSlide = () => {
    setCurrentTeamSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3))
  }

  const prevTeamSlide = () => {
    setCurrentTeamSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 3)) % Math.ceil(teamMembers.length / 3))
  }

  const nextTeamMobile = () => {
    setCurrentTeamMobile((prev) => (prev + 1) % teamMembers.length)
  }

  const prevTeamMobile = () => {
    setCurrentTeamMobile((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTeamSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const whyFinMates = [
    {
      id: 1,
      title: "Integrity",
      description: "Trust in our commitment to transparency and ethical business practices.",
      icon: "/why/integrity.png",
    },
    {
      id: 2,
      title: "Collaboration",
      description: "Partner with a team that values collaboration and tailored financial strategies.",
      icon: "/why/collaboration.png",
    },
    {
      id: 3,
      title: "Results-Driven",
      description: "Achieve tangible results with FinMates' data-driven and outcome-focused approach.",
      icon: "/why/result.png",
    },
    {
      id: 4,
      title: "Integrity",
      description: "Trust in our commitment to transparency and ethical business practices.",
      icon: "/why/integrity.png",
    },
    {
      id: 5,
      title: "Collaboration",
      description: "Partner with a team that values collaboration and tailored financial strategies.",
      icon: "/why/collaboration.png",
    },
    {
      id: 6,
      title: "Results-Driven",
      description: "Achieve tangible results with FinMates' data-driven and outcome-focused approach.",
      icon: "/why/result.png",
    },
  ]

  const teamMembers = [
    {
      name: "Pinkesh Jain",
      position: "Founder & CFO Lead",
      image: "/about/founder.jpeg?height=200&width=300",
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
      image: "/placeholder.svg?height=300&width=300",
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
      image: "/placeholder.svg?height=300&width=300",
      bio: "Qualified Chartered Accountant specializing in financial reporting, audit, and strategic financial planning for growing businesses.",
      expertise: ["Financial Reporting", "Audit & Assurance", "Strategic Planning", "Risk Management"],
      contact: {
        linkedin: "#",
        email: "rajat@finmates.com",
        phone: "+91-XXXXXXXXXX",
      },
    },
  ]

  const nextWhySlide = () => {
    setCurrentWhySlide((prev) => (prev + 1) % whyFinMates.length)
  }

  const prevWhySlide = () => {
    setCurrentWhySlide((prev) => (prev - 1 + whyFinMates.length) % whyFinMates.length)
  }

  const goToWhySlide = (index: number) => {
    setCurrentWhySlide(index)
  }

  const categories = useMemo(() => {
    const set = new Set<string>()
    testimonials.forEach((t) => t.category && set.add(t.category))
    return ["All", ...Array.from(set)]
  }, [])


  // Auto-scroll for Why FinMates (desktop 3-card window, mobile single card)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWhySlide((prev) => (prev + 1) % whyFinMates.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [whyFinMates.length])

  const handleCardClick = (cardId: number) => {
    setSelectedCard(cardId)
    setTimeout(() => setSelectedCard(null), 600) // Reset after animation
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "How can FinMates help my business achieve cost savings?",
      answer:
        "FinMates helps businesses achieve cost savings through strategic financial planning, process optimization, and identifying areas for operational efficiency. Our CFO services provide expert guidance on budget management, expense reduction strategies, and financial restructuring to maximize your bottom line.",
    },
    {
      question: "Why choose FinMates for CFO Services?",
      answer:
        "FinMates offers both virtual and on-site CFO services with over 16 years of experience. Our seasoned professionals provide strategic financial leadership, cash flow optimization, and growth strategies tailored to your business needs, ensuring you get expert guidance without the full-time executive cost.",
    },
    {
      question: "What industries does FinMates specialize in?",
      answer:
        "FinMates serves a diverse range of industries including technology startups, manufacturing, retail, healthcare, and professional services. Our expertise spans across various sectors, allowing us to provide industry-specific financial solutions and regulatory compliance guidance.",
    },
    {
      question: "How does FinMates support businesses in IPO listings?",
      answer:
        "Our SME IPO readiness support includes comprehensive preparation services such as financial auditing, compliance management, documentation preparation, and strategic guidance throughout the public offering process. We ensure your business meets all regulatory requirements for a successful IPO launch.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <MagneticCursor />

      <FinmatesHeader/>


      {/* Hero Slider Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Images with transition */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image || "/placeholder.svg"}
                alt="Professional businessman"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          {/* White curved background - desktop/tablet only */}
          <div 
            className="absolute left-0 top-0 h-full hidden md:block md:w-3/5"
            style={{
              background: 'white',
              borderTopRightRadius: '0',
              borderBottomRightRadius: '20rem',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0'
            }}
          ></div>
          
          {/* Curved White Content Section */}
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="relative">

              {/* Decorative dots
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              </div> */}

              {/* Main Content with transitions */}
              <div className="relative z-10 px-6 md:pl-20 md:pr-8 py-16 max-w-2xl">
                {/* Logo/Icon */}
                {/* <div className="mb-8">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-blue-400"></div>
                  </div>
                </div> */}

                {/* Dynamic Content */}
                <div className="transition-all duration-500">
                  {/* Main Heading */}
                  <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: "#002244" }}>
                    {slides[currentSlide].title.includes("FinMates CFO") ? (
                      <>
                        Strategic Financial Solutions with <span className="text-[#008bd0]">FinMates CFO</span> Service
                      </>
                    ) : slides[currentSlide].title.includes("SME") ? (
                      <>
                        Expert IPO Readiness with <span className="text-[#008bd0]">FinMates SME</span> Service
                      </>
                    ) : slides[currentSlide].title.includes("Advisory") ? ( 
                      <>
                        Transform Your Business with <span className="text-[#008bd0]">FinMates Advisory</span>
                      </>
                    ):(
                      <>
                      Transformative Accounting Services <span className="text-[#008bd0]"> by FinMates</span>
                      </>
                    )}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl mb-8 leading-relaxed" style={{ color: "#333333" }}>
                    {slides[currentSlide].subtitle}
                  </p>

                  {/* CTA Button */}
                  <Button
                    className="text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                    style={{ backgroundColor: "#008bd0" }}
                  >
                    {slides[currentSlide].buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side Navigation Dots with click handlers (desktop only) */}
        <div className="hidden md:flex absolute left-24 top-1/2 transform -translate-y-1/2 flex-col space-y-2 pl-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "h-8 bg-gray-600" : "h-2 bg-gray-600 hover:bg-gray-500"
              }`}
              style={index === currentSlide ? { backgroundColor: "" } : {}}
            />
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image with Experience Badge */}
            <div className="relative pb-16 pr-20">
              <div className="relative overflow-visible rounded-lg flex justify-center md:justify-start">
                <img
                  src="/images/finmate-partner.png?height=600&width=500"
                  alt="Professional business consultant"
                  className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-cover rounded-lg"
                />

                {/* Experience Badge - Hidden on Mobile */}
                <div className="absolute -bottom-8 -right-8 z-10 hidden md:block">
                  <div
                    className="px-10 py-10 shadow-xl cursor-pointer transition-transform hover:scale-105"
                    style={{ 
                      backgroundColor: "rgb(37 99 235)",
                      
                      borderBottomRightRadius: "4rem"
                    }}
                    onMouseEnter={() => setStartCountup(true)}
                    onMouseLeave={() => setStartCountup(false)}
                  >
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white">
                        {startCountup ? (
                          <CountUp end={16} duration={2.5} delay={0} />
                        ) : (
                          "16"
                        )}
                      </div>
                      <div className="text-2xl text-white font-medium">years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="space-y-8">
              {/* Section Label */}
              <div className="text-lg font-bold uppercase tracking-wider" style={{ color: "#008bd0" }}>
                About Us
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl font-bold leading-tight" style={{ color: "#002244" }}>
                Your Trusted Financial Partner
              </h2>

              {/* Description Paragraph */}
              <p className="text-[20px] leading-relaxed" style={{ color: "#4b5563" }}>
              At FinMates, we are more than just financial consultants;
               we are your dedicated partners in navigating the complex terrain of Finance,
                Accounts, and Taxation. With a commitment to excellence and client-centric solutions,
               we bring over 16 years of seasoned expertise to the table.
              </p>

              {/* Key Highlights */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full border-1 hover:bg-blue-100 flex items-center justify-center">
                      <Check className="w-5 h-5" style={{ color: "#007BFF" }} />
                    </div>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: "#002244" }}>
                    Strategic Insights
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8  rounded-full border-1 hover:bg-blue-100 flex items-center justify-center">
                      <Check className="w-5 h-5" style={{ color: "#007BFF" }} />
                    </div>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: "#002244" }}>
                    Comprehensive Services
                  </span>
                </div>
              </div>

              {/* Closing Tagline */}
              <p className="text-lg italic" style={{ color: "#666666" }}>
                Partner with FinMates, where financial success meets strategic partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Our Values Section */}
       <section className=" bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-8xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className="">
              <div className="">
                <img
                  src="/images/values.jpg?height=600&width=500"
                  alt="Hands holding puzzle pieces symbolizing teamwork and collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Values Content */}
            <div className="space-y-8 ">
              {/* Section Label */}
              <div className="text-lg font-bold uppercase  tracking-wider my-4" style={{ color: "#008bd0" }}>
                Our Values
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl font-bold leading-tight" style={{ color: "#001736" }}>
                Guiding Principles for Excellence
              </h2>

              {/* Description Paragraph */}
              <p className="text-lg leading-relaxed" style={{ color: "#001736" }}>
                At FinMates, our values form the bedrock of our commitment to excellence, integrity, and client
                satisfaction.
              </p>

              {/* Value Boxes - 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client-Centric Approach */}
                <div className="flex items-start space-x-4 value-box">
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#008bd0" }}
                    >
                      <img src="/images/icon1.png" alt="" className="w-10 h-10 text-white" />
                      {/* <Users className="w-6 h-6 text-white" /> */}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#001736" }}>
                      Client-Centric Approach
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: "#001736" }}>
                      We prioritize our clients' needs, ensuring tailored solutions for their unique challenges.
                    </p>
                  </div>
                </div>

                {/* Integrity and Transparency */}
                <div className="flex items-start space-x-4 value-box">
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#008bd0" }}
                    >
                     <img src="/images/icon2.png" alt="" className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#001736" }}>
                      Integrity and Transparency
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: "#001736" }}>
                      Upholding the highest ethical standards, we operate with integrity, transparency, and a commitment
                      to trust.
                    </p>
                  </div>
                </div>

                {/* Innovation and Adaptability */}
                <div className="flex items-start space-x-4 value-box">
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#008bd0" }}
                    >
                     <img src="/images/icon3.png" alt="" className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#001736" }}>
                      Innovation and Adaptability
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: "#001736" }}>
                      Embracing innovation, we continuously evolve to meet the dynamic demands of the financial
                      landscape.
                    </p>
                  </div>
                </div>

                {/* Collaborative Excellence */}
                <div className="flex items-start space-x-4 value-box">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#008bd0" }}
                    >
                      <img src="/images/icon4.png" alt="" className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#001736" }}>
                      Collaborative Excellence
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: "#001736" }}>
                      Fostering a culture of collaboration, we bring together diverse expertise to deliver unparalleled
                      financial solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Closing Line */}
              <p className="text-lg italic pt-4" style={{ color: "#666666" }}>
                Experience the FinMates difference, where values drive our journey towards success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold" style={{ color: "#002244" }}>
              Our Services
            </h2>

            {/* Navigation Arrows */}
            <div className="flex items-center space-x-4">
              <button
                onClick={prevService}
                className="p-3 rounded-full border-2 transition-all duration-300 hover:bg-blue-50"
                style={{ borderColor: "#002244", color: "#002244" }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextService}
                className="p-3 rounded-full border-2 transition-all duration-300 hover:bg-blue-50"
                style={{ borderColor: "#002244", color: "#002244" }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Services Carousel - Mobile: 1 card swipe, Desktop/Tablet: 3-card window */}
          <div className="relative">
            {/* Mobile: 1 card carousel */}
            <div className="md:hidden relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentServiceSlide * 100}%)` }}
              >
                {services.map((serviceItem) => (
                  <div key={serviceItem.id} className="w-full flex-shrink-0">
                    <div
                      onClick={() => handleCardClick(serviceItem.id)}
                      className={`
                        group bg-white rounded-2xl shadow-lg cursor-pointer transition-all duration-300
                        ${selectedCard === serviceItem.id ? " border-2" : "border-0"}
                        hover:shadow-xl hover:scale-105
                      `}
                      style={{
                        borderColor: selectedCard === serviceItem.id ? "#007BFF" : "transparent",
                        animationDuration: selectedCard === serviceItem.id ? "0.6s" : "0s",
                      }}
                    >
                      <div className="relative overflow-hidden ">
                        <img
                          src={serviceItem.illustration || "/placeholder.svg"}
                          alt={serviceItem.title}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300"></div>
                      </div>

                      <div className="space-y-4 p-4">
                        <h3 className="text-2xl font-bold" style={{ color: "#002244" }}>
                          {serviceItem.title}
                        </h3>

                        <p className="text-base font-medium" style={{ color: "#002244" }}>
                          {serviceItem.subtitle}
                        </p>

                        <p className="text-md leading-relaxed line-clamp-4" style={{ color: "#666" }}>
                          {serviceItem.description}
                        </p>

                        <a href={serviceItem.link}
                          className="group flex items-center space-x-2 px-6 py-3 "
                         >
                          <span className="font-medium">Explore More</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop/Tablet: 3-card window that shifts by 1 */}
            <div className={`hidden md:grid md:grid-cols-3 gap-6 md:gap-8`}>
              {Array.from({ length: 3 }, (_, offset) => {
                const serviceItem = services[(currentServiceSlide + offset) % services.length]
                return (
                  <div
                    key={serviceItem.id}
                    onClick={() => handleCardClick(serviceItem.id)}
                    className={`
                      group bg-white rounded-2xl shadow-lg cursor-pointer transition-all duration-300
                      ${selectedCard === serviceItem.id ? " border-2" : "border-0"}
                      hover:shadow-xl hover:scale-105
                    `}
                    style={{
                      borderColor: selectedCard === serviceItem.id ? "#007BFF" : "transparent",
                      animationDuration: selectedCard === serviceItem.id ? "0.6s" : "0s",
                    }}
                  >
                    <div className="relative overflow-hidden ">
                      <img
                        src={serviceItem.illustration || "/placeholder.svg"}
                        alt={serviceItem.title}
                        className="w-4/5 h-4/5 lg:pl-10 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300"></div>
                    </div>

                    <div className="space-y-4 p-4">
                      <h3 className="text-2xl font-bold" style={{ color: "#002244" }}>
                        {serviceItem.title}
                      </h3>

                      <p className="text-base font-medium" style={{ color: "#002244" }}>
                        {serviceItem.subtitle}
                      </p>

                      <p className="text-md leading-relaxed line-clamp-4" style={{ color: "#666" }}>
                        {serviceItem.description}
                      </p>

                      <a href={serviceItem.link}
                        className="group flex items-center space-x-2 px-6 py-3 "
                      >
                        <span className="font-medium">Explore More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

         
          {/* Carousel Dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: services.length }, (_, index) => (
              <button
                key={index}
                onClick={() => goToService(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentServiceSlide ? "w-6 scale-125" : "h-2 hover:scale-110"
                }`}
                style={{
                  backgroundColor: index === currentServiceSlide ? "#007BFF" : "#CCCCCC",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why FinMates Section */}
      <section className="py-20 mb-48 max-h-[500px]" style={{ backgroundColor: "#001f3f" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Why FinMates</h2>
            <p className="text-xl text-gray-300">Your Strategic Financial Partner</p>
          </div>

          {/* Feature Cards Container */}
          <div className="relative">
            {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
            <button 
              onClick={prevWhySlide}
              className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 p-3 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextWhySlide}
              className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 p-3 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Desktop View - 3-card window auto-advancing by 1 */}
            <div className="hidden md:block px-12 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {Array.from({ length: 3 }, (_, offset) => {
                  const item = whyFinMates[(currentWhySlide + offset) % whyFinMates.length]
                  return (
                    <div key={`${item.id}-${offset}`} className="bg-gray-50 border-1 border-gray-300 p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                      <div className="mb-6">
                        <img src={item.icon} alt={`${item.title} illustration`} className="w-28 h-28 mx-auto" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4" style={{ color: "#0070f3" }}>{item.title}</h3>
                      <p className="text-gray-700 text-xl leading-relaxed">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile View - Carousel with single card */}
            <div className="md:hidden relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentWhySlide * 100}%)` }}
              >
                {whyFinMates.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 border-1 border-gray-300 p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                      {/* Icon */}
                      <div className="mb-6">
                        <img
                          src={item.icon}
                          alt={`${item.title} illustration`}
                          className="w-28 h-28 mx-auto"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4" style={{ color: "#0070f3" }}>
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 text-xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Navigation Arrows */}
              <button 
                onClick={prevWhySlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-80 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextWhySlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-80 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Pagination - Only visible on mobile */}
          <div className="flex justify-center mt-12 space-x-3 md:hidden">
            {whyFinMates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToWhySlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentWhySlide ? "scale-125" : "hover:scale-110"
                }`}
                style={{
                  backgroundColor: index === currentWhySlide ? "#00C16A" : "#CCCCCC",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
             {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#003b8d] mb-4">Our Testimonials</h2>
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

      {/* Team Section */}

      <section className=" mx-auto px-4 py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Users className="w-4 h-4" />
              Leadership Excellence
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Driven by expertise, united by vision - meet the leaders shaping the future of financial solutions
            </p>
          </div>

          {/* Team Carousel Container */}
          <div className="relative overflow-hidden">
            {/* Mobile: 1-card carousel */}
            <div className="md:hidden relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTeamMobile * 100}%)` }}
              >
                {teamMembers.map((member, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg"
                      onMouseEnter={() => setHoveredTeamMember(index)}
                      onMouseLeave={() => setHoveredTeamMember(null)}
                    >
                      <div className="relative overflow-hidden">
                        <div
                          className={`aspect-square bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-500 ${
                            hoveredTeamMember === index ? "scale-110" : "group-hover:scale-105"
                          }`}
                        >
                          <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full " />
                        </div>
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                            hoveredTeamMember === index ? "opacity-100" : "opacity-0"
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
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className={`text-xl font-bold ${hoveredTeamMember === index ? "text-blue-700" : "text-slate-900"}`}>{member.name}</h3>
                          <p className="text-blue-600 font-medium text-sm">{member.position}</p>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                            <span key={skillIndex} className={`px-3 py-1 rounded-full text-xs font-medium ${hoveredTeamMember === index ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}>{skill}</span>
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
              <button onClick={prevTeamMobile} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center text-slate-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextTeamMobile} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center text-slate-700">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop/Tablet: 3-card-per-slide carousel */}
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
                            <div
                              className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                                hoveredTeamMember === globalIndex
                                  ? "shadow-2xl -translate-y-4 scale-105"
                                  : "hover:shadow-xl hover:-translate-y-2"
                              }`}
                            >
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
                              <div className="p-6">
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
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.bio}</p>
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
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop/Tablet Arrows */}
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
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {/* Mobile dots */}
            <div className="md:hidden flex gap-2">
              {teamMembers.map((_, index) => (
                <button key={index} onClick={() => setCurrentTeamMobile(index)} className={`w-2 h-2 rounded-full ${index === currentTeamMobile ? "bg-blue-600 scale-125" : "bg-gray-300"}`} />
              ))}
            </div>
            {/* Desktop/Tablet dots */}
            <div className="hidden md:flex gap-2">
              {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTeamSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTeamSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-blue-400"
                  }`}
                />
              ))}
            </div>
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

      {/* FAQ Section */}
      <section className="py-20 pt-48 bg-white">
        <div className="max-w-8xl  mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Illustration */}
            <div className="relative">
                {/* Vector Illustration */}
               
                  {/* Person with notepad/tablet */}
                  <div className="flex justify-center mb-8">
                    <img
                      src="/images/faqs.jpeg?height=300&width=250"
                      alt="Professional with tablet and notepad"
                      className="w-3/4 h-full object-contain"
                    />
                  </div>

                  
                  {/* Magnifying glass in background */}
                  {/* <div className="absolute bottom-8 left-4 opacity-20">
                    <div className="w-24 h-24 rounded-full border-4 border-blue-300">
                      <div className="absolute -bottom-2 -right-2 w-8 h-1 bg-blue-300 transform rotate-45 rounded-full"></div>
                    </div>
                  </div> */}
               
              
            </div>

            {/* Right Side - FAQ Content */}
            <div className="space-y-8">
              {/* Section Label */}
              <div className="text-xl font-semibold uppercase tracking-wider" style={{ color: "#0070f3" }}>
                FAQ
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl font-bold leading-tight" style={{ color: "#002244" }}>
                Some Question, Answered For You
              </h2>

              {/* FAQ Accordion List */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                    {/* Question */}
                    <button
                      onClick={() => toggleFaq(index)}
                      className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200 ${openFaq === index ? "bg-[#003b8d] text-white" : "bg-white hover:bg-gray-100"}`}
                    >
                      <span className="text-lg font-medium" >
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 ml-4">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                          style={{ backgroundColor: "#002244" }}
                        >
                          {openFaq === index ? (
                            <Minus className="w-4 h-4 text-white" />
                          ) : (
                            <Plus className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Answer */}
                    {openFaq === index && (
                      <div className="px-6 pb-4 ">
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-gray-700 text-base leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Contact Section */}
              <div className="flex items-center space-x-3 pt-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" style={{ color: "#007BFF" }} />
                  </div>
                </div>
                <div className="text-gray-600">
                  <span>If you have more questions </span>
                  <button
                    className="font-bold hover:underline transition-colors duration-200"
                    style={{ color: "#002244" }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company News Section */}
      <section className="py-20" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-base font-semibold uppercase tracking-wider mb-4" style={{ color: "#008bd0" }}>
              Company News
            </div>
            <h2 className="text-5xl font-bold" style={{ color: "#002244" }}>
              OUR LATEST ARTICLES
            </h2>
          </div>

          {/* Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="p-10 relative overflow-hidden">
                {/* Hover overlay rises from bottom to top */}
                <div className="absolute inset-0 bg-[#008bd0] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  {/* Date Section */}
                  <div className="flex items-center w-3/6 space-x-2 mb-4 group-hover:bg-white">
                    <div className="text-gray-400">📅</div>
                    <span className="text-sm text-gray-500">October 28, 2023</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xl font-bold mb-10 leading-tight  text-[#002244] group-hover:text-white" >
                  the transform Community create a lasting impact
                  </h3>

                  {/* Author Section */}
                  <div className="flex items-center space-x-3 mb-12">
                    <img
                      src="/about/value.jpg?height=32&width=32"
                      alt="Admin profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-base text-gray-500 group-hover:text-white">Posted By</span>
                      <span className="text-base font-bold  text-[#002244] group-hover:text-white" >
                        admin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="rounded-b-lg border-t border-gray-100 p-4 flex items-center justify-between transition-colors duration-300 group-hover:bg-[#001736] group-hover:text-white">
                <button className="text-sm font-medium group-hover:text-white hover:underline">
                  Read More
                </button>
                <ArrowRight className="w-4 h-4 group-hover:text-white" />
              </div>
            </div>

            {/* Article 2 */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="p-10 relative overflow-hidden">
                {/* Hover overlay rises from bottom to top */}
                <div className="absolute inset-0 bg-[#008bd0] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  {/* Date Section */}
                  <div className="flex items-center w-3/6 space-x-2 mb-4 group-hover:bg-white">
                    <div className="text-gray-400">📅</div>
                    <span className="text-sm text-gray-500">October 25, 2023</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xl font-bold mb-10 leading-tight  text-[#002244] group-hover:text-white" >
                  the transform Community create a lasting impact
                  </h3>

                  {/* Author Section */}
                  <div className="flex items-center space-x-3 mb-12">
                    <img
                      src="/about/value.jpg?height=32&width=32"
                      alt="Admin profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-base text-gray-500 group-hover:text-white">Posted By</span>
                      <span className="text-base font-bold  text-[#002244] group-hover:text-white">
                        admin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="rounded-b-lg border-t border-gray-100 p-4 flex items-center justify-between transition-colors duration-300 group-hover:bg-[#001736] group-hover:text-white">
                <button className="text-sm font-medium group-hover:text-white hover:underline">
                  Read More
                </button>
                <ArrowRight className="w-4 h-4 group-hover:text-white" />
              </div>
            </div>
            
            

            {/* Article 3 */}
            <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="p-10 relative overflow-hidden">
                {/* Hover overlay rises from bottom to top */}
                <div className="absolute inset-0 bg-[#008bd0] transform translate-y-full  group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  {/* Date Section */}
                  <div className="flex items-center text-center w-3/6 space-x-1 mb-4 group-hover:bg-white">
                    <div className="text-gray-400 ">📅</div>
                    <span className="text-sm text-gray-500 ">October 22, 2023</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xl font-bold mb-10 leading-tight group-hover:text-white text-[#002244]" >
                  the transform Community create a lasting impact
                  </h3>

                  {/* Author Section */}
                  <div className="flex items-center space-x-3 mb-12 ">
                    <img
                      src="/about/value.jpg?height=32&width=32"
                      alt="Admin profile"
                      className="w-8 h-8 rounded-full object-cover "
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-base text-gray-500 group-hover:text-white">Posted By</span>
                      <span className="text-base font-bold text-[#002244] group-hover:text-white" >
                        admin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="rounded-b-lg border-t border-gray-100 p-4 flex items-center justify-between transition-colors duration-300 group-hover:bg-[#001736] group-hover:text-white">
                <button className="text-sm font-medium group-hover:text-white hover:underline">
                  Read More
                </button>
                <ArrowRight className="w-4 h-4 group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <Footer/>

    </div>
  )
}
