"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";

export default function BudgetsPage() {
  const [budget, setBudget] = useState<{
    totalBudget: number;
    totalUsed: number;
    usedPct: number;
    categories: Array<{
      category: string;
      allocated: number;
      used: number;
      usedPct: number;
      alertState: "normal" | "warning" | "overspent";
    }>;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTotalBudget, setEditTotalBudget] = useState("0");
  const [editCategories, setEditCategories] = useState<Array<{ category: string; allocated: number }>>([]);

  function loadBudget() {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then((data) => {
        setBudget(data.data ?? null);
        if (data.data) {
          setEditTotalBudget(String(data.data.totalBudget));
          setEditCategories(
            (data.data.categories ?? []).map((item: { category: string; allocated: number }) => ({
              category: item.category,
              allocated: item.allocated,
            })),
          );
        }
      });
  }

  useEffect(() => {
    loadBudget();
  }, []);

  async function saveBudget() {
    await fetch("/api/budgets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        month: "2026-03",
        totalBudget: Number(editTotalBudget),
        categoryBudgets: editCategories,
      }),
    });
    setIsEditing(false);
    loadBudget();
  }

  return (
    <AppShell title="Budgets" subtitle="Monthly planning">
      <div className="card">
        <p className="section-title">Overall monthly budget</p>
        {isEditing ? (
          <input
            className="amount-hero"
            type="number"
            value={editTotalBudget}
            onChange={(e) => setEditTotalBudget(e.target.value)}
          />
        ) : (
          <p className="metric-value">Rs. {(budget?.totalBudget ?? 0).toLocaleString()}</p>
        )}
        <p className="muted">Used Rs. {(budget?.totalUsed ?? 0).toLocaleString()}</p>
        <div className="progress" style={{ marginTop: 10 }}>
          <span style={{ width: `${budget?.usedPct ?? 0}%` }} />
        </div>
        {!isEditing ? (
          <button className="btn btn-secondary" style={{ marginTop: 10 }} onClick={() => setIsEditing(true)}>
            Edit budget
          </button>
        ) : (
          <div className="chip-row" style={{ marginTop: 10 }}>
            <button className="btn btn-primary" onClick={saveBudget}>
              Save changes
            </button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="card stack">
        {(budget?.categories ?? []).map((c, index) => {
          const color =
            c.alertState === "overspent"
              ? "var(--danger)"
              : c.alertState === "warning"
                ? "var(--warning)"
                : "var(--primary)";
          return (
            <div key={c.category}>
              <div className="list-row">
                <p style={{ textTransform: "capitalize" }}>{c.category}</p>
                <p className="muted">{c.usedPct}%</p>
              </div>
              {isEditing ? (
                <input
                  className="input"
                  type="number"
                  value={editCategories[index]?.allocated ?? 0}
                  onChange={(e) =>
                    setEditCategories((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, allocated: Number(e.target.value) } : item,
                      ),
                    )
                  }
                />
              ) : null}
              <p className="muted">
                Rs. {c.used.toLocaleString()} / Rs. {c.allocated.toLocaleString()}
              </p>
              <div className="progress" style={{ marginTop: 8 }}>
                <span style={{ width: `${Math.min(c.usedPct, 100)}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
