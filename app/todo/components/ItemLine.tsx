"use client";
import {onItemRemoveFunction, onItemUpdateFunction, TodoItem,} from "@/app/todo/types/todoItem";
import {Button, DatePicker, extendVariants, Input} from "@nextui-org/react";
import React, {useState} from "react";
import {MdOutlineArrowBackIos} from "react-icons/md";
import {isFinished, isOverdue, overdueDays} from "@/app/todo/lib/utils";
import {parseDate} from "@internationalized/date";
import ItemDetailModal from "@/app/todo/components/ItemDetailModal";
import DeletePopover from "./DeletePopover";

const ItemLine = (props: {
    todo: TodoItem;
    onItemRemove: onItemRemoveFunction;
    onItemUpdate: onItemUpdateFunction;
}) => {
    const [name, setName] = React.useState(props.todo.name);
    const [deadline, setDeadline] = React.useState(
        parseDate(props.todo.deadline)
    );
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="transition-all duration-100 w-full py-0 hover:pb-1">
            <div
                className="flex flex-row align-items-center w-full"
                onClick={() => setIsFocused(!isFocused)}
                onBlur={() => setIsFocused(false)}
            >
                <input
                    type="checkbox"
                    checked={isFinished(props.todo)}
                    onChange={() => {
                        const newItem = {
                            ...props.todo,
                            finished: isFinished(props.todo) ? "false" : "true",
                        };
                        props.onItemUpdate(newItem);
                        setIsFocused(props.todo.finished === "true");
                    }}
                    name={`radio-${props.todo.uuid}`}
                    className="checkbox checkbox-xs self-center mx-2
                       [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-300
                       "
                />
                <Input
                    type="text"
                    variant="flat"
                    aria-label="task-name"
                    label=""
                    defaultValue={props.todo.name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                        props.onItemUpdate({...props.todo, name: name,})
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
                    onClick={() => setIsFocused(!isFocused)}
                >
                    <MdOutlineArrowBackIos
                        size={20}
                        className={`transition duration-300 ${
                            isFocused
                                ? "-rotate-90 text-blue-500"
                                : "text-zinc-500"
                        }`}
                    />
                </DropDownArrowButton>
            </div>
            {/* Dropdown info */}
            <div
                className={`transition-all ease-in-out duration-300 ml-8 overflow-hidden ${
                    isFocused ? "max-h-16" : "max-h-0 invisible"
                }`}
            >
                <div className="flex flex-col my-1">
                    <div className="pr-10 flex flex-row gap-2 mt-0 justify-between items-center">
                        <div className="w-1/2 flex flex-row gap-x-2 items-center">
                            <DatePicker
                                size="sm"
                                variant="underlined"
                                aria-label="due-date"
                                className="max-w-[144px]"
                                defaultValue={parseDate(props.todo.deadline)}
                                onChange={(e) => {
                                    setDeadline(e)
                                    const newTodo = {
                                        ...props.todo,
                                        deadline: deadline.toString(),
                                    };
                                    props.onItemUpdate(newTodo);
                                }}
                                dateInputClassNames={{
                                    input: "text-small",
                                    segment: "text-slate-300/80",
                                }}
                            />
                            {(!isFinished(props.todo) &&
                                isOverdue(props.todo.date)) ? (
                                <div className="text-rose-600/90 text-sm">
                                    Overdue for {overdueDays(props.todo.date)}{" "}
                                    days
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="place-self-center justify-self-end flex flex-row gap-1 items-center">
                            <ItemDetailModal
                                todo={props.todo}
                                onItemUpdate={props.onItemUpdate}
                            />
                            <DeletePopover
                                todo={props.todo}
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

export default ItemLine;
