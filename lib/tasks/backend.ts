import {invoke} from "@tauri-apps/api/tauri";
import {TaskItem} from "@/types/taskItem";
import {v4 as uuidv4} from "uuid";
import {getLocalTimeZone, today} from "@internationalized/date";
import {isOverdue} from "@/lib/tasks/utils";

export async function getTaskItems(): Promise<TaskItem[]> {
    let res = await invoke<string>("todo_list");
    const needToUpdate = updateRepeatTasks(JSON.parse(res))
    if (needToUpdate) {
        res = await invoke<string>("todo_list");
    }

    return JSON.parse(res)
}

const formatDateISO = (date: Date) => {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    return isoString.split("T")[0];
};

function updateRepeatTasks(taskList: TaskItem[]) {
    let needsUpdate = false;
    taskList.map((task: TaskItem) => {
        if (task.finished === "true" && task.repeat !== "never" && isOverdue(task.deadline)) {
            needsUpdate = true;
            const newTask: TaskItem = {...task, uuid: uuidv4(), finished: "false"};
            const newTaskDeadline = new Date(newTask.deadline);
            switch (newTask.repeat) {
                case "daily":
                    newTaskDeadline.setDate(newTaskDeadline.getDate() + 1)
                    newTask.deadline = formatDateISO(newTaskDeadline)
                    deleteTaskItem(task.uuid).then(r => console.log("Repeat task deleted")).catch(e => console.log(e));
                    addTaskItem(newTask).then(r => console.log("Repeat task added")).catch(e => console.log(e));
                    break;
                case "weekly":
                    newTaskDeadline.setDate(newTaskDeadline.getDate() + 7)
                    newTask.deadline = formatDateISO(newTaskDeadline)
                    deleteTaskItem(task.uuid).then(r => console.log("Repeat task deleted")).catch(e => console.log(e));
                    addTaskItem(newTask).then(r => console.log("Repeat task added")).catch(e => console.log(e));
                    break;
                case "biweekly":
                    newTaskDeadline.setDate(newTaskDeadline.getDate() + 14)
                    newTask.deadline = newTaskDeadline.toDateString()
                    deleteTaskItem(task.uuid).then(r => console.log("Repeat task deleted")).catch(e => console.log(e));
                    addTaskItem(newTask).then(r => console.log("Repeat task added")).catch(e => console.log(e));
                    break;
                case "never":
                    break;
            }
        }
    })
    return needsUpdate;
}

export async function addTaskItem(item: TaskItem): Promise<TaskItem> {
    console.log(item)
    const res = await invoke<string>("add_item", {todoItem: item});
    console.log(res)
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
        priority: "none",
        repeat: "never",
    };
}