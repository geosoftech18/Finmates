"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ContactFormState = {
  name: string
  email: string
  subject: string
  message: string
}

const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit form.")
      }

      setSuccessMessage("Thank you! Your message has been sent. Please check your email for confirmation.")
      setFormData(initialState)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
          Your Name:
        </label>
        <Input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Enter Your Name"
          className="w-full h-12 lg:text-lg border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
          Your Email:
        </label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Enter Your Email"
          className="w-full h-12 border-gray-300 lg:text-lg"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
          Subject:
        </label>
        <Input
          id="subject"
          type="text"
          required
          value={formData.subject}
          onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
          placeholder="Enter Your Subject"
          className="w-full h-12 border-gray-300 lg:text-lg"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
          Your Message/Question:
        </label>
        <Textarea
          id="message"
          required
          value={formData.message}
          onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
          placeholder="Enter Your Message"
          rows={12}
          className="w-full h-32 border-gray-300 lg:text-lg"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#003b8d] hover:bg-blue-700 text-lg rounded-tl-xl rounded-br-xl text-white py-3"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      {successMessage && <p className="text-green-700 text-sm">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
    </form>
  )
}

