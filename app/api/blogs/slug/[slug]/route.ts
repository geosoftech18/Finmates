import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch a single blog by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    const blog = await prisma.blog.findUnique({
      where: { slug: resolvedParams.slug },
    })

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { blog },
    })
  } catch (error: any) {
    console.error("Error fetching blog by slug:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}

