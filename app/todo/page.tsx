"use client";
import React, {useEffect, useState} from "react";
import {TaskItem} from "@/app/todo/types/taskItem";
import {Button} from "@nextui-org/react";
import {IoIosAdd} from "react-icons/io";
import DayItems from "@/app/todo/components/DailyTasks";
import {addTodoItem, defaultNewItem, deleteTodoItem, getTodoItems, updateTodoItem} from "@/app/todo/lib/backend";
import {getTasksByWeekday} from "@/app/todo/lib/utils";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function TodoPage() {
    const [taskList, setTaskList] = useState<TaskItem[] | undefined>();
    const [isAdding, setIsAdding] = useState(false);
    const today = new Date();


    useEffect(() => {
        if (taskList === undefined) {
            getTodoItems()
                .then((items) => {
                    setTaskList(items);
                })
                .catch((e) => console.log(e));
        }
    }, [taskList, isAdding]);

    const onItemAdd = (e: any) => {
        addTodoItem(defaultNewItem())
            .then((item) => setTaskList([...(taskList ? taskList : []), item]))
            .catch((e) => console.log(e));
    };

    const onItemUpdate = (item: TaskItem) => {
        updateTodoItem(item)
            .then((res) => {
                const isCurrentItem = (element: TaskItem) => element.uuid === res.uuid;
                if (taskList !== undefined) {
                    let tmp = [...taskList];
                    const idx = taskList.findIndex(isCurrentItem)
                    tmp[idx] = res;
                    setTaskList(tmp);
                }
            })
            .catch((e) => console.log(e));
    };

    const onItemRemove = (uuid: string) => {
        deleteTodoItem(uuid)
            .then((res) => {
                if (taskList !== undefined) {
                    setTaskList(taskList.filter((item) => item.uuid !== uuid));
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <div className="w-full flex flex-row justify-between">
                <div className={"text-2xl font-semibold text-blue-500 mb-2"}>
                    Tasks
                </div>
                <Button variant="light" isIconOnly onClick={onItemAdd}>
                    {" "}
                    <IoIosAdd size={24}/>{" "}
                </Button>
            </div>
            <div className="flex flex-col gap-y-2 my-4 w-full">
                {weekdays.map((weekday, weekdayNum) =>
                    <div key={weekday}>
                        <div className={`bordered border-t-1 border-slate-200 py-1 text-lg 
                        ${today.getDay() === weekdayNum + 1 ? "font-semibold text-orange-500" : "text-slate-500"} `}>
                            {weekday}
                        </div>
                        <DayItems
                            todoList={getTasksByWeekday(taskList as TaskItem[], weekdayNum + 1 <= 6 ? weekdayNum + 1 : 0)}
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
