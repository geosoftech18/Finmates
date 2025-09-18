import { type NextRequest, NextResponse } from "next/server"
import { getVerificationCode, deleteVerificationCode } from "@/lib/verification-codes"

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    // Validate input
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      )
    }

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code is required",
        },
        { status: 400 },
      )
    }

    // Trim and normalize inputs
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedCode = code.trim()

    // Validate code format (4 digits)
    const codeRegex = /^\d{4}$/
    if (!codeRegex.test(trimmedCode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 4-digit verification code",
        },
        { status: 400 },
      )
    }

    // Check if verification code exists for this email
    const storedData = getVerificationCode(trimmedEmail)
    
    if (!storedData) {
      return NextResponse.json(
        {
          success: false,
          message: "No verification code found for this email. Please request a new code.",
        },
        { status: 400 },
      )
    }

    // Check if code has expired
    if (Date.now() > storedData.expiresAt) {
      // Remove expired code
      deleteVerificationCode(trimmedEmail)
      return NextResponse.json(
        {
          success: false,
          message: "Verification code has expired. Please request a new code.",
        },
        { status: 400 },
      )
    }

    // Verify the code
    if (storedData.code !== trimmedCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification code. Please try again.",
        },
        { status: 400 },
      )
    }

    // Code is valid - remove it from storage to prevent reuse
    deleteVerificationCode(trimmedEmail)

    // Log successful verification
    console.log(`Email verified successfully: ${trimmedEmail}`)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      data: {
        email: trimmedEmail,
        verified: true,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Code verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during code verification",
      },
      { status: 500 },
    )
  }
}
