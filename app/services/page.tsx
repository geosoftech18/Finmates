"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, MapPin, Phone, Clock, Menu, X } from "lucide-react"
import MagneticCursor from "@/components/MagneticCursor"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FinmatesHeader from "@/components/header2"
import { TestimonialSlider } from "@/components/testimonials/slider"
import { testimonials } from "@/components/testimonials/data"

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("financial-services")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  const services = [
    {
      title: "CFO Services",
      subtitle: "Strategic Financial Leadership On-site & Virtually",
      description:
        "Unlock the expertise of seasoned CFOs to drive strategic decision-making and financial leadership. Whether on-site or virtual, our CFO services optimize cash flow, enhance profitability, and guide your business towards sustainable growth.",
      image: "/services/CFO_Services.jpg",
      link:"/services/cfo-services"
    },
    {
      title: "F&A Outsourcing",
      subtitle: "Efficient Finance and Accounting Solutions",
      description:
        "Efficient Finance and Accounting Solutions Transform your finance and accounting functions with FinMates' F&A outsourcing solutions. From meticulous management of Accounts Payable and Collections to seamless Period Closing and strategic Automation, our experts deliver cost-effective solutions, freeing up your internal team for strategic analysis and decision support.",
      image: "/services/F&A.png",
      link:"/services/F&A-outsourcing"
    },
    {
      title: "Direct tax and regulatory services",
      subtitle: "Expert Guidance for Complex Financial Transactions",
      description:
        "Expert Guidance for Complex Financial Transactions Trust FinMates for expert advisory services that navigate the intricacies of direct and indirect taxes, as well as mergers and acquisitions. Our team provides strategic advice to ensure compliance and success in a dynamic financial landscape.",
      image: "/services/tax.png",
      link:"/services/direct-tax"
    },
    {
      title: "Corporate Fundraising and M&A Advisory",
      subtitle: "Strategic Financial Services",
      description:
        "We provide end-to-end corporate finance solutions, including pitch deck creation, financial modeling, fundraising advisory, debt financing, due diligence, and M&A support, ensuring streamlined processes and optimal outcomes for our clients.",
      image: "/services/Office_of_CFO.jpg",
      link:"/services/M&A-Advisory"
    },
    {
      title: "SME IPO readness support",
      subtitle: "Guidance for Going Public",
      description:
        "Take the leap into the public domain with confidence through FinMates' SME IPO Listing services. Our expert guidance ensures compliance and success in navigating the complexities of going public, propelling your business to the next level.",
      image: "/services/SME_IPO_Listing.jpg",
      link:"/services/SME-IPO"
    },
    {
    title: "Annual Report Preparation",
      subtitle: "Comprehensive Financial Reporting",
      description:
        "We prepare comprehensive annual reports for listed companies, ensuring compliance with SEBI regulations and investor-ready visual layouts.",
        image: "/services/F&A.png",
      link:"services/annual-report-preparation"
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const categories = useMemo(() => {
    const set = new Set<string>()
    testimonials.forEach((t) => t.category && set.add(t.category))
    return ["All", ...Array.from(set)]
  }, [])
  // keep original one-card shift logic; visible cards determined by CSS breakpoints

  const qualityFeatures = {
    consultancy: [
      {
        title: "200% ROI",
        description:
          "Investment without Return is not the real deal. We offer 200% ROI on our services",
        icon: "/services/ROI.png",
      },
      {
        title: "Premium Quality Service",
        description: "Low-Quality Services are a waste of time. We offer premium quality services to bring you desired profits.",
        icon: "/services/primium.png",
      },
      {
        title: "Modern Gadgets",
        description:
          "Manual Tasking hits hard and brings stress. Our Expertise combined with modern gadgets brings you results.",
        icon: "/services/mordengadget.png",
      },
    ],
    "financial-services": [
      {
        title: "Efficient Compensation",
        description:
          "Time is money and we don't take it lightly. We save you time with our expertise and compensate you every second.",
        icon: "/services/compansetion.png",
      },
      {
        title: "Expert Finance Professionals",
        description:
          "We're not random masters who deal with finance. We have a team of experts with decades of experience to assist you.",
        icon: "/services/professional.png",
      },
      {
        title: "Growth Centric",
        description: "We aim for growth and progress to help you become successful.",
        icon: "/services/centrik.png",
      },
    ],
  }

  const processSteps = [
    {
      number: 1,
      title: "Make An Appointment",
      description:
        "Schedule an appointment today for personalized B2B financial services. Transform your business with strategic solutions optimized for your specific needs.",
      icon: "/services/process1.png",
    },
    {
      number: 2,
      title: "Connect with Expert",
      description:
        "Connect with our proficient expert, get customized solutions for your business, and Enhance your financial strategies with us.",
      icon: "/services/process2.png",
    },
    {
      number: 3,
      title: "Figure Out the Solution",
      description: "Get strategic solutions to your complex challenges effortlessly and double your efficiency.",
      icon: "/services/process3.png",
    },
  ]

  const articles = [
    {
      title: "the transform community creaate a lasting impact",
      date: "October 28,2023",
      author: "admin",
      image: "/admin-profile.png",
    },
    {
      title: "the transform community creaate a lasting impact",
      date: "October 28,2023",
      author: "admin",
      image: "/admin-profile.png",
    },
    {
      title: "the transform community creaate a lasting impact",
      date: "October 28,2023",
      author: "admin",
      image: "/admin-profile.png",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <MagneticCursor/>
     <FinmatesHeader/>
      
   
      <main className="mt-20">
        {/* Hero Section */}
        <section className="h-full w-full bg-blue-800">
          <div className="m-auto flex h-full w-full max-w-7xl items-center gap-10 px-6 py-20 max-md:flex-col md:px-10 md:py-20">
            <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
              <div className="flex-col items-center justify-center">
                <h3 className="mb-5 text-center text-lg text-white md:ml-5 md:text-start">Our Expertise</h3>
                <h1 className="w-full text-center text-3xl font-bold text-white md:ml-4 md:w-2/3 md:text-4xl lg:text-5xl">
                  <div>
                    <span className="whitespace-nowrap text-white">Order your finances,</span>
                    <br className="whitespace-normal" />
                    <span className="whitespace-nowrap text-white">Make it Profitable</span>
                  </div>
                </h1>
              </div>
              <p className="mt-10 w-full text-center text-white max-md:text-sm md:ml-20 md:w-1/3 md:text-start">
                Be Strategic about your business finance at every stage of your journey. Our experienced professionals
                can simplify your complex problems with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="h-full w-full">
          <div className="m-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-20 max-md:flex-col md:px-10 md:py-20">
            <h1 className="text-xl font-bold md:ml-4 md:text-3xl lg:text-4xl">Our Services</h1>
            <h2 className="text-center text-2xl font-bold md:ml-4 md:text-3xl lg:text-5xl">Solutions We Provide</h2>
            <p className="w-full text-center text-sm md:w-2/3 md:text-lg">
              Get the right team of experts for managing your finance who've helped a series of brands like yours with
              continuous flow of value.
            </p>
            <div className="h-full w-full">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / ((typeof window !== 'undefined' ? (window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1)) : 1)))}%)`,
                  }}
                >
                  {services.map((service, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <Card className="group relative hover:shadow-lg transition-all duration-300 min-h-[480px] flex flex-col">
                        {/* Gradient animated border on hover starting from top-right and bottom-left */}
                        <div className="pointer-events-none absolute inset-0">
                          {/* Top border (grows from right -> left) */}
                          <div className="absolute top-0 right-0 h-[1px] w-0 bg-gradient-to-l from-[#008bd0] to-[#003b8d] transition-all duration-500 ease-linear group-hover:w-full" />
                          {/* Right border (grows from top -> bottom) */}
                          <div className="absolute top-0 right-0 w-[1px] h-0 bg-gradient-to-b from-[#008bd0] to-[#003b8d] transition-all duration-500 ease-linear group-hover:h-full" />
                          {/* Bottom border (grows from left -> right) */}
                          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#003b8d] to-[#008bd0] transition-all duration-500 ease-linear group-hover:w-full" />
                          {/* Left border (grows from bottom -> top) */}
                          <div className="absolute bottom-0 left-0 w-[1px] h-0 bg-gradient-to-t from-[#003b8d] to-[#008bd0] transition-all duration-500 ease-linear group-hover:h-full" />
                        </div>
                        <div className="h-full w-full overflow-hidden rounded-t-xl items-center">
                          <img
                            className="xl:ml-18 ml-10  object-cover object-center items-center transition-transform duration-300 group-hover:scale-105"
                            alt={service.title}
                            src={service.image || "/placeholder.svg"}
                            height={200}
                            width={200}
                          />
                        </div>
                        <CardContent className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-b-xl bg-white px-5 py-8 text-center flex-grow">
                          <div className="flex flex-col items-center gap-3 flex-grow">
                            <p className="font-bold text-blue-900 md:text-lg">{service.title}</p>
                            <p className="text-xs font-bold text-blue-900 md:text-sm">{service.subtitle}</p>
                            <p className="line-clamp-5 text-sm text-blue-900 flex-grow">{service.description}</p>
                            <a href={service.link}  className="flex items-center gap-5 border border-solid border-blue-600 bg-transparent px-6 py-3 text-lg shadow-none hover:bg-blue-600 text-blue-600 hover:text-white rounded-full">
                              Read More <ArrowRight className="text-2xl" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg hover:bg-gray-50 text-blue-600 p-3"
                  size="icon"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg hover:bg-gray-50 text-blue-600 p-3"
                  size="icon"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-green-500 w-8" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Services Section */}
        <section className="h-full w-full" id="features">
          <div className="mx-auto w-full max-w-8xl px-5 py-16 md:py-24">
            <h2 className="text-center text-3xl md:text-4xl lg:text-5xl">
              Quality Services that bring Higher Profits.
            </h2>
            <p className="mx-auto mb-10 mt-6 max-w-lg text-center text-lg text-neutral-500">
              Investment without Return in not the real deal. We offer 200% ROI on our services
            </p>
            <div>
              <div className="m-auto flex max-w-max flex-wrap items-center justify-center gap-3 rounded-full bg-gray-100 p-1">
                <Button
                  onClick={() => setActiveTab("consultancy")}
                  className={`relative overflow-hidden px-10 py-2 rounded-full ${
                    activeTab === "consultancy"
                      ? "bg-white text-black shadow-sm"
                      : "bg-transparent text-neutral-500 shadow-none "
                  }`}
                >
                  Consultancy
                </Button>
                <Button
                  onClick={() => setActiveTab("financial-services")}
                  className={`relative overflow-hidden px-10 py-2 rounded-full  ${
                    activeTab === "financial-services"
                      ? "bg-white text-black shadow-sm"
                      : "bg-transparent text-neutral-500 shadow-none"
                  }`}
                >
                  Financial Services
                </Button>
              </div>
              <div className="m-auto flex w-full max-w-6xl gap-10 overflow-hidden pb-20 pt-12 max-md:flex-col max-md:items-center sm:px-5 md:gap-7 lg:gap-10">
                {qualityFeatures[activeTab as keyof typeof qualityFeatures].map((feature, index) => (
                  <Card key={index} className="w-full max-w-sm overflow-hidden rounded-xl shadow-lg">
                    <CardContent className="w-full space-y-3 p-8">
                      <img alt={feature.title} width="80" height="60" src={feature.icon || "/placeholder.svg"} />
                      <h3 className="text-xl">{feature.title}</h3>
                      <p className="text-lg text-neutral-500">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <p className="text-center text-neutral-500">
              With decades of experience, we've got a dedicated team to help.
            </p>
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

        {/* Process Section */}
        <section className="h-full w-full">
          <div className="m-auto flex h-full w-full max-w-8xl flex-col items-center justify-center gap-10 px-6 py-20 max-md:flex-col md:px-10 md:py-20">
            <h2 className="text-2xl font-bold md:ml-4 md:text-3xl lg:text-4xl">Our Process</h2>
            <h2 className="text-center text-2xl font-bold md:ml-4 md:text-3xl lg:text-5xl">
              Get Solution to All Your Finance Needs
            </h2>
            <p className="w-full text-center text-sm md:w-2/3 md:text-lg">
              With us, finance is made more simple, strategic and operational. Match the best services for you and we'll
              help.
            </p>
            <div className="flex flex-col items-start justify-between py-4 md:flex-row">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative flex flex-col items-center justify-center">
                  <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-center text-xl font-bold text-white max-md:mt-5 md:mb-5">
                    {step.number}
                  </div>
                  <Card className="group relative flex min-h-[302px] w-full max-w-xs flex-col items-center justify-center gap-5 overflow-hidden rounded-md p-10 text-center shadow-md md:mx-5">
                    <div className="absolute inset-0 bg-blue-900 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></div>
                    <img className="h-10 w-10 relative z-10" alt="" src={step.icon || "/placeholder.svg"} />
                    <h3 className="text-xl font-bold text-blue-900 group-hover:text-white relative z-10 transition-colors duration-300">{step.title}</h3>
                    <p className="text-sm text-blue-900 group-hover:text-white relative z-10 transition-colors duration-300">{step.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="h-full w-full bg-blue-800">
          <div className="m-auto flex h-full w-full max-w-7xl items-start justify-center px-6 py-20 max-md:flex-col md:px-10 md:py-20">
            <div className="w-full md:w-1/2 md:px-10">
              <form className="rounded-md border border-gray-200 bg-white p-10 shadow-lg">
                <div className="mb-4">
                  <Label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-700">
                    Your Name:
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter Your Name"
                    className="w-full rounded-md border border-gray-300 p-2"
                    type="text"
                    name="name"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-700">
                    Your Email:
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter Your Email"
                    className="w-full rounded-md border border-gray-300 p-2"
                    type="email"
                    name="email"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="subject" className="mb-2 block text-sm font-bold text-gray-700">
                    Subject:
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Enter Your Subject"
                    className="w-full rounded-md border border-gray-300 p-2"
                    type="text"
                    name="subject"
                  />
                </div>
                <div className="mb-6">
                  <Label htmlFor="message" className="mb-2 block text-sm font-bold text-gray-700">
                    Your Message(Optional):
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Enter Your Message"
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div className="w-full">
                  <Button
                    type="submit"
                    className="w-full rounded-br-lg rounded-tl-lg bg-blue-800 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
            <div className="mt-20 w-full md:mt-0 md:w-1/2">
              <p className="text-center text-lg font-bold text-white underline decoration-sky-500 underline-offset-8 md:text-start">
                Speak To Us
              </p>
              <p className="my-5 text-center text-2xl font-bold text-white md:text-start md:text-3xl">
                Queries, Feedback, Assistance ?
              </p>
              <p className="mb-8 mt-5 text-center text-base text-white md:text-start">
                We'll help you with our Valuable Conversation <br />
                <br />
                Fill the form below or Directly Reach Us here -{" "}
                <a className="text-white underline" href="mailto:info@finmates.in">
                  info@finmates.in
                </a>{" "}
                and{" "}
                <a className="text-white underline" href="tel:+09833943176">
                  09833943176
                </a>
              </p>
              <div className="my-5">
                <div className="my-3 flex items-center rounded-lg border border-gray-200 p-4">
                  <div className="mr-4 flex items-center justify-center rounded-full bg-blue-600 p-2 text-xl text-white">
                    <MapPin />
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      Finmate Business Solutions Pvt Ltd. Lmt B-715 Jaswanti Allied Business Center, Ramchandra Lane,
                      Kanchpada Malad W , Mumbai - 400064.
                    </p>
                  </div>
                </div>
                <div className="my-3 flex items-center rounded-lg border border-gray-200 p-4">
                  <div className="mr-4 flex items-center justify-center rounded-full bg-blue-600 p-2 text-xl text-white">
                    <Phone />
                  </div>
                  <div>
                    <p className="text-sm text-white">Phone: +09833943176 & Email: info@finmates.in.</p>
                  </div>
                </div>
                <div className="my-3 flex items-center rounded-lg border border-gray-200 p-4">
                  <div className="mr-4 flex items-center justify-center rounded-full bg-blue-600 p-2 text-xl text-white">
                    <Clock />
                  </div>
                  <div>
                    <p className="text-sm text-white">We're 24/7 available to help you.</p>
                  </div>
                </div>
              </div>
              <div className="my-5 flex w-full items-center justify-center py-3 md:w-1/2">
                <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-blue-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
                <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-blue-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </div>
                <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-blue-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </div>
                <div className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-blue-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.224 12.224c-1.78 0-3.22-1.44-3.22-3.22s1.44-3.22 3.22-3.22 3.22 1.44 3.22 3.22-1.44 3.22-3.22 3.22zm0-5.44c-1.22 0-2.22 1-2.22 2.22s1 2.22 2.22 2.22 2.22-1 2.22-2.22-1-2.22-2.22-2.22z" />
                    <path d="M18.004 2.004h-12c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4v-12c0-2.21-1.79-4-4-4zm2 16c0 1.1-.9 2-2 2h-12c-1.1 0-2-.9-2-2v-12c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v12z" />
                    <circle cx="18.5" cy="5.5" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
         {/* Company News Section */}
      <section className="py-20" style={{ backgroundColor: "#f9f9f9" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-base font-semibold uppercase tracking-wider mb-4" style={{ color: "#008bd0" }}>
              Company News
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: "#002244" }}>
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
                    <div className="text-gray-400 pl-1">📅</div>
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
                    <div className="text-gray-400 pl-1">📅</div>
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
                    <div className="text-gray-400 pl-1">📅</div>
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
        {/* <section className="h-full w-full bg-neutral-100">
          <div className="m-auto flex h-full w-full max-w-8xl flex-col items-center justify-center gap-10 px-6 py-20 max-md:flex-col md:px-5 md:py-40">
            <h5 className="text-lg font-bold text-blue-600 md:text-xl lg:text-2xl">Company News</h5>
            <h1 className="text-center text-2xl font-bold md:ml-4 md:text-start md:text-4xl lg:text-5xl">
              OUR LATEST ARTICLES
            </h1>
            <div className="h-full w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                  <Card
                    key={index}
                    className="group relative z-10 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white text-blue-800 shadow hover:bg-blue-900 transition-colors"
                  >
                    <CardContent className="relative flex flex-col gap-14 space-y-3 p-10">
                      <div className="w-full space-y-4">
                        <div className="flex w-max items-center px-2 py-1 text-sm font-bold tracking-tight">
                          <Calendar className="mr-2" />
                          <p className="text-gray-500 group-hover:text-white">{article.date}</p>
                        </div>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-900 group-hover:text-white">
                          {article.title}
                        </h5>
                      </div>
                      <div className="mt-10 flex items-center">
                        <img src={article.image || "/placeholder.svg"} alt="" className="h-10 w-10 rounded-full" />
                        <div className="ml-5 flex flex-col">
                          <p className="text-gray-500 group-hover:text-white">Posted By</p>
                          <p className="text-lg font-semibold text-blue-900 group-hover:text-white">{article.author}</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="flex w-full items-center justify-between border border-gray-200 bg-white px-10 py-4 transition-all duration-200 group-hover:bg-blue-900">
                      <p className="text-blue-900 group-hover:text-white">Read More</p>
                      <ArrowRight className="group-hover:text-white" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer/>
    </div>
  )
}
