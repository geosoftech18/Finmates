"use client"

import { useState, useEffect } from "react"
import type { Job } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { JobForm } from "@/components/admin/job-form"
import { ConfirmationDialog } from "@/components/admin/confirmation-dialog"
import { LoadingSpinner } from "@/components/admin/loading-spinner"
import { JobDetailDialog } from "@/components/admin/JobDetailDialog"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Users, ArrowLeft, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [deletingJob, setDeletingJob] = useState<Job | null>(null)
  const [viewingJob, setViewingJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs')
        const result = await response.json()
        if (result.success) {
          // Map the API response to match the frontend Job type
          const mappedJobs = result.data.jobs.map((job: any) => ({
            id: job.id,
            title: job.title,
            description: job.fullDescription,
            skills: job.requiredSkills,
            expiryDate: job.expiryDate,
            location: job.location,
            type: job.type,
            status: job.status, // Use actual status from API response
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }))
          setJobs(mappedJobs)
          setFilteredJobs(mappedJobs)
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

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredJobs(filtered)
  }, [searchTerm, jobs])

  const handleCreateJob = async (jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: jobData.title,
          description: jobData.description,
          skills: jobData.skills,
          experience: '2-5 years', // Default experience
          expiryDate: jobData.expiryDate,
          location: jobData.location,
          type: jobData.type,
          status: jobData.status || 'open',
        }),
      })

      const result = await response.json()
      if (result.success) {
        // Refresh the jobs list
        const fetchJobs = async () => {
          const response = await fetch('/api/jobs')
          const result = await response.json()
          if (result.success) {
            const mappedJobs = result.data.jobs.map((job: any) => ({
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
            setFilteredJobs(mappedJobs)
          }
        }
        await fetchJobs()
        
        setIsCreateDialogOpen(false)
        toast({
          title: "Job Created",
          description: "New job posting has been created successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create job posting.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error creating job:', error)
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditJob = (jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
    if (!editingJob) return

    const updatedJob: Job = {
      ...editingJob,
      ...jobData,
      updatedAt: new Date().toISOString(),
    }
    const updatedJobs = jobs.map((job) => (job.id === editingJob.id ? updatedJob : job))
    setJobs(updatedJobs)
    setEditingJob(null)
    toast({
      title: "Job Updated",
      description: "Job posting has been updated successfully.",
    })
  }

  const handleDeleteJob = () => {
    if (!deletingJob) return

    const updatedJobs = jobs.filter((job) => job.id !== deletingJob.id)
    setJobs(updatedJobs)
    setDeletingJob(null)
    toast({
      title: "Job Deleted",
      description: "Job posting has been deleted successfully.",
    })
  }

  const handleStatusChange = (jobId: string, newStatus: Job["status"]) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status: newStatus, updatedAt: new Date().toISOString() } : job,
    )
    setJobs(updatedJobs)
    toast({
      title: "Status Updated",
      description: `Job status changed to ${newStatus}.`,
    })
  }

  const getStatusColor = (status: Job["status"]) => {
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

  const getTypeColor = (type: Job["type"]) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/admin")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Job Management</h1>
                <p className="text-muted-foreground">Manage job postings and applications</p>
              </div>
            </div>
            <Button onClick={() => router.push("/admin")}>Back to Dashboard</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Jobs ({filteredJobs.length})</CardTitle>
                <CardDescription>Manage your job postings and track applications</CardDescription>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Job</DialogTitle>
                    <DialogDescription>Fill in the details to create a new job posting.</DialogDescription>
                  </DialogHeader>
                  <JobForm onSubmit={handleCreateJob} onCancel={() => setIsCreateDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs by title, location, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Jobs Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>View Details</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow 
                      key={job.id} 
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/admin/jobs/${job.id}/applicants`)}
                    >
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(job.type)}>{job.type.replace("-", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(job.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setViewingJob(job)
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/jobs/${job.id}/applicants`)}>
                              <Users className="mr-2 h-4 w-4" />
                              View Applicants
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingJob(job)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(job.id, job.status === "open" ? "paused" : "open")}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              {job.status === "open" ? "Pause" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeletingJob(job)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">{searchTerm ? "No jobs found" : "No jobs created yet"}</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first job posting."}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Job
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Job Dialog */}
        <Dialog open={!!editingJob} onOpenChange={() => setEditingJob(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
              <DialogDescription>Update the job posting details.</DialogDescription>
            </DialogHeader>
            {editingJob && <JobForm job={editingJob} onSubmit={handleEditJob} onCancel={() => setEditingJob(null)} />}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={!!deletingJob}
          onClose={() => setDeletingJob(null)}
          onConfirm={handleDeleteJob}
          title="Delete Job Posting"
          description={`Are you sure you want to delete "${deletingJob?.title}"? This action cannot be undone and will also delete all associated applications.`}
          confirmText="Delete Job"
          variant="destructive"
        />

        {/* Job Detail Dialog */}
        <JobDetailDialog
          isOpen={!!viewingJob}
          onClose={() => setViewingJob(null)}
          job={viewingJob}
        />
      </main>
    </div>
  )
}
