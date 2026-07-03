import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function Session () {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) redirect("/signin");

    return session;
}