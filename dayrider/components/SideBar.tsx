'use client'
import {Divider, Listbox, ListboxItem} from "@nextui-org/react";
import TodoIcon from "@/components/icons/TodoIcon";
import {CalendarIcon} from "@/components/icons/CalendarIcon";
import {useState} from "react";
import {SettingsIcon} from "@/components/icons/SettingsIcon";
import {PersonIcon} from "@/components/icons/PersonIcon";

export default function SideBar() {
    const [titleColor, setTitleColor] = useState("text-sky-500")

    return (
        <div className="max-w-md mx-4 mt-4">
            <div>
                <h4 className={`text-lg font-medium`}>DayRider</h4>
                <p className="text-sm text-default-400">Your personal intelligent assistant.</p>
            </div>
            <Divider className="mt-4"/>
            <span className="pt-4 text-xs font-bold text-stone-700/40">Apps</span>
            <div
                className="w-full border-small pb-2 rounded-small border-default-200 dark:border-default-100">
                <Listbox
                    aria-label="Actions"
                    onAction={(key) => setTitleColor("text-slate-900")}
                >
                    <ListboxItem key="todo" href={"/todo"} textValue={"todo"}>
                        <div className="flex flex-row"><TodoIcon/> <span className="ml-1 text-md">Todo</span></div>
                    </ListboxItem>
                    <ListboxItem key="schedule" href={"/schedule"} textValue={"schedule"}>
                        <div className="flex flex-row"><CalendarIcon/> <span className="ml-1 text-md">Schedule</span>
                        </div>
                    </ListboxItem>
                </Listbox>
            </div>
            <div
                className="absolute bottom-0 w-full border-small py-2
                 rounded-small border-default-200 dark:border-default-100">
                <Listbox
                    aria-label="Actions"
                    onAction={(key) => setTitleColor("text-slate-900")}
                >
                    <ListboxItem key="schedule" href={"/profile"} textValue={"schedule"}>
                        <div className="flex flex-row"><PersonIcon/> <span
                            className="ml-1 text-md">My Profile</span>
                        </div>
                    </ListboxItem>
                    <ListboxItem key="settings" href={"/settings"} textValue={"settings"}>
                        <div className="flex flex-row"><SettingsIcon/> <span
                            className="ml-1 text-md">Settings</span>
                        </div>
                    </ListboxItem>
                </Listbox>
            </div>
        </div>
    )
}