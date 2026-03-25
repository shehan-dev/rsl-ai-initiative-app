"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  level: "info" | "warning" | "danger";
  read: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);

  function loadNotifications() {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setItems(data.data ?? []));
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function markAllRead() {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_all_read" }),
    });
    loadNotifications();
  }

  return (
    <AppShell title="Notifications" subtitle="Alert inbox">
      <div className="card">
        <div className="list-row">
          <p className="section-title">Budget alerts</p>
          <button className="btn btn-secondary" onClick={markAllRead}>
            Mark all read
          </button>
        </div>
      </div>
      <div className="stack">
        {items.length === 0 ? (
          <div className="card">
            <p className="muted">No alerts right now.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card">
              <div className="list-row">
                <p className="section-title">{item.title}</p>
                <span
                  className="pill"
                  style={{
                    background:
                      item.level === "danger" ? "#ffd9d9" : item.level === "warning" ? "#fff2cc" : "#dcecff",
                  }}
                >
                  {item.read ? "Read" : "Unread"}
                </span>
              </div>
              <p>{item.message}</p>
              <p className="muted" style={{ marginTop: 6 }}>
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
