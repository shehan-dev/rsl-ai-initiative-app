"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import type { Transaction } from "@/lib/transactions-store";

export default function TransactionsPage() {
  const [items, setItems] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setItems(data.data ?? []));
  }, []);

  return (
    <AppShell title="Activity" subtitle="Transactions">
      <input className="input" placeholder="Search transactions" />
      <div style={{ display: "flex", gap: 8 }}>
        <span className="pill">Date range</span>
        <span className="pill">Category</span>
        <span className="pill">Type</span>
      </div>
      <div className="card stack">
        {items.map((item) => (
          <div key={item.id} className="list-row">
            <div>
              <p>{item.note || item.category}</p>
              <p className="muted">
                {item.category} • {item.date}
              </p>
            </div>
            <strong style={{ color: item.type === "expense" ? "var(--danger)" : "var(--success)" }}>
              {item.type === "expense" ? "-" : "+"}Rs. {item.amount.toLocaleString()}
            </strong>
          </div>
        ))}
      </div>
      <Link href="/transactions/new" className="btn btn-primary" style={{ textAlign: "center" }}>
        Add transaction
      </Link>
    </AppShell>
  );
}
