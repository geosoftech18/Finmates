"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

import MagneticCursor from "@/components/MagneticCursor"
import Footer from "@/components/footer"
import FinmatesHeader from "@/components/header2"
import type { Job } from "@/types/job"
import { JobsCarousel } from "@/components/careers/JobsCarousel"
import { JobDetailsModal } from "@/components/careers/JobDetailsModal"
import { ApplyForm } from "@/components/careers/ApplyForm"


export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cv: null as File | null,
    coverLetter: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cv: "",
  })

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs')
        const result = await response.json()
        if (result.success) {
          setJobs(result.data.jobs)
        } else {
          console.error('Failed to fetch jobs:', result.message)
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setShowJobDetails(true)
  }

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job)
    setShowApplyForm(true)
    setShowJobDetails(false)
  }

  const handleCloseModals = () => {
    setShowJobDetails(false)
    setShowApplyForm(false)
    setSelectedJob(null)
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, cv: file }))

    if (errors.cv) {
      setErrors((prev) => ({ ...prev, cv: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      name: !formData.name ? "Full Name is required" : "",
      email: !formData.email ? "Email is required" : "",
      cv: !formData.cv ? "cv is a required field" : "",
    }

    setErrors(newErrors)

    if (!newErrors.name && !newErrors.email && !newErrors.cv) {
      // Handle form submission
      console.log("Form submitted:", formData)
    }
  }

  return (
    <>
    <MagneticCursor/>
      <FinmatesHeader/>

      <main>
        <div className="m-auto flex aspect-square h-96 w-full max-w-7xl flex-col items-center justify-center gap-5 overflow-hidden rounded-b-full bg-gradient-to-bl from-[#003b8d] to-[#e6edf7] px-5 pb-10 pt-20 md:h-[600px] md:py-32">
          <h1 className="text-2xl font-bold text-black md:text-3xl">Career Opportunities at FinMates</h1>
          <h2 className="text-xl font-bold text-black md:text-2xl">Begin your Finmates journey!</h2>
        </div>

      

        {/* Jobs Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover exciting opportunities across different departments and find the perfect role for your skills and
            career goals.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading job opportunities...</p>
            </div>
          </div>
        ) : (
          <JobsCarousel jobs={jobs} onJobClick={handleJobClick} />
        )}
      </div>

      {/* Modals */}
      {selectedJob && (
        <>
          <JobDetailsModal
            job={selectedJob}
            open={showJobDetails}
            onClose={handleCloseModals}
            onApply={() => handleApplyClick(selectedJob)}
          />

          <ApplyForm job={selectedJob} open={showApplyForm} onClose={handleCloseModals} />
        </>
      )}

<section className="h-full w-full ">
          <div className="m-auto flex h-full w-full max-w-7xl items-center gap-10 px-6 py-20 max-md:flex-col-reverse md:px-10 md:py-24">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Join Our Team</h1>
              <p className="mt-5 text-justify text-base md:mr-16 md:text-lg lg:text-xl">
                Are you passionate about shaping financial journeys? At FinMates, we're always on the lookout for
                talented individuals who share our vision for redefining financial solutions. Explore career
                opportunities with us and become a part of our journey towards excellence
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image alt="hero" width={800} height={800} className="rounded-md" src="/careers/careers.jpg" />
            </div>
          </div>
        </section>

        <section className="h-full w-full">
          <div className="m-auto flex h-full w-full max-w-7xl items-center gap-10 px-6 py-5 max-md:flex-col md:px-10 md:py-20">
            <div>
              <div className="w-full py-10 md:py-24">
                <div className="flex w-full flex-col items-center justify-between gap-10 md:flex-row md:flex-row-reverse">
                  <div className="mx-10 w-full text-justify md:w-1/2">
                    <h1 className="py-10 text-3xl font-bold md:text-4xl">Want to work with us?</h1>
                    <p className="text-lg md:text-xl">
                      Join FinMates, your trusted financial partner, and be part of a team dedicated to excellence and
                      client satisfaction. Explore opportunities with us if you're passionate about driving financial
                      success in a dynamic environment where your skills are valued and your contributions make a
                      difference
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <Image
                      alt="hero"
                      width={600}
                      height={600}
                      className="rounded-xl"
                      src="/careers/careers.jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full py-10 md:py-24">
                <div className="flex w-full flex-col items-center justify-between gap-10 md:flex-row">
                  <div className="mx-10 w-full text-justify md:w-1/2">
                    <h1 className="py-10 text-3xl font-bold md:text-4xl">Work Culture</h1>
                    <p className="text-lg md:text-xl">
                      At FinMates, we prioritize excellence, integrity, and collaboration. Our client-centric approach
                      ensures tailored solutions, while our culture fosters trust, accountability, and continuous
                      learning. Join us and experience a culture where values drive our journey towards success.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <Image
                      alt="hero"
                      width={600}
                      height={600}
                      className="rounded-xl"
                      src="/careers/careers.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-5 p-10 md:py-24">
            <h2 className="text-center text-xl font-bold md:text-3xl">
              Ready to embark on a rewarding career journey with FinMates?
            </h2>
            <p className="text-center md:text-xl">
              Fill out the form below and attach your resume to apply for the desired position. Our team will review
              your application and reach out to qualified candidates for further steps in the recruitment process.
            </p>
            <div className="flex w-full gap-8 max-md:flex-col md:gap-12">
              <div className="w-full md:w-1/2">
                <Image
                  alt="Ready to embark on a rewarding career journey with FinMates?"
                  width={500}
                  height={500}
                  className="w-full object-contain"
                  src="/careers/join-us.png"
                />
              </div>
              <form className="w-full py-10 md:w-1/2" onSubmit={handleSubmit}>
                <div className="rounded-md border border-gray-200 bg-white p-10 shadow-lg">
                  <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-700">
                      Your Name:
                    </label>
                    <input
                      id="name"
                      placeholder="Enter Your Name"
                      className={`w-full rounded-md border p-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-700">
                      Your Email:
                    </label>
                    <input
                      id="email"
                      placeholder="Enter Your Email"
                      className={`w-full rounded-md border p-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cv" className="mb-2 block text-sm font-bold text-gray-700">
                      Your CV:
                    </label>
                    <input
                      id="cv"
                      placeholder="Upload your cv"
                      accept="application/pdf"
                      className={`w-full rounded-md border p-2 ${errors.cv ? "border-red-500" : "border-gray-300"}`}
                      type="file"
                      onChange={handleFileChange}
                    />
                    {errors.cv && <p className="mt-1 text-xs text-red-500">{errors.cv}</p>}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="coverLetter" className="mb-2 block text-sm font-bold text-gray-700">
                      Your Cover Letter(Optional):
                    </label>
                    <textarea
                      id="coverLetter"
                      rows={4}
                      placeholder="write Your coverLetter"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full">
                    <button
                      type="submit"
                      className="w-full rounded-br-lg rounded-tl-lg bg-p-2 px-4 py-2 bg-[#003b8d] text-white hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer/>
      </main>
 
     
    </>
  )
}
