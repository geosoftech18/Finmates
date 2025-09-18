"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/admin/loading-spinner"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  ExternalLink,
  Download,
  FileText,
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
} from "lucide-react"
import type { Application } from "@/lib/types"

interface ApplicantDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  applicationId: string | null
  jobTitle?: string
}

interface ApplicationDetails extends Application {
  resumeUrl: string
  position: string
  degree: string
  university: string
  yearOfPassing: string
  percentage: string
  experienceType: string
  companyName: string
  jobTitle: string
  workDuration: string
  coverLetter: string
  portfolioLink: string
}

export function ApplicantDetailDialog({ 
  isOpen, 
  onClose, 
  applicationId, 
  jobTitle = "Unknown Position" 
}: ApplicantDetailDialogProps) {
  const [application, setApplication] = useState<ApplicationDetails | null>(null)
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchApplicationDetails()
    }
  }, [isOpen, applicationId])

  const fetchApplicationDetails = async () => {
    if (!applicationId) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/applications/${applicationId}`)
      const result = await response.json()
      
      if (result.success) {
        setApplication(result.data)
      } else {
        setError(result.message || 'Failed to fetch application details')
      }
    } catch (error) {
      console.error('Error fetching application details:', error)
      setError('Failed to fetch application details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadResume = () => {
    if (application?.resumeUrl) {
      // Open resume URL in new tab for download
      window.open(application.resumeUrl, '_blank')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "shortlisted":
        return <UserCheck className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "hired":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "hired":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[98vw] min-w-[800px] max-h-[95vh] overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <LoadingSpinner size="lg" />
              <p className="text-muted-foreground">Loading applicant details...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!application) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Not Found</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">The requested application could not be found.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[98vw] min-w-[800px] max-h-[95vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-2xl sm:text-3xl font-bold truncate">{application.name}</DialogTitle>
              <p className="text-muted-foreground text-sm truncate">{jobTitle}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {getStatusIcon(application.status)}
              <Badge className={getStatusColor(application.status)}>
                {application.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-4">
          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-4 px-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-base font-medium">Email</p>
                    <p className="text-base text-muted-foreground">{application.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-base font-medium">Phone</p>
                    <p className="text-base text-muted-foreground">{application.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-base font-medium">Current Position</p>
                    <p className="text-base text-muted-foreground">{application.currentPosition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-base font-medium">Applied Date</p>
                    <p className="text-base text-muted-foreground">{formatDate(application.appliedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader className="pb-4 px-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="h-5 w-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <div>
                  <p className="text-base font-medium">Position Applied For</p>
                  <p className="text-base text-muted-foreground">{application.position}</p>
                </div>
                <div>
                  <p className="text-base font-medium">Experience Type</p>
                  <p className="text-base text-muted-foreground capitalize">{application.experienceType}</p>
                </div>
                <div>
                  <p className="text-base font-medium">Years of Experience</p>
                  <p className="text-base text-muted-foreground">{application.experience} years</p>
                </div>
                <div>
                  <p className="text-base font-medium">Expected Salary</p>
                  <p className="text-base text-muted-foreground">{application.expectedSalary}</p>
                </div>
                {application.experienceType === 'experienced' && (
                  <>
                    <div>
                      <p className="text-base font-medium">Previous Company</p>
                      <p className="text-base text-muted-foreground">{application.companyName}</p>
                    </div>
                    <div>
                      <p className="text-base font-medium">Previous Job Title</p>
                      <p className="text-base text-muted-foreground">{application.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-base font-medium">Work Duration</p>
                      <p className="text-base text-muted-foreground">{application.workDuration}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="pb-4 px-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <div>
                  <p className="text-base font-medium">Degree</p>
                  <p className="text-base text-muted-foreground">{application.degree}</p>
                </div>
                <div>
                  <p className="text-base font-medium">University</p>
                  <p className="text-base text-muted-foreground">{application.university}</p>
                </div>
                <div>
                  <p className="text-base font-medium">Year of Passing</p>
                  <p className="text-base text-muted-foreground">{application.yearOfPassing}</p>
                </div>
                <div>
                  <p className="text-base font-medium">Percentage</p>
                  <p className="text-base text-muted-foreground">{application.percentage}</p>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Portfolio Link */}
          {application.portfolioLink && (
            <Card>
              <CardHeader className="pb-4 px-6">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ExternalLink className="h-5 w-5" />
                  Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-6">
                <a 
                  href={application.portfolioLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base text-blue-600 hover:underline flex items-center gap-2 break-all"
                >
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">View Portfolio</span>
                </a>
              </CardContent>
            </Card>
          )}

          {/* Resume */}
          <Card>
            <CardHeader className="pb-4 px-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-base truncate">{application.resumeFilename}</span>
                </div>
                <Button onClick={handleDownloadResume} size="sm" className="flex-shrink-0">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          {application.coverLetter && (
            <Card>
              <CardHeader className="pb-4 px-6">
                <CardTitle className="text-lg">Cover Letter</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-6">
                <p className="text-base text-muted-foreground whitespace-pre-wrap">
                  {application.coverLetter}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
