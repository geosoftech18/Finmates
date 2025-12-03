"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import FinmatesHeader from "@/components/header2"
import Footer from "@/components/footer"
import MagneticCursor from "@/components/MagneticCursor"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { format } from "date-fns"

// Dynamically import TipTap to avoid SSR issues
const TipTapViewer = dynamic(
  () => import("@/components/blog/TipTapViewer"),
  { 
    ssr: false,
    loading: () => <div className="prose prose-lg max-w-none">Loading content...</div>
  }
)

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  author: string
  publishedAt: Date | null
  createdAt: Date
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = params instanceof Promise ? await params : params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/slug/${slug}`)
        const result = await response.json()
        if (result.success) {
          const blogData = result.data.blog
          setBlog(blogData)
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <MagneticCursor />
        <FinmatesHeader />
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#003b8d]"></div>
          <p className="mt-4 text-muted-foreground">Loading blog...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-background">
        <MagneticCursor />
        <FinmatesHeader />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/blog")}>Back to Blogs</Button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <MagneticCursor />
      <FinmatesHeader />

      {/* Blog Header */}
      <section className="relative bg-gradient-to-r from-[#003b8d] to-[#008bd0] text-white mt-24 pb-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button
            variant="ghost"
            className="mb-6 text-white hover:bg-white/20"
            onClick={() => router.push("/blog")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blogs
          </Button>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {blog.publishedAt
                ? format(new Date(blog.publishedAt), "MMMM dd, yyyy")
                : format(new Date(blog.createdAt), "MMMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {blog.author}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="container mx-auto px-6 max-w-4xl -mt-8 mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl ">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto  px-6 max-w-4xl">
          {blog && blog.content && (
            <TipTapViewer content={blog.content} />
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

