import {TodoItem} from "@/types/todoItem";
import {Input} from "@nextui-org/react";
import {Dispatch, SetStateAction} from "react";

const ItemLineDropDown = (props: { todo: TodoItem, setTodo: Dispatch<SetStateAction<TodoItem>> }) => {
    const todo = props.todo;

    return (
        <div className="flex flex-col my-1">
            <div>
                <Input type="text" variant="underlined" size="sm" placeholder="Add Note"
                       onChange={e => props.setTodo({...todo, notes: e.target.value})}
                       classNames={
                           {
                               base:"bg-transparent pb-2",
                               innerWrapper:["bg-transparent","py-0"],
                               inputWrapper:["bg-transparent","p-0","border-0"],
                               input: [
                                   "bg-transparent",
                                   "placeholder:text-zinc-800/80",
                                   "text-xs"
                               ],
                           }
                       }
                />
            </div>
            <div className="flex flex-row gap-2 text-sm">
                <div>{todo.name}</div>
                <div>{todo.dueOn}</div>
            </div>
        </div>
    )
}

export default ItemLineDropDown