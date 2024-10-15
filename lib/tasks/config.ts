import {invoke} from "@tauri-apps/api/tauri";
import {TaskConfiguration} from "@/types/taskItem";

export async function setTaskConfig(orderBy:string): Promise<TaskConfiguration | undefined> {
    try {
        const c = await invoke("set_task_config", {
            orderBy:orderBy
        })
        console.log(`Task configuration updated successfully: ${JSON.stringify(c)}`);
        return c as TaskConfiguration;
    } catch (error) {
        console.error("Failed to update task configuration:", error);
    }
}

export async function getTaskConfig(): Promise<TaskConfiguration | undefined> {
    try {
        const c = await invoke("get_task_config", {});
        console.log(`Task config fetched successfully: ${JSON.stringify(c)}`);
        return c as TaskConfiguration;
    } catch (error) {
        console.error("Failed to fetch task config:", error);
    }
}
