import type { Application } from "./types"

// Mock applications data - expanded
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
    jobId: "1",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1-555-0125",
    currentPosition: "Senior Frontend Engineer at BigTech",
    experience: "7 years",
    expectedSalary: "$140,000",
    portfolioLink: "https://mikej.dev",
    resumeFilename: "mike_johnson_resume.pdf",
    status: "applied",
    appliedAt: "2024-01-18",
  },
  {
    id: "4",
    jobId: "1",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1-555-0126",
    currentPosition: "UI/UX Developer at DesignCorp",
    experience: "4 years",
    expectedSalary: "$110,000",
    resumeFilename: "sarah_wilson_resume.pdf",
    status: "rejected",
    appliedAt: "2024-01-15",
  },
  {
    id: "5",
    jobId: "2",
    name: "Alex Chen",
    email: "alex.chen@email.com",
    phone: "+1-555-0127",
    currentPosition: "UX Designer at CreativeStudio",
    experience: "6 years",
    expectedSalary: "$105,000",
    portfolioLink: "https://alexchen.design",
    resumeFilename: "alex_chen_resume.pdf",
    status: "hired",
    appliedAt: "2024-01-12",
  },
  {
    id: "6",
    jobId: "2",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1-555-0128",
    currentPosition: "Product Designer at TechStart",
    experience: "4 years",
    expectedSalary: "$90,000",
    portfolioLink: "https://emilydesigns.com",
    resumeFilename: "emily_rodriguez_resume.pdf",
    status: "shortlisted",
    appliedAt: "2024-01-14",
  },
]

// Application management functions
const applications = [...mockApplications]

export function getApplicationsByJobId(jobId: string): Application[] {
  return applications.filter((app) => app.jobId === jobId)
}

export function updateApplicationStatus(id: string, status: Application["status"]): Application | null {
  const appIndex = applications.findIndex((app) => app.id === id)
  if (appIndex === -1) return null

  applications[appIndex] = {
    ...applications[appIndex],
    status,
  }
  return applications[appIndex]
}

export function bulkUpdateApplicationStatus(ids: string[], status: Application["status"]): Application[] {
  const updatedApps: Application[] = []
  ids.forEach((id) => {
    const appIndex = applications.findIndex((app) => app.id === id)
    if (appIndex !== -1) {
      applications[appIndex] = {
        ...applications[appIndex],
        status,
      }
      updatedApps.push(applications[appIndex])
    }
  })
  return updatedApps
}

// Mock email sending function
export async function sendEmail(to: string[], subject: string, message: string): Promise<boolean> {
  // Mock API call - in real app, this would call an email service
  console.log("Sending email:", { to, subject, message })
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000)
  })
}

// CSV export function
export function exportApplicationsToCSV(applications: Application[]): string {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Current Position",
    "Experience",
    "Expected Salary",
    "Portfolio Link",
    "Resume",
    "Status",
    "Applied Date",
  ]

  const csvContent = [
    headers.join(","),
    ...applications.map((app) =>
      [
        app.name,
        app.email,
        app.phone,
        `"${app.currentPosition}"`,
        app.experience,
        app.expectedSalary,
        app.portfolioLink || "",
        app.resumeFilename,
        app.status,
        new Date(app.appliedAt).toLocaleDateString(),
      ].join(","),
    ),
  ].join("\n")

  return csvContent
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
