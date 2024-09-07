import {onItemRemoveFunction, onItemUpdateFunction, TaskItem} from "@/app/todo/types/taskItem";
import TaskLine from "@/app/todo/components/TaskLine";
import React from "react";

const DayItems = ({todoList, showCompleted, onItemRemove, onItemUpdate, focusedId, setFocusedId}: {
    todoList: TaskItem[];
    showCompleted: boolean;
    onItemRemove: onItemRemoveFunction;
    onItemUpdate: onItemUpdateFunction;
    focusedId: string | null | undefined;
    setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
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