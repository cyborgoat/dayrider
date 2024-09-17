import {onTaskRemoveFunction, onTaskUpdateFunction, TaskItem} from "@/types/taskItem";
import TaskLine from "@/app/todo/components/TaskLine";
import React from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const DayItems = ({todoList, onItemRemove, onItemUpdate, focusedId, setFocusedId}: {
    todoList: TaskItem[] | undefined;
    onItemRemove: onTaskRemoveFunction;
    onItemUpdate: onTaskUpdateFunction;
    focusedId: string | null | undefined;
    setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const [parent, enableAnimations] = useAutoAnimate({duration: 100});

    if (typeof todoList === 'undefined' || todoList.length < 1) {
        return (
            <ul ref={parent} className="flex flex-col gap-y-1">
                <li className="text-center text-slate-300/80 text-xs" onClick={() => setFocusedId(null)}>
                    Day is clear
                </li>
            </ul>
        )
    }
    return (
        <ul ref={parent} className="flex flex-col gap-y-1">
            {todoList.map((todo, idx) =>
                <TaskLine
                    task={todo}
                    key={`${todo.uuid}-${todo.name}-${todo.deadline}`}
                    onItemRemove={onItemRemove}
                    onItemUpdate={onItemUpdate}
                    focusedId={focusedId}
                    setFocusedId={setFocusedId}
                />
            )}
        </ul>
    )
}

export default DayItems;