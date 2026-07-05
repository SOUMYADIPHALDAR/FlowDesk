"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface ProjectsCardProps {
  title: string;
  image?: string | null;
}

interface ProjectProps {
  projects: ProjectsCardProps[] | null;
}

export default function ProjectsCard({ projects }: ProjectProps) {
  const projectList = projects ?? [];
  const router = useRouter();

  return (
    <Card className="w-full rounded-[20px] border-0 bg-[#FDFEFF] shadow-md">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[20px] font-bold text-[#4B4B4B]">Projects</h2>

          <Button
            variant="ghost"
            onClick={() => router.push("/admin/projects")}
            className="h-auto p-0 text-[17px] font-bold text-[#ED2590] cursor-pointer hover:bg-transparent hover:text-[#ED2590]"
          >
            View all
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 lg:gap-x-8 lg:gap-y-10">
          {projectList.map((project) => (
            <div key={project.title} className="flex flex-col items-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-20 w-20 rounded-[10px] object-cover sm:h-24 sm:w-24"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-[10px] bg-slate-100 text-center text-sm text-slate-500 sm:h-24 sm:w-24">
                  No image
                </div>
              )}

              <p className="mt-3 w-full max-w-24 text-center text-sm leading-5 tracking-[0.2px] text-[#4B4B4B]">
                {project.title}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
