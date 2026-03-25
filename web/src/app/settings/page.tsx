"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";

export default function SettingsPage() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("apex_auth");
    localStorage.removeItem("apex_user_email");
    router.push("/login");
  }

  return (
    <AppShell title="Profile & Settings" subtitle="Manage account">
      <div className="card">
        <h3 className="section-title">Alex Sterling</h3>
        <p className="muted">alex@atelier.com</p>
      </div>
      <div className="card stack">
        <div className="list-row">
          <span>Currency</span>
          <span className="muted">LKR</span>
        </div>
        <div className="list-row">
          <span>80% budget alert</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="list-row">
          <span>Overspend alert</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="list-row">
          <span>Weekly summary</span>
          <input type="checkbox" />
        </div>
      </div>
      <button className="btn btn-secondary">Manage PIN / Biometrics</button>
      <button className="btn btn-secondary">Change password</button>
      <button className="btn" style={{ background: "#ffe5e5", color: "var(--danger)" }} onClick={logout}>
        Logout
      </button>
    </AppShell>
  );
}
