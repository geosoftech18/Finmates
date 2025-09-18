# File Storage Options for FinMates Job Application System

## 🎯 Available Storage Providers

### 1. **Local Storage** (Default - Easiest for Development)
- **Best for**: Development, testing, small projects
- **Pros**: No external dependencies, works immediately
- **Cons**: Files stored on server, not scalable for production
- **Setup**: Just set `STORAGE_PROVIDER=local` in `.env.local`

### 2. **Cloudinary** (Recommended for Production)
- **Best for**: Production apps, image optimization
- **Pros**: Simple API, free tier, automatic optimization
- **Cons**: Primarily for images (but supports PDFs)
- **Setup**: Free account + API keys

### 3. **AWS S3** (Enterprise Grade)
- **Best for**: Large scale applications
- **Pros**: Industry standard, very reliable, cheap
- **Cons**: Requires AWS account setup
- **Setup**: AWS account + credentials

### 4. **Azure OneDrive** (Original Option)
- **Best for**: Microsoft ecosystem integration
- **Pros**: Good integration with Microsoft services
- **Cons**: Complex setup, requires Azure AD
- **Setup**: Azure AD app registration

## 🚀 Quick Setup Guide

### Option 1: Local Storage (Start Here)

Add to your `.env.local`:
```env
# Database (Required)
DATABASE_URL="your-neon-connection-string"

# Storage (Local - No additional setup needed)
STORAGE_PROVIDER="local"
```

**That's it!** Your app will work immediately with local file storage.

### Option 2: Cloudinary (Recommended)

#### Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

#### Step 2: Get Your Credentials
1. In your Cloudinary dashboard, go to "Settings" → "API Keys"
2. Copy:
   - Cloud Name
   - API Key
   - API Secret

#### Step 3: Add to .env.local
```env
# Database (Required)
DATABASE_URL="your-neon-connection-string"

# Storage (Cloudinary)
STORAGE_PROVIDER="cloudinary"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Option 3: AWS S3

#### Step 1: Create AWS Account
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Create a free account
3. Go to S3 service

#### Step 2: Create S3 Bucket
1. Create a new bucket
2. Set permissions (public read for uploaded files)
3. Create IAM user with S3 permissions

#### Step 3: Add to .env.local
```env
# Database (Required)
DATABASE_URL="your-neon-connection-string"

# Storage (AWS S3)
STORAGE_PROVIDER="s3"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="your-region"
AWS_BUCKET_NAME="your-bucket-name"
```

## 🔧 Environment Variables Reference

### Required for All Options:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
STORAGE_PROVIDER="local|cloudinary|s3|onedrive"
```

### For Cloudinary:
```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### For AWS S3:
```env
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="your-bucket-name"
```

### For Azure OneDrive:
```env
AZURE_TENANT_ID="your-tenant-id"
AZURE_CLIENT_ID="your-client-id"
AZURE_CLIENT_SECRET="your-client-secret"
ONEDRIVE_FOLDER="JobApplications"
```

## 🎯 Recommended Setup for Different Scenarios

### **For Development/Testing:**
```env
STORAGE_PROVIDER="local"
```
- No external accounts needed
- Files stored in `public/uploads/resumes/`
- Works immediately

### **For Production (Small-Medium Apps):**
```env
STORAGE_PROVIDER="cloudinary"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```
- Free tier available
- Simple setup
- Good performance

### **For Production (Large Scale):**
```env
STORAGE_PROVIDER="s3"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="your-bucket-name"
```
- Most reliable
- Cheapest for large volumes
- Industry standard

## 🚀 Testing Your Setup

1. **Set your environment variables** in `.env.local`
2. **Restart your development server**:
   ```bash
   npm run dev
   ```
3. **Test file upload**:
   - Go to `http://localhost:3000/careers`
   - Apply for a job with a resume
   - Check if the file uploads successfully

## 🔍 Troubleshooting

### Local Storage Issues:
- Make sure `public/uploads/resumes/` directory exists
- Check file permissions

### Cloudinary Issues:
- Verify your API credentials
- Check Cloudinary dashboard for upload logs

### AWS S3 Issues:
- Verify bucket permissions
- Check IAM user permissions
- Ensure bucket region matches AWS_REGION

## 💡 Pro Tips

1. **Start with Local Storage** for development
2. **Switch to Cloudinary** for production (easiest)
3. **Use AWS S3** for enterprise applications
4. **Test thoroughly** before deploying to production
5. **Monitor storage usage** and costs
