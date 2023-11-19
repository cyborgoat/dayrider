"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { invoke } from "@tauri-apps/api/tauri";
import { TodoItem } from "@/types/task";
import { Input } from "@nextui-org/react";

export default function TodoModal({
  todoSetter,
}: {
  todoSetter: Dispatch<SetStateAction<TodoItem[]>>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
    invoke<string>("add_item", {
      name: "baby",
      due_date: "2023-12-31",
      notes: "notes",
    })
      .then((res) => {})
      .catch(console.error);

    invoke<string>("todo_list")
      .then((res) => todoSetter(JSON.parse(res.toString())))
      .catch(console.error);
  };
  return (
    <>
      <Button key={size} onPress={() => handleOpen(size)}>
        Open {size}
      </Button>

      <Modal size="md" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Reminder
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  variant="underlined"
                  placeholder="Title"
                ></Input>
                <Textarea
                  variant="flat"
                  label="Detail"
                  placeholder="Enter your description"
                  className="max-w-xs"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
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
