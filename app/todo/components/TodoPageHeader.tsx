import {Button, cn, Switch} from "@nextui-org/react";
import {IoIosAdd} from "react-icons/io";
import React from "react";
import {onTaskAddFunction} from "@/types/taskItem";
import Link from "next/link";

const TodoPageHeader = (
    {onItemAdd, numOfUnfinished, showCompleted, setShowCompleted}: {
        onItemAdd: onTaskAddFunction,
        numOfUnfinished: number | undefined,
        showCompleted: boolean,
        setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {
    const today = new Date();
    const dayOfWeek = today.getDay()
    const dayNum = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    console.log(dayNum)
    return (
        <>
            <div className="w-full flex flex-row justify-between">
                <div className={"text-2xl font-semibold text-blue-500 mb-2"}>
                    Tasks
                </div>
                <Link href={`#day-${dayNum}`}>
                    <Button variant="light" isIconOnly onClick={onItemAdd}>
                        {" "}
                        <IoIosAdd size={24}/>{" "}
                    </Button>
                </Link>
            </div>
            <div className="w-full flex flex-row justify-between items-end">
                <div className={"text-2xl font-semibold text-gray-500 p-1"}>
                    {typeof numOfUnfinished === "number" ? (numOfUnfinished) : 0}
                </div>
                <div>
                    <Switch
                        color={"primary"}
                        classNames={{
                            base: cn(
                                "inline-flex flex-row-reverse w-full max-w-md items-center",
                                "justify-between cursor-pointer rounded-lg gap-2 p-1 border-2 border-transparent",
                            ),
                            wrapper: "p-0 h-4 overflow-visible data-[selected=true]:bg-blue-500",
                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                                "group-data-[hover=true]:border-blue-500",
                                //selected
                                "group-data-[selected=true]:ml-6",
                                // pressed
                                "group-data-[pressed=true]:w-7",
                                "group-data-[selected]:group-data-[pressed]:ml-4",
                            ),
                        }}
                        onValueChange={(isSelected) => setShowCompleted(isSelected)}
                        defaultSelected={showCompleted}
                    >
                        <span className={"text-sm text-slate-500"}>Show Completed</span>
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default TodoPageHeader;