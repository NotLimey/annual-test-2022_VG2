
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { smile } from "../../emojies";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";
import { getIdenticon } from "../../scripts/avatar";

interface UpdateUserDto {
    firstName: string;
    lastName: string;
}

const ProfileHome = () => {
    const { user, refetch } = useAuth();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const queryClient = useQueryClient();
    const { emojiToast, errorToast } = useToast();

    const updateUser = async (dto: UpdateUserDto) => await axios("/users", {
        method: "PUT",
        data: {
            firstName: dto.firstName,
            lastName: dto.lastName
        }
    });

    const { mutate, isLoading } = useMutation(updateUser, {
        onSuccess: (data) => {
            emojiToast("Updated your user", smile);
            refetch();
        },
        onError: (err: any) => {
            let errors = err?.response?.data?.errors || {};
            if (errors) {
                errors = Object.values(errors);
            }
            console.log(errors)
            if (errors.length > 0) {
                errors.forEach((error: string[]) => {
                    errorToast(`${error[1]}`)
                });
                return;
            }
            errorToast(`${err.request.status}: There was an error`)
        },
        onSettled: () => {
            queryClient.invalidateQueries("create");
        },
    });

    const handleSaveChanges = async () => {
        mutate({
            firstName,
            lastName
        })
    }

    return (
        <form className="divide-y divide-gray-200 dark:divide-stone-700 lg:col-span-9" action="#" method="POST">
            {/* Profile section */}
            <div className="py-6 px-4 sm:p-6 lg:pb-8">
                <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Profile</h2>
                </div>

                <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="flex-grow space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Username
                            </label>
                            <div className="mt-1 rounded-md shadow-sm flex-auto">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    disabled
                                    autoComplete="username"
                                    className="focus:ring-limeyfy-500 focus:border-limeyfy-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-100 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-400"
                                    defaultValue={user.userName}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <div className="mt-1 rounded-md shadow-sm flex">
                                <input
                                    disabled
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    className="focus:ring-limeyfy-500 focus:border-limeyfy-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-100 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-400"
                                    defaultValue={user.email}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                        <div className="mt-1 lg:hidden">
                            <div className="flex items-center">
                                <div
                                    className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                    aria-hidden="true"
                                >
                                    <img className="rounded-full h-full w-full bg-gray-100 dark:bg-stone-800" src={getIdenticon(user.userName)} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="hidden relative rounded-full overflow-hidden lg:block">
                            <img className="relative rounded-full w-40 h-40 bg-gray-100 dark:bg-stone-800" src={getIdenticon(user.userName)} alt="" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            First name
                        </label>
                        <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            autoComplete="given-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-limeyfy-500 focus:border-limeyfy-500 sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-gray-200"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last name
                        </label>
                        <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            autoComplete="family-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-limeyfy-500 focus:border-limeyfy-500 sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-gray-200"
                        />
                    </div>
                </div>
            </div>

            {/* Privacy section */}
            <div className="pt-6">
                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    <button
                        type="button"
                        className="bg-white border border-gray-300 dark:border-stone-700 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500 dark:bg-stone-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSaveChanges()}
                        disabled={isLoading}
                        className="ml-5 bg-limeyfy-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-limeyfy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                    >
                        {isLoading ? "Loading..." : "Save"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProfileHome;