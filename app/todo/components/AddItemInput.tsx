import { TodoItem } from "@/types/todoItem";
import { DateInput, Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

const AddItemInput = (props: {
  itemList: TodoItem[];
  setItemList: Dispatch<SetStateAction<TodoItem[]>>;
}) => {
  const [value, setValue] = useState(String);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      props.setItemList([
        ...props.itemList,
        {
          name: value,
          dueOn: "2024-12-31",
          createdOn: "2024-12-31",
          finished: false,
        },
      ]);
    }
  };
  return (
    <div className="w-full py-2">
      <Input
        type="email"
        variant={"bordered"}
        label="new"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSubmit}
      />
    </div>
  );
};

export default AddItemInput;
