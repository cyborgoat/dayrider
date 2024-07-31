"use client";
import {Avatar, Listbox, ListboxItem} from "@nextui-org/react";
import React from "react";
import {FaRegUserCircle} from "react-icons/fa";
import {FaListCheck} from "react-icons/fa6";
import {BsCalendar2Day} from "react-icons/bs";
import {IoIosSettings} from "react-icons/io";
import {IconWrapper} from "./icons/IconWrapper";
import {ItemCounter} from "./icons/ItemCounter";

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export default function SideBar() {
    const current = new Date();
    return (
        <div className="sticky top-0 h-screen max-w-md pt-4">
            <div className="flex flex-row gap-x-2 mt-2 mb-6 ml-4">
                <Avatar className="" name="Rob"/>
                <div className="flex flex-col mt-1">
                    <div className="text-xs font-light">
                        {" "}
                        {current.toLocaleDateString()}{" "}
                    </div>
                    <div className="text-xs font-light">{days[current.getDay()]}</div>
                </div>
            </div>
            <div className="w-full pb-2 mx-1">
                <Listbox aria-label="actions" className="px-2">
                    <ListboxItem
                        key="todo"
                        href={"/todo"}
                        textValue={"todo"}
                        startContent={
                            <IconWrapper className="bg-primary/10 text-primary">
                                <FaListCheck strokeWidth={0.3} size={16}/>
                            </IconWrapper>
                        }
                        // endContent={<ItemCounter number={5}/>}
                    >
                        <span className="text-md font-[500]">Todo</span>
                    </ListboxItem>
                    <ListboxItem
                        key="schedule"
                        href={"/schedule"}
                        textValue={"schedule"}
                        startContent={
                            <IconWrapper className="bg-success/10 text-success">
                                <BsCalendar2Day strokeWidth={0.3} size={16}/>
                            </IconWrapper>
                        }
                        // endContent={<ItemCounter number={5}/>}
                    >
                        <span className="text-md font-[500]">Schedule</span>
                    </ListboxItem>
                    <ListboxItem
                        key="profile"
                        href={"/profile"}
                        textValue={"profile"}
                        startContent={
                            <IconWrapper className="bg-success/10 text-success">
                                <FaRegUserCircle strokeWidth={0.3} size={16}/>
                            </IconWrapper>
                        }
                        // endContent={<ItemCounter number={5}/>}
                    >
                        <span className="text-md font-[500]">Profile</span>
                    </ListboxItem>
                    <ListboxItem
                        key="settings"
                        href={"/settings"}
                        textValue={"settings"}
                        startContent={
                            <IconWrapper className="bg-success/10 text-success">
                                <IoIosSettings strokeWidth={0.3} size={16}/>
                            </IconWrapper>
                        }
                        // endContent={<ItemCounter number={5}/>}
                    >
                        <span className="text-md font-[500]">Settings</span>
                    </ListboxItem>
                </Listbox>
            </div>
        </div>
    );
}
