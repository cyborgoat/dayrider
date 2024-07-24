"use client";
import React, {MouseEventHandler, useEffect, useRef, useState} from "react";
import {Divider} from "@nextui-org/react";
import {TodoItem} from "@/types/todoItem";
import ItemLine from "./components/ItemLine";
import {today, getLocalTimeZone, CalendarDate} from "@internationalized/date";
import AddItemInput from "@/app/todo/components/AddItemInput";
import {invoke} from "@tauri-apps/api/tauri";

const data: TodoItem[] = [
    {
        uuid: "1",
        name: "task1",
        date: "2024-12-31",
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
    },
    {
        uuid: "2",
        name: "task2",
        date: "2024-12-31",
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
    },
    {
        uuid: "3",
        name: "task3",
        date: "2024-12-31",
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
    },
    {
        uuid: "4",
        name: "task4",
        date: "2024-12-31",
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
    },
    {
        uuid: "5",
        name: "task5",
        date: "2024-12-31",
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
    },
];

export default function TodoPage() {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);

    useEffect(() => {
        invoke<string>('todo_list').then(result => {
            const dbRecord: TodoItem[] = JSON.parse(result)
            setTodoList(dbRecord)
        }).catch(e => console.log(e))
    }, [])

    const addTodoHandler = (e: any) => {
        setTodoList([...todoList, {
            uuid: `${todoList.length}`,
            name: "New Todo Item",
            date: today(getLocalTimeZone()).toString(),
            finished: "false",
            deadline: today(getLocalTimeZone()).toString()
        }]);

    }

    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <div className={"text-2xl font-semibold"}>Todos</div>
            <Divider className="pb-1 mt-0 mb-4"/>
            <div className="flex flex-col gap-y-2 my-4 w-full">
                {todoList.map((todo, idx) => (
                    <ItemLine todo={todo} key={`item-${idx}`}/>
                ))}
            </div>
            {/*<button className="text-indigo-700 text-md font-semibold pl-2" onClick={addTodoHandler}>+ Add another todo*/}
            {/*    item*/}
            {/*</button>*/}
            <AddItemInput itemList={todoList} setItemList={setTodoList}/>
        </main>
    );
}
