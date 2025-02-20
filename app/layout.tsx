import type {Metadata} from "next";
import "./globals.css";
import * as React from "react";
import {Providers} from "./providers";
import SideBar from "@/components/SideBar";

export const metadata: Metadata = {
    title: "Dayrider",
    description: "Your personal assistant",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`text-slate-800 dark:text-slate-200`}>
        <Providers>
            <div className="grid grid-cols-16 bg-white dark:bg-slate-800">
                <div className="border-r-2 col-span-3 lg:col-span-4  border-slate-500/30">
                    <SideBar/>
                </div>
                <div className="col-span-13 lg:col-span-12">{children}</div>
            </div>
        </Providers>
        </body>
        </html>
    );
}
