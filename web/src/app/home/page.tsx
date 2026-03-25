"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { CategoryDonutChart } from "@/components/analytics-charts";

type SummaryResponse = {
  month: string;
  totals: {
    income: number;
    expenses: number;
    balance: number;
  };
  budget: {
    total: number;
    used: number;
    usedPct: number;
  };
  categoryBreakdown: Array<{ category: string; total: number }>;
  recentTransactions: Array<{
    id: string;
    category: string;
    note?: string;
    date: string;
    type: "income" | "expense";
    amount: number;
  }>;
  activeGoal: {
    title: string;
    target: number;
    saved: number;
  } | null;
};

export default function HomePage() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    fetch("/api/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data.data ?? null));
  }, []);

  const totals = summary?.totals ?? { income: 0, expenses: 0, balance: 0 };
  const budget = summary?.budget ?? { total: 0, used: 0, usedPct: 0 };
  const categorySnapshot = summary?.categoryBreakdown ?? [];
  const recentTransactions = summary?.recentTransactions ?? [];
  const activeGoal = summary?.activeGoal;

  return (
    <AppShell title="Apex Ledger" subtitle={summary?.month ?? "Loading..."}>
      <div className="chip-row">
        <span className="pill">Month: {summary?.month ?? "--"}</span>
        <span className="pill">Alerts: {budget.usedPct >= 80 ? 1 : 0}</span>
      </div>
      {budget.usedPct >= 100 ? (
        <p className="warning-text">Alert: You have exceeded your monthly budget. Please review expenses.</p>
      ) : null}
      {budget.usedPct >= 80 && budget.usedPct < 100 ? (
        <p className="warning-text">Warning: You have used {budget.usedPct}% of your monthly budget.</p>
      ) : null}

      <div className="grid-3">
        <div className="card">
          <p className="muted">Income</p>
          <p className="metric-value">Rs. {totals.income.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="muted">Expenses</p>
          <p className="metric-value">Rs. {totals.expenses.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="muted">Balance</p>
          <p className="metric-value">Rs. {totals.balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="card">
        <p className="section-title">Budget usage</p>
        <p className="muted">Monthly usage: {budget.usedPct}%</p>
        <div className="progress" style={{ marginTop: 10 }}>
          <span style={{ width: `${budget.usedPct}%` }} />
        </div>
      </div>

      <div className="card">
        <p className="section-title">Category spend snapshot</p>
        <div className="stack" style={{ marginTop: 8 }}>
          {categorySnapshot.length > 0 ? (
            <CategoryDonutChart
              data={categorySnapshot.map((entry) => ({
                name: entry.category,
                value: Number(((entry.total / Math.max(totals.expenses, 1)) * 100).toFixed(1)),
              }))}
            />
          ) : null}
          {categorySnapshot.length === 0 ? (
            <p className="muted">No expense data yet.</p>
          ) : (
            categorySnapshot.map((entry) => (
              <div key={entry.category}>
                <div className="list-row">
                  <p style={{ textTransform: "capitalize" }}>{entry.category}</p>
                  <p className="muted">Rs. {entry.total.toLocaleString()}</p>
                </div>
                <div className="progress">
                  <span style={{ width: `${entry.percent}%` }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <p className="section-title">Savings goal</p>
        {activeGoal ? (
          <>
            <p className="muted">{activeGoal.title}</p>
            <p className="metric-value">
              Rs. {activeGoal.saved.toLocaleString()} / Rs. {activeGoal.target.toLocaleString()}
            </p>
            <div className="progress" style={{ marginTop: 10 }}>
              <span style={{ width: `${Math.round((activeGoal.saved / activeGoal.target) * 100)}%` }} />
            </div>
          </>
        ) : (
          <p className="muted">No active goals yet.</p>
        )}
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 className="section-title">Recent transactions</h3>
          <Link className="pill" href="/transactions">
            View all
          </Link>
        </div>
        <div className="stack">
          {recentTransactions.map((item) => (
            <div key={item.id} className="list-row">
              <div>
                <p style={{ textTransform: "capitalize" }}>{item.category}</p>
                <p className="muted">{item.note ?? item.date}</p>
              </div>
              <strong style={{ color: item.type === "expense" ? "var(--danger)" : "var(--success)" }}>
                {item.type === "expense" ? "-" : "+"}Rs. {item.amount.toLocaleString()}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
