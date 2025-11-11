"use client"
import WorkingProcessCarousel from "@/components/working-process-carousel"
import { useState } from "react"

import { Minus , Plus, HelpCircle } from "lucide-react"
import MagneticCursor from "@/components/MagneticCursor"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FinmatesHeader from "@/components/header2"


const faqs = [
    {
      question: "What is included in an annual report for listed companies?",
      answer:
        "An annual report for listed companies includes corporate profile, MD's message, strategic overview, industry review, audited financials, governance reports, AGM notices, disclosures in SEBI format, and ESG/CSR sections with investor-ready visual layouts.",
    },
    {
      question: "How long does it take to prepare an annual report?",
      answer:
        "The timeline varies based on company size and complexity, typically ranging from 4-8 weeks. We work closely with your team to ensure timely delivery while maintaining the highest standards of accuracy and compliance.",
    },
    {
      question: "Do you ensure compliance with SEBI regulations?",
      answer:
        "Absolutely. Our team stays updated with the latest SEBI regulations and ensures all disclosures, formats, and requirements are met. We ensure your annual report is fully compliant with current regulatory standards.",
    },
    {
      question: "Can you customize the visual design of the annual report?",
      answer:
        "Yes, we create investor-ready visual layouts that are both compliant and visually appealing. Our designs balance professional presentation with regulatory requirements, ensuring your annual report stands out while meeting all standards.",
    },
    {
      question: "What is the difference between annual report and financial statements?",
      answer:
        "Financial statements are the core accounting documents (balance sheet, P&L, cash flow), while the annual report is a comprehensive document that includes financial statements along with management commentary, corporate governance, strategy, and other disclosures required for listed companies.",
    },
  ]

