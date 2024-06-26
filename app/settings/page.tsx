'use client'
import {useState} from 'react'
import {Switch} from '@headlessui/react'

const navigation = [
    {name: 'Home', href: '#'},
    {name: 'Invoices', href: '#'},
    {name: 'Clients', href: '#'},
    {name: 'Expenses', href: '#'},
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Page() {
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)

    return (
        <>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
                <main className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0 lg:py-6">
                    <div className="max-w-2xl mx-auto space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 leading-7">Profile</h2>
                            <p className="mt-1 text-sm text-gray-500 leading-6">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <dl className="mt-6 text-sm border-t border-gray-200 space-y-6 divide-y divide-gray-100 leading-6">
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name
                                    </dt>
                                    <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">Tom Cook</div>
                                        <button type="button"
                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Update
                                        </button>
                                    </dd>
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email
                                        address
                                    </dt>
                                    <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">tom.cook@example.com</div>
                                        <button type="button"
                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Update
                                        </button>
                                    </dd>
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                                    <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">Human Resources Manager</div>
                                        <button type="button"
                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Update
                                        </button>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-900 leading-7">Bank accounts</h2>
                            <p className="mt-1 text-sm text-gray-500 leading-6">Connect bank accounts to your
                                account.</p>

                            <ul role="list"
                                className="mt-6 text-sm border-t border-gray-200 divide-y divide-gray-100 leading-6">
                                <li className="flex justify-between py-6 gap-x-6">
                                    <div className="font-medium text-gray-900">TD Canada Trust</div>
                                    <button type="button"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Update
                                    </button>
                                </li>
                                <li className="flex justify-between py-6 gap-x-6">
                                    <div className="font-medium text-gray-900">Royal Bank of Canada</div>
                                    <button type="button"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Update
                                    </button>
                                </li>
                            </ul>

                            <div className="flex pt-6 border-t border-gray-100">
                                <button type="button"
                                        className="text-sm font-semibold text-indigo-600 leading-6 hover:text-indigo-500">
                                    <span aria-hidden="true">+</span> Add another bank
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-900 leading-7">Integrations</h2>
                            <p className="mt-1 text-sm text-gray-500 leading-6">Connect applications to your
                                account.</p>

                            <ul role="list"
                                className="mt-6 text-sm border-t border-gray-200 divide-y divide-gray-100 leading-6">
                                <li className="flex justify-between py-6 gap-x-6">
                                    <div className="font-medium text-gray-900">QuickBooks</div>
                                    <button type="button"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Update
                                    </button>
                                </li>
                            </ul>

                            <div className="flex pt-6 border-t border-gray-100">
                                <button type="button"
                                        className="text-sm font-semibold text-indigo-600 leading-6 hover:text-indigo-500">
                                    <span aria-hidden="true">+</span> Add another application
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-900 leading-7">Language and dates</h2>
                            <p className="mt-1 text-sm text-gray-500 leading-6">
                                Choose what language and date format to use throughout your account.
                            </p>

                            <dl className="mt-6 text-sm border-t border-gray-200 space-y-6 divide-y divide-gray-100 leading-6">
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                                    <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">English</div>
                                        <button type="button"
                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Update
                                        </button>
                                    </dd>
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format
                                    </dt>
                                    <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">DD-MM-YYYY</div>
                                        <button type="button"
                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Update
                                        </button>
                                    </dd>
                                </div>
                                <Switch.Group as="div" className="flex pt-6">
                                    <Switch.Label as="dt" className="flex-none w-64 pr-6 font-medium text-gray-900"
                                                  passive>
                                        Automatic timezone
                                    </Switch.Label>
                                    <dd className="flex items-center justify-end flex-auto">
                                        <Switch
                                            checked={automaticTimezoneEnabled}
                                            onChange={setAutomaticTimezoneEnabled}
                                            className={classNames(
                                                automaticTimezoneEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            )}
                                        >
                      <span
                          aria-hidden="true"
                          className={classNames(
                              automaticTimezoneEnabled ? 'translate-x-3.5' : 'translate-x-0',
                              'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                          )}
                      />
                                        </Switch>
                                    </dd>
                                </Switch.Group>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
