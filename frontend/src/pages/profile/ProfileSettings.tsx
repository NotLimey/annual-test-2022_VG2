import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import { firstLetterUppercase } from "../../scripts/text";

const ProfileSettings = () => {
    const theme = useTheme();
    const [account, setAccount] = useState<string | null>(null)

    const connectMetaMask = async () => {
        const ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts)
            setAccount(accounts[0])
    }

    return (
        <div className="py-6 px-4 sm:p-6 lg:pb-8 dark:text-gray-100">
            <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Settings</h2>
            </div>
            <div className="flex justify-between gap-x-4 mt-5">
                <div>
                    <label className="text-base font-medium text-gray-900 dark:text-gray-100">Theme</label>
                    <fieldset className="mt-4">
                        <legend className="sr-only">Notification method</legend>
                        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                            {theme.themes.map((t, idx) => (
                                <div key={idx} className="flex items-center">
                                    <input
                                        id={t}
                                        name="notification-method"
                                        type="radio"
                                        checked={theme.theme === t}
                                        className="focus:ring-limeyfy-500 h-4 w-4 text-limeyfy-600 border-gray-300 dark:border-stone-700 dark:bg-stone-800"
                                        onChange={() => theme.toggleTheme(t as any)}
                                    />
                                    <label htmlFor={t} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {firstLetterUppercase(t)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>
            </div>
            <button onClick={connectMetaMask} className="mt-5 whitespace-nowrap bg-orange-400 text-black px-4 py-2 flex items-center rounded-md font-semibold shadow-sm">
                {account ? `Connected to: ${account}` : "Connect to metamask"}
            </button>
        </div>
    );
}

export default ProfileSettings;