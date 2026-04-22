"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Editor from "@/components/admin/editor"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/admin/loading-spinner"

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    featuredImage: "",
    author: "Admin",
    published: false,
  })
  const [content, setContent] = useState<any>(null)
  const [blogId, setBlogId] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = params instanceof Promise ? await params : params
      setBlogId(resolvedParams.id)
    }
    getId()
  }, [params])

  useEffect(() => {
    if (!blogId) return

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`)
        const result = await response.json()
        if (result.success) {
          const blog = result.data.blog
          setFormData({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt || "",
            featuredImage: blog.featuredImage || "",
            author: blog.author,
            published: blog.published,
          })
          try {
            const parsedContent = typeof blog.content === "string" 
              ? JSON.parse(blog.content) 
              : blog.content
            setContent(parsedContent)
          } catch (e) {
            console.error("Error parsing content:", e)
            setContent(null)
          }
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to fetch blog",
            variant: "destructive",
          })
          router.push("/admin/blogs")
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
        toast({
          title: "Error",
          description: "Failed to fetch blog",
          variant: "destructive",
        })
        router.push("/admin/blogs")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.slug || !content) {
      toast({
        title: "Validation Error",
        description: "Title, slug, and content are required",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      let uploadedImageUrl = formData.featuredImage

      if (imageFile) {
        const imageFormData = new FormData()
        imageFormData.append("image", imageFile)

        const uploadResponse = await fetch("/api/blogs/upload-image", {
          method: "POST",
          body: imageFormData,
        })
        const uploadResult = await uploadResponse.json()

        if (!uploadResult.success) {
          throw new Error(uploadResult.message || "Failed to upload featured image")
        }

        uploadedImageUrl = uploadResult.data.imageUrl
      }

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          featuredImage: uploadedImageUrl,
          content,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Blog updated successfully",
        })
        router.push("/admin/blogs")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update blog",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating blog:", error)
      toast({
        title: "Error",
        description: "Failed to update blog",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background max-w-7xl mx-auto">
        <div className="container mx-auto px-4 py-20">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/admin/blogs")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Blog</h1>
              <p className="text-muted-foreground">Update blog post</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>Edit your blog post content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Enter blog title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="blog-post-slug"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                      }
                      placeholder="Short description for blog listing"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Editor
                      content={content}
                      onChange={setContent}
                      placeholder="Start writing your blog post..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, author: e.target.value }))
                      }
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="featuredImage">Featured Image</Label>
                    <Input
                      id="featuredImage"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    {imageFile ? (
                      <p className="mt-2 text-xs text-muted-foreground">Selected: {imageFile.name}</p>
                    ) : formData.featuredImage ? (
                      <p className="mt-2 text-xs text-muted-foreground">Current image: {formData.featuredImage}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Published</Label>
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, published: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={saving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Update Blog"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/blogs")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

