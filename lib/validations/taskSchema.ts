import { z } from "zod";
import { TaskPriority, TaskStatus } from "../generated/prisma/enums";

export const TaskSchema = z.object({
  projectId: z.string().uuid("Invalid project id."),
  title: z.string().min(1, "Title is required."),
  description: z
    .string()
    .max(500, "Description must be with in 500 characters.")
    .nullable()
    .optional(),
  status: z.enum(TaskStatus).default("TODO"),
  priority: z.enum(TaskPriority).default("MEDIUM"),
  assignedId: z.string().uuid("Invalid id.").nullable().optional(),
  tagId: z.string().uuid("Invalid id.").nullable().optional(),
  dueDate: z.date().nullable().optional(),
});

export type TaskInput = z.infer<typeof TaskSchema>
