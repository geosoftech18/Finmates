"use client"

import type React from "react"

import { useState } from "react"
import type { Job } from "@/types/job"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ThankYouPopup } from "./ThankYouPopup"
import {
  Loader2,
  Upload,
  CheckCircle,
  User,
  GraduationCap,
  Briefcase,
  FileText,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

interface ApplyFormProps {
  job: Job
  open: boolean
  onClose: () => void
}

type FormStep = 1 | 2 | 3 | 4

interface FormData {
  name: string
  email: string
  phone: string
  currentPosition: string
  experienceYears: number
  expectedSalary: string
  portfolioLink: string
  resume: File | null
  degree: string
  university: string
  yearOfPassing: string
  percentage: string
  companyName: string
  jobTitle: string
  workDuration: string
  experienceType: string
  verificationCode: string
}

export function ApplyForm({ job, open, onClose }: ApplyFormProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [applicationData, setApplicationData] = useState<any>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    currentPosition: "",
    experienceYears: 0,
    expectedSalary: "",
    portfolioLink: "",
    resume: null,
    degree: "",
    university: "",
    yearOfPassing: "",
    percentage: "",
    companyName: "",
    jobTitle: "",
    workDuration: "",
    experienceType: "fresher",
    verificationCode: "",
  })

  const stepTitles = {
    1: "Basic Information",
    2: "Education Details",
    3: "Professional Details",
    4: "Resume Upload",
  }

  const stepIcons = {
    1: User,
    2: GraduationCap,
    3: Briefcase,
    4: FileText,
  }

  const resetForm = () => {
    setCurrentStep(1)
    setEmailVerified(false)
    setCodeSent(false)
    setShowThankYou(false)
    setApplicationData(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      currentPosition: "",
      experienceYears: 0,
      expectedSalary: "",
      portfolioLink: "",
      resume: null,
      degree: "",
      university: "",
      yearOfPassing: "",
      percentage: "",
      companyName: "",
      jobTitle: "",
      workDuration: "",
      experienceType: "fresher",
      verificationCode: "",
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const updateFormData = (field: keyof FormData, value: string | number | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep1 = () => {
    if (!codeSent) {
      return formData.name.trim() && formData.email.trim() && formData.phone.trim()
    }
    return formData.verificationCode.trim().length === 4
  }

  const validateStep2 = () => {
    return (
      formData.degree.trim() &&
      formData.university.trim() &&
      formData.yearOfPassing.trim() &&
      formData.percentage.trim()
    )
  }

  const validateStep3 = () => {
    const basicFieldsValid =
      formData.currentPosition.trim() && formData.experienceYears >= 0 && formData.expectedSalary.trim()
    const experienceValid =
      formData.experienceType === "fresher" ||
      (formData.companyName.trim() && formData.jobTitle.trim() && formData.workDuration.trim())

    return basicFieldsValid && experienceValid
  }

  const validateStep4 = () => {
    return formData.resume !== null
  }

  const sendVerificationCode = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      const result = await response.json()

      if (result.success) {
        setCodeSent(true)
        toast({
          title: "Verification Code Sent",
          description: "Please check your email for the 4-digit verification code.",
        })
      } else {
        toast({
          title: "Failed to Send Code",
          description: result.message || "Please enter a valid email address.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCode = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          code: formData.verificationCode 
        }),
      })

      const result = await response.json()

      if (result.success) {
        setEmailVerified(true)
        setCurrentStep(2)
        toast({
          title: "Email Verified",
          description: "Your email has been verified successfully.",
        })
      } else {
        toast({
          title: "Verification Failed",
          description: result.message || "Invalid verification code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
      
      if (!codeSent) {
        await sendVerificationCode()
      } else {
        await verifyCode()
      }
    } else if (currentStep === 2) {
      if (!validateStep2()) {
        toast({
          title: "Missing Information",
          description: "Please fill in all education details.",
          variant: "destructive",
        })
        return
      }
      setCurrentStep(3)
    } else if (currentStep === 3) {
      if (!validateStep3()) {
        toast({
          title: "Missing Information",
          description: "Please fill in all professional details.",
          variant: "destructive",
        })
        return
      }
      setCurrentStep(4)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (allowedTypes.includes(file.type)) {
        updateFormData("resume", file)
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or DOC file.",
          variant: "destructive",
        })
      }
    }
  }

  const submitApplication = async () => {
    if (!validateStep4()) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("jobId", job.id)
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("currentPosition", formData.currentPosition)
      formDataToSend.append("experienceYears", formData.experienceYears.toString())
      formDataToSend.append("expectedSalary", formData.expectedSalary)
      formDataToSend.append("portfolioLink", formData.portfolioLink)
      formDataToSend.append("degree", formData.degree)
      formDataToSend.append("university", formData.university)
      formDataToSend.append("yearOfPassing", formData.yearOfPassing)
      formDataToSend.append("percentage", formData.percentage)
      formDataToSend.append("experienceType", formData.experienceType)
      formDataToSend.append("companyName", formData.companyName)
      formDataToSend.append("jobTitle", formData.jobTitle)
      formDataToSend.append("workDuration", formData.workDuration)
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume)
      }

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setApplicationData({
          applicantName: formData.name,
          applicantEmail: formData.email,
          jobTitle: job.title,
          applicationId: result.data.applicationId,
          submittedAt: result.data.submittedAt,
        })
        setShowThankYou(true)
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getProgressValue = () => {
    return (currentStep / 4) * 100
  }

  const StepIcon = stepIcons[currentStep]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="space-y-6 pb-6 border-b">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <StepIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground">Apply for {job.title}</DialogTitle>
              <p className="text-base text-muted-foreground mt-1">{stepTitles[currentStep]}</p>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-foreground">Step {currentStep} of 4</span>
              <span className="text-muted-foreground">{Math.round(getProgressValue())}% Complete</span>
            </div>
            <Progress value={getProgressValue()} className="h-3 bg-muted" />
          </div>

          {/* Enhanced Step Indicators */}
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => {
              const Icon = stepIcons[step as FormStep]
              const isActive = step === currentStep
              const isCompleted = step < currentStep || (step === 1 && emailVerified)

              return (
                <div key={step} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`p-3 rounded-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-400 dark:text-green-300 shadow-lg"
                        : isActive
                          ? "bg-primary/10 border-primary text-primary shadow-md scale-110"
                          : "bg-muted border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={`text-xs text-center font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {stepTitles[step as FormStep]}
                  </span>
                  {step < 4 && (
                    <div
                      className={`h-0.5 w-full transition-colors ${
                        isCompleted ? "bg-green-500" : "bg-muted-foreground/20"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {!codeSent 
                    ? "Let's start with your basic information. We'll send a verification code to your email."
                    : "Please enter the 4-digit verification code sent to your email address."
                  }
                </p>
              </div>
              
              {!codeSent ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="Enter your email address"
                      className="h-11"
                    />
                    <p className="text-sm text-muted-foreground">We'll send a verification code to this email address.</p>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          Verification code sent to {formData.email}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Check your email and enter the 4-digit code below.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode" className="text-sm font-medium">
                      Verification Code *
                    </Label>
                    <Input
                      id="verificationCode"
                      value={formData.verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                        updateFormData("verificationCode", value)
                      }}
                      placeholder="Enter 4-digit code"
                      className="h-11 text-center text-2xl font-mono tracking-widest"
                      maxLength={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the code? 
                      <button
                        type="button"
                        onClick={() => {
                          setCodeSent(false)
                          setFormData(prev => ({ ...prev, verificationCode: "" }))
                        }}
                        className="ml-1 text-primary hover:underline font-medium"
                      >
                        Resend code
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Education Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Tell us about your educational background and qualifications.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-sm font-medium">
                    Degree / Diploma *
                  </Label>
                  <select
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => updateFormData("degree", e.target.value)}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Degree/Diploma</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Associate Degree">Associate Degree</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university" className="text-sm font-medium">
                    University / College *
                  </Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => updateFormData("university", e.target.value)}
                    placeholder="Enter university/college name"
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="yearOfPassing" className="text-sm font-medium">
                    Year of Passing *
                  </Label>
                  <select
                    id="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={(e) => updateFormData("yearOfPassing", e.target.value)}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage" className="text-sm font-medium">
                    Percentage / CGPA *
                  </Label>
                  <Input
                    id="percentage"
                    value={formData.percentage}
                    onChange={(e) => updateFormData("percentage", e.target.value)}
                    placeholder="e.g., 85% or 8.5 CGPA"
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Professional Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Share your professional experience and career expectations.
                </p>
              </div>

              {/* Experience Level */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experienceType" className="text-sm font-medium">
                    Experience Level *
                  </Label>
                  <select
                    id="experienceType"
                    value={formData.experienceType}
                    onChange={(e) => updateFormData("experienceType", e.target.value)}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="fresher">Fresher</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>

                {formData.experienceType === "experienced" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium">
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => updateFormData("companyName", e.target.value)}
                        placeholder="Enter company name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-sm font-medium">
                        Job Title *
                      </Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => updateFormData("jobTitle", e.target.value)}
                        placeholder="Enter job title"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="workDuration" className="text-sm font-medium">
                        Work Duration *
                      </Label>
                      <select
                        id="workDuration"
                        value={formData.workDuration}
                        onChange={(e) => updateFormData("workDuration", e.target.value)}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Duration</option>
                        <option value="0-6 months">0-6 months</option>
                        <option value="6 months - 1 year">6 months - 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-3 years">2-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Role & Expectations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPosition" className="text-sm font-medium">
                    Current Position *
                  </Label>
                  <Input
                    id="currentPosition"
                    value={formData.currentPosition}
                    onChange={(e) => updateFormData("currentPosition", e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceYears" className="text-sm font-medium">
                    Total Years of Experience *
                  </Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    min="0"
                    value={formData.experienceYears || ""}
                    onChange={(e) => updateFormData("experienceYears", Number.parseInt(e.target.value) || 0)}
                    placeholder="e.g., 3"
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="expectedSalary" className="text-sm font-medium">
                    Expected Salary *
                  </Label>
                  <Input
                    id="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={(e) => updateFormData("expectedSalary", e.target.value)}
                    placeholder="e.g., $80,000 - $100,000"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolioLink" className="text-sm font-medium">
                    Portfolio Link (Optional)
                  </Label>
                  <Input
                    id="portfolioLink"
                    value={formData.portfolioLink}
                    onChange={(e) => updateFormData("portfolioLink", e.target.value)}
                    placeholder="https://your-portfolio.com"
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Resume Upload */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Upload your resume to complete your application. We accept PDF, DOC, and DOCX files.
                </p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="resume" className="text-sm font-medium">
                  Upload Resume *
                </Label>
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-300 hover:bg-muted/20">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-medium">Click to upload your resume</p>
                        <p className="text-sm text-muted-foreground mt-1">PDF, DOC, or DOCX files only (Max 10MB)</p>
                      </div>
                    </div>
                  </label>
                </div>
                {formData.resume && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        {formData.resume.name}
                      </span>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {(formData.resume.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      Ready
                    </Badge>
                  </div>
                )}
              </div>

              {/* Application Summary */}
              <div className="bg-muted/30 p-6 rounded-xl space-y-4">
                <h4 className="font-semibold text-foreground text-lg">Application Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Education:</span>
                    <span className="font-medium text-foreground">{formData.degree}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium text-foreground">{formData.experienceYears} years</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? handleClose : handlePrevious}
              disabled={isLoading}
              className="h-11 px-6 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext} disabled={isLoading} className="h-11 px-6">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {currentStep === 1 
                      ? (codeSent ? "Verifying..." : "Sending...") 
                      : "Processing..."
                    }
                  </>
                ) : (
                  <>
                    {currentStep === 1 
                      ? (codeSent ? "Verify Code" : "Send Code") 
                      : "Next Step"
                    }
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={submitApplication}
                disabled={isLoading}
                className="h-11 px-6 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
      
      {/* Thank You Popup */}
      {applicationData && (
        <ThankYouPopup
          open={showThankYou}
          onClose={() => {
            setShowThankYou(false)
            handleClose()
          }}
          applicationData={applicationData}
        />
      )}
    </Dialog>
  )
}
