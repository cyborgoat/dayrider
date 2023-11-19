import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { TodoItem } from "@/types/task";

export default function CheckList(props: { todoItems: TodoItem[] }) {
  return (
    <CheckboxGroup>
      {props.todoItems.map((task, idx) => (
        <Checkbox value={`${task.id}-${task.name}`} key={idx}>
          {task.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
