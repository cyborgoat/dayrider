"use client";
import {onItemRemoveFunction, onItemUpdateFunction, TaskItem,} from "@/app/todo/types/taskItem";
import {Button, Checkbox, DatePicker, extendVariants, Input} from "@nextui-org/react";
import React from "react";
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
    const [taskName, setTaskName] = React.useState(props.task.name);
    const [deadline, setDeadline] = React.useState(parseDate(props.task.deadline));
    const [isEdited, setIsEdited] = React.useState(props.task.name != defaultNewItem().name);

    const isFocused = props.focusedId === props.task.uuid;

    return (
        <div className="transition-all duration-100 w-full py-0"
             onClick={() => props.setFocusedId(props.task.uuid)}
             onBlur={() => {
                 if (!isEdited) {
                     props.onItemRemove(props.task.uuid)
                 }
             }}
        >
            <div className="flex flex-row align-items-center w-full">
                <Checkbox defaultSelected={isFinished(props.task)}
                          className="text-sm font-medium"
                          color={"primary"}
                          name={`radio-${props.task.uuid}`}
                          onChange={() => {
                              const newItem = {
                                  ...props.task,
                                  finished: isFinished(props.task) ? "false" : "true",
                              };
                              props.onItemUpdate(newItem);
                          }}/>
                <Input
                    type="text"
                    variant="flat"
                    aria-label="task-name"
                    defaultValue={props.task.name}
                    onChange={(e) => {
                        setTaskName(e.target.value)
                        setIsEdited(true)
                    }
                    }
                    onBlur={() =>
                        props.onItemUpdate({...props.task, name: taskName,})
                    }
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
                    onClick={() => isFocused ? props.setFocusedId(null) : props.setFocusedId(props.task.uuid)}
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
                    <div className="pr-10 flex flex-row gap-2 mt-0 justify-between items-center">
                        <div className="w-1/2 flex flex-row gap-x-2 items-center">
                            <DatePicker
                                isRequired={true}
                                size="sm"
                                variant="underlined"
                                aria-label="due-date"
                                className="max-w-[144px]"
                                defaultValue={parseDate(props.task.deadline)}
                                onChange={(e) => setDeadline(e)}
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
                            {isEdited && <TaskDetailModal todo={props.task} onItemUpdate={props.onItemUpdate}/>}
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
