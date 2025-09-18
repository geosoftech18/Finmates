# Supabase Storage Setup Guide

## Overview

This guide will help you set up Supabase Storage for resume uploads in your Finmates application. Supabase offers **1GB free storage** with no payment required upfront, making it perfect for getting started.

## Why Supabase Storage?

✅ **1GB Free Storage** - No payment required  
✅ **Easy Setup** - No complex authentication  
✅ **Built-in CDN** - Fast global delivery  
✅ **Automatic Backups** - Data safety built-in  
✅ **Simple API** - Easy to integrate  
✅ **Real-time** - Live updates if needed  

## Step 1: Create Supabase Account

1. **Go to Supabase**: https://supabase.com/
2. **Click "Start your project"**
3. **Sign up** with GitHub, Google, or email
4. **No payment required** for the free tier

## Step 2: Create New Project

1. **Click "New Project"**
2. **Fill in details**:
   - **Name**: `finmates-app` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
3. **Click "Create new project"**
4. **Wait 2-3 minutes** for setup to complete

## Step 3: Get Project Credentials

1. **Go to Settings** → **API**
2. **Copy these values**:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **Project API Key** (anon/public key)
   - **Service Role Key** (secret key - keep this safe!)

## Step 4: Create Storage Bucket

1. **Go to Storage** in your Supabase dashboard
2. **Click "Create a new bucket"**
3. **Configure bucket**:
   - **Name**: `resumes`
   - **Public**: ✅ **Check this box** (makes files publicly accessible)
   - **File size limit**: `50MB` (good for resumes)
   - **Allowed MIME types**: `application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`
4. **Click "Create bucket"**

## Step 5: Set Up Bucket Policies

1. **Go to Storage** → **Policies**
2. **Click "New Policy"** for the `resumes` bucket
3. **Add these policies**:

### Policy 1: Allow Public Read Access
```sql
-- Allow anyone to read files
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'resumes');
```

### Policy 2: Allow Authenticated Upload
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'resumes' 
  AND auth.role() = 'authenticated'
);
```

### Policy 3: Allow Authenticated Delete
```sql
-- Allow authenticated users to delete
CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'resumes' 
  AND auth.role() = 'authenticated'
);
```

## Step 6: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Example:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 7: Test the Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Upload a resume** through the application form

3. **Check the console logs** for:
   ```
   Using Supabase Storage for resume upload
   Resume uploaded to Supabase: resumes/user_email_1234567890.pdf
   Public URL: https://abcdefgh.supabase.co/storage/v1/object/public/resumes/resumes/user_email_1234567890.pdf
   ```

4. **Verify the file** exists in your Supabase Storage dashboard

## File Structure

### Supabase Storage:
```
resumes/
└── resumes/
    ├── user1_email_com_1757590117557.pdf
    ├── user2_email_com_1757590117558.docx
    └── user3_email_com_1757590117559.doc
```

### Database Storage:
```sql
-- The resumeUrl field will contain the full Supabase URL
resumeUrl: "https://abcdefgh.supabase.co/storage/v1/object/public/resumes/resumes/user_email_1234567890.pdf"
```

## Supabase Free Tier Limits

### Storage:
- **1GB total storage** (free forever)
- **2GB bandwidth** per month
- **No file size limits** (up to 50MB per file)

### After Free Tier:
- **$0.021 per GB** per month for storage
- **$0.09 per GB** for bandwidth
- **Very affordable** for small to medium applications

## Security Features

### 1. Automatic Security
- **Row Level Security (RLS)** enabled by default
- **JWT-based authentication**
- **Secure API endpoints**

### 2. File Access Control
- **Public read access** for resume files
- **Authenticated upload/delete** only
- **MIME type validation**

### 3. Data Protection
- **Automatic backups**
- **Point-in-time recovery**
- **Encryption at rest**

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**
   - Check `NEXT_PUBLIC_SUPABASE_URL` is correct
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is the service role key (not anon key)

2. **"Bucket not found"**
   - Ensure bucket name is exactly `resumes`
   - Check bucket is marked as public

3. **"Permission denied"**
   - Verify bucket policies are set correctly
   - Check you're using the service role key (not anon key)

4. **"File too large"**
   - Check bucket file size limit
   - Default is 50MB, increase if needed

### Debug Mode:
Add this to your `.env.local` for detailed logging:
```env
SUPABASE_DEBUG=true
```

## Fallback to Local Storage

If Supabase Storage is not configured, the system automatically falls back to local storage:
- Files are saved to `public/uploads/resumes/`
- Database stores local paths: `/uploads/resumes/filename.pdf`
- Perfect for development and testing

## Production Deployment

### Vercel/Netlify:
1. **Add environment variables** in your hosting platform
2. **Use the same Supabase project** for production
3. **No additional configuration** needed

### Docker:
1. **Pass environment variables** to container
2. **No file mounting** required
3. **Works out of the box**

## Monitoring and Maintenance

### Supabase Dashboard:
1. **Storage usage** - Monitor in Storage section
2. **API usage** - Check in API section
3. **Error logs** - View in Logs section

### Regular Tasks:
1. **Monitor storage usage** (1GB free limit)
2. **Check for failed uploads** in logs
3. **Review file organization** in Storage dashboard

## Cost Comparison

| Feature | Supabase | Google Cloud | AWS S3 |
|---------|----------|--------------|---------|
| **Free Storage** | 1GB | 5GB | 5GB |
| **Free Bandwidth** | 2GB/month | 1GB/month | 1GB/month |
| **Setup Complexity** | ⭐ Easy | ⭐⭐⭐ Complex | ⭐⭐⭐ Complex |
| **Payment Required** | ❌ No | ✅ Yes | ✅ Yes |
| **Free Tier Duration** | Forever | 12 months | 12 months |

## Migration from Google Cloud

If you were using Google Cloud Storage:

1. **Keep the same environment variables** structure
2. **Replace Google Cloud config** with Supabase config
3. **Files will automatically migrate** to Supabase
4. **No code changes** needed

## Support

If you encounter issues:

1. **Check Supabase Dashboard** for error details
2. **Review application logs** for specific error messages
3. **Verify environment variables** are set correctly
4. **Test with a simple upload** to isolate the issue

## Next Steps

1. **Set up your Supabase project** (5 minutes)
2. **Add environment variables** (2 minutes)
3. **Test resume upload** (1 minute)
4. **You're ready to go!** 🚀

The system is now ready to use Supabase Storage for resume uploads with **no payment required**! 🎉
