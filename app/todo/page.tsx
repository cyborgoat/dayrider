"use client";
import React, {useEffect, useState} from "react";
import {Divider} from "@nextui-org/react";
import {TodoItem} from "@/types/todoItem";
import ItemLine from "./components/ItemLine";
import {getLocalTimeZone, today} from "@internationalized/date";
import {invoke} from "@tauri-apps/api/tauri";

import {v4 as uuidv4} from 'uuid';


export default function TodoPage() {
    const [todoList, setTodoList] = useState<TodoItem[] | undefined>();

    useEffect(() => {
        if (todoList === undefined) {
            invoke<string>('todo_list').then(result => {
                const dbRecord: TodoItem[] = JSON.parse(result)
                setTodoList(dbRecord)
                console.log("todoList loaded")
            }).catch(e => console.log(e))
        }
    }, [todoList])

    const addTodoHandler = (e: any) => {
        const newItem = {
            uuid: uuidv4(),
            name: "New Todo Item",
            date: today(getLocalTimeZone()).toString(),
            finished: "false",
            deadline: today(getLocalTimeZone()).toString(),
            notes: "test notes"
        };
        invoke<string>('add_item', {todoItem: newItem})
            .then(result => {
                    setTodoList([
                        ...todoList ? todoList : [],
                        newItem
                    ])
                    console.log(result)
                }
            )
            .catch(console.error)
    }

    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <div className={"text-2xl font-semibold text-blue-500 mb-2"}>Todos</div>
            <div className="flex flex-col gap-y-2 my-4 w-full">
                {todoList?.map((todo, idx) => (
                    <ItemLine todo={todo} key={`item-${idx}`}/>
                ))}
            </div>
            <button className="text-indigo-700 text-md font-semibold pl-2" onClick={addTodoHandler}>+ Add another todo
                item
            </button>
            {/*<AddItemInput itemList={todoList} setItemList={setTodoList}/>*/}
        </main>
    );
}
