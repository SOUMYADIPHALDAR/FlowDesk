"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth";
import { headers } from "next/headers";

interface Members {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface CreateProjectActionProps {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  leaderId: string;
  selectMembers: Members[];
}

export default async function CreateProjectAction(
  data: CreateProjectActionProps,
) {
  const {
    projectName,
    description,
    startDate,
    endDate,
    leaderId,
    selectMembers,
  } = data;

  if (!projectName && !startDate && !endDate && !leaderId) {
    return { error: "Name, start date, end date and leader is required.." };
  }

  if (selectMembers.length === 0) {
    return { error: "Choose team members.." };
  }

  const isLeaderSelected = selectMembers.some(
    (member) => member.id === leaderId,
  );

  if (!isLeaderSelected) {
    return { error: "Choose leader from your team members." };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { error: "Unauthorized access." };
  }

  try {
    const result = await prisma.project.create({
      data: {
        name: projectName,
        description: description ?? "",
        startDate,
        endDate,
        leaderId,
        members: {
          create: selectMembers.map((member) => {
            return {
              userId: member.id,
            };
          }),
        },
        ownerId: session.user.id,
      },
    });

    return { error: null, result };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Project creation error" };
  }
}
