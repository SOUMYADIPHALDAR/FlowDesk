import { GetSessionAction } from "@/action/getSession.action";
import { UserRole } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CallBack() {
  const { error, session } = await GetSessionAction();

  if (error || !session) {
    const message = error ?? "Registration has been disabled. Contact your administrator.";
    redirect(
      `/signin?error=oauth_callback_failed&error_description=${encodeURIComponent(message)}`,
    );
  }

  if (session.user.role !== UserRole.ADMIN) {
    await prisma.session.delete({
      where: { id: session.session.id },
    });

    redirect(
      "/signin?error=oauth_not_allowed&error_description=OAuth+sign-in+is+available+to+administrator+accounts+only.",
    );
  }

  redirect("/admin/dashboard");
}
