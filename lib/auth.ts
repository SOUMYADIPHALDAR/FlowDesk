import { betterAuth } from "better-auth";
import prisma from "@/lib/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { comparePassword, hashedPassword } from "@/lib/bcrypt";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        autoSignIn: false,
        requireEmailVerification: false,
        password: {
            hash: hashedPassword,
            verify: comparePassword
        }
    },
    session: {
        expiresIn: 24 * 60 * 60,
    },
    plugins: [
        nextCookies()
    ]
})