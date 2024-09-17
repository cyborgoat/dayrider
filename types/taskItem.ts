export interface TaskItem {
    uuid: string;
    name: string;
    date: string;
    finished: "true" | "false";
    deadline: string;
    notes?: string;
}

export type onTaskRemoveFunction = (uuid: string) => void;
export type onTaskAddFunction = (e: any) => void;
export type onTaskUpdateFunction = (item: TaskItem) => void;
