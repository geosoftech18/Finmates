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
      question: "How does strategic governance benefit my business?",
      answer:
        "Strategic governance ensures that financial strategies align with broader business goals, contributing to long-term sustainability."
    },
    {
      question: "Can FinMates assist in fundraising for startups?",
      answer:
        "Absolutely. Our Office of CFO provides guidance in creating compelling business plans and navigating fundraising efforts, making it suitable for startups and established businesses."
    },
    {
      question: "What operational areas does FinMates assist in?",
      answer:
        "We actively assist in various operational aspects, including process improvement, deal assistance, and day-to-day business decision support."
    },
    {
      question: "How are customized solutions crafted under the Office of CFO?",
      answer:
        "Customized solutions are crafted based on a thorough needs assessment, ensuring that each solution aligns with the unique requirements of your business."
    },
    {
      question: "What ongoing support is provided after the implementation phase?",
      answer:
        "We offer continuous support, regularly reviewing and refining solutions to adapt to changing market dynamics and ensure sustained operational excellence."
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
            <h1 className="w-full text-center xl:text-6xl font-bold text-white md:text-start text-4xl lg:text-5xl">
            Corporate Fundraising and M&A Advisory
            </h1>
            <h1 className="w-full text-center text-xl font-bold text-white md:text-start md:text-2xl lg:text-4xl">
            Corporate Finance Solutions
            </h1>
            <p className="text-center text-lg text-white md:text-start md:text-xl">
              {/* Expert Guidance for Complex Financial Transactions */}
         
              
            We provide end-to-end corporate finance solutions, including pitch deck creation,
             financial modeling, fundraising advisory, debt financing, due diligence, and M&A support,
             ensuring streamlined processes and optimal outcomes for our clients.
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
              Corporate Finance Solutions
              </h3>
              <h2 className="text-center text-3xl font-bold text-p-3 md:text-3xl lg:ml-4 lg:text-start lg:text-4xl">
                <div>
                  <span className="text-p-3">Corporate Solutions and M&A Advisory</span>
                </div>
              </h2>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-5 lg:justify-start">
            {[
              {
                h1: "Pitch deck, Investment teaser",
                h2: "Pitch Deck & Investment Teaser Creation",
                h3: "Crafting professional pitch decks and concise investment teasers to attract potential investors by highlighting key business aspects and unique selling points."
              },
              {
                h1: "Financials Model",
                h2: "Financial Modeling Services",
                h3: "Creating customized financial models to aid in strategic planning, key decision-making, and understanding crucial business margins for effective management."
              },
              {
                h1: "Fund raising — Venture capital and private equity.",
                h2: "Fundraising Advisory - Venture Capital and Private Equity",
                h3: "Providing detailed company profiling, deal valuation, negotiation support, and preparation of investment memoranda to access growth capital from private equity, venture capital, and high net worth individuals.",
              },
              {
                h1: "Debt financing and debt restructuring.",
                h2: "Debt Financing and Restructuring Solution",
                h3: "Advising on debt-raising matters, designing debt and security structures, and offering debt restructuring solutions to alleviate financial burdens and ensure business profitability."
              },
              {
                h1: "Due Diligence.",
                h2: "Due Diligence Assistance",
                h3: "Conducting thorough due diligence for investors and vendors across the transaction cycle, simplifying the process, and identifying potential issues to facilitate smooth and fruitful transaction processes.",
              },
              {
                h1: "Mergers & Acquisitions",
                h2: "Mergers & Acquisitions (M&A) Support",
                h3: "From inception to integration, we oversee all aspects of M&A transactions, including target identification, negotiation, due diligence, and structuring, ensuring project objectives are met seamlessly.",
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
                  title: "Comprehensive Due Diligence Support",
                  desc: "Streamline due diligence processes for investors and vendors, identifying potential issues and facilitating smooth transactions across the cycle.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/JMDycRqpAqYL3VZVwwpEj/69bd7de29ae7651b2cdc3eb0aa18d15a/Deal_Assistance.png"
                },
                {
                  title: "M&A Facilitation Services",
                  desc: "Guide M&A processes from ideation to post-acquisition integration, encompassing target identification, negotiation, due diligence, and structuring, to ensure project objectives are met and integration processes are seamless.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/5k4yypwCed3pCenzgkWYq4/03c61dd839e571f0975b611ff47cc4dc/Automation_Integration.png",
                },
                {
                  title: "Pitch Deck & Investment Teaser Creation",
                  desc: "Crafting compelling pitch decks and concise investment teasers to showcase key business aspects and attract potential investors.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/77J4RnOj3CgwASKuSsw53N/19df2aadcd89b2c83e52a974bd070ed1/CFO_Services.jpg"
                },
                {
                  title: "Financial Modeling Services",
                  desc: "Building tailored financial models to support planning, decision-making, and business margin analysis for effective management",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/3sf52Bhc7niv7vRhYmdsCa/7ad61e92248f55f5602e45f548948410/Business_Plans_and_Fundraising.png"
                },
                {
                  title: "Fundraising Advisory – Venture Capital and Private Equity",
                  desc: "Providing company profiling, deal valuation, negotiation support, and investment memorandum preparation to help businesses raise growth capital from venture capital, private equity, and high-net-worth individuals.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/6GNhiP0vHQqyWwm2nxhdIh/3b419e4e3e40bbfbf16b50c6b5c7e524/Direct___Indirect_Tax__M_A_Advisory.jpg"
                },
                {
                  title: "Debt Financing & Restructuring Solutions",
                  desc: "Advising on debt raising, designing debt and security structures, and offering restructuring solutions to reduce burdens and enhance profitability.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/6wQi5jkJJCo2WGlNYx6Pxa/94a49538a9c83a98f4a73f0b0e18689c/Automation_Digital_Transformation_of_Process__Future-Ready_Finance_Solutions.jpg"
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* <section className="h-full w-full bg-neutral-50">
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
      </section> */}

       {/* FAQ Section */}
       <section className="py-20 pt-48 bg-white">
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
                      className="w-full h-full object-contain"
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
              Have Questions? Explore our FAQs or Reach Out to Our Financial Experts.
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
