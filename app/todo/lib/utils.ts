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
    return today.getDate() - date.getDate();
}

export function getTasksThisWeek(taskList: TaskItem[]) {
    if (typeof taskList === "undefined") {
        return ([])
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            return ((ddl > thisWeekDates[0] && ddl < (new Date(thisWeekDates[6].setDate(thisWeekDates[6].getDate() + 1)))))
        });
    }

}

export function getPastTasks(taskList: TaskItem[]) {
    if (typeof taskList === "undefined") {
        return ([])
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            return (ddl < thisWeekDates[0])
        });
    }

}

export function getFutureTasks(taskList: TaskItem[]) {
    if (typeof taskList === "undefined") {
        return ([])
    } else {
        return taskList.filter((item) => {
            const ddl = new Date(item.deadline);
            return (ddl > (new Date(thisWeekDates[6].setDate(thisWeekDates[6].getDate() + 1))))
        });
    }

}

export function getTasksByWeekday(todoList: TaskItem[], weekdayNum: number) {
    if (typeof todoList === "undefined") {
        return ([])
    } else {
        return todoList.filter((item) => {
            const ddl = new Date(item.deadline);
            return (
                (ddl.getDay() === weekdayNum) &&
                (ddl > thisWeekDates[0] &&
                    ddl < (new Date(thisWeekDates[6].setDate(thisWeekDates[6].getDate() + 1)))))
        });
    }
}