import {invoke} from "@tauri-apps/api/tauri";
import {TaskItem} from "@/app/todo/types/taskItem";
import {v4 as uuidv4} from "uuid";
import {getLocalTimeZone, today} from "@internationalized/date";

export async function getTodoItems(): Promise<TaskItem[]> {
    const res = await invoke<string>("todo_list");
    return JSON.parse(res);
}

export async function addTodoItem(item: TaskItem): Promise<TaskItem> {
    const res = await invoke<string>("add_item", {todoItem: item});
    return JSON.parse(res);
}

export async function deleteTodoItem(uuid: string): Promise<void> {
    const res = await invoke<string>("delete_item", {uuid: uuid});
}

export async function updateTodoItem(todoItem: TaskItem): Promise<TaskItem> {
    const res = await invoke<string>("update_item", {todoItem: todoItem});
    return JSON.parse(res);
}

export function defaultNewItem(): TaskItem {
    return {
        uuid: uuidv4(),
        name: "New todo item",
        date: today(getLocalTimeZone()).toString(),
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
        notes: "test notes",
    };
}