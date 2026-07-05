"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { sidebarLinks } from "./sidebar-links";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SidebarNav() {
  const pathname = usePathname();
  const { session } = useAuth();

  const isAdmin = session?.role === "ADMIN";

  const links = sidebarLinks.filter((link) => !link.adminOnly || isAdmin);

  return (
    <aside className="flex h-full flex-col border-r bg-white">
      <nav className="flex-1 space-y-2 p-2 lg:p-4">
        {links.map((item) => {
          const Icon = item.icon;
          const resolvedHref =
            isAdmin && item.adminHref ? item.adminHref : item.href;

          const active =
            pathname === resolvedHref ||
            pathname.startsWith(resolvedHref + "/");

          return (
            <Link
              key={resolvedHref}
              href={resolvedHref}
              className={cn(
                "flex items-center rounded-xl py-3 transition-colors",
                "justify-center lg:justify-start",
                "px-0 lg:px-4",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span
                className={cn(
                  "ml-3 hidden lg:inline whitespace-nowrap text-sm",
                  active ? "font-semibold" : "font-medium",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
