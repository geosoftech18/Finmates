import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { generateVerificationCode, storeVerificationCode } from "@/lib/verification-codes"

// Create nodemailer transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email input
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      )
    }

    // Trim whitespace
    const trimmedEmail = email.trim().toLowerCase()

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address format",
        },
        { status: 400 },
      )
    }

    // Additional validation checks
    if (trimmedEmail.length > 254) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is too long",
        },
        { status: 400 },
      )
    }

    // Check for common invalid patterns
    const invalidPatterns = [
      /^\./, // starts with dot
      /\.$/, // ends with dot
      /\.\./, // consecutive dots
      /@\./, // @ followed by dot
      /\.@/, // dot followed by @
    ]

    for (const pattern of invalidPatterns) {
      if (pattern.test(trimmedEmail)) {
        return NextResponse.json(
          {
            success: false,
            message: "Please enter a valid email address",
          },
          { status: 400 },
        )
      }
    }

    // Generate verification code
    const verificationCode = generateVerificationCode()

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured, using mock verification")
      // Store verification code for testing
      storeVerificationCode(trimmedEmail, verificationCode, 10)
      
      console.log(`Mock verification code for ${trimmedEmail}: ${verificationCode}`)
      
      return NextResponse.json({
        success: true,
        message: "Verification code sent to your email (check console for mock code)",
        data: {
          email: trimmedEmail,
          codeSent: true,
          timestamp: new Date().toISOString(),
        },
      })
    }

    // Store verification code
    storeVerificationCode(trimmedEmail, verificationCode, 10)

    // Create transporter and send email
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: trimmedEmail,
      subject: "Finmates - Email Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Finmates</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">Email Verification</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; text-align: center;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0;">Your Verification Code</h2>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px;">${verificationCode}</span>
            </div>
            <p style="color: #6b7280; margin: 20px 0 0 0; font-size: 14px;">
              This code will expire in 10 minutes.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Security Notice:</strong> If you didn't request this verification code, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2024 Finmates. All rights reserved.
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    // Log successful email send
    console.log(`Verification code sent to: ${trimmedEmail}`)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email",
      data: {
        email: trimmedEmail,
        codeSent: true,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send verification code. Please try again.",
      },
      { status: 500 },
    )
  }
}

