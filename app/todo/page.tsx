"use client";
import {useState} from "react";
import {Divider} from "@nextui-org/react";
import TodoModal from "@/components/TodoModal";
import {TodoItem} from "@/types/todoItem";
import AddItemInput from "@/app/todo/components/AddItemInput";

export default function TodoPage() {
    const [todoList, setTodoList] = useState<TodoItem[]>([] as TodoItem[]);

    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <div className={"text-2xl font-semibold"}>Todos</div>
            <Divider className="pb-1 mt-0 mb-4"/>
            <TodoModal todoList={todoList} setTodoList={setTodoList}/>
            <div className="flex flex-col gap-y-2 my-4 w-full">
                {todoList.map((todo) => (
                    <>
                        <div>{todo.name}</div>
                        <Divider className="pb-1 mt-0 mb-4"/>
                    </>
                ))}
            </div>
            <AddItemInput/>
        </main>
    );
}
