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
      question: "How can SME IPO Listing benefit my business?",
      answer:
        "SME IPO Listing opens avenues for capital infusion, enhances visibility, and provides liquidity, contributing to the overall growth and success of your business."
    },
    {
      question: "What is the regulatory process involved in SME IPO Listing?",
      answer:
        "Our experts guide you through the regulatory process, ensuring compliance with listing requirements and regulations specific to SMEs."
    },
    {
      question: "How long does the SME IPO Listing process take?",
      answer:
        "The duration varies, but our services include meticulous planning to expedite the process while ensuring all regulatory requirements are met."
    },
    {
      question: "What documentation is required for SME IPO Listing?",
      answer:
        "Our team assists in preparing comprehensive documentation, including financial statements, prospectus, and other essential documents required for the listing."
    },
    {
      question: "How does FinMates support post-IPO transition?",
      answer:
        "Post-IPO support includes investor relations management, compliance assistance, and ongoing support to facilitate a smooth transition into the public domain."
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
            <h1 className="w-full text-center xl:text-6xl font-bold text-white md:text-start text-4xl lg:text-6xl">
            SME IPO Listing
            </h1>
            <h1 className="w-full text-center text-xl font-bold text-white md:text-start md:text-2xl lg:text-4xl">
            Guidance for Going Public
            </h1>
            <p className="text-center text-lg text-white md:text-start md:text-xl">
              {/* Expert Guidance for Complex Financial Transactions */}
         
              
              Take the leap into the public domain with confidence through
               FinMates' SME IPO Listing services. Our expert guidance 
               ensures compliance and success in navigating the complexities of going public, propelling your business to the next level.
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
              Ready to Go Public with Confidence?
              </h3>
              <h2 className="text-center text-3xl font-bold text-p-3 md:text-3xl lg:ml-4 lg:text-start lg:text-4xl">
                <div>
                  <span className="text-p-3">Explore SME IPO Listing with FinMates</span>
                </div>
              </h2>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-5 lg:justify-start">
            {[
              {
                h1: "Pre-IPO Support / Fundraising",
                h2: "Streamline Your Path to Capital Market Listing with FinMates",
                h3: "Expert Guidance for SME IPOs and Listing Processes",
              },
              {
                h1: "Investor Relations",
                h2: "Seamless Execution of Capital Market Listings with FinMates",
                h3: "Efficient Coordination and Strategic Planning for Your Listing Journey"
              },
              {
                h1: "Systems and Controls Optimization",
                h2: "Enhancing Financial Reporting with FinMates",
                h3: "Optimize Profitability and Efficiency Through Advanced Analytics and Automation",
              },
              {
                h1: "Establish Corporate Governance",
                h2: "Empowering Governance and Risk Management with FinMates",
                h3: "Comprehensive Support for Enhanced Compliance and Strategic Decision-Making",
              },
              {
                h1: "Post-IPO",
                h2: "Ensuring Post-IPO Compliance with FinMates",
                h3: "Effortless Management of Regulatory Obligations and Reporting Requirements",
              },
              {
                h1: "Next step",
                h2: "Elevate Your Listing to NSE/BSE Mainboard with FinMates",
                h3: "Seamless Transition and Strategic Capital Expansion Support"
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
            <h2 className="mb-5 text-center max-md:text-3xl lg:text-5xl">Working Process</h2>
          </div>

          <div className="w-full">
            <WorkingProcessCarousel
              items={[
                {
                  title: "Comprehensive IPO Advisory",
                  desc: "Benefit from comprehensive advisory services tailored for SMEs looking to go public. Our experts guide you through the entire IPO process, from preparation to listing and beyond. ",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/hfPgt2AJLSSVS3rS4sGn5/76bf59280f214ad4edd4e6c0717a9fad/Comprehensive_IPO_Advisory.png",
                },
                {
                  title: "Regulatory Compliance Assurance",
                  desc: "Ensure seamless compliance with regulatory requirements throughout the IPO journey. Our team stays abreast of changing regulations, providing assurance and minimizing risks.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/3ZTrzDp6XEySl4CKlSVEz1/c91acdefc3943558c1e7e853afd90528/Regulatory_Compliance_Assurance.png"
                },
                {
                  title: "Strategic Planning for IPO Success",
                  desc: "Craft a strategic plan that aligns with your business goals. Our SME IPO Listing services include in-depth planning to maximize success and capitalize on the opportunities presented by going public.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/5VsZRVhCUJrInwwz8JneS/44e9335aa3099501b5d3cfb4a38d1879/Strategic_Planning_for_IPO_Success.png"
                },
                {
                  title: "Documentation and Due Diligence Support",
                  desc: "Navigate the intricate documentation and due diligence processes with our expert support. We assist in preparing accurate and comprehensive documents essential for a successful IPO.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/7hIUhi5E7DnJetSKmMxcia/a091b7bd21d05ad92b40fe6301ff7df0/Documentation_and_Due_Diligence_Support.png"
                },
                {
                  title: "Investor Communication and Roadshows",
                  desc: "Engage effectively with investors through strategic communication. Our services include investor relations support and roadshows to build confidence and attract potential investors.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/4DNLWJapKg6i2Y9RR2NGp/b56a1489f95c92c598cc9dee7a75f60e/Investor_Communication_and_Roadshows.png",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="h-full w-full bg-neutral-50">
        <div className="m-auto flex h-full w-full max-w-8xl items-center gap-10 px-6 py-20 max-md:flex-col md:px-10 md:py-20">
          <div className="flex w-full flex-wrap items-center justify-center rounded-2xl bg-white p-2 shadow-xl md:w-1/3">
            <div
              className="flex w-1/2 items-center justify-evenly rounded-2xl border-0 py-10 aria-checked:shadow-card md:w-1/2"
              aria-checked="true"
            >
              <img
                src="https://images.ctfassets.net/787ztwmlvqd6/4ZWU7rthD8ZtCqV6WhRqRs/62ff94896f5a9ad5cf8cebf51d9c97eb/image.png"
                className="w-full object-contain"
                style={{ height: 40, width: 100 }}
                alt="Client Logo"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="h-full w-full">
              <div>
                <div className="h-full w-full space-y-10">
                  <div className="space-y-5">
                    <p className="md:!text-lg">
                      Thanks to FinMates' SME IPO Listing services, we confidently took the leap into the public domain.
                      Their expert guidance ensured compliance and success throughout the process, propelling our
                      business to new heights. Exceptional service!
                    </p>
                    <p className="md:!text-lg">
                      <em>Bodhitree Multmedia Limited</em>
                    </p>
                  </div>

                  <div className="flex w-full items-center gap-5">
                    <img
                      width={48}
                      height={48}
                      className="h-12 w-12 overflow-hidden rounded-full object-cover object-center"
                      src="https://images.ctfassets.net/787ztwmlvqd6/4YYF82Qm2WipKaV02T9fR/6f294771bfd0af91daf8d7e2a3b9e660/man.png"
                      alt="Avatar"
                    />
                    <div className="space-y-2">
                      <h4 className="font-medium italic">Mautik Tolia</h4>
                      <p className="text-sm">MD</p>
                    </div>
                  </div>

                  <div className="border-1 mr-10 flex items-center gap-3 pt-5 md:mr-0">
                    <button className="rounded-full bg-p-2 p-4">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="text-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                      </svg>
                    </button>
                    <button className="rounded-full bg-p-2 p-4">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="text-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
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
                      height={200}
                      width={250}
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
              Have Questions? Explore our FAQs or Reach Out to Our SME IPO Listing Experts.
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
