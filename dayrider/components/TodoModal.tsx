"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
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

  const date = new Date();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(
    `${date.getFullYear}-${date.getMonth}-${date.getDate}`
  );
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    invoke<string>("add_item", {
      name: title,
      due_date: dueDate,
      notes: notes,
    })
      .then((res) => {
        setTitle("");
        setNotes("");
        onClose();
      })
      .catch(console.error);

    invoke<string>("todo_list")
      .then((res) => todoSetter(JSON.parse(res.toString())))
      .catch(console.error);
  };

  return (
    <>
      <Button key={"md-button"} onPress={() => onOpen()}>
        Add Reminder
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
                  onChange={(e) => setTitle(e.target.value)}
                ></Input>
                <Textarea
                  variant="flat"
                  label="Detail"
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
