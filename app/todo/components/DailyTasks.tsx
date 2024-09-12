import {onTaskRemoveFunction, onTaskUpdateFunction, TaskItem} from "@/app/todo/types/taskItem";
import TaskLine from "@/app/todo/components/TaskLine";
import React from "react";

const DayItems = ({todoList, showCompleted, onItemRemove, onItemUpdate, focusedId, setFocusedId}: {
    todoList: TaskItem[] | undefined;
    showCompleted: boolean;
    onItemRemove: onTaskRemoveFunction;
    onItemUpdate: onTaskUpdateFunction;
    focusedId: string | null | undefined;
    setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    if (typeof todoList === 'undefined' || todoList.length < 1) {
        return (
            <div className="text-center text-slate-300/80 text-xs" onClick={() => setFocusedId(null)}>Day is clear</div>
        )
    }
    return (
        <div className="flex flex-col gap-y-1">
            {todoList.map((todo, idx) => {
                if (!showCompleted && todo.finished === 'true') {
                    return <></>
                } else return (
                    <TaskLine
                        task={todo}
                        key={`${todo.uuid}-${todo.name}-${todo.deadline}`}
                        onItemRemove={onItemRemove}
                        onItemUpdate={onItemUpdate}
                        focusedId={focusedId}
                        setFocusedId={setFocusedId}
                    />
                )
            })}
        </div>
    )
}

export default DayItems;