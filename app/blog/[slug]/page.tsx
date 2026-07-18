import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import BlogDetailClient from "./blog-detail-client"
import JsonLd from "@/components/seo/JsonLd"
import { pageCanonical } from "@/lib/seo"
import { buildBlogPostingJsonLd } from "@/lib/seo-schemas"

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
    ...pageCanonical(`/blog/${slug}`),
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const blog = await prisma.blog.findUnique({
    where: { slug },
  })

  const articleSchema =
    blog &&
    buildBlogPostingJsonLd({
      title: blog.title,
      description: blog.excerpt || blog.title,
      slug: blog.slug,
      author: blog.author,
      image: blog.featuredImage,
      publishedAt: blog.publishedAt || blog.createdAt,
      modifiedAt: blog.updatedAt || blog.publishedAt || blog.createdAt,
    })

  return (
    <>
      {articleSchema && <JsonLd data={articleSchema} />}
      <BlogDetailClient slug={slug} />
    </>
  )
}
