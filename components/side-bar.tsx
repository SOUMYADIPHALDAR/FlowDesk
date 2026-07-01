"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import {
  FolderKanban,
  Logs,
  ListTodo,
  TrendingUp,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";

const userLinks = [
  {
    label: "Project",
    href: "/user/project",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/user/tasks",
    icon: ListTodo,
  },
  {
    label: "Work Logs",
    href: "/user/worklog",
    icon: Logs,
  },
  {
    label: "Performance",
    href: "/user/preformace",
    icon: TrendingUp,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const adminLinks = [
  {
    label: "Project",
    href: "/admin/project",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/admin/tasks",
    icon: ListTodo,
  },
  {
    label: "Work Logs",
    href: "/admin/worklog",
    icon: Logs,
  },
  {
    label: "Performance",
    href: "/admin/preformace",
    icon: TrendingUp,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = session?.user.role === "ADMIN" ? adminLinks : userLinks;

  return (
    <div className="flex h-full flex-col">
      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 p-2 md:p-4">
        {links.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 items-center rounded-xl transition-all duration-200",

                // mobile
                "justify-center",

                // desktop
                "lg:justify-start lg:px-4 lg:gap-4",

                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg ",

                  active ? "bg-white" : "bg-slate-100",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Hidden on mobile */}
              <span
                className={cn(
                  "hidden text-sm lg:block",
                  active ? "font-semibold" : "font-medium",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
