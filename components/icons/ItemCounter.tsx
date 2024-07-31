import React from "react";
import {IoChevronForwardSharp} from "react-icons/io5";

export const ItemCounter = ({number}: { number: number }) => (
    <div className="flex items-center gap-1 text-default-400">
        <span className="text-small">{number}</span>
        <IoChevronForwardSharp className="text-xl"/>
    </div>
);
