import SignInForm from "@/components/signInForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-8 text-black">
      <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute left-1 top-1 size-3 rounded-full bg-[#1E638A]" />
              <span className="absolute bottom-1 right-1 size-3 rounded-full bg-[#9AC3D7]" />
            </span>
            <span className="text-sm font-bold tracking-tight text-[#0B3051]">
              FlowDesk
            </span>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-black md:flex">
            <span className="text-lg leading-none">*</span>
            <span>Asite Product System</span>
          </div>
        </header>
        <section className="flex flex-1 items-center justify-center py-12">
          <SignInForm />
        </section>
      </main>
    </div>
  );
}
