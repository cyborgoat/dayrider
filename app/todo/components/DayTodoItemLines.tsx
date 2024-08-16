import {onItemRemoveFunction, onItemUpdateFunction, TodoItem} from "@/app/todo/types/todoItem";
import ItemLine from "@/app/todo/components/ItemLine";
import React from "react";
import {getThisWeekDates} from "@/lib/dateutil";

const DayItems = ({todoList, onItemRemove, onItemUpdate, weekdayNum}: {
    todoList: TodoItem[] | undefined;
    onItemRemove: onItemRemoveFunction;
    onItemUpdate: onItemUpdateFunction;
    weekdayNum: number;
}) => {
    if (todoList && todoList.length > 0) {
        const thisWeekDates = getThisWeekDates();
        return (
            <div className="flex flex-col gap-y-1">
                {todoList.filter((item) => {
                    const ddl = new Date(item.deadline);
                    return (
                        (ddl.getDay() === weekdayNum + 1) && (ddl > thisWeekDates[0] && ddl < thisWeekDates[6])
                    )
                }).map((todo, idx) => (
                    <ItemLine
                        todo={todo}
                        key={`${todo.uuid}-${todo.name}-${todo.deadline}`}
                        onItemRemove={onItemRemove}
                        onItemUpdate={onItemUpdate}
                    />
                ))}
            </div>
        )
    }
    return
}

export default DayItems;