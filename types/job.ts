export interface Job {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  location: string
  type: "full-time" | "part-time" | "contract"
  requiredSkills: string[]
  experienceLevel: "entry" | "mid" | "senior"
  expiryDate: string
  department: string
}

export interface JobApplication {
  // Step 1: Basic Details
  name: string
  email: string
  phone: string

  // Step 2: Job Details
  currentPosition: string
  experienceYears: number
  expectedSalary: string
  portfolioLink?: string

  // Step 3: Resume
  resume?: File

  // Meta
  jobId: string
}
