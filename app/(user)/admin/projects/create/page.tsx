import BackButton from "@/components/back-button";
import CreateProjectForm from "@/components/createProject-form";

export default function AdminPerformancePage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>

        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create Project
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create and Manage Projects for Administrators.
        </p>
      </div>

      {/* Form Container */}
      <div>
        <CreateProjectForm />
      </div>
    </div>
  );
}
