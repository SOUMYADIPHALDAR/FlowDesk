import BackButton from "@/components/back-button";
import CreateTaskForm from "@/components/createTask-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function CreateTaskPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">

           <BackButton />

        <h1 className="text-3xl font-bold tracking-tight">Create Task</h1>

        <Button>
          <Link href="/admin/tasks/subtask" className="flex justify-center itmes-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Subtask
          </Link>
        </Button>
      </div>

      {/* Form */}
      <CreateTaskForm />
    </div>
  );
}
