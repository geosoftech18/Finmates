import nodemailer from 'nodemailer'

const BREVO_SMTP_HOST = 'smtp-relay.brevo.com'
const BREVO_SMTP_PORT = 587
const DEFAULT_OWNER_EMAIL = 'pinkesh.jain@finmates.in'
const DEFAULT_FROM_EMAIL = 'noreply@finmates.in'

export function isMailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
}

export function getOwnerEmail() {
  return process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || DEFAULT_OWNER_EMAIL
}

export function getFromAddress() {
  return process.env.SMTP_FROM_EMAIL || DEFAULT_FROM_EMAIL
}

export function getFromHeader() {
  return `FinMates <${getFromAddress()}>`
}

export function createMailTransporter() {
  const allowSelfSigned =
    process.env.SMTP_ALLOW_SELF_SIGNED === 'true' || process.env.NODE_ENV === 'development'

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || BREVO_SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || String(BREVO_SMTP_PORT), 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
  })
}
