"use client";
import {Divider, Listbox, ListboxItem} from "@nextui-org/react";
import React, {useState} from "react";
import {FaRegUserCircle} from "react-icons/fa";
import {FaListCheck} from "react-icons/fa6";
import {BsCalendar2Day} from "react-icons/bs";
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
      <Divider className="mt-4" />
      <div className="w-full pb-2 border-small rounded-small border-default-200 dark:border-default-100">
        <Listbox
          aria-label="actions"
          onAction={(key) => setTitleColor("text-slate-900")}
        >
          <ListboxItem
            key="todo"
            href={"/todo"}
            textValue={"todo"}
            startContent={<FaListCheck strokeWidth={0.3} size={24} />}
          >
            <span className="text-md font-[500]">Todo</span>
          </ListboxItem>
          <ListboxItem
            key="schedule"
            href={"/schedule"}
            textValue={"schedule"}
            startContent={<BsCalendar2Day strokeWidth={0.3} size={24} />}
          >
            <span className="text-md font-[500]">Schedule</span>
          </ListboxItem>
          <ListboxItem
            key="profile"
            href={"/profile"}
            textValue={"profile"}
            startContent={<FaRegUserCircle strokeWidth={0.3} size={24} />}
          >
            <span className="text-md font-[500]">Profile</span>
          </ListboxItem>
          <ListboxItem
            key="settings"
            href={"/settings"}
            textValue={"settings"}
            startContent={<IoIosSettings strokeWidth={0.3} size={24} />}
          >
            <span className="text-md font-[500]">Settings</span>
          </ListboxItem>
        </Listbox>
      </div>
    </div>
  );
}
