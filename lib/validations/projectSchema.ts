import { z } from "zod";
import { ProjectStatus } from "../generated/prisma/enums";

export const ProjectSchema = z.object({
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
  leaderId: z
    .string()
    .min(1, "Leader id is required")
    .uuid("Invalid Leader id."),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .date("Invalid start date"),
  endDate: z
    .string()
    .min(1, "End date is required.")
    .date("Invalid end date"),
  image: z.url("Invalid image url").optional(),
  status: z.enum(ProjectStatus).default("ACTIVE"),
  memberIds: z
    .array(
      z.object({
        id: z.string().uuid("Invalid member."),
        name: z.string(),
        email: z.string("Invalid email."),
        image: z.string().nullable().optional(),
      }),
    )
    .min(2, "Select atleast 2 team members."),
}).superRefine((data, ctx) => {
    if(new Date(data.endDate) < new Date(data.startDate)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["endDate"],
            message: "End date can not be before the start date"
        })
    }

    const leaderExisits = data.memberIds.some(
        (member) => member.id === data.leaderId
    )

    if(!leaderExisits){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["leaderId"],
            message: "Leader must be with in the selected members."
        })
    }
});

export type ProjectSchema = z.infer<typeof ProjectSchema>;
