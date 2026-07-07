import { z } from "zod";
import { ProjectStatus } from "../generated/prisma/enums";

export const ProjectSchema = z
  .object({
    projectName: z
      .string()
      .trim()
      .min(3, "Project name must be atleast 3 characters")
      .max(100, "Project name must be with in 100 characters"),
    description: z
      .string()
      .trim()
      .max(500, "Description must be with in 500 characters.")
      .optional(),
    leaderId: z.string().min(1, "Leader id is required"),
    startDate: z.date("Invalid start date"),
    endDate: z.date("Invalid end date"),
    image: z.url("Invalid image url").optional(),
    status: z.enum(ProjectStatus).default("ACTIVE"),
    memberIds: z.array(z.string()).min(2, "Select atleast 2 team members."),
  })
  .superRefine((data, ctx) => {
    if (new Date(data.endDate) < new Date(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date can not be before the start date",
      });
    }

    const leaderExisits = data.memberIds.includes(data.leaderId)

    if (!leaderExisits) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["leaderId"],
        message: "Leader must be with in the selected members.",
      });
    }
  });

export type ProjectSchema = z.infer<typeof ProjectSchema>;
