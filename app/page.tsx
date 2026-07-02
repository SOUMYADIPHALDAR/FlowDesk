import Link from "next/link";
import GetStartedButton from "@/components/get-started-button";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <h2 className="mb-6 text-5xl font-bold">
          Manage Projects
          <br />
          Without the Chaos
        </h2>

        <p className="mb-10 max-w-2xl text-lg text-gray-600">
          FlowDesk helps teams organize projects, assign tasks, track progress,
          and collaborate from one place.
        </p>

        <div className="flex gap-4">
          <GetStartedButton />

          <Link
            href="/signin"
            className="rounded-lg border border-gray-300 px-5 font-medium transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        <FeatureCard
          title="Project Management"
          description="Create and organize projects with ease."
        />

        <FeatureCard
          title="Task Tracking"
          description="Assign tasks, set priorities, and monitor progress."
        />

        <FeatureCard
          title="Team Collaboration"
          description="Work together efficiently with your team."
        />
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © 2026 FlowDesk. All rights reserved.
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
