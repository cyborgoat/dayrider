import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { TodoItem } from "@/types/task";
import { invoke } from "@tauri-apps/api";
import { TrashIcon } from "@/components/icons/TrashIcon";

export default function CheckList(props: { todoItems: TodoItem[] }) {
  const handleDelete = (id: number) => {
    invoke<string>("delete_item", { id: id })
      .then((res) => {})
      .catch(console.error);
  };
  return (
    <CheckboxGroup>
      {props.todoItems.map((task, idx) => (
        <div key={idx}>
          <Checkbox value={`${task.due_date}-${task.name}`}>
            <span className="align-middle">{task.name}</span>
            <Button
              size="sm"
              variant="light"
              isIconOnly
              color="danger"
              aria-label="delete"
              className=""
              onClick={(e) => handleDelete(task.id)}
            >
              <TrashIcon />
            </Button>
          </Checkbox>
        </div>
      ))}
    </CheckboxGroup>
  );
}
