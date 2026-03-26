import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
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

function getAdminEmailHtml(data: ContactPayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #111827;">
      <h2 style="margin: 0 0 8px; color: #003b8d;">New Contact Form Submission</h2>
      <p style="margin: 0 0 20px; color: #4b5563;">A user submitted the Contact Us form.</p>
      <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
        <p style="margin: 0 0 10px;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 0 0 10px;"><strong>Subject:</strong> ${data.subject}</p>
        <p style="margin: 0;"><strong>Message:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>
      </div>
    </div>
  `
}

function getUserConfirmationHtml(data: ContactPayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #111827;">
      <div style="background: linear-gradient(135deg, #003b8d 0%, #008bd0 100%); border-radius: 12px; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0 0 8px;">Thanks for contacting us, ${data.name}!</h2>
        <p style="margin: 0; color: #dbeafe;">We have received your message and our team will get back to you soon.</p>
      </div>
      <div style="margin-top: 20px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
        <p style="margin: 0 0 10px;"><strong>Subject:</strong> ${data.subject}</p>
        <p style="margin: 0;"><strong>Your Message:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>
      </div>
      <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">This is an automated confirmation from FinMates.</p>
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>
    const name = body.name?.trim() || ""
    const email = body.email?.trim().toLowerCase() || ""
    const subject = body.subject?.trim() || ""
    const message = body.message?.trim() || ""

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 })
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

    const transporter = createTransporter()
    const adminEmail = getAdminEmail()
    const fromAddress = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "noreply@finmates.in"

    await transporter.sendMail({
      from: `FinMates <${fromAddress}>`,
      to: adminEmail,
      subject: `Contact Form: ${subject}`,
      html: getAdminEmailHtml({ name, email, subject, message }),
    })

    await transporter.sendMail({
      from: `FinMates <${fromAddress}>`,
      to: email,
      subject: "We received your message - FinMates",
      html: getUserConfirmationHtml({ name, email, subject, message }),
    })

    return NextResponse.json({
      success: true,
      message: "Thanks! Your message has been submitted successfully.",
    })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit message. Please try again." }, { status: 500 })
  }
}

