import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CallBack () {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) {
        redirect("/signin");
    }

    if(session.user.role === "ADMIN") {
        redirect("/admin/dashboard");
    }

    redirect("/dashboard");
}