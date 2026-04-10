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
  title: "CFO Services & Virtual CFO for SMEs in India | FinMates",
  description:
    "CFO services and virtual CFO support for SMEs in India. Improve financial planning, budgeting, cash flow and reporting with experts. Contact us to strengthen your finance function.",
}

const faqs = [
    {
      question: "What is the difference between on-site and virtual CFO services?",
      answer:
        "On-site CFOs work directly within your organization, while virtual CFOs provide expertise remotely through digital collaboration.",
    },
    {
      question: "How do CFOs optimize cash flow?",
      answer:
        "CFOs optimize cash flow through proactive management, identifying liquidity opportunities, and implementing strategies for financial stability.",
    },
    {
      question: "Can CFO services benefit businesses of all sizes?",
      answer:
        "Absolutely. Our CFO services are scalable and adaptable, catering to the unique financial needs of businesses, whether small, medium, or large.",
    },
    {
      question: "What is the duration of a strategic planning session?",
      answer:
        "The duration varies based on business complexity. Our goal is to ensure a comprehensive understanding of your financial landscape during the session.",
    },
    {
      question: "How does FinMates ensure confidentiality in virtual CFO services?",
      answer:
        "We implement robust security measures and adhere to strict confidentiality protocols to safeguard your financial information during virtual collaborations.",
    },
  ]

export default function Page() {
  return (
    <main>
      <MagneticCursor/>
      <FinmatesHeader/>

      <section
        className="relative h-screen w-screen !bg-cover !bg-no-repeat pt-16"
        style={{
          background:
            'linear-gradient(to right, rgb(17, 24, 39), rgba(12, 98, 197, 0.3)), url("https://images.ctfassets.net/787ztwmlvqd6/A8gYZuZpaevEwYOxtNza9/d9e36e16fd127391179015450269ab9e/WhatsApp_Image_2024-01-19_at_11.30.39.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative m-auto flex h-full w-full max-w-8xl items-center justify-center gap-10 px-6 py-28 max-md:flex-col md:px-10 md:py-20">
          <div className="top-50 absolute -left-30 z-0 h-110 w-110 rounded-full bg-blue-900"></div>
          <div className="relative z-10 w-full max-w-5xl space-y-5 md:space-y-8">
            <h1 className="w-full text-center xl:text-5xl font-bold text-white md:text-start text-3xl lg:text-5xl">
            Virtual CFO Services for Growing Businesses
            </h1>
            <h2 className="w-full text-center text-xl font-bold text-white md:text-start md:text-2xl lg:text-3xl">
            Build finance clarity, control cash, and scale with confidence
            </h2>
            <p className="text-center text-lg text-white md:text-start md:text-xl">
              We help founders and leadership teams move from reactive accounting to strategic financial management.
              Get a structured finance system, actionable MIS, and investor-ready reporting in a focused implementation
              window.
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
                Result-Based Virtual CFO Framework
              </h3>
              <h2 className="md:text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-p-3  lg:ml-4 lg:text-start ">
                <div>
                  <span className="text-p-3">From Financial Chaos to Clarity in 30-60 Days</span>
                </div>
              </h2>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-5 lg:justify-start">
            {[
              {
                h1: "Who is this for?",
                h2: "Founders and teams that need financial clarity",
                h3: "Startups raising funds, SMEs scaling operations, and businesses that need better control over numbers, margins, and decisions.",
              },
              {
                h1: "What we do",
                h2: "Core Virtual CFO execution",
                h3: "Financial planning, cash flow forecasting, budgeting, MIS reporting, monthly review rhythms, and leadership-level financial guidance.",
              },
              {
                h1: "Results you get",
                h2: "Clear outcomes, not just reports",
                h3: "Better cash control, stronger profitability decisions, faster management visibility, and improved investor readiness.",
              },
              {
                h1: "Timeline",
                h2: "30-60 days implementation",
                h3: "We set up your structured finance management system in phases so your team can execute confidently without disrupting operations.",
              },
              {
                h1: "Strategic support",
                h2: "Decision support for founders",
                h3: "Get support on growth planning, pricing decisions, cost optimization, and board/investor updates with practical financial insights.",
              },
              {
                h1: "Compliance and governance",
                h2: "Stay compliant while scaling",
                h3: "Build robust internal controls, reporting discipline, and compliance readiness as your business grows in complexity.",
              },
            ].map((c, i) => (
              <div key={i} className="card-hover flex w-full flex-col items-center justify-center md:w-96">
                <div className="flex min-h-[250px] w-full flex-col items-start justify-start gap-5 rounded-md border border-solid border-gray-300 p-5 md:mx-5">
                  <h2 className="text-center text-lg font-bold text-p-3 md:text-start">{c.h1}</h2>
                  <h3 className="text-center text-base text-p-3 md:text-start">{c.h2}</h3>
                  <p className="text-center text-sm text-p-3 md:text-start">{c.h3}</p>
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
                  title: "On-site Integration",
                  desc: "For on-site CFO services, our experts seamlessly integrate into your organization. This ensures a hands-on approach, fostering a deep understanding of your business dynamics and challenges.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/2JNDfxLvjEDv8PdeGHWpHp/495c9a64bcd0eb83d12adc8d01d4758f/On-site_Integration.png",
                },
                {
                  title: "Virtual Collaboration Excellence",
                  desc: "Virtual CFO services are facilitated through advanced digital collaboration tools. Our virtual CFOs maintain the same level of dedication and strategic insight, providing expert financial leadership remotely.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/76kHa28Zay2puSVnE9SjDa/e01a2a4096e1ec7f9d2a9dc053511fa8/Virtual_Collaboration_Excellence.png",
                },
                {
                  title: "Strategic Planning Session",
                  desc: "A strategic planning session is conducted to align financial objectives with broader business goals. This session serves as the foundation for developing comprehensive strategies for cash flow optimization and profitability enhancement.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/12ekMe75CifjdTIIVxMLgb/75544497a0891d6566a4c171a5ac320b/Strategic_Planning_Session.png",
                },
                {
                  title: "Implementation of Financial Strategies",
                  desc: "Our seasoned CFOs actively participate in the implementation of financial strategies. Whether it's optimizing cash flow cycles, enhancing profitability, or guiding strategic decisions, we ensure the practical application of financial plans.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/2KdsqtDnmh34VBLqtov3Q3/3e6a56641b43efac5434b55b0e38b5f0/Implementation_of_Financial_Strategies.png",
                },
                {
                  title: "Continuous Monitoring and Feedback",
                  desc: "We implement a robust monitoring system to continuously assess the effectiveness of financial strategies. Regular feedback loops and performance evaluations ensure ongoing alignment with your business objectives.",
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold leading-tight" style={{ color: "#002244" }}>
              Have Questions? Explore our FAQs or Reach Out to Our CFO Experts.
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
