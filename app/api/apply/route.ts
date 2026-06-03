import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateApplicationConfirmationEmail } from "@/lib/email-templates"
import { createMailTransporter, getFromHeader, getOwnerEmail, isMailConfigured } from "@/lib/mail"
import { uploadResumeToSupabase, isSupabaseConfigured } from "@/lib/supabase-storage"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    console.log("Apply API called - processing application")
    
    const formData = await request.formData()

    // Extract form fields
    const applicationData = {
      jobId: formData.get("jobId") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      currentPosition: formData.get("currentPosition") as string,
      experienceYears: Number.parseInt(formData.get("experienceYears") as string) || 0,
      expectedSalary: formData.get("expectedSalary") as string,
      portfolioLink: formData.get("portfolioLink") as string,
      degree: formData.get("degree") as string,
      university: formData.get("university") as string,
      yearOfPassing: formData.get("yearOfPassing") as string,
      percentage: formData.get("percentage") as string,
      experienceType: formData.get("experienceType") as string,
      companyName: formData.get("companyName") as string,
      jobTitle: formData.get("jobTitle") as string,
      workDuration: formData.get("workDuration") as string,
      coverLetter: formData.get("coverLetter") as string,
      resume: formData.get("resume") as File,
    }

    console.log("Form data received:", {
      jobId: applicationData.jobId,
      name: applicationData.name,
      email: applicationData.email,
      hasResume: !!applicationData.resume
    })

    // Basic validation
    const requiredFields = ["jobId", "name", "email", "phone", "currentPosition", "expectedSalary"]
    const missingFields = requiredFields.filter((field) => !applicationData[field as keyof typeof applicationData])

    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Validate resume file
    if (!applicationData.resume || applicationData.resume.size === 0) {
      console.log("No resume file provided")
      return NextResponse.json(
        {
          success: false,
          message: "Resume file is required",
        },
        { status: 400 },
      )
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(applicationData.resume.type)) {
      console.log("Invalid file type:", applicationData.resume.type)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type. Please upload a PDF or DOC file.",
        },
        { status: 400 },
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (applicationData.resume.size > maxSize) {
      console.log("File too large:", applicationData.resume.size)
      return NextResponse.json(
        {
          success: false,
          message: "File size too large. Please upload a file smaller than 10MB.",
        },
        { status: 400 },
      )
    }

    // Verify job exists
    const job = await prisma.job.findUnique({
      where: { id: applicationData.jobId },
    })

    if (!job) {
      console.log("Job not found:", applicationData.jobId)
      return NextResponse.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 },
      )
    }

    console.log("Job found:", job.title)

    // Save resume file to Supabase storage or local filesystem
    const resumeUrl = await saveResumeFile(applicationData.resume, applicationData.email)

    // Save application to database
    const jobApplication = await prisma.jobApplication.create({
      data: {
        jobId: applicationData.jobId,
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        position: job.title,
        coverLetter: applicationData.coverLetter || null,
        resumeUrl: resumeUrl,
        currentPosition: applicationData.currentPosition,
        experienceYears: applicationData.experienceYears,
        expectedSalary: applicationData.expectedSalary,
        portfolioLink: applicationData.portfolioLink || null,
        degree: applicationData.degree || null,
        university: applicationData.university || null,
        yearOfPassing: applicationData.yearOfPassing || null,
        percentage: applicationData.percentage || null,
        experienceType: applicationData.experienceType || "fresher",
        companyName: applicationData.companyName || null,
        jobTitle: applicationData.jobTitle || null,
        workDuration: applicationData.workDuration || null,
        status: "applied",
      },
    })

    console.log("Application saved successfully:", jobApplication.id)

    // Send owner notification and applicant confirmation emails
    try {
      await sendOwnerNotificationEmail({
        applicantName: applicationData.name,
        applicantEmail: applicationData.email,
        applicantPhone: applicationData.phone,
        jobTitle: job.title,
        applicationId: jobApplication.id,
        currentPosition: applicationData.currentPosition,
        experienceYears: applicationData.experienceYears,
        expectedSalary: applicationData.expectedSalary,
      })
      await sendConfirmationEmail({
        applicantName: applicationData.name,
        applicantEmail: applicationData.email,
        jobTitle: job.title,
        applicationId: jobApplication.id,
        submittedAt: jobApplication.createdAt.toISOString(),
        currentPosition: applicationData.currentPosition,
        experienceYears: applicationData.experienceYears,
        expectedSalary: applicationData.expectedSalary,
        degree: applicationData.degree,
        university: applicationData.university,
        yearOfPassing: applicationData.yearOfPassing,
        percentage: applicationData.percentage,
        experienceType: applicationData.experienceType,
        companyName: applicationData.companyName,
        previousJobTitle: applicationData.jobTitle,
        workDuration: applicationData.workDuration,
        portfolioLink: applicationData.portfolioLink,
      })
      console.log("Confirmation email sent successfully")
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the application if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! You will receive a confirmation email shortly.",
      data: {
        applicationId: jobApplication.id,
        jobId: applicationData.jobId,
        applicantName: applicationData.name,
        applicantEmail: applicationData.email,
        submittedAt: jobApplication.createdAt.toISOString(),
        status: "applied",
        resumeUrl: resumeUrl,
        nextSteps: [
          "Your application has been received and is under review",
          "Our HR team will contact you within 3-5 business days",
          "You will receive updates via email at the provided address",
        ],
      },
    })
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during application submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

