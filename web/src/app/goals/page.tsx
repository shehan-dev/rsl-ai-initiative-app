"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";

export default function GoalsPage() {
  const [goals, setGoals] = useState<Array<{ id: string; title: string; saved: number; target: number }>>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  function loadGoals() {
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data.data ?? []));
  }

  useEffect(() => {
    loadGoals();
  }, []);

  async function addGoal() {
    if (!title || !target) return;
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        target: Number(target),
        saved: Number(saved || 0),
      }),
    });
    setTitle("");
    setTarget("");
    setSaved("");
    setShowAdd(false);
    loadGoals();
  }

  const totalSaved = goals.reduce((acc, g) => acc + g.saved, 0);
  return (
    <AppShell title="Savings Goals" subtitle="Track progress">
      <div className="card">
        <p className="muted">Total saved</p>
        <p className="metric-value">Rs. {totalSaved.toLocaleString()}</p>
      </div>
      {goals.map((goal) => {
        const percent = Math.round((goal.saved / goal.target) * 100);
        return (
          <div key={goal.title} className="card">
            <div className="list-row">
              <h3 className="section-title">{goal.title}</h3>
              <span className="pill">{percent}%</span>
            </div>
            <p className="muted">
              Rs. {goal.saved.toLocaleString()} / Rs. {goal.target.toLocaleString()}
            </p>
            <p className="muted">Remaining Rs. {(goal.target - goal.saved).toLocaleString()}</p>
            <div className="progress" style={{ marginTop: 10 }}>
              <span style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
      {showAdd ? (
        <div className="card stack">
          <input className="input" placeholder="Goal title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="input" placeholder="Target amount" type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
          <input className="input" placeholder="Saved amount" type="number" value={saved} onChange={(e) => setSaved(e.target.value)} />
          <div className="chip-row">
            <button className="btn btn-primary" onClick={addGoal}>
              Save goal
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          Add new goal
        </button>
      )}
    </AppShell>
  );
}
