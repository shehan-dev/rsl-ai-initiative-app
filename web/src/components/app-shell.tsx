"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AppShell({ title, subtitle, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const isAuthed = typeof window !== "undefined" && localStorage.getItem("apex_auth") === "1";
    if (!isAuthed && pathname !== "/login") {
      router.replace("/login");
    }
  }, [pathname, router]);

  useEffect(() => {
    fetch("/api/notifications?unreadOnly=true")
      .then((res) => res.json())
      .then((data) => setUnreadCount(data.unreadCount ?? 0));
  }, [pathname]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <h1 className="title">{title}</h1>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
        <div className="chip-row">
          <Link className="icon-btn" href="/notifications" aria-label="Open notifications">
            <span aria-hidden="true">🔔</span>
            {unreadCount > 0 ? <span className="badge">{unreadCount}</span> : null}
          </Link>
          <Link className="avatar-btn" href="/settings" aria-label="Go to profile and settings">
            AS
          </Link>
        </div>
      </header>
      <section className="stack">{children}</section>
      <MobileNav />
    </main>
  );
}
