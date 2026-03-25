import { NextRequest, NextResponse } from "next/server";
import { buildDashboard } from "@/lib/insights";
import { transactionsStore } from "@/lib/transactions-store";

export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month") ?? undefined;
  const dashboard = buildDashboard(transactionsStore.list(), month);
  return NextResponse.json({ data: dashboard });
}
