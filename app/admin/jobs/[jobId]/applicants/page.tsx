"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationsList } from "@/components/admin/ApplicationsList"
import { ArrowLeft, Users } from "lucide-react"

interface Job {
  id: string
  title: string
  location: string
  type: string
}

export default function ApplicantsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch job details
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)
        const result = await response.json()
        
        if (result.success) {
          setJob(result.data)
        }
      } catch (error) {
        console.error('Error fetching job:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [jobId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-muted-foreground">Loading job details...</div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <Users className="h-full w-full" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested job could not be found.</p>
          <Button onClick={() => router.push("/admin/jobs")}>Back to Jobs</Button>
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
            <Button variant="ghost" size="sm" onClick={() => router.push("/admin/jobs")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-muted-foreground">
                {job.location} • {job.type.replace("-", " ")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ApplicationsList jobId={jobId} />
      </main>
    </div>
  )
}
