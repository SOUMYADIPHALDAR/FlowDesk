import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/project-card";
import BackButton from "@/components/back-button";

export default function AdminProjectsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#e8efff,_transparent_34%),linear-gradient(135deg,_#f8fbff_0%,_#f2f6ff_100%)] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7 lg:p-8">
        <header className="mb-7 flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <BackButton />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5570F1]">
              Admin workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0E2040] sm:text-4xl">
              Projects
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Create, browse, and keep your team&apos;s work organized in one place.
            </p>
          </div>

          <Link
            href="/admin/projects/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#5570F1] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(85,112,241,0.3)] transition hover:-translate-y-0.5 hover:bg-[#4863ea] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#5570F1]/30"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add project
          </Link>
        </header>

        <div className="rounded-[22px] border border-slate-100 bg-slate-50/55 p-3 sm:p-5">
          <ProjectCard />
        </div>
      </section>
    </main>
  );
}
