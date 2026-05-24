// Mock authentication system
export interface User {
  id: string
  email: string
  name: string
  role: "admin"
}

/** Emails allowed to access the admin panel */
export const ADMIN_EMAILS = [
  "pranavkhandekar152@gmail.com",
  "pinkesh.jain@finmates.in",
  "amarkorade18@gmail.com",
] as const

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase()
}

export function isAuthorizedAdminEmail(email: string) {
  const normalized = normalizeAdminEmail(email)
  return ADMIN_EMAILS.some((adminEmail) => adminEmail === normalized)
}

export function createAdminUser(email: string): User {
  const normalized = normalizeAdminEmail(email)
  return {
    id: normalized,
    email: normalized,
    name: "Admin User",
    role: "admin",
  }
}

// Default admin (first in list) — kept for backward compatibility
export const MOCK_ADMIN: User = createAdminUser(ADMIN_EMAILS[0])

export async function mockLogin(email: string, password: string): Promise<User | null> {
  if (isAuthorizedAdminEmail(email) && password === "admin123") {
    return createAdminUser(email)
  }
  return null
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("admin-user")
  return stored ? JSON.parse(stored) : null
}

export function storeUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("admin-user", JSON.stringify(user))
}

export function clearUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("admin-user")
}
