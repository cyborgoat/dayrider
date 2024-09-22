"use client";
import React, {useEffect, useState} from "react";
import {TaskItem} from "@/types/taskItem";
import DayItems from "@/app/todo/components/DailyTasks";
import {addTaskItem, defaultTask, deleteTaskItem, getTaskItems, updateTaskItem} from "@/lib/tasks/backend";
import {getFutureTasks, getPastTasks, getTasksByWeekday} from "@/lib/tasks/utils";
import TodoPageHeader from "@/app/todo/components/TodoPageHeader";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function isToday(today: Date, weekdayNum: number) {
    return today.getDay() === weekdayNum + 1 || today.getDay() === weekdayNum - 6;
}

export default function TodoPage() {
    const [myTasks, setMyTasks] = useState<TaskItem[] | undefined>();
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const [focusedId, setFocusedId] = React.useState<string | null>(null);
    const today = new Date();


    useEffect(() => {
        if (myTasks === undefined) {
            getTaskItems()
                .then((items) => {
                    // const tasks = getTasksThisWeek(items)
                    setMyTasks(items);
                })
                .catch((e) => console.log(e));
        }
    }, [myTasks]);

    const onItemAdd = (_: any) => {
        const task = defaultTask();
        addTaskItem(task)
            .then((item) => setMyTasks([...(myTasks ? myTasks : []), item]))
            .catch((e) => console.log(e));
        setFocusedId(task.uuid)
        return task
    };

    const onItemUpdate = (item: TaskItem) => {
        updateTaskItem(item)
            .then((res) => {
                const isCurrentItem = (element: TaskItem) => element.uuid === res.uuid;
                if (myTasks !== undefined) {
                    let tmp = [...myTasks];
                    const idx = myTasks.findIndex(isCurrentItem)
                    tmp[idx] = res;
                    setMyTasks(tmp);
                }
            })
            .catch((e) => console.log(e));
    };

    const onItemRemove = (uuid: string) => {
        deleteTaskItem(uuid)
            .then((_) => {
                if (myTasks !== undefined) {
                    setMyTasks(myTasks.filter((item) => item.uuid !== uuid));
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <TodoPageHeader onItemAdd={onItemAdd}
                            numOfUnfinished={myTasks?.filter(task => task.finished === 'false').length}
                            showCompleted={showCompleted} setShowCompleted={setShowCompleted}/>
            <div className="flex flex-col gap-y-2 mb-4 w-full">
                {weekdays.map((weekday, weekdayNum) => {
                        const dayTasks = getTasksByWeekday(myTasks as TaskItem[], weekdayNum + 1 <= 6 ? weekdayNum + 1 : 0, showCompleted)
                        const itIsToday = isToday(today, weekdayNum)
                        return (
                            <div id={`day-${weekdayNum}`} key={weekday}>
                                <div className={`bordered border-t-1 border-slate-200 py-1 text-lg 
                        ${itIsToday ? "font-semibold text-orange-500" : "text-slate-500"} `}
                                     onClick={() => setFocusedId(null)}
                                >
                                    {itIsToday ? `Today` : weekday}
                                </div>
                                <DayItems
                                    todoList={showCompleted ? dayTasks : dayTasks.filter(task => task.finished === 'false')}
                                    onItemRemove={onItemRemove}
                                    onItemUpdate={onItemUpdate}
                                    focusedId={focusedId}
                                    setFocusedId={setFocusedId}
                                />
                            </div>
                        )

                    }
                )
                }
                <div key="day-7">
                    <div className={"bordered border-t-1 border-slate-200 py-1 text-lg text-slate-300"}>
                        Past Tasks
                    </div>
                    <DayItems
                        todoList={getPastTasks(myTasks as TaskItem[], showCompleted)}
                        onItemRemove={onItemRemove}
                        onItemUpdate={onItemUpdate}
                        focusedId={focusedId}
                        setFocusedId={setFocusedId}
                    />
                </div>
                <div key="day-8">
                    <div className={"bordered border-t-1 border-slate-200 py-1 text-lg text-slate-300"}>
                        Future Tasks
                    </div>
                    <DayItems
                        todoList={getFutureTasks(myTasks as TaskItem[], showCompleted)}
                        onItemRemove={onItemRemove}
                        onItemUpdate={onItemUpdate}
                        focusedId={focusedId}
                        setFocusedId={setFocusedId}
                    />
                </div>
            </div>
            <div className="h-32 w-full" onClick={() => setFocusedId(null)}></div>
        </main>
    )
        ;
}