type ApplicationEmailData = {
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  jobTitle: string
  applicationId: string
  currentPosition: string
  experienceYears: number
  expectedSalary: string
}

function getOwnerNotificationHtml(data: ApplicationEmailData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; color: #111827;">
      <h2 style="margin: 0 0 8px; color: #003b8d;">New Job Application</h2>
      <p style="margin: 0 0 20px; color: #4b5563;">A candidate submitted a job application on the website.</p>
      <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
        <p style="margin: 0 0 10px;"><strong>Application ID:</strong> ${data.applicationId}</p>
        <p style="margin: 0 0 10px;"><strong>Position:</strong> ${data.jobTitle}</p>
        <p style="margin: 0 0 10px;"><strong>Name:</strong> ${data.applicantName}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${data.applicantEmail}</p>
        <p style="margin: 0 0 10px;"><strong>Phone:</strong> ${data.applicantPhone}</p>
        <p style="margin: 0 0 10px;"><strong>Current Position:</strong> ${data.currentPosition}</p>
        <p style="margin: 0 0 10px;"><strong>Experience:</strong> ${data.experienceYears} years</p>
        <p style="margin: 0;"><strong>Expected Salary:</strong> ${data.expectedSalary}</p>
      </div>
    </div>
  `
}

async function sendOwnerNotificationEmail(data: ApplicationEmailData) {
  if (!isMailConfigured()) {
    console.warn("SMTP credentials not configured, skipping owner notification email")
    return
  }

  const transporter = createMailTransporter()

  await transporter.sendMail({
    from: getFromHeader(),
    to: getOwnerEmail(),
    subject: `New Job Application: ${data.jobTitle} — ${data.applicantName}`,
    html: getOwnerNotificationHtml(data),
    replyTo: data.applicantEmail,
  })

  console.log(`Owner notification sent for application: ${data.applicationId}`)
}

async function sendConfirmationEmail(applicationData: Parameters<typeof generateApplicationConfirmationEmail>[0]) {
  if (!isMailConfigured()) {
    console.warn("SMTP credentials not configured, skipping confirmation email")
    return
  }

  const transporter = createMailTransporter()
  const { subject, html } = generateApplicationConfirmationEmail(applicationData)

  await transporter.sendMail({
    from: getFromHeader(),
    to: applicationData.applicantEmail,
    subject,
    html,
  })

  console.log(`Confirmation email sent to: ${applicationData.applicantEmail}`)
}

// Save resume file to Supabase storage or local filesystem
async function saveResumeFile(file: File, email: string): Promise<string> {
  // Try Supabase first if configured
  if (isSupabaseConfigured()) {
    try {
      console.log("Attempting to upload resume to Supabase Storage...")
      const result = await uploadResumeToSupabase(file, email)
      console.log("Successfully uploaded to Supabase Storage")
      return result.publicUrl
    } catch (supabaseError) {
      console.warn("Supabase upload failed, falling back to local storage:", supabaseError)
      // Fall through to local storage
    }
  }
  
  // Fallback to local storage
  try {
    console.log("Using local storage for resume upload")
    return await saveResumeFileLocally(file, email)
  } catch (error) {
    console.error("Error saving resume file locally:", error)
    throw new Error("Failed to save resume file. Please try again.")
  }
}

// Save resume file to local filesystem (fallback)
async function saveResumeFileLocally(file: File, email: string): Promise<string> {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "resumes")
    await mkdir(uploadsDir, { recursive: true })

    // Generate unique filename with timestamp and email
    const timestamp = Date.now()
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9@.-]/g, "_")
    const fileExtension = file.name.split('.').pop()
    const fileName = `${sanitizedEmail}_${timestamp}.${fileExtension}`
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Write file to filesystem
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Return the public URL path
    const publicUrl = `/uploads/resumes/${fileName}`
    console.log(`Resume saved locally to: ${filePath}`)
    console.log(`Public URL: ${publicUrl}`)
    
    return publicUrl
  } catch (error) {
    console.error("Error saving resume file locally:", error)
    throw new Error("Failed to save resume file locally")
  }
}