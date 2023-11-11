import {Divider} from "@nextui-org/react";
import {Task} from "@/types/task";
import CheckList from "@/components/CheckList";

const checkListData: Task[] = [
    {name: "Eat Fruits", status: "pending"},
    {name: "Do Exercises", status: "pending"},
    {name: "Learn Business Strategies", status: "pending"},
]
export default function TodoPage() {
    return (
        <main className="flex min-h-screen flex-col items-start justify-items-start mx-6 pt-6">
            <div className={"text-2xl font-semibold"}>Todos</div>
            <Divider className="mt-0 pb-1 mb-4"/>
            <span className="text-lg font-semibold text-sky-500/80">Today</span>
            <CheckList tasks={checkListData}/>
            <span className="pt-4 text-lg font-semibold text-rose-600/80">Overdue</span>
            <CheckList tasks={checkListData}/>
            <span className="pt-4 text-lg font-semibold text-stone-700/80">Planned</span>
            <CheckList tasks={checkListData}/>
        </main>
    )
}
