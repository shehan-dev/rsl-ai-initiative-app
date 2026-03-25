import { NextRequest, NextResponse } from "next/server";
import { budgetsStore } from "@/lib/budgets-store";
import { transactionsStore } from "@/lib/transactions-store";

function monthFromDate(dateStr: string) {
  return dateStr.slice(0, 7);
}

export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month") ?? "2026-03";
  const budget = budgetsStore.getByMonth(month);
  if (!budget) {
    return NextResponse.json({ data: null });
  }

  const monthTx = transactionsStore
    .list()
    .filter((item) => item.type === "expense" && monthFromDate(item.date) === month);

  const byCategory = new Map<string, number>();
  for (const tx of monthTx) {
    byCategory.set(tx.category, (byCategory.get(tx.category) ?? 0) + tx.amount);
  }

  const categories = budget.categoryBudgets.map((item) => {
    const used = byCategory.get(item.category) ?? 0;
    const usedPct = item.allocated > 0 ? Math.round((used / item.allocated) * 100) : 0;
    return {
      ...item,
      used,
      remaining: item.allocated - used,
      usedPct,
      alertState: usedPct >= 100 ? "overspent" : usedPct >= 80 ? "warning" : "normal",
    };
  });

  const totalUsed = categories.reduce((sum, c) => sum + c.used, 0);

  return NextResponse.json({
    data: {
      ...budget,
      totalUsed,
      totalRemaining: budget.totalBudget - totalUsed,
      usedPct: budget.totalBudget > 0 ? Math.round((totalUsed / budget.totalBudget) * 100) : 0,
      categories,
    },
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { month, totalBudget, categoryBudgets } = body ?? {};
  if (!month || !totalBudget || !Array.isArray(categoryBudgets)) {
    return NextResponse.json(
      { error: "month, totalBudget and categoryBudgets are required." },
      { status: 400 },
    );
  }
  const updated = budgetsStore.upsertByMonth(month, {
    totalBudget: Number(totalBudget),
    categoryBudgets,
  });
  return NextResponse.json({ data: updated });
}
