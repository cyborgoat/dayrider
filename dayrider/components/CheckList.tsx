import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { TodoItem } from "@/types/task";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { useEffect } from "react";

export default function CheckList(props: {
  weekday: string;
  todoMap: Map<String, TodoItem[]>;
  handleDelete: any;
}) {
  useEffect(() => {}, [props.todoMap]);
  const todoItems = props.todoMap.get(props.weekday) ?? [];
  return (
    <CheckboxGroup>
      {todoItems.map((task, idx) => (
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
              onClick={(e) => props.handleDelete(task.id)}
            >
              <TrashIcon />
            </Button>
          </Checkbox>
        </div>
      ))}
    </CheckboxGroup>
  );
}
