import { type NextRequest, NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import { join } from "path"

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File | null

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, message: "Image file is required." }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Only JPG, PNG or WEBP images are allowed." }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, message: "Image size must be less than 5MB." }, { status: 400 })
    }

    const uploadsDir = join(process.cwd(), "public", "uploads", "blogs")
    await mkdir(uploadsDir, { recursive: true })

    const extension = file.name.split(".").pop() || "jpg"
    const safeName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${extension}`
    const filePath = join(uploadsDir, safeName)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      data: { imageUrl: `/uploads/blogs/${safeName}` },
    })
  } catch (error) {
    console.error("Blog image upload error:", error)
    return NextResponse.json({ success: false, message: "Failed to upload image." }, { status: 500 })
  }
}

