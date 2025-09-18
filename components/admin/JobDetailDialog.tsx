"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Pause,
} from "lucide-react"
import type { Job } from "@/lib/types"

interface JobDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  job: Job | null
}

export function JobDetailDialog({ isOpen, onClose, job }: JobDetailDialogProps) {
  if (!job) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "closed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-blue-100 text-blue-800"
      case "part-time":
        return "bg-purple-100 text-purple-800"
      case "contract":
        return "bg-orange-100 text-orange-800"
      case "internship":
        return "bg-pink-100 text-pink-800"
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-2xl sm:text-3xl font-bold truncate">{job.title}</DialogTitle>
              <p className="text-muted-foreground text-sm truncate">{job.location}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {getStatusIcon(job.status)}
              <Badge className={getStatusColor(job.status)}>
                {job.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-2">
          {/* Job Overview */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="h-5 w-5" />
                Job Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Job Type</p>
                    <Badge className={getTypeColor(job.type)}>
                      {job.type.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Expiry Date</p>
                    <p className="text-sm text-muted-foreground">{formatDate(job.expiryDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">{formatDate(job.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Job Description</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="prose max-w-none">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Required Skills</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
