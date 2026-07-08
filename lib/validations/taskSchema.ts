import { z } from "zod";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";

export const TaskSchema = z.object({
  projectId: z.string().min(1, "Project id is required"),
  title: z.string().min(1, "Title is required."),
  description: z
    .string()
    .max(500, "Description must be with in 500 characters.")
    .nullable()
    .optional(),
  status: z.enum(TaskStatus).default("PLANNING"),
  priority: z.enum(TaskPriority).default("MEDIUM"),
  assigneeId: z.string().nullable().optional(),
  tagId: z.string().nullable().optional(),
  dueDate: z.date().nullable().optional(),
});

export type TaskInput = z.infer<typeof TaskSchema>
