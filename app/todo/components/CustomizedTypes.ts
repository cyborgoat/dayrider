import {Button, extendVariants} from "@nextui-org/react";

export const CustomizedButton = extendVariants(Button, {
    variants: {
        // <- modify/add variants
        color: {
            info: "bg-transparent text-blue-300 hover:text-blue-500",
            trash: "bg-transparent text-slate-400 hover:text-red-500",
        },
        isDisabled: {
            true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
        },
        size: {
            tiny: "px-0 min-w-4 h-6 text-tiny gap-0 rounded-small",
            xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
            md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
            xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
        },
    },
    defaultVariants: {
        // <- modify/add default variants
        color: "info",
        size: "xs",
    },
    compoundVariants: [
        // <- modify/add compound variants
        {
            isDisabled: true,
            color: "info",
            class: "bg-[#84cc16]/80 opacity-100",
        },
    ],
});

