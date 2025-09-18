import { ConfidentialClientApplication } from '@azure/msal-node'
import { promises as fs } from 'fs'
import path from 'path'

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  },
}

const cca = new ConfidentialClientApplication(msalConfig)

/**
 * Get OAuth2 access token from Microsoft Identity Platform
 */
export async function getAccessToken(): Promise<string> {
  try {
    const clientCredentialRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
    }

    const response = await cca.acquireTokenByClientCredential(clientCredentialRequest)
    
    if (!response?.accessToken) {
      throw new Error('Failed to acquire access token')
    }

    return response.accessToken
  } catch (error) {
    console.error('Error getting access token:', error)
    throw new Error('Failed to authenticate with Microsoft Graph API')
  }
}

/**
 * Upload resume file to OneDrive
 */
export async function uploadResumeToOneDrive(file: File): Promise<string> {
  try {
    // Get access token
    const accessToken = await getAccessToken()
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = path.extname(file.name)
    const fileName = `resume_${timestamp}_${Math.random().toString(36).substr(2, 9)}${fileExtension}`
    
    // OneDrive folder path
    const folderPath = process.env.ONEDRIVE_FOLDER || 'JobApplications'
    const uploadPath = `/me/drive/root:/${folderPath}/${fileName}:/content`
    
    // Upload to OneDrive using Microsoft Graph API
    const response = await fetch(`https://graph.microsoft.com/v1.0${uploadPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': file.type,
        'Content-Length': buffer.length.toString(),
      },
      body: buffer,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OneDrive upload error:', errorText)
      throw new Error(`Failed to upload file to OneDrive: ${response.status} ${response.statusText}`)
    }

    const uploadResult = await response.json()
    
    // Return the public URL for the uploaded file
    if (uploadResult.webUrl) {
      return uploadResult.webUrl
    } else {
      // Fallback: construct URL from file ID
      return `https://graph.microsoft.com/v1.0/me/drive/items/${uploadResult.id}/content`
    }
  } catch (error) {
    console.error('Error uploading to OneDrive:', error)
    throw new Error('Failed to upload resume to OneDrive')
  }
}

/**
 * Create OneDrive folder if it doesn't exist
 */
export async function ensureOneDriveFolder(): Promise<void> {
  try {
    const accessToken = await getAccessToken()
    const folderName = process.env.ONEDRIVE_FOLDER || 'JobApplications'
    
    // Check if folder exists
    const checkResponse = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${folderName}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    // If folder doesn't exist, create it
    if (checkResponse.status === 404) {
      const createResponse = await fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: folderName,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'rename',
        }),
      })

      if (!createResponse.ok) {
        const errorText = await createResponse.text()
        console.error('OneDrive folder creation error:', errorText)
        throw new Error('Failed to create OneDrive folder')
      }
    }
  } catch (error) {
    console.error('Error ensuring OneDrive folder:', error)
    throw new Error('Failed to ensure OneDrive folder exists')
  }
}
