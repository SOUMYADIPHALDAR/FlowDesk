
import EditProfileForm from "@/components/edit-profile";
import UserProfileCard from "@/components/profile-card";
import ProjectsCard from "@/components/project-card";
import SignOutButton from "@/components/sign-out-button";

export default function AdminProfile() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fbff_0%,#f3f7ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[28px] border border-slate-200/70 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 lg:p-8">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#5570F1]">
              Admin Workspace
            </p>
            <h1 className="text-2xl font-semibold text-[#0E2040] sm:text-3xl">
              Profile Overview
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#E8F0FF] px-3 py-1 text-sm font-medium text-[#5570F1]">
              Secure account
            </span>
            <SignOutButton />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[330px_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <UserProfileCard />
            <ProjectsCard />
          </div>

          <div className="w-full rounded-[24px] border border-slate-200/80 bg-[#FDFEFF] p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-5 lg:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[#0E2040]">
                Edit Profile Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Update your details and refresh your public profile.
              </p>
            </div>
            <EditProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
