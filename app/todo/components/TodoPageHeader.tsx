import {
    Accordion, AccordionItem,
    Button,
    cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Switch
} from "@nextui-org/react";
import {IoIosAdd} from "react-icons/io";
import React from "react";
import {onTaskAddFunction} from "@/types/taskItem";
import Link from "next/link";
import {PiDotsThreeCircle} from "react-icons/pi";
import {HiEye} from "react-icons/hi2";

const iconClasses = "text-slate-800"
const TodoPageHeader = (
    {onItemAdd, numOfUnfinished, showCompleted, setShowCompleted}: {
        onItemAdd: onTaskAddFunction,
        numOfUnfinished: number | undefined,
        showCompleted: boolean,
        setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {
    const today = new Date();
    const dayOfWeek = today.getDay()
    const dayNum = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    return (
        <>
            <Navbar
                height={48}
                classNames={
                    {wrapper: "mx-0 px-0 mt-2"}
                }
            >
                <NavbarBrand>
                    <p className={"text-2xl font-semibold text-blue-500 mb-2"}>
                        Tasks
                    </p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Features
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="lg:flex">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button isIconOnly variant={"light"}>
                                    <PiDotsThreeCircle size={24} className={iconClasses}/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                <DropdownSection aria-label="Preferences" showDivider>
                                    <DropdownItem
                                        key="show completed"
                                        endContent={<HiEye className={""}/>}
                                    >
                                        Show completed
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection aria-label="Preferences" showDivider>

                                    <DropdownItem
                                        isReadOnly
                                        key="theme"
                                        className="cursor-default"
                                        endContent={
                                            <select
                                                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                                                id="theme"
                                                name="theme"
                                            >
                                                <option>Priority</option>
                                                <option>Date</option>
                                            </select>
                                        }
                                    >
                                        Order by
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                    <NavbarItem className="">
                        <Link href={`#day-${dayNum}`}>
                            <Button variant="light" radius={"full"} isIconOnly onClick={onItemAdd}>
                                <IoIosAdd size={24} className="text-slate-800"/>
                            </Button>
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="w-full flex flex-row justify-between items-end">
                <div className={"text-2xl font-semibold text-gray-500 p-1"}>
                    {typeof numOfUnfinished === "number" ? (numOfUnfinished) : 0}
                </div>
                <div>
                    <Switch
                        color={"primary"}
                        classNames={{
                            base: cn(
                                "inline-flex flex-row-reverse w-full max-w-md items-center",
                                "justify-between cursor-pointer rounded-lg gap-2 p-1 border-2 border-transparent",
                            ),
                            wrapper: "p-0 h-4 overflow-visible data-[selected=true]:bg-blue-500",
                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                                "group-data-[hover=true]:border-blue-500",
                                //selected
                                "group-data-[selected=true]:ml-6",
                                // pressed
                                "group-data-[pressed=true]:w-7",
                                "group-data-[selected]:group-data-[pressed]:ml-4",
                            ),
                        }}
                        onValueChange={(isSelected) => setShowCompleted(isSelected)}
                        defaultSelected={showCompleted}
                    >
                        <span className={"text-sm text-slate-500"}>Show Completed</span>
                    </Switch>
                </div>
            </div>
            <div className="fixed bottom-4 right-4">
            </div>
        </>
    )
}

export default TodoPageHeader;