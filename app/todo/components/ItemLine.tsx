"use client";
import {TodoItem} from "@/types/todoItem";
import {Input} from "@nextui-org/react";
import {useState} from "react";

const ItemLine = (props: { todo: TodoItem }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.todo.name);

  return (
    <div className="w-full py-0">
      <Input
        type="text"
        variant="flat"
        label=""
        defaultValue={value}
        onFocus={(e) => {
          console.log("focused");
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
      <div
        className={`transition-all ease-in mx-3 overflow-hidden ${
          isFocused ? "duration-500 max-h-32" : "duration-0 max-h-0 invisible"
        }`}
      >
        dueOn:{props.todo.dueOn}
      </div>
    </div>
  );
};

export default ItemLine;
