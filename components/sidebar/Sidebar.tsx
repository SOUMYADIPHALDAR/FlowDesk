"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { sidebarLinks } from "./sidebar-links";
import { usePathname } from "next/navigation";

interface User {
  name: string;
  email: string;
  image?: string;
}
interface SidebarNavProps {
  user: User | null;
  isAdmin: boolean
}

export default function SidebarNav({ isAdmin, user }: SidebarNavProps) {
  const pathname = usePathname();

  const links = sidebarLinks.filter((link) => !link.adminOnly || isAdmin)

  return (
    <aside className="flex h-full flex-col border-r bg-white">
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {links.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors",

                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span
                className={cn(
                  "text-sm",
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
