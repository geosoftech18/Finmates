# FinMates Job Application System Setup

This guide will help you set up the FinMates job application system with Neon DB, Prisma, and OneDrive integration.

## Prerequisites

- Node.js 18+ installed
- A Neon database account
- An Azure AD app registration for OneDrive access

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@your-neon-host:5432/database_name"

# Azure/OneDrive Configuration
AZURE_TENANT_ID="your-tenant-id"
AZURE_CLIENT_ID="your-client-id"
AZURE_CLIENT_SECRET="your-client-secret"
ONEDRIVE_FOLDER="JobApplications"
```

### Getting Your Database URL

1. Sign up for a free account at [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string from your dashboard
4. Replace `username`, `password`, and `database_name` with your actual values

### Setting up Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" > "App registrations"
3. Click "New registration"
4. Fill in the details:
   - Name: "FinMates OneDrive Integration"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: Leave blank for now
5. After creation, note down:
   - Application (client) ID
   - Directory (tenant) ID
6. Go to "Certificates & secrets" > "New client secret"
7. Create a secret and copy the value
8. Go to "API permissions" > "Add a permission"
9. Select "Microsoft Graph" > "Application permissions"
10. Add these permissions:
    - `Files.ReadWrite.All`
    - `Sites.ReadWrite.All`
11. Click "Grant admin consent"

## 2. Install Dependencies

```bash
npm install
```

## 3. Database Setup

### Generate Prisma Client
```bash
npm run db:generate
```

### Push Schema to Database
```bash
npm run db:push
```

### Seed Database with Sample Jobs
```bash
npm run db:seed
```

## 4. Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 5. Database Management

### View Database in Prisma Studio
```bash
npm run db:studio
```

### Create Migration (if you modify schema)
```bash
npm run db:migrate
```

## API Endpoints

### POST /api/apply
Submit a job application with resume upload to OneDrive.

**Form Data:**
- `jobId`: Job ID
- `name`: Applicant name
- `email`: Email address
- `phone`: Phone number
- `currentPosition`: Current job position
- `experienceYears`: Years of experience
- `expectedSalary`: Expected salary
- `portfolioLink`: Portfolio URL (optional)
- `degree`: Educational degree
- `university`: University name
- `yearOfPassing`: Year of graduation
- `percentage`: Academic percentage
- `experienceType`: "fresher" or "experienced"
- `companyName`: Previous company (if experienced)
- `jobTitle`: Previous job title (if experienced)
- `workDuration`: Work duration (if experienced)
- `coverLetter`: Cover letter text (optional)
- `resume`: Resume file (PDF, DOC, DOCX)

### POST /api/verify-email
Verify email address format.

**JSON Body:**
```json
{
  "email": "user@example.com"
}
```

## Features

- ✅ **Neon DB Integration**: PostgreSQL database with Prisma ORM
- ✅ **OneDrive Integration**: Automatic resume upload to OneDrive
- ✅ **Form Validation**: Comprehensive client and server-side validation
- ✅ **File Upload**: Support for PDF, DOC, and DOCX files
- ✅ **Email Verification**: Basic email format validation
- ✅ **Admin Panel**: View applications and manage jobs
- ✅ **Responsive Design**: Mobile-friendly interface

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Ensure your Neon database is running
- Check if your IP is whitelisted (if required)

### OneDrive Upload Issues
- Verify Azure AD app registration is set up correctly
- Check that all required permissions are granted
- Ensure client secret hasn't expired
- Verify tenant ID, client ID, and client secret are correct

### File Upload Issues
- Check file size (max 10MB)
- Verify file type is supported (PDF, DOC, DOCX)
- Ensure OneDrive folder permissions are correct

## Production Deployment

1. Set up production environment variables
2. Run database migrations: `npm run db:migrate`
3. Build the application: `npm run build`
4. Start the production server: `npm start`

## Support

For issues or questions, please check the logs in the console or contact the development team.
