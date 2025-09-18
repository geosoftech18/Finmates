import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    apis: {
      "verify-email": "operational",
      apply: "operational",
    },
    message: "Careers API is running successfully",
  })
}
