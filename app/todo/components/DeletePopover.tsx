import {Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import React from "react";
import {onItemRemoveFunction, TodoItem} from "@/app/todo/types/todoItem";
import {ListboxWrapper} from "@/components/ListboxWrapper";
import {CustomizedButton} from "@/app/todo/components/CustomizedTypes";
import {FiTrash2} from "react-icons/fi";
import {IoCheckmarkSharp} from "react-icons/io5";

export default function DeletePopover(props: { todo: TodoItem, onItemRemove: onItemRemoveFunction }
) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Popover showArrow placement="bottom" isOpen={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className="">
                <CustomizedButton color="trash" radius="full" isIconOnly size={"tiny"}>
                    <FiTrash2 size={18}/>
                </CustomizedButton>
            </PopoverTrigger>
            <PopoverContent className="min-w-[100px] p-1">
                <ListboxWrapper>
                    <Listbox
                        aria-label="Actions"
                        onAction={(key) => alert(key)}
                    >
                        <ListboxItem className="text-danger" key="delete"
                                     onClick={() => {
                                         props.onItemRemove(props.todo.uuid)
                                     }}
                                     endContent={<IoCheckmarkSharp/>}>Delete</ListboxItem>
                        <ListboxItem key="cancel" onClick={() => setIsOpen(false)}>Cancel</ListboxItem>
                    </Listbox>
                </ListboxWrapper>
            </PopoverContent>
        </Popover>
    );
}