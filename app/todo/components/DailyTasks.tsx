import {onItemRemoveFunction, onItemUpdateFunction, TaskItem} from "@/app/todo/types/taskItem";
import TaskLine from "@/app/todo/components/TaskLine";
import React from "react";

const DayItems = ({todoList, onItemRemove, onItemUpdate}: {
    todoList: TaskItem[] | undefined;
    onItemRemove: onItemRemoveFunction;
    onItemUpdate: onItemUpdateFunction;
}) => {
    if (!todoList) return <></>
    if (todoList.length > 0) {
        return (
            <div className="flex flex-col gap-y-1">
                {todoList.map((todo, idx) => (
                    <TaskLine
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