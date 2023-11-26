import React from "react";

export const ListboxWrapper = ({children}: { children: React.ReactNode }) => (
    <div
        className="w-full py-2 border-small rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
);
