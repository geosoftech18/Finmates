import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Database utility functions
export async function connectDB() {
  try {
    await prisma.$connect()
    console.log("Database connected successfully")
  } catch (error) {
    console.error("Database connection failed:", error)
    throw error
  }
}

export async function disconnectDB() {
  await prisma.$disconnect()
}
