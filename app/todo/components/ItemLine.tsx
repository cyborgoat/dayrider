"use client";
import {TodoItem} from "@/types/todoItem";
import {Button, extendVariants, Input, Radio} from "@nextui-org/react";
import {useState} from "react";
import ItemLineDropDown from "@/app/todo/components/ItemLineDropDown";
import {MdOutlineArrowBackIos} from "react-icons/md";
import {invoke} from "@tauri-apps/api/tauri";

const ItemLine = (props: { todo: TodoItem }) => {
    const [todo, setTodo] = useState(props.todo);
    const [isFocused, setIsFocused] = useState(false);

    async function updateTodoItem(todoItem: TodoItem) {
        const res = await invoke<string>('update_item', {todoItem: todoItem})
        console.log(res)
    }

    return (
        <div className="w-full py-0">
            <div className="flex flex-row align-items-center w-full">
                <input type="checkbox" name={`radio-${todo.uuid}`}
                       className="checkbox checkbox-xs self-center mx-2
                       [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-300
                       "/>
                <Input
                    type="text"
                    variant="flat"
                    aria-label="todo-name"
                    label=""
                    defaultValue={todo.name}
                    onChange={e => setTodo({...todo, name: e.target.value})}
                    onBlur={() => updateTodoItem(todo)}
                    // onFocus={() => setIsFocused(true)}
                />
                <MyButton size="sm" isIconOnly color="transparent" variant="solid" aria-label="Expand"
                          className="w-6 py-2 my-auto"
                          disableAnimation
                          onClick={() => setIsFocused(!isFocused)}
                >
                    <MdOutlineArrowBackIos size={20}
                                           className={`transition duration-300 text-zinc-500 ${isFocused ? "-rotate-90" : ""}`}/>
                </MyButton>
            </div>
            <div
                className={`transition-all ease-in-out duration-300 ml-8 overflow-hidden ${
                    isFocused ? " max-h-32" : "duration-0 max-h-0 invisible"
                }`}
            >
                <ItemLineDropDown todo={todo} setTodo={setTodo}/>
            </div>
        </div>
    );
};

export const MyButton = extendVariants(Button, {
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
    defaultVariants: { // <- modify/add default variants
        color: "olive",
        size: "xl",
    },
    compoundVariants: [ // <- modify/add compound variants
        {
            isDisabled: true,
            color: "olive",
            class: "bg-[#84cc16]/80 opacity-100",
        },
    ],
});

export default ItemLine;
