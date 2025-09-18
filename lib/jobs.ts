import type { Job, Application } from "./types"

// Mock jobs data
export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced frontend developer to join our team and work on cutting-edge web applications.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    expiryDate: "2024-12-31",
    location: "San Francisco, CA",
    type: "full-time",
    status: "open",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    description: "Join our design team to create beautiful and intuitive user experiences for our products.",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    expiryDate: "2024-11-30",
    location: "Remote",
    type: "full-time",
    status: "open",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Backend Developer",
    description: "Build scalable backend systems and APIs to support our growing platform.",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
    expiryDate: "2024-10-15",
    location: "New York, NY",
    type: "full-time",
    status: "paused",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-25",
  },
  {
    id: "4",
    title: "Marketing Intern",
    description: "Learn digital marketing while contributing to our marketing campaigns and content creation.",
    skills: ["Social Media", "Content Writing", "Analytics", "SEO"],
    expiryDate: "2024-09-30",
    location: "Los Angeles, CA",
    type: "internship",
    status: "closed",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-30",
  },
]

// Mock applications data
export const mockApplications: Application[] = [
  {
    id: "1",
    jobId: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0123",
    currentPosition: "Frontend Developer at TechCorp",
    experience: "5 years",
    expectedSalary: "$120,000",
    portfolioLink: "https://johndoe.dev",
    resumeFilename: "john_doe_resume.pdf",
    status: "shortlisted",
    appliedAt: "2024-01-20",
  },
  {
    id: "2",
    jobId: "1",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1-555-0124",
    currentPosition: "React Developer at StartupXYZ",
    experience: "3 years",
    expectedSalary: "$95,000",
    portfolioLink: "https://janesmith.portfolio.com",
    resumeFilename: "jane_smith_resume.pdf",
    status: "applied",
    appliedAt: "2024-01-22",
  },
  {
    id: "3",
    jobId: "2",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1-555-0125",
    currentPosition: "UI Designer at DesignStudio",
    experience: "4 years",
    expectedSalary: "$85,000",
    resumeFilename: "mike_johnson_resume.pdf",
    status: "hired",
    appliedAt: "2024-01-18",
  },
]

// Job management functions
const jobs = [...mockJobs]

export function getAllJobs(): Job[] {
  return jobs
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id)
}

export function createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">): Job {
  const newJob: Job = {
    ...jobData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  jobs.push(newJob)
  return newJob
}

export function updateJob(id: string, updates: Partial<Job>): Job | null {
  const jobIndex = jobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return null

  jobs[jobIndex] = {
    ...jobs[jobIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return jobs[jobIndex]
}

export function deleteJob(id: string): boolean {
  const jobIndex = jobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return false

  jobs.splice(jobIndex, 1)
  return true
}

export function updateJobStatus(id: string, status: Job["status"]): Job | null {
  return updateJob(id, { status })
}
