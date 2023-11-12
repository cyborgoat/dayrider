'use client'
import {Divider} from "@nextui-org/react";
import EventCalendar from "@/components/EventCalendar";

export default function SchedulePage() {
    return (
        <main className="flex min-h-screen flex-col items-start justify-items-start px-4 pt-6 lg:px-6">
            <div className={"text-2xl font-semibold"}>Schedule</div>
            <Divider className="mt-0 pb-1 mb-4"/>
            <EventCalendar/>
        </main>
    )
}