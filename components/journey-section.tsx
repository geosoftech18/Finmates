"use client"

import { useState } from "react"
import { TimelineCarousel, type TimelineItem } from "@/components/timeline-carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function JourneySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const items: TimelineItem[] = [
    {
      year: 2018,
      title: "Inception",
      subtitle: "Active",
      tone: "blue",
      description:
        "The FinMates journey began with a vision to redefine financial solutions, guided by founder Pinkesh Jain's expertise.",
    },
    {
      year: 2021,
      title: "Early Growth",
      subtitle: "Growing",
      tone: "green",
      description: "Expanded our client base and established key partnerships in the financial sector.",
    },
    {
      year: 2022,
      title: "Milestones",
      subtitle: "Achieved",
      tone: "purple",
      description: "Achieved significant milestones in IPO facilitation and equity fundraising.",
    },
    {
      year: 2023,
      title: "Global Impact",
      subtitle: "Global",
      tone: "orange",
      description: "Extended our reach globally, impacting diverse industries and markets.",
    },
    {
      year: 2024,
      title: "Next Horizon",
      subtitle: "AI rollouts",
      tone: "blue",
      description: "AI-assisted capabilities introduced across workflows.",
    },
    {
      year: 2025,
      title: "Global Reach",
      subtitle: "Ecosystem",
      tone: "green",
      description: "Deeper ecosystem integrations and partnerships.",
    },
    {
      year: 2026,
      title: "Innovation",
      subtitle: "New",
      tone: "orange",
      description: "New categories and experiences expand the platform.",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <section className="bg-gray-50 py-36 md:py-28">
      <div className="relative overflow-visible w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Timeline - Keep Original */}
        <div className="hidden md:block">
          <TimelineCarousel items={items} heading="Our Journey" />
        </div>

        {/* Mobile Carousel - New Simple Version */}
        <div className="md:hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Journey</h2>
          </div>

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Next milestone"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Carousel Content */}
            <div className="bg-white rounded-lg shadow-md p-6 mx-8">
              <div className="text-center">
                {/* Year */}
                <div className="text-3xl font-bold text-blue-600 mb-2">{items[currentIndex].year}</div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{items[currentIndex].title}</h3>
                
                {/* Subtitle */}
                <div className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {items[currentIndex].subtitle}
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {items[currentIndex].description}
                </p>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-blue-500 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
