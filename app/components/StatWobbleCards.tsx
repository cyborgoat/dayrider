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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                className=""
            >
                <div className="max-w-xs">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        10/30 Tasks
                    </h2>
                    <p className="mt-4 text-left  text-base/6 text-neutral-200">
                        You have {getThisWeekTasks(myTasks as TaskItem[]).length} Tasks this week
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
                    7 Upcoming schedules
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                    If someone yells “stop!”, goes limp, or taps out, the fight is over.
                </p>
            </WobbleCard>
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className="max-w-sm">
                    <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Signup for blazing-fast cutting-edge state of the art Gippity AI
                        wrapper today!
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        With over 100,000 mothly active bot users, Gippity AI is the most
                        popular AI platform for developers.
                    </p>
                </div>
            </WobbleCard>
        </div>
    );
}
