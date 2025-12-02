import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch a single blog by ID (for admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    const blog = await prisma.blog.findUnique({
      where: { id: resolvedParams.id },
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
    console.error("Error fetching blog:", error)
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

// PUT - Update a blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    const body = await request.json()
    const { title, slug, excerpt, content, featuredImage, author, published } = body

    // Check if slug is being changed and if it conflicts
    if (slug) {
      const existingBlog = await prisma.blog.findUnique({
        where: { slug },
      })

      if (existingBlog && existingBlog.id !== resolvedParams.id) {
        return NextResponse.json(
          {
            success: false,
            message: "A blog with this slug already exists",
          },
          { status: 400 }
        )
      }
    }

    const updateData: any = {}
    if (title) updateData.title = title
    if (slug) updateData.slug = slug
    if (excerpt !== undefined) updateData.excerpt = excerpt || null
    if (content) {
      // Ensure content is a string (JSON)
      updateData.content = typeof content === "string" ? content : JSON.stringify(content)
    }
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage || null
    if (author) updateData.author = author
    if (published !== undefined) {
      updateData.published = published
      if (published) {
        updateData.publishedAt = new Date()
      }
    }

    const blog = await prisma.blog.update({
      where: { id: resolvedParams.id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: { blog },
    })
  } catch (error: any) {
    console.error("Error updating blog:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    await prisma.blog.delete({
      where: { id: resolvedParams.id },
    })

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting blog:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}

