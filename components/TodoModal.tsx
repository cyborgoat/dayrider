"use client";
import React, {Dispatch, SetStateAction, useState} from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";
import {TodoItem} from "@/types/todoItem";
import {IoAddCircle} from "react-icons/io5";

export default function TodoModal({
                                      todoList,
                                      setTodoList,
                                  }: {
    todoList: TodoItem[];
    setTodoList: Dispatch<SetStateAction<TodoItem[]>>;
}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const date = new Date();
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(
        `${date.getFullYear}-${date.getMonth}-${date.getDate}`
    );
    const [notes, setNotes] = useState("");

    const handleSubmit = () => {
        setTodoList([
            ...todoList,
            {
                name: name,
                date: date.toDateString(),
                deadline: dueDate,
                notes: notes,
                finished: false,
            },
        ]);
        onClose();
    };

    return (
        <>
            <Button size="sm" color="default" variant="light" isIconOnly={true} aria-label="add item"
                    onPress={() => onOpen()}>
                <IoAddCircle size={24} />
            </Button>

            <Modal size="md" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                New Todo
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    type="text"
                                    variant="underlined"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                ></Input>
                                <Textarea
                                    variant="flat"
                                    label="Notes"
                                    placeholder="Enter your description"
                                    className="max-w-xs"
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
