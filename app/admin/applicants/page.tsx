"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import type { Job, Application } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmailDialog } from "@/components/admin/email-dialog"
import { LoadingSpinner } from "@/components/admin/loading-spinner"
import { ApplicantDetailDialog } from "@/components/admin/ApplicantDetailDialog"
import {
  ArrowLeft,
  Search,
  Download,
  Mail,
  MoreHorizontal,
  ExternalLink,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Briefcase,
  User,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AllApplicantsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [experienceFilter, setExperienceFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [salaryFilter, setSalaryFilter] = useState<string>("all")
  const [jobFilter, setJobFilter] = useState<string>("all")
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jobs
        const jobsResponse = await fetch('/api/jobs')
        const jobsResult = await jobsResponse.json()
        if (jobsResult.success) {
          const mappedJobs = jobsResult.data.jobs.map((job: any) => ({
            id: job.id,
            title: job.title,
            description: job.fullDescription,
            skills: job.requiredSkills,
            expiryDate: job.expiryDate,
            location: job.location,
            type: job.type,
            status: job.status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }))
          setJobs(mappedJobs)
        }

        // Fetch applications
        const applicationsResponse = await fetch('/api/applications')
        const applicationsResult = await applicationsResponse.json()
        if (applicationsResult.success) {
          const mappedApplications = applicationsResult.data.applications.map((app: any) => ({
            id: app.id,
            jobId: app.jobId,
            name: app.name,
            email: app.email,
            phone: app.phone,
            currentPosition: app.currentPosition || 'Not specified',
            experience: app.experienceYears.toString() + ' years',
            expectedSalary: app.expectedSalary || 'Not specified',
            portfolioLink: app.portfolioLink,
            resumeFilename: app.resumeUrl.split('/').pop() || 'resume.pdf',
            status: app.status,
            appliedAt: app.createdAt,
          }))
          setApplications(mappedApplications)
          setFilteredApplications(mappedApplications)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = applications

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    // Experience filter
    if (experienceFilter !== "all") {
      filtered = filtered.filter((app) => {
        const appExperience = Number.parseInt(app.experience)
        if (experienceFilter === "0-2") return appExperience <= 2
        if (experienceFilter === "3-5") return appExperience >= 3 && appExperience <= 5
        if (experienceFilter === "6+") return appExperience >= 6
        return true
      })
    }

    // Location filter (based on current position)
    if (locationFilter !== "all") {
      filtered = filtered.filter((app) =>
        app.currentPosition.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // Expected salary filter
    if (salaryFilter !== "all") {
      filtered = filtered.filter((app) => {
        const salary = app.expectedSalary.replace(/[$,]/g, "")
        const salaryNum = Number.parseInt(salary)
        if (salaryFilter === "0-50k") return salaryNum <= 50000
        if (salaryFilter === "50k-100k") return salaryNum > 50000 && salaryNum <= 100000
        if (salaryFilter === "100k-150k") return salaryNum > 100000 && salaryNum <= 150000
        if (salaryFilter === "150k+") return salaryNum > 150000
        return true
      })
    }

    // Job filter
    if (jobFilter !== "all") {
      filtered = filtered.filter((app) => app.jobId === jobFilter)
    }

    setFilteredApplications(filtered)
  }, [applications, searchTerm, statusFilter, experienceFilter, locationFilter, salaryFilter, jobFilter])

  const handleBulkStatusChange = (status: Application["status"]) => {
    if (selectedApplications.length === 0) return

    const updatedApps = selectedApplications.map((id) => {
      const app = applications.find((a) => a.id === id)
      if (app) {
        return { ...app, status }
      }
      return null
    }).filter(Boolean) as Application[]

    setApplications((prev) =>
      prev.map((app) => {
        const updated = updatedApps.find((u) => u.id === app.id)
        return updated || app
      }),
    )
    setSelectedApplications([])
    toast({
      title: "Bulk Update Complete",
      description: `${selectedApplications.length} applications updated to ${status}.`,
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map((app) => app.id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications((prev) => [...prev, applicationId])
    } else {
      setSelectedApplications((prev) => prev.filter((id) => id !== applicationId))
    }
  }

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Current Position",
      "Experience",
      "Expected Salary",
      "Portfolio Link",
      "Resume",
      "Status",
      "Applied Date",
      "Job Title",
    ]

    const csvContent = [
      headers.join(","),
      ...filteredApplications.map((app) => {
        const job = jobs.find((j) => j.id === app.jobId)
        return [
          app.name,
          app.email,
          app.phone,
          `"${app.currentPosition}"`,
          app.experience,
          app.expectedSalary,
          app.portfolioLink || "",
          app.resumeFilename,
          app.status,
          new Date(app.appliedAt).toLocaleDateString(),
          job?.title || "Unknown Job",
        ].join(",")
      }),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `all_applicants_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    toast({
      title: "Export Complete",
      description: "All applicants exported to CSV successfully.",
    })
  }

  const handleBulkEmail = () => {
    if (selectedApplications.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select applications to send email.",
        variant: "destructive",
      })
      return
    }
    setIsEmailDialogOpen(true)
  }

  const selectedEmails = useMemo(() => {
    return applications.filter((app) => selectedApplications.includes(app.id)).map((app) => app.email)
  }, [applications, selectedApplications])

  const handleViewDetails = (applicationId: string) => {
    setSelectedApplicationId(applicationId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setSelectedApplicationId(null)
  }

  const getStatusIcon = (status: Application["status"]) => {
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

  const getStatusColor = (status: Application["status"]) => {
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

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId)
    return job?.title || "Unknown Job"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading all applicants...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">All Applicants</h1>
              <p className="text-muted-foreground">
                {applications.length} total applicants across {jobs.length} jobs
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  All Applicants ({filteredApplications.length})
                </CardTitle>
                <CardDescription>Manage applications across all job postings</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {selectedApplications.length > 0 && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Bulk Actions ({selectedApplications.length})</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleBulkStatusChange("shortlisted")}>
                          Mark as Shortlisted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkStatusChange("rejected")}>
                          Mark as Rejected
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkStatusChange("hired")}>
                          Mark as Hired
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleBulkEmail}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Experience</SelectItem>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6+">6+ years</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="san francisco">San Francisco</SelectItem>
                    <SelectItem value="new york">New York</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="los angeles">Los Angeles</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by salary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Salaries</SelectItem>
                    <SelectItem value="0-50k">$0 - $50k</SelectItem>
                    <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                    <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                    <SelectItem value="150k+">$150k+</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Applications Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Current Position</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Expected Salary</TableHead>
                    <TableHead>Job Applied For</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <Checkbox
                          checked={selectedApplications.includes(application.id)}
                          onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <button
                          onClick={() => handleViewDetails(application.id)}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {application.name}
                        </button>
                      </TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>{application.phone}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{application.currentPosition}</TableCell>
                      <TableCell>{application.experience}</TableCell>
                      <TableCell>{application.expectedSalary}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {getJobTitle(application.jobId)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(application.status)}
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(application.appliedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(application.id)}>
                              <User className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {application.portfolioLink && (
                              <DropdownMenuItem asChild>
                                <a href={application.portfolioLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Portfolio
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => window.open(application.resumeFilename, '_blank')}>
                              <FileText className="mr-2 h-4 w-4" />
                              Download Resume
                            </DropdownMenuItem>
                            
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No applicants found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all" || experienceFilter !== "all" || locationFilter !== "all" || salaryFilter !== "all" || jobFilter !== "all"
                    ? "Try adjusting your search terms or filters."
                    : "No applications have been submitted yet."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Dialog */}
        <EmailDialog
          isOpen={isEmailDialogOpen}
          onClose={() => setIsEmailDialogOpen(false)}
          recipients={selectedEmails}
          defaultSubject="Application Update"
          defaultMessage="Thank you for your interest in our position. We would like to update you on your application status."
        />

        {/* Applicant Detail Dialog */}
        <ApplicantDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={handleCloseDetailDialog}
          applicationId={selectedApplicationId}
          jobTitle={selectedApplicationId ? getJobTitle(applications.find(app => app.id === selectedApplicationId)?.jobId || '') : undefined}
        />
      </main>
    </div>
  )
}
