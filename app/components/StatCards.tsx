"use client"
import {getThisWeekTasks} from "@/lib/tasks/utils";
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

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Manage your daily life with no hassle</h2>

                <p className="mt-4 text-gray-500 sm:text-xl">
                    You have {thisWeekTasks.length} Tasks this week.
                </p>
            </div>

            <dl className="mt-6 grid grid-cols-4 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Total Sales</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">$4.8m</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Official Addons</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">24</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Total Addons</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">Downloads</dt>

                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86k</dd>
                </div>
            </dl>
        </div>
    )
}

export default StatCards;