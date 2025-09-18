import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { AuthGuard } from "@/components/admin/auth-guard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  )
}
