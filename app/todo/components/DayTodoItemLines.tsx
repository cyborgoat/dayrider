import {onItemRemoveFunction, onItemUpdateFunction, TodoItem} from "@/app/todo/types/todoItem";
import ItemLine from "@/app/todo/components/ItemLine";
import React from "react";
import {getTodoListByWeekday} from "@/app/todo/lib/utils";

const DayItems = ({todoList, onItemRemove, onItemUpdate, weekdayNum}: {
    todoList: TodoItem[] | undefined;
    onItemRemove: onItemRemoveFunction;
    onItemUpdate: onItemUpdateFunction;
    weekdayNum: number;
}) => {
    if (!todoList) {
        return <></>
    }
    const curList = getTodoListByWeekday(todoList, weekdayNum);

    if (curList.length > 0) {
        return (
            <div className="flex flex-col gap-y-1">
                {curList.map((todo, idx) => (
                    <ItemLine
                        todo={todo}
                        key={`${todo.uuid}-${todo.name}-${todo.deadline}`}
                        onItemRemove={onItemRemove}
                        onItemUpdate={onItemUpdate}
                    />
                ))}
            </div>
        )
    } else {
        return (
            <div className="text-center text-slate-300/80 text-xs">Day is clear</div>
        )
    }
}

export default DayItems;