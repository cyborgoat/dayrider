"use client";
import {TodoItem} from "@/types/todoItem";
import {Input} from "@nextui-org/react";
import {useState} from "react";

const ItemLine = (props: { todo: TodoItem }) => {
    const [todo, setTodo] = useState(props.todo);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full py-0">
            <Input
                type="text"
                variant="flat"
                label=""
                defaultValue={todo.name}
                onFocus={(e) => {
                    console.log("focused");
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                onChange={e => setTodo({...todo, name: e.target.value})}
            />
            <div
                className={`transition-all ease-in mx-3 overflow-hidden ${
                    isFocused ? "duration-500 max-h-32" : "duration-0 max-h-0 invisible"
                }`}
            >
                name:{todo.name}
                dueOn:{todo.dueOn}
            </div>
        </div>
    );
};

export default ItemLine;
