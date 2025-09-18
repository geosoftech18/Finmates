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
      question: "How can direct tax planning benefit my business?",
      answer:
        "Direct tax planning optimizes your tax liabilities, ensuring compliance with regulations while maximizing tax benefits for long-term financial success.",
    },
    {
      question: "What is the significance of strategic financial planning in mergers and acquisitions?",
      answer:
        "Strategic financial planning ensures a seamless transition in mergers and acquisitions, aligning financial structures and goals for sustained success.",
    },
    {
      question: "How does FinMates assist in indirect tax compliance management?",
      answer:
        "Our experts provide ongoing support in preparing and filing tax returns, ensuring adherence to regulations and minimizing risks associated with indirect taxes.",
    },
    {
      question: "What is involved in M&A due diligence?",
      answer:
        "M&A due diligence involves a thorough analysis of financial data, risk assessments, and strategic advice to facilitate successful transactions.",
    },
    {
      question: "How can businesses stay updated on evolving tax regulations?",
      answer:
        "Our advisory services include comprehensive tax compliance management, keeping businesses informed and ahead of evolving tax regulations.",
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
            <h1 className="w-full text-center xl:text-6xl font-bold text-white md:text-start  text-4xl lg:text-6xl">
              Direct &amp; Indirect Tax, M&amp;A Advisory
            </h1>
            <h1 className="w-full text-center text-xl font-bold text-white md:text-start md:text-2xl lg:text-4xl">
              Expert Guidance for Complex Financial Transactions
            </h1>
            <p className="text-center text-lg text-white md:text-start md:text-xl">
              Expert Guidance for Complex Financial Transactions
              <br />
              <br />
              Trust FinMates for expert advisory services that navigate the intricacies of direct and indirect taxes, as
              well as mergers and acquisitions. Our team provides strategic advice to ensure compliance and success in a
              dynamic financial landscape.
            </p>
            <div className="flex justify-center md:items-center md:justify-start">
              <button className="rounded-md bg-gray-900 px-8 py-4 font-bold text-white">Lets Connect</button>
            </div>
          </div>
        </div>
      </section>

      <section className="h-full w-full">
        <div className="m-auto flex h-full w-full max-w-7xl flex-col items-center px-6 py-20 max-md:flex-col md:px-10 md:py-20">
          <div className="flex w-full flex-col lg:flex-row lg:justify-between">
            <div className="w-full flex-col items-center justify-center">
              <h3 className="mb-5 text-center text-lg text-p-3 md:ml-5 lg:text-start">
                Ready for Expert Guidance on Financial Transactions?
              </h3>
              <h2 className="text-center text-3xl font-bold text-p-3 md:text-3xl lg:ml-4 lg:text-start lg:text-4xl">
                <div>
                  <span className="text-p-3">Explore Direct &amp; Indirect Tax, M&amp;A Advisory with FinMates</span>
                </div>
              </h2>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-5 lg:justify-start">
            {[
              {
                h1: "Corporate Tax",
                h2: "Tax Advisory Services",
                h3: "Providing holistic tax advisory, we conduct diagnostic reviews for risk mitigation, optimize tax planning, and ensure regulatory compliance, covering ICDS, Ind-AS, POEM, and GAAR applicability.",
              },
              {
                h1: "Tax Compliance",
                h2: "Tax Compliance Services",
                h3: "We provide expert assistance in preparing and filing withholding tax returns, optimize advance tax payments, and manage corporate tax filings, including for overseas entities in India.",
              },
              {
                h1: "Tax representation and litigation services",
                h2: "Tax Representation and Litigation",
                h3: "We provide expert representation and litigation support for tax matters, including audits, appeals, and dispute resolution.",
              },
              {
                h1: "International Tax",
                h2: "International Tax Services",
                h3: "We advise on outbound investment, tax treaties, BEPS, GAAR, digital payments, and non-resident provisions, with support for Mutual Agreement Procedures and Advance Ruling applications.",
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
                  title: "Direct Tax Advisory",
                  desc: "Receive comprehensive guidance on direct tax implications tailored to your business structure. Our experts help optimize tax planning, ensuring compliance and minimizing tax liabilities.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/79HY83FUTMMn292u7iXqfZ/55f9bf83bbf59251cea231011de2fc53/Direct_Tax_Advisory.png",
                },
                {
                  title: "Indirect Tax Strategy",
                  desc: "Navigate the complexities of indirect taxes with strategic planning. From GST to other indirect taxes, our advisory services ensure your business complies with regulations while maximizing operational efficiency.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/221Zysawrw4AQ8zY3KqBYa/4b59f9570ed0e76772547809f439512f/Indirect_Tax_Strategy.png",
                },
                {
                  title: "M&A Advisory Services",
                  desc: "Benefit from M&A advisory services that guide you through the entire process. From due diligence to deal structuring and post-merger integration, our experts ensure a seamless transition.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/6PE6GVqu09FZ8MJRRivb0O/4435f82b5bf3fd71e7d59e53b5967ff5/M_A_Advisory_Services.png",
                },
                {
                  title: "Tax Compliance Management",
                  desc: "Stay ahead of evolving tax regulations with our compliance management services. We assist in the preparation and filing of tax returns, minimizing risks and ensuring adherence to statutory requirements.",
                  bg: "bg-p",
                  titleClass: "text-white",
                  textClass: "text-white",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/1utmTY7RKOdZj81NOC6EFQ/c388f4a681b4a8dfab90d804a86007ce/Tax_Compliance_Management.png",
                },
                {
                  title: "Strategic Financial Planning",
                  desc: "Collaborate on strategic financial planning that aligns with your business goals. Our advisory services go beyond compliance, focusing on optimizing financial structures for long-term success.",
                  bg: "white",
                  titleClass: "text-p",
                  textClass: "text-black",
                  icon: "https://images.ctfassets.net/787ztwmlvqd6/1W9DtuRnrAHE7zUcfqGTCq/ae87e8523e9f489d4885cf624ce3913b/Strategic_Financial_Planning.png",
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
              <h2 className="text-4xl font-bold leading-tight" style={{ color: "#002244" }}>
              Have Questions? Explore our FAQs or Reach Out to Our Tax and M&A Experts.
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


      {/* <section className="h-full w-full">
        <div className="m-auto flex h-full w-full max-w-8xl items-center justify-center gap-10 px-6 py-10 max-md:flex-col md:px-5 md:py-20">
          <div className="md:w-5/12">
            <div className="relative">
              <img
                src="https://images.ctfassets.net/787ztwmlvqd6/7c6s4hK0aUqR1bO0XfFaqs/0f3be5a3af3e58b528625e10a234d660/faqs.jpeg"
                alt="FAQs"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-2 md:w-7/12">
            <h2 className="text-lg font-bold text-p">FAQ</h2>
            <h1 className="text-3xl font-bold xl:text-4xl">
              Have Questions? Explore our FAQs or Reach Out to Our Tax and M&amp;A Experts.
            </h1>

            {[
              {
                q: "How can direct tax planning benefit my business?",
                a: "Direct tax planning optimizes your tax liabilities, ensuring compliance with regulations while maximizing tax benefits for long-term financial success.",
              },
              {
                q: "What is the significance of strategic financial planning in mergers and acquisitions?",
                a: "Strategic financial planning ensures a seamless transition in mergers and acquisitions, aligning financial structures and goals for sustained success.",
              },
              {
                q: "How does FinMates assist in indirect tax compliance management?",
                a: "Our experts provide ongoing support in preparing and filing tax returns, ensuring adherence to regulations and minimizing risks associated with indirect taxes.",
              },
              {
                q: "What is involved in M&A due diligence?",
                a: "M&A due diligence involves a thorough analysis of financial data, risk assessments, and strategic advice to facilitate successful transactions.",
              },
              {
                q: "How can businesses stay updated on evolving tax regulations?",
                a: "Our advisory services include comprehensive tax compliance management, keeping businesses informed and ahead of evolving tax regulations.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative mt-5 overflow-hidden rounded-md bg-white shadow transition-all">
                <div className="flex items-center justify-between p-2">
                  <h2 className="text-base font-semibold md:text-lg">{item.q}</h2>
                  <button className="rounded-full bg-p-2 p-2 text-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 1024 1024"
                      height="24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
                      <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
                    </svg>
                  </button>
                </div>
                <div className="border-t p-2">
                  <p className="text-sm">{item.a}</p>
                </div>
              </div>
            ))}

            <div className="mt-5 flex items-center">
              <div className="text-2xl">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm62.9-219.5a48.3 48.3 0 0 0-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z"></path>
                </svg>
              </div>
              <p className="ml-3">If you have more questions</p>
              <p className="ml-3 whitespace-nowrap font-bold">Contact Us</p>
            </div>
          </div>
        </div>
      </section> */}
      <Footer/>

      
    </main>
  )
}
