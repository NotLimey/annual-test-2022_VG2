import { useNavigate } from "@tanstack/react-location";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Logo from "../../assets/Logo_ikon.svg";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";

interface LoginDto {
    userName: string;
    password: string;
    rememberMe: boolean;
}

const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false);

    const { errorToast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const login = async (data: LoginDto) =>
        await axios(
            `/auth/login`,
            {
                method: "POST",
                data: data,
            }
        );

    const { mutate, isLoading } = useMutation(login, {
        onSuccess: (data) => {
            const token = data.data.token;
            if (token) {
                window.localStorage.setItem("token", JSON.stringify(token));
                window.location.href = "/";
            } else {
                errorToast("Couldn't store token")
                return;
            }
        },
        onError: (err: any) => {
            const status = err?.response?.status;
            if (status && status === 400) {
                errorToast("Username or password is incorrect");
                return;
            }
            if (err.request.status === 0) {
                errorToast(`Can't connect to api. Check your internet connection`)
                return;
            }
            errorToast(`${err.request.status}: There was an error`)
        },
        onSettled: () => {
            queryClient.invalidateQueries("create");
        },
    });

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({
            userName,
            password,
            rememberMe
        });
    };

    if (user?.id?.length > 0) {
        window.location.href = "/";
    }

    return (
        <div className="dark:bg-stone-800 min-h-screen">
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src={Logo}
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">Sign in to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-stone-900">
                        <form className="space-y-6" onSubmit={handleOnSubmit}>
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        autoComplete="userName"
                                        required
                                        onChange={e => setUserName(e.target.value)}
                                        value={userName}
                                        className="appearance-none block w-full px-3 py-2 border dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:text-gray-300 focus:outline-none focus:ring-limeyfy-500 focus:border-limeyfy-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        className="appearance-none block w-full px-3 py-2 border dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:text-gray-300 focus:outline-none focus:ring-limeyfy-500 focus:border-limeyfy-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        onChange={e => setRememberMe(e.target.checked)}
                                        checked={rememberMe}
                                        className="h-4 w-4 text-limeyfy-600 focus:ring-limeyfy-500 border-gray-300 dark:border-stone-700 rounded dark:bg-stone-800"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-limeyfy-600 hover:text-limeyfy-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;