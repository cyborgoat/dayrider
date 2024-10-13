import React, {useState} from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";
import {IoInformationCircleOutline} from "react-icons/io5";
import {
    onTaskUpdateFunction,
    priorityList,
    priorityOptions,
    repeatList,
    repeatOptions,
    TaskItem
} from "@/types/taskItem";
import {CustomizedButton} from "@/app/todo/components/CustomizedTypes";


export default function TaskDetailModal(props: {
    todo: TaskItem;
    onItemUpdate: onTaskUpdateFunction;
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [notes, setNotes] = useState(props.todo.notes);
    const [name, setName] = useState(props.todo.name);
    const [priority, setPriority] = useState(props.todo.priority);
    const [repeat, setRepeat] = useState(props.todo.repeat);

    return (
        <div className="flex flex-col gap-2">
            <CustomizedButton
                color="info"
                radius="full"
                isIconOnly
                onPress={onOpen}
                size={"tiny"}
            >
                <IoInformationCircleOutline size={24}/>
            </CustomizedButton>
            <Modal
                isOpen={isOpen}
                placement="center"
                size="3xl"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    type="email"
                                    variant="underlined"
                                    label="Task Name"
                                    size="lg"
                                    placeholder="Enter task name"
                                    defaultValue={props.todo.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </ModalHeader>
                            <ModalBody>
                                <Select
                                    labelPlacement="outside"
                                    label="Priority"
                                    variant="underlined"
                                    placeholder="Select priority"
                                    className="max-w-xs"
                                    defaultSelectedKeys={[priority]}
                                    onChange={e => setPriority(e.target.value as priorityOptions)}
                                >
                                    {priorityList.map((priority) => (
                                        <SelectItem key={priority.key}>
                                            {priority.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    labelPlacement="outside"
                                    label="Repeat"
                                    variant="underlined"
                                    placeholder="Select repeat style"
                                    className="max-w-xs"
                                    defaultSelectedKeys={[repeat]}
                                    onChange={e => setRepeat(e.target.value as repeatOptions)}
                                >
                                    {repeatList.map((item) => (
                                        <SelectItem key={item.key}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Textarea
                                    minRows={5}
                                    maxRows={12}
                                    label="Notes"
                                    size="lg"
                                    labelPlacement="outside"
                                    placeholder="Enter your notes here"
                                    defaultValue={props.todo.notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter className="justify-between">
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        onClose();
                                        const newTodo = {
                                            ...props.todo,
                                            name: name,
                                            notes: notes,
                                            priority: priority,
                                            repeat: repeat
                                        };
                                        props.onItemUpdate(newTodo);
                                    }}
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
