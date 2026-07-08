export const TASK_PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
] as const;

export const TASK_STATUSES = [
  "PLANNING",
  "IN_PROGRESS",
  "DONE",
  "DELAYED"
] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];