import { promises as fs } from 'fs'
import path from 'path'

/**
 * Upload resume file to local storage (for development)
 */
export async function uploadResumeToLocal(file: File): Promise<string> {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'resumes')
    await fs.mkdir(uploadsDir, { recursive: true })
    
    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `resume_${timestamp}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`
    const filePath = path.join(uploadsDir, fileName)
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Write file to disk
    await fs.writeFile(filePath, buffer)
    
    // Return the public URL
    return `/uploads/resumes/${fileName}`
  } catch (error) {
    console.error('Error uploading to local storage:', error)
    throw new Error('Failed to upload resume to local storage')
  }
}
