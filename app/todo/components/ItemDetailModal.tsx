import React, {Dispatch, SetStateAction} from "react";
import {
    Button,
    extendVariants,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import {IoInformationCircleOutline} from "react-icons/io5";
import {TodoItem} from "@/app/todo/types/todoItem";
import {deleteTodoItem} from "@/app/todo/lib/utils";
import {CustomizedButton} from "@/app/todo/components/CustomizedTypes";

export default function ItemDetailModal(props: { todo: TodoItem, setTodo: Dispatch<SetStateAction<TodoItem>> }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="flex flex-col gap-2">
            <CustomizedButton color="info" radius="full" isIconOnly onPress={onOpen} size={"tiny"}>
                <IoInformationCircleOutline size={24}/>
            </CustomizedButton>
            <Modal
                isOpen={isOpen}
                placement={"auto"}
                size="3xl"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{props.todo.name}</ModalHeader>
                            <ModalBody>
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
                                <Button color="danger" variant="light" onPress={() => {
                                    onClose();
                                    deleteTodoItem(props.todo.uuid).then();
                                }}>
                                    Delete Todo Item
                                </Button>
                                <Button color="primary" onPress={onClose}>
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
