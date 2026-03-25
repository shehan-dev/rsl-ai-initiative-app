"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/home", label: "Home", icon: <HomeIcon /> },
  { href: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/transactions/new", label: "Add", icon: <AddIcon /> },
  { href: "/budgets", label: "Budgets", icon: <BudgetIcon /> },
  { href: "/goals", label: "Goals", icon: <GoalIcon /> },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Primary">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/home" && pathname.startsWith(item.href));
        return (
          <Link key={item.href} className={isActive ? "active" : ""} href={item.href}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <IconBase>
      <path fill="currentColor" d="M12 3 3 10v10h6v-6h6v6h6V10z" />
    </IconBase>
  );
}

function DashboardIcon() {
  return (
    <IconBase>
      <path fill="currentColor" d="M3 13h8V3H3zm10 8h8V3h-8zm-10 0h8v-6H3z" />
    </IconBase>
  );
}

function AddIcon() {
  return (
    <IconBase>
      <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
    </IconBase>
  );
}

function BudgetIcon() {
  return (
    <IconBase>
      <path fill="currentColor" d="M3 5h18v2H3zm2 4h14v10H5zm4 2v6h2v-6zm4 0v6h2v-6z" />
    </IconBase>
  );
}

function GoalIcon() {
  return (
    <IconBase>
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7zm0 4v5l4 2 .9-1.8-2.9-1.4V7z"
      />
    </IconBase>
  );
}
