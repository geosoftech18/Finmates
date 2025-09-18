"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { mockLogin, MOCK_ADMIN } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/admin/loading-spinner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const sendVerificationCode = async () => {
    if (!email) {
      setError("Please enter your email address")
      return
    }

    // Check if the email is the admin email
    if (email !== MOCK_ADMIN.email) {
      setError("Access denied. Only authorized admin can access this panel.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()
      if (result.success) {
        setCodeSent(true)
        setError("")
      } else {
        setError(result.message || "Failed to send verification code")
      }
    } catch (err) {
      setError("Failed to send verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 4) {
      setError("Please enter a valid 4-digit verification code")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      })

      const result = await response.json()
      if (result.success) {
        // Use the MOCK_ADMIN data for login
        login(MOCK_ADMIN)
        router.push("/admin")
      } else {
        setError(result.message || "Invalid verification code")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!codeSent) {
      await sendVerificationCode()
    } else {
      await verifyCode()
    }
  }

  const resendCode = async () => {
    await sendVerificationCode()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            {codeSent ? "Enter verification code sent to your email" : "Enter your email to receive verification code"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!codeSent ? (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="1234"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  required
                  disabled={isVerifying}
                  maxLength={4}
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Code sent to: <span className="font-medium">{email}</span>
                </p>
              </div>
            )}
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading || isVerifying}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Sending Code...
                </div>
              ) : isVerifying ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Verifying...
                </div>
              ) : codeSent ? (
                "Verify Code"
              ) : (
                "Send Verification Code"
              )}
            </Button>
            
            {codeSent && (
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resendCode}
                  disabled={isLoading}
                  className="text-sm"
                >
                  Resend Code
                </Button>
              </div>
            )}
          </form>
          
          <div className="mt-4 p-3 bg-muted rounded-md text-sm text-muted-foreground">
            <p className="font-medium">Authorized Admin Email:</p>
            <p className="font-mono">admin@company.com</p>
            <p className="mt-1">Only this email can access the admin panel</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
