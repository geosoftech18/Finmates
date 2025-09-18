import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type

    // Get jobs with pagination
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.job.count({ where }),
    ])

    // Map database fields to frontend Job type
    const mappedJobs = jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      shortDescription: job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description,
      fullDescription: job.description,
      location: job.location,
      type: job.type as "full-time" | "part-time" | "contract",
      requiredSkills: job.skills,
      experienceLevel: job.experience.includes('senior') || job.experience.includes('5+') ? 'senior' : 
                      job.experience.includes('mid') || job.experience.includes('3-5') ? 'mid' : 'entry',
      expiryDate: job.expiryDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      department: 'General', // Default department since it's not in the database schema
      status: job.status, // Include the actual status from database
    }))

    return NextResponse.json({
      success: true,
      data: {
        jobs: mappedJobs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while fetching jobs",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      title,
      description,
      skills,
      experience,
      expiryDate,
      location,
      type,
      status = 'open',
    } = body

    // Validate required fields
    const requiredFields = ['title', 'description', 'skills', 'experience', 'expiryDate', 'location', 'type']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 },
      )
    }

    // Create job
    const job = await prisma.job.create({
      data: {
        title,
        description,
        skills: Array.isArray(skills) ? skills : [skills],
        experience,
        expiryDate: new Date(expiryDate),
        location,
        type,
        status,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Job created successfully",
      data: job,
    })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while creating job",
      },
      { status: 500 },
    )
  }
}