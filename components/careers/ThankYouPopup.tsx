"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, Calendar, User, Briefcase } from "lucide-react"

interface ThankYouPopupProps {
  open: boolean
  onClose: () => void
  applicationData: {
    applicantName: string
    applicantEmail: string
    jobTitle: string
    applicationId: string
    submittedAt: string
  }
}

export function ThankYouPopup({ open, onClose, applicationData }: ThankYouPopupProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <DialogTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
            Application Submitted Successfully!
          </DialogTitle>
          <p className="text-lg text-muted-foreground">
            Thank you for your interest in joining our team at Finmates.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Application Summary */}
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Application Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <span className="text-muted-foreground">Applicant:</span>
                  <p className="font-medium text-foreground">{applicationData.applicantName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium text-foreground">{applicationData.applicantEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <span className="text-muted-foreground">Position:</span>
                  <p className="font-medium text-foreground">{applicationData.jobTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <span className="text-muted-foreground">Submitted:</span>
                  <p className="font-medium text-foreground">{formatDate(applicationData.submittedAt)}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Application ID:</strong> {applicationData.applicationId}
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-4">What Happens Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Review Process:</strong> Our HR team will review your application within 3-5 business days.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Email Confirmation:</strong> You'll receive a confirmation email with your application details.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Interview Invitation:</strong> If selected, we'll contact you to schedule an interview.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-900/20 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              If you have any questions about your application or the hiring process, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:careers@finmates.com"
                className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Mail className="h-4 w-4" />
                careers@finmates.com
              </a>
              <span className="text-gray-400 hidden sm:block">•</span>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button onClick={onClose} className="px-8 py-3 bg-green-600 hover:bg-green-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
