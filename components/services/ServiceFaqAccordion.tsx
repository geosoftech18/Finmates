"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

export type ServiceFaq = {
  question: string
  answer: string
}

export default function ServiceFaqAccordion({ faqs }: { faqs: ServiceFaq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleFaq(index)}
            className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200 ${
              openFaq === index ? "bg-[#003b8d] text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            <span className="text-lg font-medium">{faq.question}</span>
            <div className="flex-shrink-0 ml-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ backgroundColor: "#002244" }}
              >
                {openFaq === index ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
              </div>
            </div>
          </button>

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
  )
}

