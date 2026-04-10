import type { Metadata } from "next"
import WorkingProcessCarousel from "@/components/working-process-carousel"
import { HelpCircle } from "lucide-react"
import MagneticCursor from "@/components/MagneticCursor"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FinmatesHeader from "@/components/header2"
import ServiceFaqAccordion from "@/components/services/ServiceFaqAccordion"
import QuickContactCTA from "@/components/home/quick-contact-cta"

export const metadata: Metadata = {
  title: "F&A Outsourcing & Accounting Services for Businesses | FinMates",
  description:
    "F&A outsourcing and accounting services that streamline bookkeeping, payables and reporting. Reduce costs, improve accuracy and free internal teams. Learn more about outsourcing with FinMates.",
}

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
            <h1 className="w-full text-center xl:text-5xl font-bold text-white md:text-start text-3xl lg:text-5xl">
            F&A Outsourcing for Growing Businesses
            </h1>
            <h2 className="w-full text-center text-xl font-bold text-white md:text-start md:text-2xl lg:text-3xl">
            Streamline finance operations and improve reporting clarity
            </h2>
            <p className="text-center text-lg text-white md:text-start md:text-xl">
              Move from fragmented accounting tasks to a reliable, process-driven finance function. We help you reduce
              operational load, improve controls, and create decision-ready financial data for business growth.
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
              Result-Based F&A Outsourcing Framework
              </h3>
              <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-p-3  lg:ml-4 lg:text-start ">
                <div>
                  <span className="text-p-3">From Process Gaps to Financial Control in 30-60 Days</span>
                </div>
              </h2>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-5 ">
            {[
              {
                h1: "Who is this for?",
                h2: "Businesses facing finance process bottlenecks",
                h3: "Startups and SMEs with delayed closures, scattered accounting workflows, or overloaded internal teams.",
              },
              {
                h1: "What we do",
                h2: "End-to-end F&A execution",
                h3: "Procure-to-pay, order-to-cash, record-to-report, reconciliations, monthly close, and reporting governance.",
              },
              {
                h1: "Results you get",
                h2: "Control, speed, and reliability",
                h3: "Faster month-end closure, cleaner books, stronger compliance readiness, and higher management confidence.",
              },
              {
                h1: "Timeline",
                h2: "30-60 days structured setup",
                h3: "We onboard and stabilize your finance operations in phases without disrupting day-to-day execution.",
              },
              {
                h1: "Compliance and audit support",
                h2: "Always audit-ready",
                h3: "Build documentation discipline, process controls, and reporting consistency to reduce compliance risk.",
              },
              {
                h1: "Scalable finance backbone",
                h2: "Built for growth stages",
                h3: "Create a finance system that scales as transaction volumes, team size, and reporting complexity increase.",
              },
            ].map((c, i) => (
              <div key={i} className="card-hover flex w-full flex-col items-center justify-center md:w-96">
                <div className="flex min-h-[250px] w-full flex-col items-start justify-start gap-5 rounded-md border border-solid border-gray-300 p-5 md:mx-5">
                  <h2 className="text-center text-xl font-bold text-p-3 md:text-start">{c.h1}</h2>
                  <h3 className="text-center text-lg text-p-3 md:text-start">{c.h2}</h3>
                  <p className="text-center text-base text-p-3 md:text-start">{c.h3}</p>
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
              <ServiceFaqAccordion faqs={faqs} />

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


      <QuickContactCTA  />

   <Footer/>

      
    </main>
  )
}
