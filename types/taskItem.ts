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
export type repeatOptions = "never" | "daily" | "weekly" | "biweekly";
export type sortOptions = "priority" | "date" | "repeat" | "deadline" | "name" | "completed";
export type onTaskRemoveFunction = (uuid: string) => void;
export type onTaskAddFunction = (e: any) => TaskItem;
export type onTaskUpdateFunction = (item: TaskItem) => void;
export type onTaskSortFunction = (sortBy:sortOptions) => void;


export const priorityList = [
    {key: "none", label: "None"},
    {key: "low", label: "Low"},
    {key: "medium", label: "Medium"},
    {key: "high", label: "High"},
]

export const prioritySignMap: Map<priorityOptions, string> = new Map<priorityOptions, string>()
prioritySignMap.set("low", "!")
prioritySignMap.set("medium", "!!")
prioritySignMap.set("high", "!!!")

export const priorityLevelMap: Map<priorityOptions, number> = new Map<priorityOptions, number>()
priorityLevelMap.set("none", 0)
priorityLevelMap.set("low", 1)
priorityLevelMap.set("medium", 2)
priorityLevelMap.set("high", 3)


export const repeatList = [
    {key: "never", label: "Never"},
    {key: "daily", label: "Daily"},
    {key: "weekly", label: "Weekly"},
    {key: "biweekly", label: "Biweekly"},
]

export interface TaskConfiguration {
    orderBy: sortOptions;
}