import BackButton from "@/components/back-button";

import { UserPlus, UsersRound } from "lucide-react";
import Link from "next/link";

export default function Users() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fbff_0%,#f3f7ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <BackButton />
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#5570F1]">
              Admin Workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0E2040]">
              Users
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage your team members and their workspace access.
            </p>
          </div>

          <Link
            href="/admin/users/create-user"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5570F1] px-5 text-sm font-medium text-white shadow-[0_8px_18px_rgba(85,112,241,0.28)] transition-colors hover:bg-[#4863ea] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#5570F1]/30"
          >
            <UserPlus className="size-4" />
            Create User
          </Link>
        </header>

        <section className="mt-6 rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-10">
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#E8F0FF] text-[#5570F1]">
              <UsersRound className="size-7" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-[#0E2040]">
              Your team will appear here
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Add a user to start building and managing your workspace team.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
