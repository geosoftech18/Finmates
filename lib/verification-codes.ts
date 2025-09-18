// Global storage for verification codes
// In production, this should be replaced with Redis or a database
declare global {
  var __verificationCodes: Map<string, { code: string; expiresAt: number }> | undefined
}

// Initialize global Map if it doesn't exist
if (!global.__verificationCodes) {
  global.__verificationCodes = new Map<string, { code: string; expiresAt: number }>()
}

const verificationCodes = global.__verificationCodes

export function generateVerificationCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export function storeVerificationCode(email: string, code: string, expiresInMinutes: number = 10): void {
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000
  const normalizedEmail = email.toLowerCase().trim()
  verificationCodes.set(normalizedEmail, { code, expiresAt })
}

export function getVerificationCode(email: string): { code: string; expiresAt: number } | undefined {
  const normalizedEmail = email.toLowerCase().trim()
  return verificationCodes.get(normalizedEmail)
}

export function deleteVerificationCode(email: string): boolean {
  const normalizedEmail = email.toLowerCase().trim()
  return verificationCodes.delete(normalizedEmail)
}

export function cleanupExpiredCodes(): void {
  const now = Date.now()
  for (const [email, data] of verificationCodes.entries()) {
    if (now > data.expiresAt) {
      verificationCodes.delete(email)
    }
  }
}

// Clean up expired codes every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredCodes, 5 * 60 * 1000)
}
