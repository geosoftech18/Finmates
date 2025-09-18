import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import type { Application } from "@/lib/types"

// GET /api/jobs/[id]/applications - Get applications for a specific job
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const applications = await prisma.application.findMany({
      where: { jobId: id },
      orderBy: { appliedAt: "desc" },
    })

    // Transform database format to frontend format
    const transformedApplications = applications.map((app) => ({
      id: app.id,
      jobId: app.jobId,
      name: app.name,
      email: app.email,
      phone: app.phone,
      currentPosition: app.currentPosition,
      experience: app.experience,
      expectedSalary: app.expectedSalary,
      portfolioLink: app.portfolioLink,
      resumeFilename: app.resumeFilename,
      status: app.status.toLowerCase() as Application["status"],
      appliedAt: app.appliedAt.toISOString(),
    }))

    return NextResponse.json(transformedApplications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
