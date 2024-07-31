import React, { Dispatch, SetStateAction, useState } from "react";
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
import { IoInformationCircleOutline } from "react-icons/io5";
import { TodoItem } from "@/app/todo/types/todoItem";
import { updateTodoItem } from "@/app/todo/lib/utils";
import { CustomizedButton } from "@/app/todo/components/CustomizedTypes";

export default function ItemDetailModal(props: {
  todo: TodoItem;
  setTodo: Dispatch<SetStateAction<TodoItem>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [notes, setNotes] = useState(props.todo.notes);
  const [name, setName] = useState(props.todo.name);

  return (
    <div className="flex flex-col gap-2">
      <CustomizedButton
        color="info"
        radius="full"
        isIconOnly
        onPress={onOpen}
        size={"tiny"}
      >
        <IoInformationCircleOutline size={24} />
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
                <Textarea
                  minRows={5}
                  maxRows={12}
                  label="Notes"
                  placeholder="Enter your notes here"
                  defaultValue={props.todo.notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    // deleteTodoItem(props.todo.uuid).then();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    const newTodo = { ...props.todo, name: name, notes: notes };
                    props.setTodo(newTodo);
                    updateTodoItem(newTodo);
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
