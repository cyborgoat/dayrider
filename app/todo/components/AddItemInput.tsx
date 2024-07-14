import {DateInput, Input} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";


const AddItemInput = () => {
    return (
        <div className="flex flex-col">
            <Input variant="underlined" label="Title"/>
            <Input variant="underlined" label="Notes"/>
            <DateInput variant={"underlined"} label={"Due date"} placeholderValue={new CalendarDate(1995, 11, 6)}
                       className="max-w-sm"/>
        </div>
    )
}

export default AddItemInput