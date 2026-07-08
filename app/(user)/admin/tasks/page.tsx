import FetchTasksAction from "@/action/fetchTasks.action";
import AdminTaskPage from "./TaskPage";

export default async function Page () {
    const { error, result } = await FetchTasksAction();

    if(error){
        <div className="p-6 text-center text-red-500">
        {error}
      </div>
    }

    return <AdminTaskPage tasks={result ?? []} />
}