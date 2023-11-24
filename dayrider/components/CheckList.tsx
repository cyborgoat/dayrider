import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { TodoItem } from "@/types/task";
import { invoke } from "@tauri-apps/api";

export default function CheckList(props: { todoItems: TodoItem[] }) {
  const handleDelete = (id: number) => {
    invoke<string>("delete_item", { id: id })
      .then((res) => {})
      .catch(console.error);
  };

  return (
    <CheckboxGroup>
      {props.todoItems.map((task, idx) => (
        <>
          <Checkbox value={`${task.due_date}-${task.name}`} key={idx}>
            {task.name}
          </Checkbox>
          <Button size="sm" onClick={(e) => handleDelete(task.id)}>
            delete
          </Button>
        </>
      ))}
    </CheckboxGroup>
  );
}
