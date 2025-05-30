import React from "react";
import StatCards from "@/app/components/StatCards";

export default function DashboardPage() {
    return (
        <main className="flex flex-col items-start min-h-screen px-4 pt-6 justify-items-start lg:px-6">
            <div className={"text-2xl font-semibold text-slate-500 mb-2"}>
                Dashboard
            </div>
            <StatCards/>
        </main>
    );
}
