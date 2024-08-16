"use client";
import React, {useEffect, useState} from "react";
import {TodoItem} from "@/app/todo/types/todoItem";
import {addTodoItem, defaultNewItem, deleteTodoItem, getTodoItems, updateTodoItem,} from "@/app/todo/lib/utils";
import {Button} from "@nextui-org/react";
import {IoIosAdd} from "react-icons/io";
import DayItems from "@/app/todo/components/DayTodoItemLines";
import {getThisWeekDates} from "@/lib/dateutil";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TodoPage() {
    const [todoList, setTodoList] = useState<TodoItem[] | undefined>();
    const [isAdding, setIsAdding] = useState(false);
    const thisWeekDates = getThisWeekDates();


    useEffect(() => {
        if (todoList === undefined) {
            getTodoItems()
                .then((items) => {
                    setTodoList(items);
                })
                .catch((e) => console.log(e));
        }
    }, [todoList, isAdding]);

    const onItemAdd = (e: any) => {
        addTodoItem(defaultNewItem())
            .then((item) => setTodoList([...(todoList ? todoList : []), item]))
            .catch((e) => console.log(e));
    };

    const onItemUpdate = (item: TodoItem) => {
        updateTodoItem(item)
            .then((res) => {
                const isCurrentItem = (element: TodoItem) => element.uuid === res.uuid;
                if (todoList !== undefined) {
                    let tmp = [...todoList];
                    const idx = todoList.findIndex(isCurrentItem)
                    tmp[idx] = res;
                    setTodoList(tmp);
                }
            })
            .catch((e) => console.log(e));
    };

    const onItemRemove = (uuid: string) => {
        deleteTodoItem(uuid)
            .then((res) => {
                if (todoList !== undefined) {
                    setTodoList(todoList.filter((item) => item.uuid !== uuid));
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <div className="w-full flex flex-row justify-between">
                <div className={"text-2xl font-semibold text-blue-500 mb-2"}>
                    Todos
                </div>
                <Button variant="light" isIconOnly onClick={onItemAdd}>
                    {" "}
                    <IoIosAdd size={24}/>{" "}
                </Button>
            </div>
            <div className="flex flex-col gap-y-2 my-4 w-full">
                {weekdays.map((weekday, weekdayNum) =>
                    <div key={weekday}>
                        <div>{weekday}</div>
                        <DayItems
                            todoList={todoList}
                            weekdayNum={weekdayNum}
                            onItemRemove={onItemRemove}
                            onItemUpdate={onItemUpdate}/>
                    </div>
                )
                }
            </div>
            <button
                className="text-blue-500 text-md font-semibold pl-2"
                onClick={onItemAdd}
            >
                + Add another todo item
            </button>
        </main>
    );
}
