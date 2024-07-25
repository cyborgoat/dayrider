import {TodoItem} from "@/types/todoItem";
import {DatePicker, Input} from "@nextui-org/react";
import React, {Dispatch, SetStateAction} from "react";
import {parseDate} from "@internationalized/date";
import {invoke} from "@tauri-apps/api/tauri";


const ItemLineDropDown = (props: { todo: TodoItem, setTodo: Dispatch<SetStateAction<TodoItem>> }) => {
    const todo = props.todo;
    const [value, setValue] = React.useState(parseDate(todo.deadline));

    async function updateTodoItem(todoItem: TodoItem) {
        const res = await invoke<string>('update_item', {todoItem: todoItem})
        console.log(res)
    }

    return (
        <div className="flex flex-col my-1">
            <div>
                <Input type="text" variant="underlined" size="sm" placeholder="Add Note"
                       value={todo.notes}
                       onChange={e => props.setTodo({...todo, notes: e.target.value})}
                       onBlur={() => updateTodoItem(todo)}
                       classNames={
                           {
                               base: "bg-transparent pb-2",
                               innerWrapper: ["bg-transparent", "py-0"],
                               inputWrapper: ["bg-transparent", "p-0", "border-0"],
                               input: [
                                   "bg-transparent",
                                   "placeholder:text-zinc-800/80",
                                   "text-xs"
                               ],
                           }
                       }
                />
            </div>
            <div className="flex flex-row gap-2 text-xs">
                <DatePicker variant="underlined" size="sm" aria-label="due-date" className="max-w-[256px] max-h-8"
                            defaultValue={parseDate(todo.deadline)} onChange={setValue}
                            onBlur={() => {
                                const newTodo = {...props.todo, deadline: value.toString()}
                                props.setTodo(newTodo);
                                updateTodoItem(newTodo).then();
                            }}/>
            </div>
        </div>
    )
}

export default ItemLineDropDown