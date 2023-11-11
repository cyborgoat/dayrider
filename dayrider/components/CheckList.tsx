import {Checkbox, CheckboxGroup} from "@nextui-org/react";
import {Task} from "@/types/task";

export default function CheckList(props: { tasks: Task[] }) {
    return (
        <CheckboxGroup>
            {props.tasks.map((task, idx) => (
                <Checkbox value={task.name} key={idx}>{task.name}</Checkbox>
            ))}
        </CheckboxGroup>
    );

}