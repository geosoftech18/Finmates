"use client"

import { TimelineCarousel, type TimelineItem } from "@/components/timeline-carousel"

export default function JourneySection() {
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

  return (
    <section className="bg-gray-50 py-36 md:py-28">
      <div className="relative overflow-visible w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TimelineCarousel items={items} heading="Our Journey" />
      </div>
    </section>
  )
}
