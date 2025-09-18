import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample jobs
  const jobs = [
    {
      title: "Senior Frontend Developer",
      description: "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing and maintaining high-quality web applications using modern technologies like React, TypeScript, and Next.js. The ideal candidate should have strong problem-solving skills and experience with responsive design.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git"],
      experience: "3-5 years",
      expiryDate: new Date("2024-12-31"),
      location: "San Francisco, CA",
      type: "full-time",
      status: "open",
    },
    {
      title: "Product Manager",
      description: "Join our product team as a Product Manager where you will define product roadmaps, gather requirements, and work closely with engineering and design teams. You should have experience in agile methodologies and strong analytical skills to make data-driven decisions.",
      skills: ["Product Strategy", "Agile", "Analytics", "User Research", "Roadmapping"],
      experience: "2-4 years",
      expiryDate: new Date("2024-11-30"),
      location: "New York, NY",
      type: "full-time",
      status: "open",
    },
    {
      title: "UX Designer",
      description: "We are seeking a talented UX Designer to create exceptional user experiences. You will conduct user research, create wireframes and prototypes, and collaborate with developers to bring designs to life. Experience with design systems and accessibility is a plus.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
      experience: "1-3 years",
      expiryDate: new Date("2024-12-15"),
      location: "Remote",
      type: "full-time",
      status: "open",
    },
    {
      title: "Backend Developer",
      description: "Looking for a Backend Developer to design and implement robust server-side applications. You will work with databases, APIs, and cloud services to ensure our applications are fast, secure, and scalable. Experience with Node.js and cloud platforms is required.",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "REST APIs"],
      experience: "2-4 years",
      expiryDate: new Date("2025-01-15"),
      location: "Austin, TX",
      type: "full-time",
      status: "open",
    },
    {
      title: "Marketing Specialist",
      description: "Join our marketing team to develop and execute digital marketing strategies. You will manage social media campaigns, create content, analyze performance metrics, and work on SEO optimization. Creative thinking and analytical skills are essential.",
      skills: ["Digital Marketing", "SEO", "Content Creation", "Analytics", "Social Media"],
      experience: "0-2 years",
      expiryDate: new Date("2024-11-20"),
      location: "Los Angeles, CA",
      type: "part-time",
      status: "open",
    },
    {
      title: "DevOps Engineer",
      description: "We need a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You will work with containerization, monitoring systems, and automation tools to ensure reliable and efficient deployments. Experience with Kubernetes and monitoring tools is preferred.",
      skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Monitoring"],
      experience: "3-5 years",
      expiryDate: new Date("2024-12-20"),
      location: "Seattle, WA",
      type: "full-time",
      status: "open",
    },
  ]

  // Clear existing jobs
  await prisma.jobApplication.deleteMany()
  await prisma.job.deleteMany()

  // Create jobs
  for (const jobData of jobs) {
    await prisma.job.create({
      data: jobData,
    })
  }

  console.log(`✅ Created ${jobs.length} jobs`)
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
