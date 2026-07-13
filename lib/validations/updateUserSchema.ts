import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  image: z
    .string()
    .url("Please enter a valid image URL.")
    .nullable()
    .optional(),

  address: z
    .string()
    .trim()
    .max(255, "Address cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number.")
    .optional()
    .or(z.literal("")),

  jobRole: z
    .string()
    .trim()
    .max(50, "Job role cannot exceed 50 characters.")
    .optional()
    .or(z.literal("")),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
