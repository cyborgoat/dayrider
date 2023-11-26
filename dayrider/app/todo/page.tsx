"use client";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Divider } from "@nextui-org/react";
import { TodoItem } from "@/types/task";
import CheckList from "@/components/CheckList";
import TodoModal from "@/components/TodoModal";
import { log } from "console";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default function TodoPage() {
  let dataMap = new Map<String, TodoItem[]>();
  WEEKDAYS.map((item) => dataMap.set(item, []));

  const [data, setData] = useState<TodoItem[]>([]);
  const [todoMap, setTodoMap] = useState(dataMap);

  useEffect(() => {
    invoke<string>("todo_list")
      .then((res) => {
        const _items: TodoItem[] = JSON.parse(res.toString());
        _items.forEach((item) => {
          const date = new Date(item.due_date);
          const weekDay = WEEKDAYS[date.getDay()];
          setTodoMap(
            dataMap.set(weekDay, [...(dataMap.get(weekDay) ?? []), item])
          );
        });
        setData(_items);
      })
      .catch(console.error);
  }, [todoMap]);

  return (
    <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
      <div className={"text-2xl font-semibold"}>Todos</div>
      <Divider className="pb-1 mt-0 mb-4" />
      <TodoModal todoSetter={setData} />
      <span className="text-lg font-semibold text-sky-500/80">Today</span>
      <CheckList todoItems={data} />
      {WEEKDAYS.map((weekDay, idx) => {
        return (
          <div className="w-full" key={idx}>
            <Divider className="mt-4" />
            <span className="pt-4 text-lg font-semibold text-rose-600/80">
              {weekDay}
            </span>
            <CheckList todoItems={todoMap.get(weekDay) ?? []} />
          </div>
        );
      })}
      <span className="pt-4 text-lg font-semibold text-rose-600/80">
        Overdue
      </span>
      {/* <CheckList todoItems={[]} />
      <span className="pt-4 text-lg font-semibold text-stone-700/80">
        Planned
      </span>
      <CheckList todoItems={[]} /> */}
    </main>
  );
}
