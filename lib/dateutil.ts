export function getThisWeekDates(date = new Date()): Date[] {
    const dateCopy = new Date(date.getTime());
    dateCopy.setHours(23, 59, 59, 999);

    const nextMonday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7),
        ),
    );

    const nextMondayCopy = new Date(nextMonday.getTime());

    const thisWeekDates: Date[] = [];
    for (let i = 7; i > 0; i--) {
        thisWeekDates.push(new Date(nextMondayCopy.setDate(nextMondayCopy.getDate() - 1)));
    }
    return thisWeekDates.reverse();
}