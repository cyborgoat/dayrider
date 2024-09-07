"use client";
import {onItemRemoveFunction, onItemUpdateFunction, TaskItem,} from "@/app/todo/types/taskItem";
import {Button, DatePicker, extendVariants, Input} from "@nextui-org/react";
import React, {useState} from "react";
import {MdOutlineArrowBackIos} from "react-icons/md";
import {isFinished, isOverdue, overdueDays} from "@/app/todo/lib/utils";
import {parseDate} from "@internationalized/date";
import TaskDetailModal from "@/app/todo/components/TaskDetailModal";
import DeletePopover from "./DeletePopover";
import {defaultNewItem} from "@/app/todo/lib/backend";

const TaskLine = (props: {
    task: TaskItem;
    onItemRemove: onItemRemoveFunction;
    onItemUpdate: onItemUpdateFunction;
    focusedId: string | null | undefined;
    setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const [name, setName] = React.useState(props.task.name);
    const taskId = props.task.uuid;
    const [deadline, setDeadline] = React.useState(parseDate(props.task.deadline));

    const isFocused = () => taskId === props.focusedId;

    return (
        <div className="transition-all duration-100 w-full py-0">
            <div
                className="flex flex-row align-items-center w-full"
                onClick={() => props.setFocusedId(props.task.uuid)}
                onBlur={() => {
                    if (name == defaultNewItem().name) {
                        props.onItemRemove(props.task.uuid)
                    }
                }}
            >
                <input
                    type="checkbox"
                    checked={isFinished(props.task)}
                    onChange={() => {
                        const newItem = {
                            ...props.task,
                            finished: isFinished(props.task) ? "false" : "true",
                        };
                        props.onItemUpdate(newItem);
                    }}
                    name={`radio-${props.task.uuid}`}
                    className="checkbox checkbox-xs self-center mx-2
                       [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-300
                       "
                />
                <Input
                    type="text"
                    variant="flat"
                    aria-label="task-name"
                    label=""
                    defaultValue={props.task.name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                        props.onItemUpdate({...props.task, name: name,})
                    }
                    color={"default"}
                    classNames={{
                        inputWrapper:
                            "transition-all duration-350 ease-in-out shadow-sm  hover:shadow-lg",
                    }}
                />
                <DropDownArrowButton
                    size="sm"
                    isIconOnly
                    color="transparent"
                    variant="solid"
                    aria-label="Expand"
                    className="w-6 py-2 my-auto"
                    disableAnimation
                    onClick={() => isFocused() ? props.setFocusedId(null) : props.setFocusedId(props.task.uuid)}
                >
                    <MdOutlineArrowBackIos
                        size={20}
                        className={`transition duration-300 ${
                            isFocused()
                                ? "-rotate-90 text-blue-500"
                                : "text-zinc-500"
                        }`}
                    />
                </DropDownArrowButton>
            </div>
            {/* Dropdown info */}
            <div
                className={`transition-all ease-in-out duration-300 ml-8 overflow-hidden ${
                    isFocused() ? "max-h-16" : "max-h-0 invisible"
                }`}
            >
                <div className="flex flex-col my-1">
                    <div className="pr-10 flex flex-row gap-2 mt-0 justify-between items-center">
                        <div className="w-1/2 flex flex-row gap-x-2 items-center">
                            <DatePicker
                                isRequired={true}
                                size="sm"
                                variant="underlined"
                                aria-label="due-date"
                                className="max-w-[144px]"
                                defaultValue={parseDate(props.task.deadline)}
                                onChange={(e) => {
                                    setDeadline(e)
                                    const newTodo = {
                                        ...props.task,
                                        deadline: e.toString(),
                                    };
                                    props.onItemUpdate(newTodo);
                                }
                                }
                                onBlur={() => {
                                    const newTodo = {
                                        ...props.task,
                                        deadline: deadline.toString(),
                                    };
                                    props.onItemUpdate(newTodo);
                                }}
                                dateInputClassNames={{
                                    input: "text-small",
                                    segment: "text-slate-300/80",
                                }}
                            />
                            {(!isFinished(props.task) &&
                                isOverdue(props.task.deadline)) ? (
                                <div className="text-rose-600/90 text-sm">
                                    Overdue for {overdueDays(props.task.deadline)}{" "}
                                    days
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="place-self-center justify-self-end flex flex-row gap-1 items-center">
                            <TaskDetailModal
                                todo={props.task}
                                onItemUpdate={props.onItemUpdate}
                            />
                            <DeletePopover
                                todo={props.task}
                                onItemRemove={props.onItemRemove}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DropDownArrowButton = extendVariants(Button, {
    variants: {
        // <- modify/add variants
        color: {
            olive: "text-[#000] bg-[#84cc16]",
            orange: "bg-[#ff8c00] text-[#fff]",
            violet: "bg-[#8b5cf6] text-[#fff]",
            transparent: "bg-transparent text-[#fff]",
        },
        isDisabled: {
            true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
        },
        size: {
            xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
            md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
            xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
        },
    },
    defaultVariants: {
        // <- modify/add default variants
        color: "olive",
        size: "xl",
    },
    compoundVariants: [
        // <- modify/add compound variants
        {
            isDisabled: true,
            color: "olive",
            class: "bg-[#84cc16]/80 opacity-100",
        },
    ],
});

export default TaskLine;
