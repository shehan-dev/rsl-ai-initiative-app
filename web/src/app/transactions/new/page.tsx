"use client";

import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";

export default function NewTransactionPage() {
  const router = useRouter();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [categories, setCategories] = useState<Array<{ id: string; name: string; type: string }>>([]);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data ?? []));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amountValue = Number(amount);
    const invalid = !amountValue || amountValue <= 0 || !date || (type === "expense" && !category);
    if (invalid) {
      setShowError(true);
      return;
    }
    setShowError(false);
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        amount: amountValue,
        category,
        date,
        note,
      }),
    });
    router.push("/transactions");
  }

  return (
    <AppShell title="Add Transaction" subtitle="Quick entry">
      <form className="stack" onSubmit={onSubmit}>
        <div className="card stack">
          <div className="segmented" role="tablist" aria-label="Transaction type">
            <button
              type="button"
              className={type === "expense" ? "active" : ""}
              onClick={() => setType("expense")}
            >
              Expense
            </button>
            <button
              type="button"
              className={type === "income" ? "active" : ""}
              onClick={() => setType("income")}
            >
              Income
            </button>
          </div>

          <div>
            <p className="muted">Amount (LKR)</p>
            <input
              className="amount-hero"
              placeholder="Rs. 0"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)} required={type === "expense"}>
            {(categories.length === 0
              ? [
                  { id: "fallback_food", name: "food", type: "expense" },
                  { id: "fallback_transport", name: "transport", type: "expense" },
                  { id: "fallback_bills", name: "bills", type: "expense" },
                  { id: "fallback_entertainment", name: "entertainment", type: "expense" },
                  { id: "fallback_salary", name: "salary", type: "income" },
                  { id: "fallback_other", name: "other", type: "both" },
                ]
              : categories
            )
              .filter((item) => item.type === "both" || item.type === type)
              .map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>

          <textarea
            className="input"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />

          {showError ? (
            <div className="error-wash">Please enter a valid amount, date, and required fields before saving.</div>
          ) : null}
        </div>

        <div className="sticky-actions">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => router.push("/transactions")}>
            Cancel
          </button>
          <button type="button" className="btn" style={{ background: "#ffe5e5", color: "var(--danger)" }}>
            Delete (edit mode)
          </button>
        </div>
      </form>
    </AppShell>
  );
}
