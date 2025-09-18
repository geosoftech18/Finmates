# Email Verification Setup

This project now includes email verification with 4-digit codes using nodemailer. Here's how to set it up:

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# SMTP Configuration for Email Verification
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this app password (not your regular password) as `SMTP_PASS`

## Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

## Testing Without SMTP

If you don't configure SMTP credentials, the system will work in "mock mode":
- Verification codes will be logged to the console
- No actual emails will be sent
- Perfect for development and testing

## How It Works

1. **Step 1**: User enters basic information (name, email, phone)
2. **Send Code**: System sends a 4-digit verification code to the email
3. **Verify Code**: User enters the code to verify their email
4. **Continue**: Once verified, user can proceed to the next steps

## Features

- ✅ 4-digit verification codes
- ✅ 10-minute expiration
- ✅ Beautiful HTML email templates
- ✅ Mock mode for development
- ✅ Resend code functionality
- ✅ Proper error handling
- ✅ Security validations
- ✅ Thank you popup after successful application
- ✅ Confirmation emails with application details
- ✅ Professional email templates with company branding

## API Endpoints

- `POST /api/verify-email` - Send verification code
- `POST /api/verify-code` - Verify the code
- `POST /api/apply` - Submit job application (sends confirmation email)

## Security Notes

- Codes expire after 10 minutes
- Codes are single-use (deleted after verification)
- Email validation includes format and pattern checks
- In production, consider using Redis for code storage instead of in-memory
