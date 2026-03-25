"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MOCK_EMAIL = "demo@apexledger.com";
const MOCK_PASSWORD = "123456";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthed = localStorage.getItem("apex_auth") === "1";
    if (isAuthed) router.replace("/home");
  }, [router]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = email.toLowerCase() === MOCK_EMAIL && password === MOCK_PASSWORD;
    if (!valid) {
      setError("Invalid credentials. Try the mock credentials shown below.");
      return;
    }
    localStorage.setItem("apex_auth", "1");
    localStorage.setItem("apex_user_email", email);
    router.push("/home");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <h1 className="title">Apex Ledger</h1>
        <span className="pill">Help</span>
      </header>

      <section className="stack">
        <form className="card stack" onSubmit={onSubmit}>
          <p className="muted">Secure access</p>
          <h2 className="title" style={{ marginTop: 8 }}>
            Login
          </h2>
          <input
            className="input"
            style={{ marginTop: 12 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <span className="muted">Remember me</span>
            <input type="checkbox" defaultChecked />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>
            Login
          </button>
          {error ? <p className="error-wash">{error}</p> : null}
          <p className="muted">
            Mock credentials: <strong>{MOCK_EMAIL}</strong> / <strong>{MOCK_PASSWORD}</strong>
          </p>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link className="pill" href="#">
            Forgot PIN?
          </Link>
          <Link className="pill" href="#">
            Use email login
          </Link>
        </div>
      </section>
    </main>
  );
}
