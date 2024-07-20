"use client";
import {useRef, useState} from "react";
import {Divider} from "@nextui-org/react";
import {TodoItem} from "@/types/todoItem";
import ItemLine from "./components/ItemLine";
import AddItemInput from "./components/AddItemInput";

const data: TodoItem[] = [
  {
    name: "task1",
    createdOn: "2024-12-31",
    finished: false,
    dueOn: "2024-12-31",
  },
  {
    name: "task2",
    createdOn: "2024-12-31",
    finished: false,
    dueOn: "2024-12-31",
  },
  {
    name: "task3",
    createdOn: "2024-12-31",
    finished: false,
    dueOn: "2024-12-31",
  },
  {
    name: "task4",
    createdOn: "2024-12-31",
    finished: false,
    dueOn: "2024-12-31",
  },
  {
    name: "task5",
    createdOn: "2024-12-31",
    finished: false,
    dueOn: "2024-12-31",
  },
];

export default function TodoPage() {
  const [todoList, setTodoList] = useState<TodoItem[]>(data);
  let ref = useRef(0);

  return (
    <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
      <div className={"text-2xl font-semibold"}>Todos</div>
      <Divider className="pb-1 mt-0 mb-4" />
      <div className="flex flex-col gap-y-2 my-4 w-full">
        {todoList.map((todo, idx) => (
          <ItemLine todo={todo} key={`item-${idx}`} />
        ))}
      </div>
      <AddItemInput itemList={todoList} setItemList={setTodoList} />
    </main>
  );
}
