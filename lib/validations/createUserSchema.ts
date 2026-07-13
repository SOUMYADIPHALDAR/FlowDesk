import { UserRole } from "@/lib/generated/prisma/enums";
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number.")
    .optional()
    .or(z.literal("")),

  designation: z
    .string()
    .trim()
    .min(2, "Designation is required.")
    .max(50, "Designation cannot exceed 50 characters."),

  department: z
    .string()
    .trim()
    .min(2, "Department is required.")
    .max(50, "Department cannot exceed 50 characters."),

  joiningDate: z.coerce.date({
    error: "Joining date is required.",
  }),

  role: z.enum(UserRole),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;