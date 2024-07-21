"use client";
import {TodoItem} from "@/types/todoItem";
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import ItemLineDropDown from "@/app/todo/components/ItemLineDropDown";
import {MdOutlineExpandCircleDown} from "react-icons/md";

const ItemLine = (props: { todo: TodoItem }) => {
    const [todo, setTodo] = useState(props.todo);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full py-0" onFocus={() => setIsFocused(true)}>
            <div className="flex flex-row align-items-center w-full">
                <Input
                    type="text"
                    variant="flat"
                    label=""
                    defaultValue={todo.name}
                    onChange={e => setTodo({...todo, name: e.target.value})}
                />
                <Button size="sm" isIconOnly variant="light" aria-label="Expand" className="w-6 py-2 my-auto"
                        onClick={() => setIsFocused(isFocused ? !isFocused : true)}>
                    <MdOutlineExpandCircleDown size={16}/>
                </Button>
            </div>
            <div
                className={`transition-all ease-in-out duration-300 mx-3 overflow-hidden ${
                    isFocused ? " max-h-32" : "duration-0 max-h-0 invisible"
                }`}
            >
                <ItemLineDropDown todo={todo} setTodo={setTodo}/>
            </div>
        </div>
    );
};

export default ItemLine;
