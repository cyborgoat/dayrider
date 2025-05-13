'use client'
import {Divider} from "@heroui/react";
import EventCalendar from "@/components/EventCalendar";

export default function SchedulePage() {
    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <div className={"text-2xl font-semibold"}>Schedule</div>
            <Divider className="pb-1 mt-0 mb-4"/>
            <EventCalendar/>
        </main>
    )
}