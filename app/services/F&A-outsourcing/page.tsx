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
      question: "How does F&A outsourcing benefit my business?",
      answer:
        "F&A outsourcing streamlines financial processes, reduces costs, and allows your internal team to focus on strategic activities, driving overall business growth.",
    },
    {
      question: "What tasks can be outsourced under F&A outsourcing?",
      answer:
        "Tasks such as Accounts Payable, Collections, Journal Entries, Period Closing, and more can be efficiently outsourced to FinMates.",
    },
    {
      question: "Is F&A outsourcing suitable for businesses of all sizes?",
      answer:
        "Yes, our outsourcing solutions are scalable and adaptable to the needs of businesses ranging from startups to large enterprises.",
    },
    {
      question: "How does FinMates ensure data security in outsourcing?",
      answer:
        "We implement robust security measures and adhere to industry standards to safeguard your financial data during the outsourcing process.",
    },
    {
      question: "Can F&A outsourcing accommodate the unique needs of my industry?",
      answer:
        "Absolutely. FinMates understands the nuances of different industries and customizes outsourcing solutions to meet the specific requirements of your business sector.",
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
        className="relative pt-8 h-screen w-screen !bg-cover !bg-no-repeat"
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
            F&A Outsourcing
            </h1>
            <h1 className="w-full text-center text-xl font-bold text-white md:text-start md:text-2xl lg:text-4xl">
            Efficient Finance and Accounting Solutions
            </h1>
            <p className="text-center text-lg text-white md:text-start md:text-xl">
              {/* Expert Guidance for Complex Financial Transactions */}
         
              
              Efficient Finance and Accounting Solutions Transform your finance and accounting functions with FinMates'
               F&A outsourcing solutions. From meticulous management of Accounts Payable and Collections to seamless Period Closing and strategic Automation, our experts deliver cost-effective solutions,
               freeing up your internal team for strategic analysis and decision support.
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
              Ready to Optimize Your Finance and Accounting Functions?
              </h3>
              <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-p-3  lg:ml-4 lg:text-start ">
                <div>
                  <span className="text-p-3">Experience F&A Outsourcing with FinMates</span>
                </div>
              </h2>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-5 ">
            {[
              {
                h1: "Procure-to-Pay",
                h2: "Efficiency Unleashed: FinMates Procure-to-Pay Service",
                h3: "Streamline AP with FinMates Procure-to-Pay: Scan, Process, Pay. Minimize leaks, maximize vendor satisfaction.",
              },
              {
                h1: "Order-to-Cash Solutions",
                h2: "Streamlined Sales Operations: FinMates Order-to-Cash Solutions",
                h3: "Elevate Sales Efficiency with FinMates Order-to-Cash: Consolidate, Automate, Delight Customers.",
              },
              {
                h1: "Record-to-Report Services",
                h2: "Seamless Financial Reporting: FinMates' Expert Solutions",
                h3: "Ensure Financial Integrity with FinMates' Report-to-Report Solutions. Timely Closure, Regulatory Compliance.",
              },
              {
                h1: "Taxation Support Service",
                h2: "Effortless Tax Management: Partner with FinMates for Compliance Excellence",
                h3: "Simplify Tax Compliance with FinMates: Expert Guidance, Streamlined Processes.",
              },
              {
                h1: "Audit Support & Readiness Services",
                h2: "Making Sure You’re Audit Ready When It Counts",
                h3: "Prepare for Audits with Ease: Optimize Efforts with FinMates' Strategic Approach.",
              },
              {
                h1: "Industry Specialized Services",
                h2: "Optimize Operations, Drive Growth with FinMates Industry Accounting",
                h3: "Unlock Growth with FinMates: Specialized Industry Accounting Support.",
              },
            ].map((c, i) => (
              <div key={i} className="card-hover flex w-full flex-col items-center justify-center md:w-96">
                <div className="flex min-h-[250px] w-full flex-col items-start justify-start gap-5 rounded-md border border-solid border-gray-300 p-5 md:mx-5">
                  <h1 className="text-center text-xl font-bold text-p-3 md:text-start">{c.h1}</h1>
                  <h2 className="text-center text-lg text-p-3 md:text-start">{c.h2}</h2>
                  <h3 className="text-center text-base text-p-3 md:text-start">{c.h3}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-full w-full">
        <div className="m-auto flex h-full w-full max-w-full flex-col items-center px-6 py-20 md:px-5 md:py-20">
          <div className="my-10 w-full md:w-2/3">
            <h2 className="mb-5 text-center max-md:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Working Process</h2>
          </div>

          <div className="w-full">
            <WorkingProcessCarousel
              items={[
                {
                  title: "Procure-to-Pay",
                  desc: "Streamline AP with FinMates Procure-to-Pay: Scan, Process, Pay. Minimize leaks, maximize vendor satisfaction.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/6hQyUeOJwXzw8mdQw1ePGB/91a31c4c2c8b6925e14ad31243e540cc/Procure-to-Pay.png",
                },
                {
                  title: "Order-to-Cash Solutions",
                  desc: "Elevate Sales Efficiency with FinMates Order-to-Cash: Consolidate, Automate, Delight Customers.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/1U9DndBJ8pHQjEoPzvXj4L/6fa0a12a5bfc851cd0d3e7ed8b177a8d/Order-to-Cash.png",
                },
                {
                  title: "Record-to-Report Services",
                  desc: "Ensure Financial Integrity with FinMates' Report-to-Report Solutions. Timely Closure, Regulatory Compliance.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/5C2vdV9lCnpUQH8sX1WjGj/7b77c27f22fd36c51e91f0d47f7af6c4/Record-to-Report.png",
                },
                {
                  title: "Taxation Support Service",
                  desc: "Simplify Tax Compliance with FinMates: Expert Guidance, Streamlined Processes.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/2RbkE8d7rXt0vldmqRxJZg/5c0fba11afbd72c573b8c7c9b5b6cbf1/Taxation-Support.png",
                },
                {
                  title: "Audit Support & Readiness Services",
                  desc: "Prepare for Audits with Ease: Optimize Efforts with FinMates' Strategic Approach.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/2kVxPCJztlRt9G9YbkpN0y/0d4ccfb303b9ff02c119b6fd0d713e23/Audit-Support.png",
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
              Have Questions? Explore our FAQs or Reach Out to Our Experts.
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
