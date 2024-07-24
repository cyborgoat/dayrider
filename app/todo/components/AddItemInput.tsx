import {TodoItem} from "@/types/todoItem";
import {Input} from "@nextui-org/react";
import {Dispatch, SetStateAction, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {invoke} from '@tauri-apps/api/tauri'


const AddItemInput = (props: {
    itemList: TodoItem[];
    setItemList: Dispatch<SetStateAction<TodoItem[]>>;
}) => {
    const [value, setValue] = useState(String);

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {


        if (e.key == "Enter") {
            let newItem: TodoItem = {
                uuid: uuidv4(),
                name: value,
                date: "2024-12-31",
                deadline: "2024-12-31",
                finished: "false",
                notes: "test notes",
            }
            invoke<string>('add_item', {todoItem: newItem})
                .then(result => {
                        props.setItemList([
                            ...props.itemList,
                            newItem
                        ])
                        console.log(result)
                    }
                )
                .catch(console.error)
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
