import {invoke} from "@tauri-apps/api/tauri";
import {TodoItem} from "@/app/todo/types/todoItem";
import {v4 as uuidv4} from "uuid";
import {getLocalTimeZone, today} from "@internationalized/date";
import {getThisWeekDates} from "@/lib/dateutil";

// Common functions
export function isFinished(todoItem: TodoItem) {
    return todoItem.finished === "true";
}

export function isOverdue(dateString: string): boolean {
    let today = new Date();
    let date = new Date(dateString);
    return today > date;
}

export function overdueDays(dateString: string): number {
    let today = new Date();
    let date = new Date(dateString);
    let diffInTime = today.getTime() - date.getTime();
    return Math.round(diffInTime / (1000 * 3600 * 24));
}

// DB Related

export function defaultNewItem(): TodoItem {
    return {
        uuid: uuidv4(),
        name: "New todo item",
        date: today(getLocalTimeZone()).toString(),
        finished: "false",
        deadline: today(getLocalTimeZone()).toString(),
        notes: "test notes",
    };
}

export async function getTodoItems(): Promise<TodoItem[]> {
    const res = await invoke<string>("todo_list");
    return JSON.parse(res);
}

export async function addTodoItem(item: TodoItem): Promise<TodoItem> {
    const res = await invoke<string>("add_item", {todoItem: item});
    return JSON.parse(res);
}

export async function deleteTodoItem(uuid: string): Promise<void> {
    const res = await invoke<string>("delete_item", {uuid: uuid});
}

export async function updateTodoItem(todoItem: TodoItem): Promise<TodoItem> {
    const res = await invoke<string>("update_item", {todoItem: todoItem});
    return JSON.parse(res);
}

const thisWeekDates = getThisWeekDates();

export function getTodoListByWeekday(todoList: TodoItem[], weekdayNum: number) {

    return todoList.filter((item) => {
        const ddl = new Date(item.deadline);
        return (
            (ddl.getDay() === weekdayNum) &&
            (ddl > thisWeekDates[0] &&
                ddl < (new Date(thisWeekDates[6].setDate(thisWeekDates[6].getDate() + 1)))))
    });
}