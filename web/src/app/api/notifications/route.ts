import { NextRequest, NextResponse } from "next/server";
import { budgetsStore } from "@/lib/budgets-store";
import { notificationsStore } from "@/lib/notifications-store";
import { transactionsStore } from "@/lib/transactions-store";

type AlertLevel = "info" | "warning" | "danger";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  level: AlertLevel;
  read: boolean;
  createdAt: string;
};

function monthFromDate(dateStr: string) {
  return dateStr.slice(0, 7);
}

function buildNotifications(month: string): NotificationItem[] {
  const budget = budgetsStore.getByMonth(month);
  if (!budget) return [];

  const monthExpenseTx = transactionsStore
    .list()
    .filter((tx) => tx.type === "expense" && monthFromDate(tx.date) === month);

  const byCategory = new Map<string, number>();
  for (const tx of monthExpenseTx) {
    byCategory.set(tx.category, (byCategory.get(tx.category) ?? 0) + tx.amount);
  }

  const notifications: NotificationItem[] = [];
  for (const categoryBudget of budget.categoryBudgets) {
    const used = byCategory.get(categoryBudget.category) ?? 0;
    const usedPct = categoryBudget.allocated > 0 ? Math.round((used / categoryBudget.allocated) * 100) : 0;
    let level: AlertLevel | null = null;
    if (usedPct >= 100) level = "danger";
    else if (usedPct >= 80) level = "warning";
    if (!level) continue;

    const id = `${month}_${categoryBudget.category}_${level}`;
    notifications.push({
      id,
      title: level === "danger" ? "Overspending detected" : "Budget warning",
      message:
        level === "danger"
          ? `${categoryBudget.category} is over budget (${usedPct}%).`
          : `${categoryBudget.category} reached ${usedPct}% of its budget.`,
      level,
      read: notificationsStore.isRead(id),
      createdAt: new Date().toISOString(),
    });
  }

  const totalUsed = monthExpenseTx.reduce((sum, tx) => sum + tx.amount, 0);
  const totalUsedPct = budget.totalBudget > 0 ? Math.round((totalUsed / budget.totalBudget) * 100) : 0;
  if (totalUsedPct >= 80) {
    const level: AlertLevel = totalUsedPct >= 100 ? "danger" : "warning";
    const id = `${month}_overall_${level}`;
    notifications.push({
      id,
      title: level === "danger" ? "Overall budget exceeded" : "Overall budget nearing limit",
      message: `Monthly budget usage is ${totalUsedPct}%.`,
      level,
      read: notificationsStore.isRead(id),
      createdAt: new Date().toISOString(),
    });
  }

  return notifications;
}

export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month") ?? "2026-03";
  const unreadOnly = request.nextUrl.searchParams.get("unreadOnly") === "true";
  const notifications = buildNotifications(month);
  const data = unreadOnly ? notifications.filter((item) => !item.read) : notifications;
  return NextResponse.json({
    data,
    unreadCount: notifications.filter((item) => !item.read).length,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const action = body?.action;
  const month = body?.month ?? "2026-03";
  if (action === "mark_all_read") {
    const notifications = buildNotifications(month);
    notificationsStore.markReadMany(notifications.map((item) => item.id));
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
}
