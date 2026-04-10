import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch all blogs (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    const where: any = {}
    if (published === "true") {
      where.published = true
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined,
    })

    return NextResponse.json({
      success: true,
      data: { blogs },
    })
  } catch (error: any) {
    console.error("Error fetching blogs:", error)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

// POST - Create a new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, metaTitle, metaDescription, excerpt, content, featuredImage, author, published } = body

    if (!title || !slug || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, slug, and content are required",
        },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    })

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists",
        },
        { status: 400 }
      )
    }

    // Ensure content is a string (JSON)
    const contentString = typeof content === "string" ? content : JSON.stringify(content)

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        excerpt: excerpt || null,
        content: contentString,
        featuredImage: featuredImage || null,
        author: author || "Admin",
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json({
      success: true,
      data: { blog },
    })
  } catch (error: any) {
    console.error("Error creating blog:", error)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

