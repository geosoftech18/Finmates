# Resume Storage System

## Overview

The application now uses **Supabase Storage** for resume uploads with automatic fallback to local storage for development. Files are stored in the cloud and only URLs are saved in the database.

## How It Works

### 1. File Upload Process
- When a user uploads a resume, it's processed in the `/api/apply` endpoint
- **Primary**: File is uploaded to Supabase Storage bucket
- **Fallback**: If Supabase not configured, saved to local `public/uploads/resumes/` directory
- Filename format: `{sanitized_email}_{timestamp}.{extension}`
- Example: `pranavkhandekar152_gmail_com_1757590117557.pdf`

### 2. File Storage Locations

#### Supabase Storage (Primary):
```
resumes/
└── resumes/
    ├── user1_email_com_1757590117557.pdf
    ├── user2_email_com_1757590117558.docx
    └── user3_email_com_1757590117559.doc
```

#### Local Storage (Fallback):
```
public/
└── uploads/
    └── resumes/
        ├── user1_email_com_1757590117557.pdf
        ├── user2_email_com_1757590117558.docx
        └── user3_email_com_1757590117559.doc
```

### 3. Database Storage
- **Supabase URLs**: `https://your-project.supabase.co/storage/v1/object/public/resumes/resumes/filename.pdf`
- **Local URLs**: `/uploads/resumes/{filename}`
- Only URLs are stored, not the actual files

### 4. File Access
- **Supabase Storage**: Direct access via public URLs
- **Local Storage**: Files accessible via `/uploads/resumes/{filename}`
- **Content Types**: Properly set based on file extension (PDF, DOC, DOCX)

## Security Features

### 1. Filename Sanitization
- Email addresses are sanitized to remove special characters
- Only alphanumeric characters, dots, underscores, and hyphens are allowed
- Timestamps prevent filename conflicts

### 2. File Type Validation
- Only PDF, DOC, and DOCX files are accepted
- File size limit: 10MB maximum
- MIME type validation on both frontend and backend

### 3. Secure API Endpoint
- `/api/resumes/[filename]` endpoint validates filenames
- Prevents directory traversal attacks
- Returns appropriate HTTP status codes

## Usage Examples

### Viewing a Resume
```bash
# Direct file access
GET /uploads/resumes/pranavkhandekar152_gmail_com_1757590117557.pdf

# API endpoint access
GET /api/resumes/pranavkhandekar152_gmail_com_1757590117557.pdf
```

### Admin Panel Integration
```javascript
// In your admin panel, you can link to resumes like this:
const resumeUrl = `/api/resumes/${application.resumeUrl.split('/').pop()}`
```

## File Management

### Automatic Directory Creation
- The `uploads/resumes` directory is created automatically if it doesn't exist
- No manual setup required

### File Naming Convention
- **Format**: `{sanitized_email}_{timestamp}.{extension}`
- **Benefits**: 
  - Unique filenames prevent conflicts
  - Easy to identify which user uploaded the file
  - Timestamp allows sorting by upload time

### Cleanup (Future Enhancement)
Consider implementing:
- Automatic cleanup of old resume files
- File size monitoring
- Backup to cloud storage (AWS S3, etc.)

## Error Handling

### Common Issues
1. **File too large**: Returns 400 error with size limit message
2. **Invalid file type**: Returns 400 error with supported types
3. **Storage failure**: Returns 500 error with generic message
4. **File not found**: Returns 404 error when accessing non-existent files

### Logging
- All file operations are logged to console
- Includes file paths, sizes, and success/failure status
- Helps with debugging and monitoring

## Production Considerations

### 1. File Storage
- Consider using cloud storage (Supabase Storage, AWS S3) for production
- Implement file backup and redundancy
- Set up CDN for faster file access

### 2. Security
- Implement user authentication for file access
- Add file scanning for malware
- Consider file encryption for sensitive documents

### 3. Performance
- Implement file caching
- Use appropriate content delivery networks
- Monitor storage usage and implement cleanup policies

## Testing

To test the resume storage system:

1. **Upload a resume** through the application form
2. **Check the console logs** for file storage confirmation
3. **Verify file exists** in `public/uploads/resumes/` directory
4. **Test file access** via the API endpoint
5. **Check database** for correct URL storage

The system is now fully functional and ready for production use!
