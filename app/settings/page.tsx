"use client";
import React, {useEffect, useState} from "react";
import {getUser, setUser} from "@/lib/user";
import {User} from "@/types/user";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Page() {
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
        useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userName, setUserName] = useState<string>('Loading');
    const [userId, setUserId] = useState<string>('Loading');
    const [userEmail, setUserEmail] = useState<string>('Loading');

    useEffect(() => {
        if (!isLoaded) {
            getUser()
                .then((userInfo) => {
                    const user = userInfo as User;
                    setUserName(user.name);
                    setUserId(user.id);
                    setUserEmail(user.email);
                    setIsLoaded(true);
                })
                .catch((e) => console.log(e));
        }
    }, [isLoaded]);

    return (
        <>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
                <main className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0 lg:py-6">
                    <div className="max-w-3xl mx-auto space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 leading-7">
                                Profile
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 leading-6">
                                Your personal information will only be stored locally (for now)
                            </p>

                            <dl className="mt-6 text-sm border-t border-gray-200 space-y-6 divide-y divide-gray-100 leading-6">
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                        Full Name
                                    </dt>
                                    <input
                                        className="border-1.5 rounded-md text-gray-900 hover:bg-slate-400/40 px-1"
                                        defaultValue={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        onBlur={(e) => {
                                            setUser(userName, userId, userEmail).then().catch(e => console.log(e));
                                        }}
                                    />
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                        Email
                                    </dt>
                                    <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                                        <input
                                            className="border-1.5 rounded-md text-gray-900 hover:bg-slate-400/40 px-1"
                                            defaultValue={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            onBlur={(e) => {
                                                setUser(userName, userId, userEmail).then().catch(e => console.log(e));
                                            }}
                                        />
                                    </dd>
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                                        WorkID
                                    </dt>
                                    <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                                        <input
                                            className="border-1.5 rounded-md text-gray-900 hover:bg-slate-400/40 px-1"
                                            defaultValue={userId}
                                            onBlur={(e) => {
                                                setUser(userName, e.target.value, userEmail).then().catch(e => console.log(e));
                                                setUserId(e.target.value)
                                            }}
                                        />
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        {/*<div>*/}
                        {/*    <h2 className="text-base font-semibold text-gray-900 leading-7">*/}
                        {/*        Language and dates*/}
                        {/*    </h2>*/}
                        {/*    <p className="mt-1 text-sm text-gray-500 leading-6">*/}
                        {/*        Choose what language and date format to use*/}
                        {/*        throughout your account.*/}
                        {/*    </p>*/}

                        {/*    <dl className="mt-6 text-sm border-t border-gray-200 space-y-6 divide-y divide-gray-100 leading-6">*/}
                        {/*        <div className="pt-6 sm:flex">*/}
                        {/*            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">*/}
                        {/*                Language*/}
                        {/*            </dt>*/}
                        {/*            <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*                <div className="text-gray-900">*/}
                        {/*                    English*/}
                        {/*                </div>*/}
                        {/*                <button*/}
                        {/*                    type="button"*/}
                        {/*                    className="font-semibold text-indigo-600 hover:text-indigo-500"*/}
                        {/*                >*/}
                        {/*                    Update*/}
                        {/*                </button>*/}
                        {/*            </dd>*/}
                        {/*        </div>*/}
                        {/*        <div className="pt-6 sm:flex">*/}
                        {/*            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">*/}
                        {/*                Date format*/}
                        {/*            </dt>*/}
                        {/*            <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*                <div className="text-gray-900">*/}
                        {/*                    DD-MM-YYYY*/}
                        {/*                </div>*/}
                        {/*                <button*/}
                        {/*                    type="button"*/}
                        {/*                    className="font-semibold text-indigo-600 hover:text-indigo-500"*/}
                        {/*                >*/}
                        {/*                    Update*/}
                        {/*                </button>*/}
                        {/*            </dd>*/}
                        {/*        </div>*/}
                        {/*        <Switch.Group as="div" className="flex pt-6">*/}
                        {/*            <Switch.Label*/}
                        {/*                as="dt"*/}
                        {/*                className="flex-none w-64 pr-6 font-medium text-gray-900"*/}
                        {/*                passive*/}
                        {/*            >*/}
                        {/*                Automatic timezone*/}
                        {/*            </Switch.Label>*/}
                        {/*            <dd className="flex items-center justify-end flex-auto">*/}
                        {/*                <Switch*/}
                        {/*                    checked={automaticTimezoneEnabled}*/}
                        {/*                    onChange={*/}
                        {/*                        setAutomaticTimezoneEnabled*/}
                        {/*                    }*/}
                        {/*                    className={classNames(*/}
                        {/*                        automaticTimezoneEnabled*/}
                        {/*                            ? "bg-indigo-600"*/}
                        {/*                            : "bg-gray-200",*/}
                        {/*                        "flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                        {/*                    )}*/}
                        {/*                >*/}
                        {/*                    <span*/}
                        {/*                        aria-hidden="true"*/}
                        {/*                        className={classNames(*/}
                        {/*                            automaticTimezoneEnabled*/}
                        {/*                                ? "translate-x-3.5"*/}
                        {/*                                : "translate-x-0",*/}
                        {/*                            "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"*/}
                        {/*                        )}*/}
                        {/*                    />*/}
                        {/*                </Switch>*/}
                        {/*            </dd>*/}
                        {/*        </Switch.Group>*/}
                        {/*    </dl>*/}
                        {/*</div>*/}
                    </div>
                </main>
            </div>
        </>
    );
}
