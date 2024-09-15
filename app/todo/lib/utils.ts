import {TaskItem} from "@/app/todo/types/taskItem";
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

export function getPastTasks(taskList: TaskItem[]) {
    if (typeof taskList === "undefined") {
        return [];
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            ddl.setHours(23, 59, 59, 999);
            return ddl < thisWeekDates[0];
        });
    }
}

export function getFutureTasks(taskList: TaskItem[]) {
    if (typeof taskList === "undefined") {
        return [];
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            ddl.setHours(23, 59, 59, 999);
            return ddl > thisWeekDates[6]
        });
    }
}

export function getTasksByWeekday(todoList: TaskItem[], weekdayNum: number) {
    if (typeof todoList === "undefined") {
        return [];
    } else {
        return todoList.filter((item) => {
            const ddl = new Date(item.deadline);
            ddl.setHours(23, 59, 59, 999);
            return (
                ddl.getDay() === weekdayNum &&
                ddl >= thisWeekDates[0] &&
                ddl <= thisWeekDates[6]
            );
        });
    }
}
