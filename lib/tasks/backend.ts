import {invoke} from "@tauri-apps/api/tauri";
import {TaskItem} from "@/types/taskItem";
import {v4 as uuidv4} from "uuid";
import {getLocalTimeZone, today} from "@internationalized/date";

export async function getTaskItems(): Promise<TaskItem[]> {
    const res = await invoke<string>("todo_list");
    return JSON.parse(res);
}

export async function addTaskItem(item: TaskItem): Promise<TaskItem> {
    const res = await invoke<string>("add_item", {todoItem: item});
    return JSON.parse(res);
}

export async function deleteTaskItem(uuid: string): Promise<void> {
    const res = await invoke<string>("delete_item", {uuid: uuid});
}

export async function updateTaskItem(item: TaskItem): Promise<TaskItem> {
    const res = await invoke<string>("update_item", {todoItem: item});
    return JSON.parse(res);
}

export function defaultTask(): TaskItem {
    return {
        uuid: uuidv4(),
        name: "",
        date: today(getLocalTimeZone()).toString(),
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
        notes: "",
    };
}