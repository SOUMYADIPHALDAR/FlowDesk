import SignUpForm from "@/components/register-form";
import SignInOAuth from "@/components/signin-o-auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(154,195,215,0.25),_transparent_45%),linear-gradient(135deg,_#f8fbfd_0%,_#f0f4f8_100%)] px-4 py-5 text-slate-900 sm:px-6 lg:px-8">
      <main className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-6xl flex-col">

        <section className="flex flex-1 items-center justify-center py-8 sm:py-10 lg:py-12">
          <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-28px_rgba(15,23,42,0.4)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="hidden flex-col justify-between bg-[linear-gradient(135deg,_#0b3051_0%,_#1e638a_100%)] p-8 text-white lg:flex">
                <div>
                  <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-100">
                    New workspace
                  </div>
                  <h2 className="max-w-sm text-3xl font-semibold leading-tight">
                    Bring your team into a calmer way to work.
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">
                    Capture plans, triage tasks, and keep collaboration flowing
                    in one polished workspace.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-slate-100">
                  <p className="font-medium">Why teams love FlowDesk</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-200">
                    <li>• Fast onboarding with zero clutter</li>
                    <li>• Shared context for every project</li>
                    <li>• Secure sign-in and simple collaboration</li>
                  </ul>
                </div>
              </div>

              <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                <SignUpForm />

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Or continue with
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <SignInOAuth signUp provider="google" />
                    <SignInOAuth signUp provider="github" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
