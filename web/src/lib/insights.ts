import { budgetsStore } from "@/lib/budgets-store";
import type { Transaction } from "@/lib/transactions-store";

function monthFromDate(dateStr: string) {
  return dateStr.slice(0, 7);
}

function getActiveMonth(transactions: Transaction[]) {
  if (transactions.length === 0) return new Date().toISOString().slice(0, 7);
  const months = transactions.map((item) => monthFromDate(item.date)).sort();
  return months[months.length - 1];
}

export function buildSummary(transactions: Transaction[], explicitMonth?: string) {
  const month = explicitMonth ?? getActiveMonth(transactions);
  const monthTx = transactions.filter((item) => monthFromDate(item.date) === month);
  const income = monthTx.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = monthTx.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const budget = budgetsStore.getByMonth(month);
  const budgetTotal = budget?.totalBudget ?? 0;
  const budgetUsedPct = budgetTotal > 0 ? Math.round((expenses / budgetTotal) * 100) : 0;

  const categoryMap = new Map<string, number>();
  for (const tx of monthTx) {
    if (tx.type !== "expense") continue;
    categoryMap.set(tx.category, (categoryMap.get(tx.category) ?? 0) + tx.amount);
  }

  const categoryBreakdown = [...categoryMap.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  return {
    month,
    totals: {
      income,
      expenses,
      balance: income - expenses,
    },
    budget: {
      total: budgetTotal,
      used: expenses,
      usedPct: Math.max(0, Math.min(100, budgetUsedPct)),
    },
    categoryBreakdown,
    recentTransactions: monthTx.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
  };
}

export function buildDashboard(transactions: Transaction[], explicitMonth?: string) {
  const month = explicitMonth ?? getActiveMonth(transactions);
  const monthlySpendMap = new Map<string, number>();
  const categoryMap = new Map<string, number>();
  let monthIncome = 0;
  let monthExpense = 0;

  for (const tx of transactions) {
    const txMonth = monthFromDate(tx.date);
    if (tx.type === "expense") {
      monthlySpendMap.set(txMonth, (monthlySpendMap.get(txMonth) ?? 0) + tx.amount);
    }
    if (txMonth === month) {
      if (tx.type === "income") monthIncome += tx.amount;
      if (tx.type === "expense") {
        monthExpense += tx.amount;
        categoryMap.set(tx.category, (categoryMap.get(tx.category) ?? 0) + tx.amount);
      }
    }
  }

  const monthlyTrend = [...monthlySpendMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-6)
    .map(([monthKey, spend]) => ({
      month: monthKey.slice(5),
      spend,
    }));

  const categoryDistribution = [...categoryMap.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return {
    month,
    monthlyTrend,
    categoryDistribution,
    incomeVsExpense: [
      { name: "Income", value: monthIncome },
      { name: "Expense", value: monthExpense },
    ],
  };
}
