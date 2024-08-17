import {TodoItem} from "@/app/todo/types/todoItem";
import {getThisWeekDates} from "@/lib/dateutil";

const thisWeekDates = getThisWeekDates();

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

export function getTodoListByWeekday(todoList: TodoItem[], weekdayNum: number) {
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