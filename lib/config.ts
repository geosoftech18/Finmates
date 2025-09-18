/**
 * Environment configuration
 * Make sure to set these variables in your .env.local file
 */

export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL!,
  },

  // Storage Configuration
  storage: {
    provider: process.env.STORAGE_PROVIDER || 'local',
    // Cloudinary Configuration
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      apiSecret: process.env.CLOUDINARY_API_SECRET!,
    },
    // Azure/OneDrive Configuration (if using OneDrive)
    azure: {
      tenantId: process.env.AZURE_TENANT_ID!,
      clientId: process.env.AZURE_CLIENT_ID!,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
      onedriveFolder: process.env.ONEDRIVE_FOLDER || 'JobApplications',
    },
  },

  // Application settings
  app: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
}

// Validate required environment variables
export function validateConfig() {
  const required = [
    'DATABASE_URL',
    'AZURE_TENANT_ID',
    'AZURE_CLIENT_ID',
    'AZURE_CLIENT_SECRET',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
