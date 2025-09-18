// API client functions for database operations
import type { Job, Application } from "./types"

const API_BASE = "/api"

// Job API functions
export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE}/jobs`)
  if (!response.ok) throw new Error("Failed to fetch jobs")
  return response.json()
}

export async function fetchJob(id: string): Promise<Job> {
  const response = await fetch(`${API_BASE}/jobs/${id}`)
  if (!response.ok) throw new Error("Failed to fetch job")
  return response.json()
}

export async function createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">): Promise<Job> {
  const response = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  })
  if (!response.ok) throw new Error("Failed to create job")
  return response.json()
}

export async function updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
  const response = await fetch(`${API_BASE}/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  })
  if (!response.ok) throw new Error("Failed to update job")
  return response.json()
}

export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/jobs/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Failed to delete job")
}

// Application API functions
export async function fetchApplications(jobId: string): Promise<Application[]> {
  const response = await fetch(`${API_BASE}/jobs/${jobId}/applications`)
  if (!response.ok) throw new Error("Failed to fetch applications")
  return response.json()
}

export async function updateApplicationStatus(id: string, status: Application["status"]): Promise<Application> {
  const response = await fetch(`${API_BASE}/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) throw new Error("Failed to update application status")
  return response.json()
}

export async function bulkUpdateApplicationStatus(
  applicationIds: string[],
  status: Application["status"],
): Promise<{ count: number }> {
  const response = await fetch(`${API_BASE}/applications/bulk-update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicationIds, status }),
  })
  if (!response.ok) throw new Error("Failed to bulk update applications")
  return response.json()
}
