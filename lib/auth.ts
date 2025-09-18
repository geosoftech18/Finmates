// Mock authentication system
export interface User {
  id: string
  email: string
  name: string
  role: "admin"
}

// Mock admin user
export const MOCK_ADMIN: User = {
  id: "1",
  email: "pranavkhandekar152@gmail.com",
  name: "Admin User",
  role: "admin",
}

export async function mockLogin(email: string, password: string): Promise<User | null> {
  // Mock authentication - in real app, this would call an API
  if (email === "pranavkhandekar152@gmail.com" && password === "admin123") {
    return MOCK_ADMIN
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
