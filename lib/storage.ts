import { uploadResumeToCloudinary } from './cloudinary'
import { uploadResumeToLocal } from './local-storage'

export type StorageProvider = 'cloudinary' | 'local'

/**
 * Get the configured storage provider
 */
export function getStorageProvider(): StorageProvider {
  return (process.env.STORAGE_PROVIDER as StorageProvider) || 'local'
}

/**
 * Upload resume file using the configured storage provider
 */
export async function uploadResume(file: File): Promise<string> {
  const provider = getStorageProvider()
  
  switch (provider) {
    case 'cloudinary':
      return await uploadResumeToCloudinary(file)
    case 'local':
      return await uploadResumeToLocal(file)
    default:
      throw new Error(`Unsupported storage provider: ${provider}`)
  }
}
