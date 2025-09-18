import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: applicationId } = await params

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: "Application ID is required" },
        { status: 400 }
      )
    }

    // Fetch application with job details
    const application = await prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          select: {
            title: true,
            location: true,
            type: true,
          }
        }
      }
    })

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      )
    }

    // Format the response based on actual schema fields
    const formattedApplication = {
      id: application.id,
      jobId: application.jobId,
      name: application.name,
      email: application.email,
      phone: application.phone,
      position: application.position,
      currentPosition: application.currentPosition || 'Not specified',
      experience: application.experienceYears,
      expectedSalary: application.expectedSalary || 'Not specified',
      portfolioLink: application.portfolioLink || '',
      resumeUrl: application.resumeUrl,
      resumeFilename: application.resumeUrl.split('/').pop() || 'resume.pdf',
      status: application.status,
      appliedAt: application.createdAt,
      // Education fields from schema
      degree: application.degree || 'Not specified',
      university: application.university || 'Not specified',
      yearOfPassing: application.yearOfPassing || 'Not specified',
      percentage: application.percentage || 'Not specified',
      // Experience fields from schema
      experienceType: application.experienceType || 'fresher',
      companyName: application.companyName || 'Not specified',
      jobTitle: application.jobTitle || 'Not specified',
      workDuration: application.workDuration || 'Not specified',
      // Cover letter from schema
      coverLetter: application.coverLetter || '',
      job: application.job
    }

    return NextResponse.json({
      success: true,
      data: formattedApplication
    })

  } catch (error) {
    console.error("Error fetching application details:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch application details" },
      { status: 500 }
    )
  }
}