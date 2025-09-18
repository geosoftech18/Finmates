"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Allow access to login page without authentication
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (!isLoading && !user && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [user, isLoading, router, isLoginPage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Allow login page to render without authentication
  if (isLoginPage) {
    return <>{children}</>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
