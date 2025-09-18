import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// PUT /api/applications/bulk-update - Bulk update application statuses
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationIds, status } = body

    if (!Array.isArray(applicationIds) || applicationIds.length === 0) {
      return NextResponse.json({ error: "Invalid application IDs" }, { status: 400 })
    }

    const updatedApplications = await prisma.application.updateMany({
      where: {
        id: {
          in: applicationIds,
        },
      },
      data: {
        status: status.toUpperCase(),
      },
    })

    return NextResponse.json({
      message: `${updatedApplications.count} applications updated successfully`,
      count: updatedApplications.count,
    })
  } catch (error) {
    console.error("Error bulk updating applications:", error)
    return NextResponse.json({ error: "Failed to bulk update applications" }, { status: 500 })
  }
}
