import { TodoItem } from "@/types/todoItem";
import { Divider, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

const ItemLine = (props: { todo: TodoItem }) => {
  const [value, setValue] = useState(props.todo.name);
  return (
    <div className="w-full py-0">
      <Input type="email" variant="flat" label="" defaultValue={value} />
    </div>
  );
};

export default ItemLine;
