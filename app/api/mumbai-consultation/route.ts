import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const SERVICE_NAME = "CFO Services"
const INQUIRY_SOURCE = "Mumbai City Page — Free CFO Consultation"

type MumbaiConsultationPayload = {
  name: string
  email: string
  phone: string
  company: string
}

function createTransporter() {
  const allowSelfSigned = process.env.SMTP_ALLOW_SELF_SIGNED === "true"

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
  })
}

function getAdminEmail() {
  return process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || process.env.SMTP_USER || "info@finmates.in"
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function getAdminEmailHtml(data: MumbaiConsultationPayload) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const phone = escapeHtml(data.phone)
  const company = escapeHtml(data.company)

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #111827;">
      <h2 style="margin: 0 0 8px; color: #003b8d;">New ${SERVICE_NAME} Inquiry</h2>
      <p style="margin: 0 0 20px; color: #4b5563;">${INQUIRY_SOURCE}</p>
      <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
        <p style="margin: 0 0 10px;"><strong>Service:</strong> ${SERVICE_NAME}</p>
        <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 0 0 10px;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin: 0;"><strong>Company:</strong> ${company}</p>
      </div>
    </div>
  `
}

function getUserConfirmationHtml(data: MumbaiConsultationPayload) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const phone = escapeHtml(data.phone)
  const company = escapeHtml(data.company)

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #111827;">
      <div style="background: linear-gradient(135deg, #003b8d 0%, #008bd0 100%); border-radius: 12px; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0 0 8px;">Thank you, ${name}!</h2>
        <p style="margin: 0; color: #dbeafe;">We have received your ${SERVICE_NAME} consultation request. Our team will contact you within 2 business hours.</p>
      </div>
      <div style="margin-top: 20px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
        <p style="margin: 0 0 10px;"><strong>Service:</strong> ${SERVICE_NAME}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 0 0 10px;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin: 0;"><strong>Company:</strong> ${company}</p>
      </div>
      <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">This is an automated confirmation from FinMates.</p>
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<MumbaiConsultationPayload>
    const name = body.name?.trim() || ""
    const email = body.email?.trim().toLowerCase() || ""
    const phone = body.phone?.trim() || ""
    const company = body.company?.trim() || ""

    if (!name || !email || !phone || !company) {
      return NextResponse.json(
        { success: false, message: "Name, email, phone and company are required." },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 })
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { success: false, message: "Email service is not configured. Please contact support." },
        { status: 500 },
      )
    }

    const payload: MumbaiConsultationPayload = { name, email, phone, company }
    const transporter = createTransporter()
    const adminEmail = getAdminEmail()
    const fromAddress = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "noreply@finmates.in"

    await transporter.sendMail({
      from: `FinMates <${fromAddress}>`,
      to: adminEmail,
      subject: `${SERVICE_NAME} Inquiry: ${name} — Mumbai Consultation`,
      html: getAdminEmailHtml(payload),
      replyTo: email,
    })

    await transporter.sendMail({
      from: `FinMates <${fromAddress}>`,
      to: email,
      subject: "We received your CFO consultation request - FinMates",
      html: getUserConfirmationHtml(payload),
    })

    return NextResponse.json({
      success: true,
      message: "Thanks! Your consultation request has been submitted successfully.",
    })
  } catch (error) {
    console.error("Mumbai consultation submission error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit consultation request. Please try again." },
      { status: 500 },
    )
  }
}
