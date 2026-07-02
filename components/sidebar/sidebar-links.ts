import {
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Logs,
  Settings,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type SidebarLinksProps = {
    label: string;
    href: string;
    icon: LucideIcon;
    adminOnly?: boolean;
}

export const sidebarLinks : SidebarLinksProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: ListTodo,
  },
  {
    label: "Work Logs",
    href: "/worklogs",
    icon: Logs,
  },
  {
    label: "Performance",
    href: "/performance",
    icon: TrendingUp,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },

  // Admin only
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    adminOnly: true,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    adminOnly: true,
  },
];