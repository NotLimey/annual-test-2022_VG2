import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { smile } from "../../emojies";
import useToast from "../../hooks/useToast";

interface UpdatePasswordDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ProfileUpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const queryClient = useQueryClient();
    const { emojiToast, errorToast } = useToast();

    const updatePassword = async (dto: UpdatePasswordDto) => await axios("/auth/change-password", {
        method: "PUT",
        data: {
            oldPassword: dto.oldPassword,
            newPassword: dto.newPassword,
            confirmPassword: dto.confirmPassword
        }
    });

    const { mutate, isLoading } = useMutation(updatePassword, {
        onSuccess: (data) => {
            emojiToast("Updated your password", smile);
            setConfirmPassword("")
            setNewPassword("")
            setOldPassword("")
        },
        onError: (err: any) => {
            let errors = err?.response?.data?.errors || {};
            if (errors) {
                errors = Object.values(errors);
            }
            console.log(errors)
            if (errors.length > 0) {
                errors.forEach((error: string[]) => {
                    errorToast(`${error[0]}`)
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
        if (newPassword !== confirmPassword) {
            errorToast("Passwords do not match")
            return
        }

        if (newPassword.length < 8) {
            errorToast("Password must be at least 8 characters")
            return
        }

        mutate({
            oldPassword,
            newPassword,
            confirmPassword
        })
    }

    return (
        <form className="divide-y divide-gray-200 dark:divide-stone-700 lg:col-span-9" action="#" method="POST">
            {/* Profile section */}
            <div className="py-6 px-4 sm:p-6 lg:pb-8 md:ml-10">
                <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Update your password</h2>
                </div>

                <div className="mt-6 flex flex-col w-full">
                    <div className="w-full md:w-1/2 mb-5">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Old Password
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                autoComplete="oldPassword"
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="focus:ring-limeyfy-500 focus:border-limeyfy-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-100 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-400"
                                value={oldPassword}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mb-5">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Password
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                autoComplete="newPassword"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="focus:ring-limeyfy-500 focus:border-limeyfy-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-100 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-400"
                                value={newPassword}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mb-5">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="focus:ring-limeyfy-500 focus:border-limeyfy-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 bg-gray-100 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-400"
                                value={confirmPassword}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="w-full md:w-1/2 mb-5 bg-limeyfy-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-limeyfy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                        onClick={handleSaveChanges}
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating password.." : "Update Password"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProfileUpdatePassword;