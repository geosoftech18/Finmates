export interface Job {
  id: string
  title: string
  description: string
  skills: string[]
  expiryDate: string
  location: string
  type: "full-time" | "part-time" | "contract" | "internship"
  status: "open" | "closed" | "paused"
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  jobId: string
  name: string
  email: string
  phone: string
  currentPosition: string
  experience: string
  expectedSalary: string
  portfolioLink?: string
  resumeFilename: string
  status: "applied" | "shortlisted" | "rejected" | "hired"
  appliedAt: string
}
