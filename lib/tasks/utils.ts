import {priorityLevelMap, TaskItem} from "@/types/taskItem";
import {getThisWeekDates} from "@/lib/dateutil";

const thisWeekDates = getThisWeekDates();

export function isFinished(todoItem: TaskItem) {
    return todoItem.finished === "true";
}

export function isOverdue(dateString: string): boolean {
    let today = new Date();
    let date = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return today > date;
}

export function needAttention(task: TaskItem) {
    return !isFinished(task) && isOverdue(task.deadline);
}

export function overdueDays(dateString: string): number {
    let today = new Date();
    let date = new Date(dateString);
    today.setHours(23, 59, 59, 999);
    date.setHours(23, 59, 59, 999);
    // Calculating the time difference
    // of two dates
    let differenceInTime = today.getTime() - date.getTime();

    // Calculating the no. of days between
    // two dates
    return Math.round(differenceInTime / (1000 * 3600 * 24));
}

/// Task fetchers

export function getPastTasks(taskList: TaskItem[], showCompleted: boolean): TaskItem[] {
    if (typeof taskList === "undefined") {
        return [];
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            ddl.setHours(23, 59, 59, 999);
            if (!showCompleted) {
                return item.finished === "false" && ddl < thisWeekDates[0];
            }
            return ddl < thisWeekDates[0];
        });
    }
}

export function getFutureTasks(taskList: TaskItem[], showCompleted: boolean) {
    if (typeof taskList === "undefined") {
        return [];
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            ddl.setHours(23, 59, 59, 999);
            if (!showCompleted) {
                return item.finished === "false" && ddl > thisWeekDates[6];
            }
            return ddl > thisWeekDates[6]
        });
    }
}

export function getThisWeekTasks(taskList: TaskItem[], showCompleted: boolean) {
    if (typeof taskList === "undefined") {
        return [];
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            ddl.setHours(23, 59, 59, 999);
            if (!showCompleted) {
                return item.finished === 'false' && ddl >= thisWeekDates[0] && ddl <= thisWeekDates[6];
            }
            return ddl >= thisWeekDates[0] && ddl <= thisWeekDates[6];
        });
    }

}

export function getTasksByWeekday(taskList: TaskItem[], weekdayNum: number, showCompleted: boolean) {
    if (typeof taskList === "undefined") {
        return [];
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            ddl.setHours(23, 59, 59, 999);
            if (!showCompleted) {
                return item.finished === 'false' && ddl.getDay() === weekdayNum && ddl >= thisWeekDates[0] && ddl <= thisWeekDates[6]
            }
            return ddl.getDay() === weekdayNum && ddl >= thisWeekDates[0] && ddl <= thisWeekDates[6]
                ;
        });
    }
}

export function getPendingTasks(taskList: TaskItem[]) {
    if (typeof taskList === "undefined") {
        return [];
    } else {
        return taskList.filter((item) => item.finished === 'false');
    }

}

// Sort functions

export function compareByPriorityFn(a: TaskItem, b: TaskItem) {
    let val1 = priorityLevelMap.get(a.priority) as number;
    let val2 = priorityLevelMap.get(b.priority) as number;
    return val2 - val1
}

export function compareByDateFn(a: TaskItem, b: TaskItem) {
    return a.date.localeCompare(b.date);
}
