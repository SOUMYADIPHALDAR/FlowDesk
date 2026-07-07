import { z } from "zod";

export const CommentSchema = z.object({
  body: z
    .string()
    .trim()
    .min(5, "Comment must be longer than 5 characters.")
    .max(100, "Comment must be with in 100 characters."),
  taskId: z.string().uuid("Invalid task id."),
  authorId: z.string().uuid("Inavlid author id."),
});

export type CommentInput = z.infer<typeof CommentSchema>;