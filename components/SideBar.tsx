"use client";
import {Avatar, Listbox, ListboxItem} from "@nextui-org/react";
import React from "react";
import {FaListCheck} from "react-icons/fa6";
import {BsCalendar2Day} from "react-icons/bs";
import {IoIosSettings} from "react-icons/io";
import {IconWrapper} from "./icons/IconWrapper";
import {usePathname} from 'next/navigation';
import {RxDashboard} from "react-icons/rx";

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
    const pathname = usePathname();

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
                        key="dashboard"
                        href={"/"}
                        textValue={"dashboard"}
                        className={pathname === "/" ? "bg-blue-300/15" : ""}
                        startContent={
                            <IconWrapper className="bg-blue-500/10 text-blue-500">
                                <RxDashboard strokeWidth={0.3} size={16}/>
                            </IconWrapper>
                        }
                    >
                        <span className="text-md font-[500]">Dashboard</span>
                    </ListboxItem>
                    <ListboxItem
                        key="todo"
                        href={"/todo"}
                        textValue={"todo"}
                        className={pathname === "/todo" ? "bg-blue-300/15" : ""}
                        startContent={
                            <IconWrapper className="bg-blue-500/10 text-blue-500">
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
                        className={pathname === "/schedule" ? "bg-blue-300/15" : ""}
                        startContent={
                            <IconWrapper className="bg-blue-500/10 text-blue-500">
                                <BsCalendar2Day strokeWidth={0.3} size={16}/>
                            </IconWrapper>
                        }
                        // endContent={<ItemCounter number={5}/>}
                    >
                        <span className="text-md font-[500]">Schedule</span>
                    </ListboxItem>
                    <ListboxItem
                        key="settings"
                        href={"/settings"}
                        textValue={"settings"}
                        className={pathname === "/settings" ? "bg-blue-300/15" : ""}
                        startContent={
                            <IconWrapper className="bg-blue-500/10 text-blue-500">
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
