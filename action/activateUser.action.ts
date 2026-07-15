"use server";

import prisma from "@/lib/prisma";
import { hashedPassword } from "@/lib/bcrypt";
import { ActivateUserSchema } from "@/lib/validations/activateUserSchema";
import { randomUUID } from "crypto";

interface ActivateUserActionProps {
  token?: string;
  password: string;
  confirmPassword: string;
}

export default async function ActivateUserAction({
  token,
  password,
  confirmPassword,
}: ActivateUserActionProps) {
  try {
    const validation = ActivateUserSchema.safeParse({
      token,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    const user = await prisma.user.findUnique({
      where: { invitationToken: validation.data.token },
      select: { id: true },
    });

    if (!user) {
      return { error: "Invitation token is invalid or expired." };
    }

    const passwordHash = await hashedPassword(validation.data.password);
    const activated = await prisma.$transaction(async (tx) => {
      const consumedInvitation = await tx.user.updateMany({
        where: {
          id: user.id,
          invitationToken: validation.data.token,
          invitationExpires: { gt: new Date() },
        },
        data: {
          emailVerified: true,
          invitationToken: null,
          invitationExpires: null,
        },
      });

      if (consumedInvitation.count !== 1) {
        return false;
      }

      await tx.account.create({
        data: {
          id: randomUUID(),
          accountId: user.id,
          providerId: "credential",
          password: passwordHash,
          userId: user.id,
        },
      });

      return true;
    });

    if (!activated) {
      return { error: "Invitation token is invalid or expired." };
    }

    return { error: null };
  } catch (err) {
    console.error("Unable to activate user:", err);
    return { error: "Internal server error" };
  }
}
