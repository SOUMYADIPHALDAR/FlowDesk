import { z } from "zod";
import { UserRole } from "@/lib/generated/prisma/enums";

const UserSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email."),
  image: z.string().url("Invalid url").nullable().optional(),
  address: z
    .string()
    .trim()
    .max(255, "Address must be with in 255 characters.")
    .optional(),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid phone no.")
    .optional(),
  jobRole: z
    .string()
    .trim()
    .max(25, "Job role must be with in 25 characters")
    .optional(),
  role: z.enum(UserRole).default("USER"),
});
