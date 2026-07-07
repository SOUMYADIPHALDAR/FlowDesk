import { z} from "zod";

export const ProjectMemberSchema = z.object({
    projectId: z.string().uuid("Invalid project Id."),
    userId: z.string().uuid("Invalid user id.")
});

export type ProjectMemberInput = z.infer<typeof ProjectMemberSchema>;