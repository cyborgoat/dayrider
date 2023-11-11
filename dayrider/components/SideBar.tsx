import {Divider} from "@nextui-org/react";

export default function SideBar() {
    return (
        <div className="max-w-md mx-4 mt-4">
            <div className="space-y-1">
                <h4 className="text-medium font-medium">DayRider</h4>
                <p className="text-small text-default-400">Your personal intelligent assistant.</p>
            </div>
            <Divider className="my-4"/>
            <div className="flex h-5 items-center space-x-4 text-small">
                <div>Blog</div>
                <Divider orientation="vertical"/>
                <div>Docs</div>
                <Divider orientation="vertical"/>
                <div>Source</div>
            </div>
        </div>
    )
}