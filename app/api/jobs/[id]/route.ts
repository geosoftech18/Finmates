import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
    })

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: job,
    })
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while fetching job",
      },
      { status: 500 },
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const {
      title,
      description,
      skills,
      experience,
      expiryDate,
      location,
      type,
      status,
    } = body

    const job = await prisma.job.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(skills && { skills: Array.isArray(skills) ? skills : [skills] }),
        ...(experience && { experience }),
        ...(expiryDate && { expiryDate: new Date(expiryDate) }),
        ...(location && { location }),
        ...(type && { type }),
        ...(status && { status }),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
      data: job,
    })
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while updating job",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.job.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while deleting job",
      },
      { status: 500 },
    )
  }
}