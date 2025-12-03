"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import FinmatesHeader from "@/components/header2"
import Footer from "@/components/footer"
import MagneticCursor from "@/components/MagneticCursor"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import { format } from "date-fns"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  author: string
  publishedAt: Date | null
  createdAt: Date
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?published=true")
        const result = await response.json()
        if (result.success) {
          setBlogs(result.data.blogs)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <MagneticCursor />
      <FinmatesHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#003b8d] to-[#008bd0] pt-40 md:pt-32 pb-18 text-white ">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Insights, updates, and expert advice on finance, accounting, and business growth
            </p>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#003b8d]"></div>
              <p className="mt-4 text-muted-foreground">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No blogs available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/blog/${blog.slug}`)}
                >
                  {blog.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blog.publishedAt
                          ? format(new Date(blog.publishedAt), "MMM dd, yyyy")
                          : format(new Date(blog.createdAt), "MMM dd, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.author}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-[#003b8d] group-hover:text-[#008bd0] transition-colors">
                      {blog.title}
                    </h2>
                    {blog.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                    <Button
                      variant="ghost"
                      className="text-[#003b8d] hover:text-[#008bd0] p-0 group"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/blog/${blog.slug}`)
                      }}
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

