import {TaskItem} from "@/app/todo/types/taskItem";
import {getThisWeekDates} from "@/lib/dateutil";

const thisWeekDates = getThisWeekDates();

export function isFinished(todoItem: TaskItem) {
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

// export function getTasksThisWeek(taskList:TaskItem[]){}

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