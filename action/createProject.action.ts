"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ProjectSchema } from "@/lib/validations/projectSchema";
import { APIError } from "better-auth";
import { headers } from "next/headers";

interface CreateProjectActionProps {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  leaderId: string;
  memberIds: string[];
}

export default async function CreateProjectAction(
  data: CreateProjectActionProps,
) {
const validation = ProjectSchema.safeParse(data);

if(!validation.success){
  return {
    error: validation.error.issues[0].message
  }
}

  const {
    projectName,
    description,
    startDate,
    endDate,
    leaderId,
    memberIds,
  } = validation.data;

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
          create: memberIds.map((member) => {
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
