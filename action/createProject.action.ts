"use server";

import prisma from "@/lib/prisma";
import { ProjectSchema } from "@/lib/validations/projectSchema";
import { APIError } from "better-auth";
import { GetSessionAction } from "./getSession.action";

interface CreateProjectActionProps {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  leaderId: string;
  memberIds: string[];
  image?: string;
}

export default async function CreateProjectAction(
  data: CreateProjectActionProps,
) {
  const validation = ProjectSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    };
  }

  const {
    projectName,
    description,
    startDate,
    endDate,
    leaderId,
    memberIds,
    image,
  } = validation.data;

  const { error, session } = await GetSessionAction();

  if (error) {
    return { error };
  }
  if (!session) {
    return { error: "Unable to fetch user details." };
  }
  try {
    await prisma.project.create({
      data: {
        name: projectName,
        description: description ?? "",
        startDate,
        endDate,
        leaderId,
        ownerId: session?.user.id,
        image,
        members: {
          create: memberIds.map((userId) => {
            return {
              userId,
            };
          }),
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Project creation error" };
  }
}
