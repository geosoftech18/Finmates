"use client"

import type { Job } from "@/types/job"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Building, Calendar, Users, CheckCircle, Briefcase } from "lucide-react"

interface JobDetailsModalProps {
  job: Job
  open: boolean
  onClose: () => void
  onApply: () => void
}

export function JobDetailsModal({ job, open, onClose, onApply }: JobDetailsModalProps) {
  const getTypeColor = (type: Job["type"]) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "part-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "contract":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatType = (type: Job["type"]) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatExperienceLevel = (level: Job["experienceLevel"]) => {
    switch (level) {
      case "entry":
        return "Entry Level"
      case "mid":
        return "Mid Level"
      case "senior":
        return "Senior Level"
      default:
        return level
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground pr-4">{job.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                Join our {job.department} team and make an impact
              </DialogDescription>
            </div>
            <Badge className={`${getTypeColor(job.type)} font-medium shrink-0`}>{formatType(job.type)}</Badge>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{job.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{formatExperienceLevel(job.experienceLevel)}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Description
            </h3>
            <p className="text-muted-foreground leading-relaxed">{job.fullDescription}</p>
          </div>

          <Separator />

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Experience Level
              </h3>
              <p className="text-muted-foreground">{formatExperienceLevel(job.experienceLevel)}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Application Deadline
              </h3>
              <p className="text-muted-foreground">{formatDate(job.expiryDate)}</p>
            </div>
          </div>

          <Separator />

          {/* Apply Section */}
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Apply?</h3>
            <p className="text-muted-foreground mb-4">
              Take the next step in your career journey. Our application process is quick and straightforward.
            </p>
            <div className="flex gap-3">
              <Button onClick={onApply} size="lg" className="flex-1 md:flex-none">
                Apply Now
              </Button>
              <Button variant="outline" onClick={onClose} size="lg">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
