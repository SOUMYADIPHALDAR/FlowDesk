import BackButton from "@/components/back-button";
import CreateUserForm from "@/components/createUser-form";

export default function CreateUserPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fbff_0%,#f3f7ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-start gap-4 border-b border-slate-200 pb-6">
          <BackButton />
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#5570F1]">
              Team Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0E2040]">
              Create New User
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Add a teammate and capture their essential work details.
            </p>
          </div>
        </header>

        <CreateUserForm />
      </div>
    </main>
  );
}
