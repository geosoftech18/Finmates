import type { Job } from "@/types/job"

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    shortDescription: "Build amazing user experiences with React and TypeScript",
    fullDescription:
      "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing and maintaining high-quality web applications using modern technologies like React, TypeScript, and Next.js. The ideal candidate should have strong problem-solving skills and experience with responsive design.",
    location: "San Francisco, CA",
    type: "full-time",
    requiredSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git"],
    experienceLevel: "senior",
    expiryDate: "2024-12-31",
    department: "Engineering",
  },
  {
    id: "2",
    title: "Product Manager",
    shortDescription: "Drive product strategy and work with cross-functional teams",
    fullDescription:
      "Join our product team as a Product Manager where you will define product roadmaps, gather requirements, and work closely with engineering and design teams. You should have experience in agile methodologies and strong analytical skills to make data-driven decisions.",
    location: "New York, NY",
    type: "full-time",
    requiredSkills: ["Product Strategy", "Agile", "Analytics", "User Research", "Roadmapping"],
    experienceLevel: "mid",
    expiryDate: "2024-11-30",
    department: "Product",
  },
  {
    id: "3",
    title: "UX Designer",
    shortDescription: "Create intuitive and beautiful user interfaces",
    fullDescription:
      "We are seeking a talented UX Designer to create exceptional user experiences. You will conduct user research, create wireframes and prototypes, and collaborate with developers to bring designs to life. Experience with design systems and accessibility is a plus.",
    location: "Remote",
    type: "full-time",
    requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
    experienceLevel: "mid",
    expiryDate: "2024-12-15",
    department: "Design",
  },
  {
    id: "4",
    title: "Backend Developer",
    shortDescription: "Build scalable APIs and backend systems",
    fullDescription:
      "Looking for a Backend Developer to design and implement robust server-side applications. You will work with databases, APIs, and cloud services to ensure our applications are fast, secure, and scalable. Experience with Node.js and cloud platforms is required.",
    location: "Austin, TX",
    type: "full-time",
    requiredSkills: ["Node.js", "PostgreSQL", "AWS", "Docker", "REST APIs"],
    experienceLevel: "mid",
    expiryDate: "2025-01-15",
    department: "Engineering",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    shortDescription: "Drive growth through digital marketing campaigns",
    fullDescription:
      "Join our marketing team to develop and execute digital marketing strategies. You will manage social media campaigns, create content, analyze performance metrics, and work on SEO optimization. Creative thinking and analytical skills are essential.",
    location: "Los Angeles, CA",
    type: "part-time",
    requiredSkills: ["Digital Marketing", "SEO", "Content Creation", "Analytics", "Social Media"],
    experienceLevel: "entry",
    expiryDate: "2024-11-20",
    department: "Marketing",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    shortDescription: "Manage infrastructure and deployment pipelines",
    fullDescription:
      "We need a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You will work with containerization, monitoring systems, and automation tools to ensure reliable and efficient deployments. Experience with Kubernetes and monitoring tools is preferred.",
    location: "Seattle, WA",
    type: "full-time",
    requiredSkills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Monitoring"],
    experienceLevel: "senior",
    expiryDate: "2024-12-20",
    department: "Engineering",
  },
]
