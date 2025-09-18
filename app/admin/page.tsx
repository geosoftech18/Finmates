"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/admin/stats-cards"
import { Users, Briefcase, FileText, Settings, Plus } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalJobs: number
  activeJobs: number
  totalApplicants: number
  pendingReviews: number
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
    pendingReviews: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsResponse, applicationsResponse] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/applications')
        ])

        const jobsResult = await jobsResponse.json()
        const applicationsResult = await applicationsResponse.json()

        if (jobsResult.success && applicationsResult.success) {
          const totalJobs = jobsResult.data.jobs.length
          const activeJobs = jobsResult.data.jobs.filter((job: any) => job.status === 'open').length
          const totalApplicants = applicationsResult.data.applications.length
          const pendingReviews = applicationsResult.data.applications.filter((app: any) => app.status === 'applied').length

          setStats({
            totalJobs,
            activeJobs,
            totalApplicants,
            pendingReviews,
          })
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Job Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Jobs"
            value={loading ? "..." : stats.totalJobs}
            icon={<Briefcase className="h-4 w-4" />}
            trend={{ value: 0, label: "from last month", direction: "up" }}
          />

          <StatsCard
            title="Active Jobs"
            value={loading ? "..." : stats.activeJobs}
            icon={<FileText className="h-4 w-4" />}
            description="Currently open"
          />

          <StatsCard
            title="Total Applicants"
            value={loading ? "..." : stats.totalApplicants}
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 0, label: "this week", direction: "up" }}
          />

          <StatsCard
            title="Pending Reviews"
            value={loading ? "..." : stats.pendingReviews}
            icon={<Settings className="h-4 w-4" />}
            trend={{ value: 0, label: "from yesterday", direction: "down" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/jobs">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Manage Jobs
                </Button>
              </Link>
              <Link href="/admin/jobs">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Job
                </Button>
              </Link>
              <Link href="/admin/applicants">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  View All Applicants
                </Button>
              </Link>
              
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">New application received</p>
                      <p className="text-xs text-muted-foreground">Frontend Developer position</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Job posting updated</p>
                      <p className="text-xs text-muted-foreground">UX Designer role</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Candidate shortlisted</p>
                      <p className="text-xs text-muted-foreground">Backend Developer position</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
