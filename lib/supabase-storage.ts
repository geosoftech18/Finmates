import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export interface UploadResult {
  publicUrl: string
  fileName: string
  fileSize: number
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadResumeToSupabase(
  file: File,
  email: string
): Promise<UploadResult> {
  try {
    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9@.-]/g, "_")
    const fileExtension = file.name.split('.').pop()
    const fileName = `resumes/${sanitizedEmail}_${timestamp}.${fileExtension}`
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Failed to upload to Supabase: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName)

    const publicUrl = urlData.publicUrl
    
    console.log(`Resume uploaded to Supabase: ${fileName}`)
    console.log(`Public URL: ${publicUrl}`)
    
    return {
      publicUrl,
      fileName,
      fileSize: buffer.length,
    }
  } catch (error) {
    console.error('Error uploading to Supabase Storage:', error)
    throw new Error('Failed to upload resume to Supabase storage')
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteResumeFromSupabase(fileName: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('resumes')
      .remove([fileName])

    if (error) {
      console.error('Supabase delete error:', error)
      return false
    }

    console.log(`Resume deleted from Supabase: ${fileName}`)
    return true
  } catch (error) {
    console.error('Error deleting from Supabase Storage:', error)
    return false
  }
}

/**
 * Get file metadata from Supabase Storage
 */
export async function getResumeMetadata(fileName: string) {
  try {
    const { data, error } = await supabase.storage
      .from('resumes')
      .list('resumes', {
        search: fileName
      })

    if (error) {
      console.error('Supabase metadata error:', error)
      return null
    }

    return data?.[0] || null
  } catch (error) {
    console.error('Error getting file metadata:', error)
    return null
  }
}

/**
 * List all files in the resumes folder
 */
export async function listResumeFiles() {
  try {
    const { data, error } = await supabase.storage
      .from('resumes')
      .list('resumes')

    if (error) {
      console.error('Supabase list error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error listing files:', error)
    return []
  }
}

/**
 * Check if Supabase Storage is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export { supabase }
