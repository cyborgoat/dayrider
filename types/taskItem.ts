export interface TaskItem {
    uuid: string;
    name: string;
    date: string;
    finished: "true" | "false";
    deadline: string;
    notes?: string;
    priority: priorityOptions;
    repeat: repeatOptions;
}

export type priorityOptions = "none" | "low" | "medium" | "high";
export type repeatOptions = "never" | "daily" | "weekdays" | "weekly" | "biweekly";
export type onTaskRemoveFunction = (uuid: string) => void;
export type onTaskAddFunction = (e: any) => TaskItem;
export type onTaskUpdateFunction = (item: TaskItem) => void;


export const priorityList = [
    {key: "none", label: "None"},
    {key: "low", label: "Low"},
    {key: "medium", label: "Medium"},
    {key: "high", label: "High"},
]

export const repeatList = [
    {key: "never", label: "Never"},
    {key: "daily", label: "Daily"},
    {key: "weekdays", label: "Weekdays"},
    {key: "weekly", label: "Weekly"},
    {key: "biweekly", label: "Biweekly"},
]
