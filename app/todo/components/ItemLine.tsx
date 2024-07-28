"use client";
import {onItemRemoveFunction, TodoItem} from "@/app/todo/types/todoItem";
import {Button, DatePicker, extendVariants, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import React, {useState} from "react";
import {MdOutlineArrowBackIos} from "react-icons/md";
import {isFinished, updateTodoItem} from "@/app/todo/lib/utils";
import {parseDate} from "@internationalized/date";
import ItemDetailModal from "@/app/todo/components/ItemDetailModal";
import {FiTrash2} from "react-icons/fi";
import {CustomizedButton} from "@/app/todo/components/CustomizedTypes";
import DeletPopover from "@/app/todo/components/ConfirmPopup";

const ItemLine = (props: { todo: TodoItem, onItemRemove: onItemRemoveFunction }) => {
    const [todo, setTodo] = useState(props.todo);
    const [value, setValue] = React.useState(parseDate(todo.deadline));
    const [isFocused, setIsFocused] = useState(false);
    const [inputColor, setInputColor] = useState<"default" | "primary">(
        "default"
    );

    return (
        <div className="transition-all duration-100 w-full py-0 hover:pb-1">
            <div className="flex flex-row align-items-center w-full"
                 onClick={() => setIsFocused(!isFocused)}
            >
                <input
                    type="checkbox"
                    checked={isFinished(todo)}
                    onChange={() => {
                        const newItem = {
                            ...todo,
                            finished: isFinished(todo) ? "false" : "true",
                        };
                        setTodo(newItem);
                        updateTodoItem(newItem).then();
                        setIsFocused(todo.finished === "true");
                    }}
                    name={`radio-${todo.uuid}`}
                    className="checkbox checkbox-xs self-center mx-2
                       [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-300
                       "
                />
                <Input
                    type="text"
                    variant="flat"
                    aria-label="todo-name"
                    label=""
                    defaultValue={todo.name}
                    onChange={(e) => setTodo({...todo, name: e.target.value})}
                    onBlur={() => updateTodoItem(todo)}
                    color={inputColor}
                    classNames={{
                        inputWrapper: "transition-all duration-350 ease-in-out shadow-sm  hover:shadow-lg",
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
                            isFocused ? "-rotate-90 text-blue-500" : "text-zinc-500"
                        }`}
                    />
                </DropDownArrowButton>
            </div>
            <div
                className={`transition-all ease-in-out duration-300 ml-8 overflow-hidden ${
                    isFocused ? "max-h-16" : "max-h-0 invisible"
                }`}
            >
                <div className="flex flex-col my-1">
                    {/*<div>*/}
                    {/*    <Input type="text" variant="underlined" size="sm" placeholder="Add Note"*/}
                    {/*           value={todo.notes}*/}
                    {/*           onChange={e => props.setTodo({...todo, notes: e.target.value})}*/}
                    {/*           onBlur={() => updateTodoItem(todo)}*/}
                    {/*           classNames={*/}
                    {/*               {*/}
                    {/*                   base: "bg-transparent pb-2",*/}
                    {/*                   innerWrapper: ["bg-transparent", "py-0"],*/}
                    {/*                   inputWrapper: ["bg-transparent", "p-0", "border-0"],*/}
                    {/*                   input: [*/}
                    {/*                       "bg-transparent",*/}
                    {/*                       "placeholder:text-zinc-800/80",*/}
                    {/*                       "text-xs"*/}
                    {/*                   ],*/}
                    {/*               }*/}
                    {/*           }*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="pr-10 flex flex-row gap-2 mt-0 justify-between">
                        <DatePicker variant="underlined" size="sm" aria-label="due-date"
                                    className="max-w-[144px]"
                                    defaultValue={parseDate(todo.deadline)} onChange={setValue}
                                    onBlur={() => {
                                        const newTodo = {...todo, deadline: value.toString()}
                                        setTodo(newTodo);
                                        updateTodoItem(newTodo).then();
                                    }}
                                    dateInputClassNames={{
                                        input: "text-small",
                                        segment: "text-slate-300/80",
                                    }}
                        />
                        <div className="place-self-center justify-self-end flex flex-row gap-1 items-center">
                            <ItemDetailModal todo={todo} setTodo={setTodo}/>
                            <DeletPopover todo={props.todo} onItemRemove={props.onItemRemove}/>
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
