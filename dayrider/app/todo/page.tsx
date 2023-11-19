"use client";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Divider } from "@nextui-org/react";
import { TodoItem } from "@/types/task";
import CheckList from "@/components/CheckList";
import TodoModal from "@/components/TodoModal";

export default function TodoPage() {
  const [data, setData] = useState<TodoItem[]>([]);

  useEffect(() => {
    invoke<string>("todo_list")
      .then((res) => setData(JSON.parse(res.toString())))
      .catch(console.error);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-items-start px-4 pt-6 lg:px-6">
      <div className={"text-2xl font-semibold"}>Todos</div>
      <Divider className="mt-0 pb-1 mb-4" />
      <TodoModal todoSetter={setData} />
      <span className="text-lg font-semibold text-sky-500/80">Today</span>
      <CheckList todoItems={data} />
      <span className="pt-4 text-lg font-semibold text-rose-600/80">
        Overdue
      </span>
      <CheckList todoItems={data} />
      <span className="pt-4 text-lg font-semibold text-stone-700/80">
        Planned
      </span>
      <CheckList todoItems={data} />
    </main>
  );
}
