import {Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger,} from "@nextui-org/react";
import React from "react";
import {onTaskRemoveFunction, TaskItem} from "@/app/todo/types/taskItem";
import {ListboxWrapper} from "@/components/ListboxWrapper";
import {CustomizedButton} from "@/app/todo/components/CustomizedTypes";
import {FiTrash2} from "react-icons/fi";

export default function DeletePopover(props: {
    todo: TaskItem;
    onItemRemove: onTaskRemoveFunction;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Popover
            showArrow
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger className="">
                <CustomizedButton color="trash" radius="full" isIconOnly size={"tiny"}>
                    <FiTrash2 size={18}/>
                </CustomizedButton>
            </PopoverTrigger>
            <PopoverContent className="min-w-[80px] p-0">
                <ListboxWrapper>
                    <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                        <ListboxItem
                            className="text-danger text-center"
                            key="delete"
                            onClick={() => {
                                props.onItemRemove(props.todo.uuid);
                                setIsOpen(false);
                            }}
                        >
                            Delete
                        </ListboxItem>
                        <ListboxItem
                            key="cancel"
                            className="text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </ListboxItem>
                    </Listbox>
                </ListboxWrapper>
            </PopoverContent>
        </Popover>
    );
}
