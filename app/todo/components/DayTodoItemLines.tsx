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
                        (ddl.getDay() === weekdayNum) &&
                        (ddl > thisWeekDates[0] &&
                            ddl < (new Date(thisWeekDates[6].setDate(thisWeekDates[6].getDate() + 1)))))
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