"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { CategoryDonutChart, IncomeExpenseChart, MonthlyTrendChart } from "@/components/analytics-charts";

export default function DashboardPage() {
  const [data, setData] = useState<{
    monthlyTrend: Array<{ month: string; spend: number }>;
    categoryDistribution: Array<{ name: string; value: number }>;
    incomeVsExpense: Array<{ name: string; value: number }>;
  } | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((resBody) => setData(resBody.data ?? null));
  }, []);

  return (
    <AppShell title="Analytics" subtitle="Dashboard">
      <div style={{ display: "flex", gap: 8 }}>
        <span className="pill">Last 6 months</span>
        <span className="pill">All categories</span>
      </div>
      <div className="card">
        <p className="section-title">Monthly spending trend</p>
        <MonthlyTrendChart data={data?.monthlyTrend ?? []} />
      </div>
      <div className="card">
        <p className="section-title">Category distribution</p>
        <CategoryDonutChart data={data?.categoryDistribution ?? []} />
      </div>
      <div className="card">
        <p className="section-title">Income vs expense</p>
        <IncomeExpenseChart data={data?.incomeVsExpense ?? []} />
      </div>
    </AppShell>
  );
}
