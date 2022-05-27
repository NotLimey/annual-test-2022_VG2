import { Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon, MailIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import PageHeading from "../../../components/page-headings/PageHeading";
import useAuth from "../../../hooks/useAuth";
import { fetchRoles, fetchUsers, fetchUsersWithParams } from "../../../scripts/fetch";
import { classNames } from "../../../scripts/tailwind";
import { formatPascalAndSpace } from "../../../scripts/text";
import { UserType } from "../../../types/User";

const Users = () => {
    const inputField = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState<UserType[]>([])
    const { data, isLoading, refetch: refetchUsers } = useQuery(["auth_users", username], () => fetchUsersWithParams(username));
    const { data: roleData } = useQuery("auth_roles", fetchRoles);
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserType>()

    const { user } = useAuth()

    useEffect(() => {
        if (!data) return;
        setUsers(data.data)
    }, [data, isLoading])

    const handleInspectUser = (id: string) => {
        setOpen(true);
        const _user = users.find(x => x.id === id);
        setSelectedUser(_user);
    }

    const removeRole = async (role: string) => {
        if (!selectedUser) return;
        const id = selectedUser.id;
        const res = await axios("/role/remove-from", {
            method: "POST",
            data: {
                id: selectedUser.id,
                role: role
            }
        })
        if (res.status === 200) {
            await refetchUsers();
            const idx = selectedUser.roles.findIndex(x => x.toLowerCase() === role.toLowerCase());
            selectedUser.roles.splice(idx, 1);
        }
    }

    const addRole = async (role: string) => {
        if (!selectedUser) return;
        const id = selectedUser.id;
        const res = await axios("/role/add-to", {
            method: "POST",
            data: {
                id: selectedUser.id,
                role: role
            }
        })
        if (res.status === 200) {
            await refetchUsers();
            selectedUser.roles.push(role);
        }
    }

    const handleSearch = () => {
        if (!inputField.current)
            return;

        const val = inputField.current.value;
        if (val.length < 1) return;

        setUsername(val);
    }

    return (
        <>
            <PageHeading publishPath="/auth/users/register" publishText="Register new user">Users</PageHeading>
            <div className="flex items-end">
                <div className="w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Search for user by username
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="search"
                            ref={inputField}
                            id="search"
                            className="shadow-sm focus:ring-limeyfy-500 focus:border-limeyfy-500 block w-full sm:text-sm border-gray-300 dark:bg-stone-800 dark:border-stone-700 rounded-md"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="ml-4 whitespace-nowrap inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                    onClick={handleSearch}
                >
                    Search
                    <SearchIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="w-full">
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow dark:shadow-xl ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-stone-700">
                                    <thead className="bg-gray-50 dark:bg-stone-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6">
                                                <a href="#" className="group inline-flex">
                                                    Name
                                                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </a>
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                <a href="#" className="group inline-flex">
                                                    Full name
                                                    <span className="ml-2 flex-none rounded bg-gray-200 dark:bg-stone-700 text-gray-900 dark:text-gray-100 group-hover:bg-gray-300 dark:group-hover:bg-stone-600">
                                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </a>
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                <a href="#" className="group inline-flex">
                                                    Email
                                                    <span className="invisible ml-2 flex-none rounded text-gray-400 dark:text-gray-500 group-hover:visible group-focus:visible">
                                                        <ChevronDownIcon
                                                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 dark:text-gray-100 group-hover:visible group-focus:visible"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </a>
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                <a href="#" className="group inline-flex">
                                                    Company
                                                    <span className="invisible ml-2 flex-none rounded text-gray-400 dark:text-gray-500 group-hover:visible group-focus:visible">
                                                        <ChevronDownIcon
                                                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 dark:text-gray-100 group-hover:visible group-focus:visible"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </a>
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:bg-stone-900 dark:divide-stone-700">
                                        {users.map((user: UserType) => (
                                            <tr key={user.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6">
                                                    {user.userName}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.firstName + " " + user.lastName}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{!user.company ? "" : <Link to={"/auth/companies/" + user.company.id} className="text-limeyfy-600">{user.company.name}</Link>}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button onClick={() => handleInspectUser(user.id)} className="text-limeyfy-600 hover:text-limeyfy-900">
                                                        Inspect<span className="sr-only">, {user.userName}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
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
                                                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-stone-100"> Edit {selectedUser?.userName} </Dialog.Title>
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
                                                    {roleData && <fieldset>
                                                        {(user.id !== selectedUser?.id) ?
                                                            <>
                                                                <legend className="text-lg font-medium text-gray-900 dark:text-gray-100">Roles</legend>
                                                                <div className="mt-4 border-t border-b border-gray-200 dark:border-stone-700 divide-y divide-gray-200 dark:divide-stone-700">
                                                                    {roleData.data.map((role: string, roleIdx: number) => (
                                                                        <div key={roleIdx} className="relative flex items-start py-4">
                                                                            <div className="min-w-0 flex-1 text-sm">
                                                                                <label htmlFor={`role-${role}`} className="font-medium text-gray-700 dark:text-gray-300 select-none">
                                                                                    {formatPascalAndSpace(role)}
                                                                                </label>
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => selectedUser?.roles.includes(role) ? removeRole(role) : addRole(role)}
                                                                                className={classNames(
                                                                                    "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
                                                                                    !selectedUser?.roles.includes(role) ? "bg-limeyfy-600 hover:bg-limeyfy-700 focus:ring-limeyfy-500" : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                                                                )}
                                                                            >
                                                                                {selectedUser?.roles.includes(role) ? "Remove" : "Add"}
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </> : <div>
                                                                <p className="text-sm mt-2 mb-2 text-gray-600 dark:text-gray-400">
                                                                    Cant change your own roles
                                                                </p>
                                                                <p className="text-sm mt-2 mb-5 text-gray-600 dark:text-gray-400">Your roles: {selectedUser.roles.join(", ")}</p>
                                                            </div>}
                                                    </fieldset>}
                                                </div>
                                            </div>
                                            <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                                {/* <button
                                                    type="button"
                                                    className="rounded-md border border-gray-300 dark:border-stone-600 bg-white dark:bg-stone-900 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-limeyfy-500 focus:ring-offset-2"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cancel
                                                </button> */}
                                                <Link
                                                    to={"/auth/users/" + selectedUser?.id}
                                                    className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-limeyfy-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-limeyfy-500 focus:ring-offset-2"
                                                >
                                                    Edit user
                                                </Link>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default Users;