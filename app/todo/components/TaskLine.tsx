"use client";
import {onTaskRemoveFunction, onTaskUpdateFunction, TaskItem,} from "@/types/taskItem";
import {Button, Checkbox, DatePicker, extendVariants, Input} from "@nextui-org/react";
import React from "react";
import {MdOutlineArrowBackIos} from "react-icons/md";
import {isFinished, isOverdue, overdueDays} from "@/lib/tasks/utils";
import {parseDate} from "@internationalized/date";
import TaskDetailModal from "@/app/todo/components/TaskDetailModal";
import DeletePopover from "./DeletePopover";
import {defaultTask} from "@/lib/tasks/backend";

const TaskLine = ({hidden, task, onItemRemove, onItemUpdate, focusedId, setFocusedId}: {
    hidden: boolean;
    task: TaskItem;
    onItemRemove: onTaskRemoveFunction;
    onItemUpdate: onTaskUpdateFunction;
    focusedId: string | null | undefined;
    setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const [taskName, setTaskName] = React.useState(task.name);
    const [deadline, setDeadline] = React.useState(parseDate(task.deadline));
    const [isEdited, setIsEdited] = React.useState(task.name != defaultTask().name);

    const isFocused = focusedId === task.uuid;

    const handleInputChange = (event: any) => {
        setTaskName(event.target.value)
        setIsEdited(true)
    };
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            setFocusedId(null)
            onItemUpdate({...task, name: taskName,})
        }
    };


    return (
        <li className="w-full py-0" hidden={hidden} onClick={() => setFocusedId(task.uuid)}
            onBlur={() => {
                if (!isEdited) {
                    onItemRemove(task.uuid)
                }
            }}
        >
            <div className="flex flex-row align-items-center w-full">
                <Checkbox defaultSelected={isFinished(task)}
                          className="text-sm font-medium"
                          color={"primary"}
                          name={`radio-${task.uuid}`}
                          radius={"full"}
                          onChange={() => {
                              const newItem = {
                                  ...task,
                                  finished: isFinished(task) ? "false" : "true",
                              };
                              onItemUpdate(newItem);
                          }}/>
                <Input
                    autoFocus={isFocused}
                    type="text"
                    size={"sm"}
                    variant="flat"
                    aria-label="task-name"
                    defaultValue={task.name}
                    placeholder={"Enter new task name"}
                    onChange={handleInputChange}
                    onBlur={() => onItemUpdate({...task, name: taskName,})}
                    onKeyDown={handleKeyDown}
                    color={isEdited ? "default" : "primary"}
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
                    onClick={() => isFocused ? setFocusedId(null) : setFocusedId(task.uuid)}
                >
                    <MdOutlineArrowBackIos
                        size={20}
                        className={`transition duration-300 ${isFocused ? "-rotate-90 text-blue-500" : "text-zinc-500"}`}
                    />
                </DropDownArrowButton>
            </div>
            {/* Dropdown info */}
            <div
                className={`transition-all ease-in-out duration-300 ml-8 overflow-hidden ${isFocused ? "max-h-16" : "max-h-0 invisible"}`}
            >
                <div className="flex flex-col my-1">
                    <div className="pr-10 flex flex-row justify-between items-center">
                        <div className="w-2/3 flex gap-x-2 flex-row items-center">
                            <DatePicker
                                isRequired={true}
                                size="sm"
                                variant="underlined"
                                aria-label="due-date"
                                className="max-w-[144px]"
                                defaultValue={parseDate(task.deadline)}
                                onChange={(e) => setDeadline(e)}
                                onBlur={() => {
                                    const newTodo = {
                                        ...task,
                                        deadline: deadline.toString(),
                                    };
                                    onItemUpdate(newTodo);
                                }}
                                dateInputClassNames={{
                                    input: "text-small",
                                    segment: "text-slate-300/80",
                                }}
                            />
                            {(!isFinished(task) &&
                                isOverdue(task.deadline)) ? (
                                <div className="text-rose-600/90 text-sm">
                                    Overdue for {overdueDays(task.deadline)}{" "}
                                    days
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="place-self-center justify-self-end flex flex-row gap-1 items-center">
                            {isEdited && <TaskDetailModal todo={task} onItemUpdate={onItemUpdate}/>}
                            <DeletePopover
                                todo={task}
                                onItemRemove={onItemRemove}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </li>
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
