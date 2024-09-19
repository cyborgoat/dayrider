"use client"
import {getFutureTasks, getPendingTasks, getThisWeekTasks} from "@/lib/tasks/utils";
import {TaskItem} from "@/types/taskItem";
import {useEffect, useMemo, useState} from "react";
import {getTaskItems} from "@/lib/tasks/backend";

const StatCards = () => {
    const [myTasks, setMyTasks] = useState<TaskItem[] | undefined>();


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

    const thisWeekTasks = useMemo(() => getThisWeekTasks(myTasks as TaskItem[], false), [myTasks])
    const pendingTasks = useMemo(() => getPendingTasks(myTasks as TaskItem[]), [myTasks]);
    const futureTasks = useMemo(() => getFutureTasks(myTasks as TaskItem[], false), [myTasks]);

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Manage daily life without hassle</h2>

                <p className="mt-4 text-gray-500 sm:text-xl">
                    Dayrider only support todo function at this moment.
                </p>
            </div>

            <dl className="mt-6 grid grid-cols-4 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Pending this week</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{thisWeekTasks.length}</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Pending in total</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{pendingTasks?.length}</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Future Tasks</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{futureTasks.length}</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Scheduled Events</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">0</dd>
                </div>
            </dl>
        </div>
    )
}

export default StatCards;