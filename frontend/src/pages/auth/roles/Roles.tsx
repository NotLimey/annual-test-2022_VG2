import { Combobox, Dialog, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { useQuery } from "react-query";
import PageHeading from '../../../components/page-headings/PageHeading';
import { fetchRoles } from "../../../scripts/fetch";
import { formatPascalAndSpace } from "../../../scripts/text";

const classNames = (...classes: any[]) => classes.filter(Boolean).join(" ");

const Roles = () => {
    const { data } = useQuery("auth_roles", fetchRoles)

    return (
        <>
            <PageHeading noPublicBtn>Roles</PageHeading>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data && data.data.map((role: string, idx: number) => (
                    <li key={idx} className="col-span-1 bg-white dark:bg-stone-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 dark:text-gray-100 font-medium truncate">{formatPascalAndSpace(role)}</h3>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0" />

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col divide-y divide-gray-200 dark:divide-stone-600 bg-white dark:bg-stone-800 shadow-xl">
                                            <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                                <div className="px-4 sm:px-6">
                                                    <div className="flex items-start justify-between">
                                                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-stone-100"> Add user to role </Dialog.Title>
                                                        <div className="ml-3 flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="rounded-md bg-white dark:bg-stone-800 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-limeyfy-500"
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                <span className="sr-only">Close panel</span>
                                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                </div>
                                            </div>
                                            <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md border border-gray-300 dark:border-stone-600 bg-white dark:bg-stone-900 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-limeyfy-500 focus:ring-offset-2"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-limeyfy-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-limeyfy-500 focus:ring-offset-2"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root> */}
        </>
    );
}

export default Roles;