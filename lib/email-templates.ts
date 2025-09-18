interface ApplicationData {
  applicantName: string
  applicantEmail: string
  jobTitle: string
  applicationId: string
  submittedAt: string
  currentPosition: string
  experienceYears: number
  expectedSalary: string
  degree: string
  university: string
  yearOfPassing: string
  percentage: string
  experienceType: string
  companyName?: string
  previousJobTitle?: string
  workDuration?: string
  portfolioLink?: string
}

export function generateApplicationConfirmationEmail(data: ApplicationData): { subject: string; html: string } {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const subject = `Application Confirmation - ${data.jobTitle} at Finmates`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Finmates</h1>
          <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 16px;">Application Confirmation</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Greeting -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 24px;">Hello ${data.applicantName}!</h2>
            <p style="color: #6b7280; margin: 0; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in joining our team at Finmates. We have successfully received your application for the <strong>${data.jobTitle}</strong> position.
            </p>
          </div>

          <!-- Application Details -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; border-left: 4px solid #2563eb; margin-bottom: 30px;">
            <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px;">Application Details</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div>
                <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px; font-weight: 500;">Application ID</p>
                <p style="color: #1f2937; margin: 0; font-size: 16px; font-weight: 600;">${data.applicationId}</p>
              </div>
              <div>
                <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px; font-weight: 500;">Submitted On</p>
                <p style="color: #1f2937; margin: 0; font-size: 16px; font-weight: 600;">${formatDate(data.submittedAt)}</p>
              </div>
              <div>
                <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 14px; font-weight: 500;">Position Applied</p>
                <p style="color: #1f2937; margin: 0; font-size: 16px; font-weight: 600;">${data.jobTitle}</p>
              </div>
             

            
          </div>

         
          <!-- Next Steps -->
          <div style="background-color: #fef2f2; padding: 25px; border-radius: 12px; border-left: 4px solid #ef4444; margin-bottom: 30px;">
            <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px;">What Happens Next?</h3>
            <div style="space-y: 15px;">
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <div style="width: 24px; height: 24px; background-color: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; margin-top: 2px;">1</div>
                <p style="color: #6b7280; margin: 0; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #1f2937;">Review Process:</strong> Our HR team will carefully review your application within 3-5 business days.
                </p>
              </div>
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <div style="width: 24px; height: 24px; background-color: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; margin-top: 2px;">2</div>
                <p style="color: #6b7280; margin: 0; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #1f2937;">Interview Invitation:</strong> If your profile matches our requirements, we'll contact you to schedule an interview.
                </p>
              </div>
              <div style="display: flex; align-items: flex-start;">
                <div style="width: 24px; height: 24px; background-color: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; margin-top: 2px;">3</div>
                <p style="color: #6b7280; margin: 0; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #1f2937;">Final Decision:</strong> We'll notify you of our final decision within 2 weeks of the interview.
                </p>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Need Help?</h3>
            <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 15px; line-height: 1.6;">
              If you have any questions about your application or the hiring process, please don't hesitate to contact us.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
              <a href="mailto:careers@finmates.com" style="color: #2563eb; text-decoration: none; font-weight: 600;">📧 careers@finmates.com</a>
              <a href="/contact-us" style="color: #2563eb; text-decoration: none; font-weight: 600;">🌐 Contact Us</a>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #1f2937; padding: 30px; text-align: center;">
          <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">
            © 2024 Finmates. All rights reserved.
          </p>
          <p style="color: #6b7280; margin: 0; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>

      </div>
    </body>
    </html>
  `

  return { subject, html }
}
