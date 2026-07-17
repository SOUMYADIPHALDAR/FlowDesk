import {
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings,
  Users,
  BarChart3,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type SidebarLinksProps = {
  label: string;
  href: string;
  adminHref?: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

export const sidebarLinks: SidebarLinksProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    adminHref: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    adminHref: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/tasks",
    adminHref: "/admin/tasks",
    icon: ListTodo,
  },
  {
    label: "Settings",
    href: "/profile",
    adminHref: "/admin/profile",
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
