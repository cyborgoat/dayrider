"use client";
import React, {useEffect, useState} from "react";
import {TaskItem} from "@/app/todo/types/taskItem";
import {Button, Switch} from "@nextui-org/react";
import {IoIosAdd} from "react-icons/io";
import DayItems from "@/app/todo/components/DailyTasks";
import {addTodoItem, defaultNewItem, deleteTodoItem, getTodoItems, updateTodoItem} from "@/app/todo/lib/backend";
import {getPastTasks, getTasksByWeekday} from "@/app/todo/lib/utils";
import Link from "next/link";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function isToday(today: Date, weekdayNum: number) {
    return today.getDay() === weekdayNum + 1 || today.getDay() === weekdayNum - 6;
}

export default function TodoPage() {
    const [focusTasks, setFocusTasks] = useState<TaskItem[] | undefined>();
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const [focusedId, setFocusedId] = React.useState<string | null>(null);
    const today = new Date();
    const dayOfWeek = today.getDay();


    useEffect(() => {
        if (focusTasks === undefined) {
            getTodoItems()
                .then((items) => {
                    // const tasks = getTasksThisWeek(items)
                    setFocusTasks(items);
                })
                .catch((e) => console.log(e));
        }
    }, [focusTasks]);

    const onItemAdd = (e: any) => {
        const defaultTask = defaultNewItem();
        addTodoItem(defaultTask)
            .then((item) => setFocusTasks([...(focusTasks ? focusTasks : []), item]))
            .catch((e) => console.log(e));
        setFocusedId(defaultTask.uuid)
    };

    const onItemUpdate = (item: TaskItem) => {
        updateTodoItem(item)
            .then((res) => {
                const isCurrentItem = (element: TaskItem) => element.uuid === res.uuid;
                if (focusTasks !== undefined) {
                    let tmp = [...focusTasks];
                    const idx = focusTasks.findIndex(isCurrentItem)
                    tmp[idx] = res;
                    setFocusTasks(tmp);
                }
            })
            .catch((e) => console.log(e));
    };

    const onItemRemove = (uuid: string) => {
        deleteTodoItem(uuid)
            .then((res) => {
                if (focusTasks !== undefined) {
                    setFocusTasks(focusTasks.filter((item) => item.uuid !== uuid));
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
                <Link href={`#day-${dayOfWeek}`}>
                    <Button variant="light" isIconOnly onClick={onItemAdd}>
                        {" "}
                        <IoIosAdd size={24}/>{" "}
                    </Button>
                </Link>
            </div>
            <div className="w-full flex flex-row justify-between items-end">
                <div className={"text-2xl font-semibold text-blue-500"}>
                    10
                </div>
                <div>
                    <Switch size="sm" color="primary" defaultSelected={showCompleted} className="self-end"
                            classNames={{
                                label: "text-sm",
                            }}
                            onValueChange={(isSelected) => setShowCompleted(isSelected)}
                    >
                        Show Completed
                    </Switch>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 my-4 w-full">
                {weekdays.map((weekday, weekdayNum) => {
                        const dayTasks = getTasksByWeekday(focusTasks as TaskItem[], weekdayNum + 1 <= 6 ? weekdayNum + 1 : 0)
                        if (dayTasks.length < 1) {
                            return (
                                <div id={`day-${weekdayNum}`}
                                     key={weekday}
                                     onClick={() => setFocusedId(null)}
                                >
                                    <div className={
                                        `bordered border-t-1 border-slate-200 py-1 text-lg 
                                        ${isToday(today, weekdayNum) ?
                                            "font-semibold text-orange-500" : "text-slate-500"} `}>
                                        {weekday}
                                    </div>
                                    <div className="text-center text-slate-300/80 text-xs">Day is clear</div>
                                </div>
                            )
                        } else {
                            return (
                                <div id={`day-${weekdayNum}`} key={weekday}>
                                    <div className={`bordered border-t-1 border-slate-200 py-1 text-lg 
                        ${isToday(today, weekdayNum) ? "font-semibold text-orange-500" : "text-slate-500"} `}>
                                        {weekday}
                                    </div>
                                    <DayItems
                                        todoList={dayTasks}
                                        showCompleted={showCompleted}
                                        onItemRemove={onItemRemove}
                                        onItemUpdate={onItemUpdate}
                                        focusedId={focusedId}
                                        setFocusedId={setFocusedId}
                                    />
                                </div>
                            )

                        }
                    }
                )
                }
                <div key="past-tasks">
                    <div className={"bordered border-t-1 border-slate-200 py-1 text-lg text-slate-500"}>
                        Past Tasks
                    </div>
                    <DayItems
                        todoList={getPastTasks(focusTasks as TaskItem[])}
                        showCompleted={showCompleted}
                        onItemRemove={onItemRemove}
                        onItemUpdate={onItemUpdate}
                        focusedId={focusedId}
                        setFocusedId={setFocusedId}
                    />
                </div>
            </div>
            <div className="h-32 w-full" onClick={() => setFocusedId(null)}></div>
        </main>
    );
}
