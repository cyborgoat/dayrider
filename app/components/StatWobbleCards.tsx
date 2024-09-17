"use client";
import React, {useEffect, useState} from "react";
import {WobbleCard} from "@/components/ui/wobble-card";
import {TaskItem} from "@/types/taskItem";
import {getTaskItems} from "@/lib/tasks/backend";
import {getThisWeekTasks} from "@/lib/tasks/utils";

interface TaskStat {
    tasks: number;
    pastTasks: number;
    tasksThisWeek: number;
    overdueTasks: number;
    futureTasks: number;
}

export function StatWobbleCards() {
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


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-11/12">
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                className=""
            >
                <div className="max-w-xs">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white align-text-bottom">
                        {myTasks?.length} Tasks
                    </h2>
                    <p className="mt-4 text-left  text-base/6 text-neutral-200">
                        You have {getThisWeekTasks(myTasks as TaskItem[], false).length} Tasks this week.
                    </p>
                </div>
                {/*<Image*/}
                {/*    src="/linear.webp"*/}
                {/*    width={500}*/}
                {/*    height={500}*/}
                {/*    alt="linear demo image"*/}
                {/*    className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"*/}
                {/*/>*/}
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Under Construction
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                    Section under construction
                </p>
            </WobbleCard>
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className="max-w-sm">
                    <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Section under construction
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        Section under construction
                    </p>
                </div>
            </WobbleCard>
        </div>
    );
}
