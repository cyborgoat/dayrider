import Image from "next/image";
import Link from "next/link";
import {Button, NextUIProvider} from "@nextui-org/react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-6 py-24">
            <div className="bg-white py-2 sm:py-4 lg:py-6">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
                        <div className="flex items-center gap-12">
                            <h2 className="text-2xl font-bold text-gray-800">Good Morning,<br/> Cyborgoat</h2>
                            <p className="hidden max-w-[24em] text-gray-500 md:block">You can never finish everything
                                on time, remember that keep at a good pace can make things much easier to handle,
                                Lets take a look at your jobs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
