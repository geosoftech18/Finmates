"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import PhoneInput from "react-phone-input-2"

type FormState = {
  name: string
  email: string
  phone: string
  service: string
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
}

export default function QuickContactCTA() {
  const services = [
    "CFO Services",
    "F&A Outsourcing",
    "Direct Tax and Regulatory Services",
    "Pitch Deck and Fundraising",
    "SME IPO Readiness Support",
    "Annual Report Preparation",
  ]

  const [formData, setFormData] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setError("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quick-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit the form.")
      }

      setMessage("Thank you! We have received your details and sent a confirmation email.")
      setFormData(initialState)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-[#003b8d] to-[#008bd0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="inline-flex items-center rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs md:text-sm font-semibold uppercase tracking-widest text-blue-100 mb-3 shadow-sm backdrop-blur-sm">
              Quick Form
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">Let us call you back quickly</h2>
            <p className="text-base md:text-lg text-blue-50 max-w-xl">
              Share your details and our team will reach out with the right finance and advisory support for your
              business.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="quick-name" className="block text-sm font-medium text-[#003b8d] mb-1">
                  Name
                </label>
                <input
                  id="quick-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your full name"
                  className="w-full h-11 rounded-lg border border-blue-100 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#008bd0]"
                />
              </div>

              <div>
                <label htmlFor="quick-email" className="block text-sm font-medium text-[#003b8d] mb-1">
                  Email
                </label>
                <input
                  id="quick-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                  className="w-full h-11 rounded-lg border border-blue-100 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#008bd0]"
                />
              </div>

              <div>
                <label htmlFor="quick-phone" className="block text-sm font-medium text-[#003b8d] mb-1">
                  Phone
                </label>
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                  inputProps={{
                    id: "quick-phone",
                    name: "phone",
                    required: true,
                  }}
                  placeholder="+91 98XXXXXXX"
                  disableCountryGuess={false}
                  enableSearch={true}
                  dropdownClass="!border !border-blue-100 !rounded-xl overflow-hidden"
                  containerClass="!w-full"
                  inputClass="!w-full !h-11 !rounded-lg !border !border-blue-100 !bg-white !px-3 !text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#008bd0]"
                  buttonClass="!bg-white !border !border-blue-100 !rounded-l-lg !text-[#003b8d]"
                  buttonStyle={{ border: "1px solid rgb(191, 219, 254)" }}
                  inputStyle={{ border: "1px solid rgb(191, 219, 254)" }}
                />
              </div>

              <div>
                <label htmlFor="quick-service" className="block text-sm font-medium text-[#003b8d] mb-1">
                  Service
                </label>
                <select
                  id="quick-service"
                  required
                  value={formData.service}
                  onChange={(event) => setFormData((prev) => ({ ...prev, service: event.target.value }))}
                  className="w-full h-11 rounded-lg border border-blue-100 px-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#008bd0]"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#003b8d] hover:bg-[#002f70] text-white rounded-lg text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>

            {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
