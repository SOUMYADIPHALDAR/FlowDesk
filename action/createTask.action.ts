"use server";

interface CreateTaskActionProps {
    projectId: string;
    asigneeId: string;
    startDate: Date;
    endDate: Date;
    description: string;
    status: string;
    priority: string;
}

export default async function CreateTaskAction ( data: CreateTaskActionProps) {

}