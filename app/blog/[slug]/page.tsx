import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import BlogDetailClient from "./blog-detail-client"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = (await prisma.blog.findUnique({
    where: { slug },
  })) as (null | { title: string; excerpt: string | null; metaTitle?: string | null; metaDescription?: string | null })

  if (!blog) {
    return {
      title: "Blog Not Found | FinMates",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt || "Read this blog on FinMates.",
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogDetailClient slug={slug} />
}

