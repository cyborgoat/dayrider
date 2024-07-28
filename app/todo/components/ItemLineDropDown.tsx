import {TodoItem} from "@/types/todoItem";
import {DatePicker, extendVariants} from "@nextui-org/react";
import React, {Dispatch, SetStateAction} from "react";
import {parseDate} from "@internationalized/date";
import ItemDetailModal from "@/app/todo/components/ItemDetailModal";
import {updateTodoItem} from "@/app/todo/lib/utils";


const ItemLineDropDown = (props: { todo: TodoItem, setTodo: Dispatch<SetStateAction<TodoItem>> }) => {
    const todo = props.todo;
    const [value, setValue] = React.useState(parseDate(todo.deadline));


    return (
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
                                const newTodo = {...props.todo, deadline: value.toString()}
                                props.setTodo(newTodo);
                                updateTodoItem(newTodo).then();
                            }}
                            dateInputClassNames={{
                                input: "text-small",
                                segment: "text-slate-300/80",
                            }}
                />
                <div className="place-self-center justify-self-end">
                    <ItemDetailModal todo={props.todo} setTodo={props.setTodo}/>
                </div>
            </div>
        </div>
    )
}

const MyDatePicker = extendVariants(DatePicker, {
    variants: {
        size: {
            sm: {
                label: "text-tiny",
                input: "text-small",
                inputWrapper: "h-8 min-h-8 px-2 rounded-small",
            },
            md: {
                input: "text-small",
                inputWrapper: "h-10 min-h-10 rounded-medium",
                clearButton: "text-large",
            },
            lg: {
                input: "text-medium",
                inputWrapper: "h-12 min-h-12 rounded-large",
            },
        },
    }
})

export default ItemLineDropDown