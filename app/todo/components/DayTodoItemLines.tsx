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
    if (!todoList) {
        return <></>
    }
    const thisWeekDates = getThisWeekDates();

    const curList = todoList.filter((item) => {
        const ddl = new Date(item.deadline);
        return (
            (ddl.getDay() === weekdayNum) &&
            (ddl > thisWeekDates[0] &&
                ddl < (new Date(thisWeekDates[6].setDate(thisWeekDates[6].getDate() + 1)))))
    })

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
        return(
            <div className="text-center text-slate-300/80 text-xs">Day is clear</div>
        )
    }
    return
}

export default DayItems;