export default function Page() {

    const [openFaq, setOpenFaq] = useState<number | null>(null)

const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <main>
      <MagneticCursor/>
      <FinmatesHeader/>

      <section
        className="relative h-screen w-screen !bg-cover !bg-no-repeat"
        style={{
          background:
            'linear-gradient(to right, rgb(17, 24, 39), rgba(12, 98, 197, 0.3)), url("https://images.ctfassets.net/787ztwmlvqd6/A8gYZuZpaevEwYOxtNza9/d9e36e16fd127391179015450269ab9e/WhatsApp_Image_2024-01-19_at_11.30.39.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative m-auto flex h-full w-full max-w-8xl items-center justify-center gap-10 px-6 py-20 max-md:flex-col md:px-10 md:py-20">
          <div className="top-50 absolute -left-30 z-0 h-110 w-110 rounded-full bg-blue-900"></div>
          <div className="relative z-10 w-full max-w-5xl space-y-5 md:space-y-8">
            <h1 className="w-full text-center xl:text-7xl font-bold text-white md:text-start text-4xl lg:text-6xl">
            Annual Report Preparation
            </h1>
            <h1 className="w-full text-center text-xl font-bold text-white md:text-start md:text-2xl lg:text-4xl">
            for Listed Companies
            </h1>
            <p className="text-center text-lg text-white md:text-start md:text-xl">
              Where Compliance Meets Communication. We deliver comprehensive annual reports that combine regulatory compliance with strategic communication, ensuring your company's story is told effectively while meeting all SEBI and governance requirements.
            </p>
            <div className="flex justify-center md:items-center md:justify-start">
              <button className="rounded-md bg-[#008bd0] px-8 py-4 font-bold text-white">Lets Connect</button>
            </div>
          </div>
        </div>
      </section>

      <section className="h-full w-full">
        <div className="m-auto flex h-full w-full max-w-7xl flex-col items-center px-6 py-20 max-md:flex-col md:px-10 md:py-20">
          <div className="flex w-full flex-col lg:flex-row lg:justify-between">
            <div className="w-full flex-col items-center justify-center">
              <h3 className="mb-5 text-center text-lg text-p-3 md:ml-5 lg:text-start">
                Ready for Professional Annual Report Preparation?
              </h3>
              <h2 className="md:text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-p-3  lg:ml-4 lg:text-start ">
                <div>
                  <span className="text-p-3">Comprehensive Annual Report Services for Listed Companies</span>
                </div>
              </h2>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-5 lg:justify-start">
            {[
              {
                h1: "Corporate Profile, MD's Message & Strategy",
                h2: "Strategic Communication & Leadership Narrative",
                h3: "We craft compelling corporate profiles and MD's messages that effectively communicate your company's vision, achievements, and strategic direction. Our team ensures your leadership narrative aligns with investor expectations and regulatory requirements.",
              },
              {
                h1: "Industry Review, Audited Financials, Governance Reports",
                h2: "Comprehensive Financial & Governance Documentation",
                h3: "Our annual reports include detailed industry analysis, complete audited financial statements, and comprehensive governance reports. We ensure all financial data is accurately presented and governance practices are clearly documented.",
              },
              {
                h1: "AGM Notices, Disclosures & SEBI Format",
                h2: "Regulatory Compliance & Timely Disclosures",
                h3: "We prepare AGM notices and all required disclosures in strict adherence to SEBI format and regulations. Our team ensures timely compliance with all regulatory requirements, keeping your company ahead of disclosure obligations.",
              },
              {
                h1: "ESG, CSR & Investor-Ready Visual Layouts",
                h2: "Modern Reporting with Visual Excellence",
                h3: "We integrate ESG and CSR reporting with investor-ready visual layouts that make your annual report both informative and visually appealing. Our designs ensure professional presentation while maintaining regulatory compliance.",
              },
            ].map((c, i) => (
              <div key={i} className="card-hover flex w-full flex-col items-center justify-center md:w-96">
                <div className="flex min-h-[250px] w-full flex-col items-start justify-start gap-5 rounded-md border border-solid border-gray-300 p-5 md:mx-5">
                  <h1 className="text-center text-lg font-bold text-p-3 md:text-start">{c.h1}</h1>
                  <h2 className="text-center text-base text-p-3 md:text-start">{c.h2}</h2>
                  <h3 className="text-center text-sm text-p-3 md:text-start">{c.h3}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-full w-full">
        <div className="m-auto flex h-full w-full max-w-full flex-col items-center px-6 py-20 md:px-5 md:py-20">
          <div className="my-10 w-full md:w-2/3">
            <h2 className="mb-5 text-center max-md:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Working Process</h2>
          </div>

          <div className="w-full">
            <WorkingProcessCarousel
              items={[
                {
                  title: "Initial Consultation & Requirements Gathering",
                  desc: "We begin with a comprehensive consultation to understand your company's specific needs, regulatory requirements, and communication objectives. This ensures we capture all necessary information for your annual report.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/2JNDfxLvjEDv8PdeGHWpHp/495c9a64bcd0eb83d12adc8d01d4758f/On-site_Integration.png",
                },
                {
                  title: "Content Development & Financial Data Compilation",
                  desc: "Our team works closely with your finance and management teams to compile audited financials, develop corporate narratives, and create strategic content that accurately represents your company's performance and vision.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/76kHa28Zay2puSVnE9SjDa/e01a2a4096e1ec7f9d2a9dc053511fa8/Virtual_Collaboration_Excellence.png",
                },
                {
                  title: "Design & Visual Layout Development",
                  desc: "We create investor-ready visual layouts that balance professional design with regulatory compliance. Our designs ensure readability, visual appeal, and adherence to SEBI formatting requirements.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/12ekMe75CifjdTIIVxMLgb/75544497a0891d6566a4c171a5ac320b/Strategic_Planning_Session.png",
                },
                {
                  title: "Compliance Review & SEBI Format Verification",
                  desc: "Our compliance experts thoroughly review all sections to ensure adherence to SEBI regulations, verify disclosure formats, and confirm that all required sections are complete and properly formatted.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/2KdsqtDnmh34VBLqtov3Q3/3e6a56641b43efac5434b55b0e38b5f0/Implementation_of_Financial_Strategies.png",
                },
                {
                  title: "Final Review, Approval & Delivery",
                  desc: "We conduct a final comprehensive review with your team, incorporate feedback, and ensure all approvals are obtained before delivering the completed annual report ready for printing and distribution to stakeholders.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/CiWSNzjD54hOLmCfnfHG7/cb1e11a49eb6295113f4ea56d0d27be3/Continuous_Monitoring_and_Feedback.png",
                },
              ]}
            />
          </div>
        </div>
      </section>

       {/* FAQ Section */}
       <section className="md:py-20 md:pt-48 bg-white">
        <div className="max-w-7xl  mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Illustration */}
            <div className="relative">
                {/* Vector Illustration */}
               
                  {/* Person with notepad/tablet */}
                  <div className="flex justify-center md:mb-8">
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
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: "#002244" }}>
              Have Questions? Explore our FAQs or Reach Out to Our Annual Report Experts.
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

      <Footer/>
      
    </main>
  )
}

