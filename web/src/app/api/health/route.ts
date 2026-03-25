import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "personal-finance-api",
    timestamp: new Date().toISOString(),
  });
}
