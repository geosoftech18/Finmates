"use client"

import { useState } from "react"
import type { Job } from "@/types/job"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Building } from "lucide-react"

interface JobsCarouselProps {
  jobs: Job[]
  onJobClick: (job: Job) => void
}

export function JobsCarousel({ jobs, onJobClick }: JobsCarouselProps) {
  const [hoveredJob, setHoveredJob] = useState<string | null>(null)

  const getTypeColor = (type: Job["type"]) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "part-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "contract":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatType = (type: Job["type"]) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="w-full">
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50 hover:border-primary/20"
            onMouseEnter={() => setHoveredJob(job.id)}
            onMouseLeave={() => setHoveredJob(null)}
            onClick={() => onJobClick(job)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {job.title}
                </CardTitle>
                <Badge className={`${getTypeColor(job.type)} text-xs font-medium shrink-0`}>
                  {formatType(job.type)}
                </Badge>
              </div>
              <CardDescription className="text-muted-foreground line-clamp-2 leading-relaxed">
                {job.shortDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Location and Department */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{job.department}</span>
                  </div>
                </div>

                {/* Experience Level */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="capitalize">{job.experienceLevel} Level</span>
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{job.requiredSkills.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Read More Button - Shows on Hover */}
                <div
                  className={`transition-all duration-300 ${
                    hoveredJob === job.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="flex-none w-80 cursor-pointer transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/20 snap-start"
              onClick={() => onJobClick(job)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">{job.title}</CardTitle>
                  <Badge className={`${getTypeColor(job.type)} text-xs font-medium shrink-0`}>
                    {formatType(job.type)}
                  </Badge>
                </div>
                <CardDescription className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {job.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Location and Department */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>{job.department}</span>
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="capitalize">{job.experienceLevel} Level</span>
                  </div>

                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.requiredSkills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.requiredSkills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
