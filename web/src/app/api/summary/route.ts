import { NextRequest, NextResponse } from "next/server";
import { buildSummary } from "@/lib/insights";
import { goalsStore } from "@/lib/goals-store";
import { transactionsStore } from "@/lib/transactions-store";

export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month") ?? undefined;
  const summary = buildSummary(transactionsStore.list(), month);
  const activeGoal = goalsStore.list()[0] ?? null;
  return NextResponse.json({
    data: {
      ...summary,
      activeGoal,
    },
  });
}
