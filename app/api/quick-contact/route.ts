import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

type QuickContactPayload = {
  name: string
  email: string
  phone: string
  service: string
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function getAdminEmail() {
  return "info@finmates.in"
}

function getAdminEmailHtml(data: QuickContactPayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #111827;">
      <h2 style="margin: 0 0 8px; color: #003b8d;">New Quick Form Enquiry</h2>
      <p style="margin: 0 0 20px; color: #4b5563;">A visitor has submitted the quick form on the home page.</p>
      <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
        <p style="margin: 0 0 10px;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 0 0 10px;"><strong>Phone:</strong> ${data.phone}</p>
        <p style="margin: 0;"><strong>Service:</strong> ${data.service}</p>
      </div>
    </div>
  `
}

function getUserConfirmationHtml(data: QuickContactPayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #111827;">
      <div style="background: linear-gradient(135deg, #003b8d 0%, #008bd0 100%); border-radius: 12px; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0 0 8px;">Thanks for reaching out, ${data.name}!</h2>
        <p style="margin: 0; color: #dbeafe;">We have received your details. Our team will contact you shortly.</p>
      </div>
      <div style="margin-top: 20px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
        <p style="margin: 0 0 10px;"><strong>Submitted Email:</strong> ${data.email}</p>
        <p style="margin: 0 0 10px;"><strong>Submitted Phone:</strong> ${data.phone}</p>
        <p style="margin: 0;"><strong>Selected Service:</strong> ${data.service}</p>
      </div>
      <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">This is an automated confirmation from FinMates.</p>
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<QuickContactPayload>
    const name = body.name?.trim() || ""
    const email = body.email?.trim().toLowerCase() || ""
    const phone = body.phone?.trim() || ""
    const service = body.service?.trim() || ""

    if (!name || !email || !phone || !service) {
      return NextResponse.json({ success: false, message: "Name, email, phone and service are required." }, { status: 400 })
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
      subject: "New Quick Form enquiry from website",
      html: getAdminEmailHtml({ name, email, phone, service }),
    })

    await transporter.sendMail({
      from: `FinMates <${fromAddress}>`,
      to: email,
      subject: "We received your enquiry - FinMates",
      html: getUserConfirmationHtml({ name, email, phone, service }),
    })

    return NextResponse.json({
      success: true,
      message: "Thanks! Your enquiry has been submitted successfully.",
    })
  } catch (error) {
    console.error("Quick contact submission error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit enquiry. Please try again." }, { status: 500 })
  }
}
