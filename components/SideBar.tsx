"use client";
import {Divider, Listbox, ListboxItem} from "@nextui-org/react";
import TodoIcon from "@/components/icons/TodoIcon";
import {CalendarIcon} from "@/components/icons/CalendarIcon";
import React, {useState} from "react";
import {SettingsIcon} from "@/components/icons/SettingsIcon";
import {PersonIcon} from "@/components/icons/PersonIcon";
import {FaRegUserCircle, FaTasks} from "react-icons/fa";
import {PiList, PiListChecksFill} from "react-icons/pi";
import {FaListCheck} from "react-icons/fa6";
import {BsCalendar2Check, BsCalendar2Day} from "react-icons/bs";
import {IoIosSettings} from "react-icons/io";

export default function SideBar() {
    const [titleColor, setTitleColor] = useState("text-sky-500");

    return (
        <div className="sticky top-0 h-screen max-w-md pt-4 mx-2">
            <div>
                <a href={"/"} className={`text-md font-medium`}>
                    DayRiderV2
                </a>
            </div>
            <Divider className="mt-4"/>
            <div className="w-full pb-2 border-small rounded-small border-default-200 dark:border-default-100">
                <Listbox aria-label="Actions" onAction={(key) => setTitleColor("text-slate-900")}>
                    <ListboxItem
                        key="todo" href={"/todo"} textValue={"todo"}
                        startContent={<FaListCheck strokeWidth={0.3} size={24}/>}
                    >
                        <span className="text-md font-[500]">Todo</span>
                    </ListboxItem>
                    <ListboxItem key="schedule" href={"/schedule"} textValue={"schedule"}
                                 startContent={<BsCalendar2Day strokeWidth={0.3} size={24}/>}
                    >
                        <span className="text-md font-[500]">Schedule</span>
                    </ListboxItem>
                    <ListboxItem key="schedule" href={"/profile"} textValue={"schedule"}
                                 startContent={<FaRegUserCircle strokeWidth={0.3} size={24}/>}
                    >
                        <span className="text-md font-[500]">Profile</span>
                    </ListboxItem>
                    <ListboxItem key="settings" href={"/settings"} textValue={"settings"}
                                 startContent={<IoIosSettings strokeWidth={0.3} size={24}/>}
                    >
                        <span className="text-md font-[500]">Settings</span>
                    </ListboxItem>
                </Listbox>
            </div>

        </div>
    );
}
