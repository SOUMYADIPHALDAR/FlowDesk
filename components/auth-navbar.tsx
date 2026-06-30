import { Palette } from "lucide-react";

export default function AuthNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-[45px] w-[50px] items-center justify-center rounded-lg">
            <Palette
              size={40}
              className="text-[#1E638A]"
              strokeWidth={2}
            />
          </div>
          <span className="text-base font-semibold tracking-tight text-[#0B3051] sm:text-lg">
            FlowDesk
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm md:flex">
          <span className="text-sm leading-none text-[#1E638A]">•</span>
          <span>Asite Product System</span>
        </div>
      </div>
    </header>
  );
}
