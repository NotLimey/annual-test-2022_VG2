import { RadioGroup, Switch } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import useTheme, { themes } from "../../hooks/useTheme";
import { classNames } from "../../scripts/tailwind";
import { firstLetterUppercase } from "../../scripts/text";


const mailingLists = [
    { id: 1, title: 'Newsletter', description: 'Last message sent an hour ago', users: '621 users' },
    { id: 2, title: 'Existing Customers', description: 'Last message sent 2 weeks ago', users: '1200 users' },
    { id: 3, title: 'Trial Users', description: 'Last message sent 4 days ago', users: '2740 users' },
]

const ProfileSettings = () => {
    const theme = useTheme();
    const [account, setAccount] = useState<string | null>(null)
    const [sensitiveDataMode, setSensitiveDataMode] = useState(false)
    const [selectedMailingLists, setSelectedMailingLists] = useState(mailingLists[0])

    const connectMetaMask = async () => {
        const ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts)
            setAccount(accounts[0])
    }

    return (
        <div className="divide-y divide-gray-200 dark:divide-stone-700 lg:col-span-9">
            <div className="py-6 px-4 sm:p-6 lg:pb-8" >
                <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Settings</h2>
                </div>
                <div className="mt-6 flex flex-col w-full">
                    <div className="mb-5">
                        <RadioGroup value={theme.theme} onChange={(t: themes) => theme.toggleTheme(t)}>
                            <RadioGroup.Label className="text-base font-medium text-gray-900 dark:text-gray-100">Themes</RadioGroup.Label>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                {theme.themes.map((themeVal, idx) => (
                                    <RadioGroup.Option
                                        key={idx}
                                        value={themeVal}
                                        className={({ checked, active }) =>
                                            classNames(
                                                themeVal === "dark" ? 'bg-black' :
                                                    themeVal === "light" ? "bg-white" : "bg-white bg-gradient-to-r from-black ",
                                                checked ? 'border-transparent' : 'border-gray-300',
                                                active ? 'border-limeyfy-500 ring-2 ring-limeyfy-500' : '',
                                                'relative border rounded-lg dark:border-black shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                            )
                                        }
                                    >
                                        {({ checked, active }) => (
                                            <>
                                                <span className="flex-1 flex">
                                                    <span className="flex flex-col">
                                                        <RadioGroup.Label as="span" className="block text-sm font-bold text-limeyfy-600 ">
                                                            {firstLetterUppercase(themeVal)}
                                                        </RadioGroup.Label>
                                                    </span>
                                                </span>
                                                <CheckCircleIcon
                                                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-limeyfy-600')}
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className={classNames(
                                                        active ? 'border' : 'border-2',
                                                        checked ? 'border-limeyfy-500' : 'border-transparent',
                                                        'absolute -inset-px rounded-lg pointer-events-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="mb-5">
                        <Switch.Group as="div" className="flex items-center justify-between w-full">
                            <span className="flex-grow flex flex-col">
                                <Switch.Label as="span" className="text-sm font-medium text-gray-900 dark:text-gray-100" passive>
                                    Sensitive data mode
                                </Switch.Label>
                                <Switch.Description as="span" className="text-sm text-gray-500">
                                    Sensitive data mode hides sensitive data like revenue and financial information.
                                </Switch.Description>
                            </span>
                            <Switch
                                checked={sensitiveDataMode}
                                onChange={setSensitiveDataMode}
                                className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none"
                            >
                                <span className="sr-only">Use sensitive data mode</span>
                                <span aria-hidden="true" className="pointer-events-none absolute bg-white dark:bg-stone-900 w-full h-full rounded-md" />
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        sensitiveDataMode ? 'bg-limeyfy-600' : 'bg-gray-200 dark:bg-stone-800',
                                        'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
                                    )}
                                />
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        sensitiveDataMode ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white dark:bg-stone-900 dark:border-stone-700 shadow transform ring-0 transition-transform ease-in-out duration-200'
                                    )}
                                />
                            </Switch>
                        </Switch.Group>
                    </div>
                </div>
            </div>
        </div >
    )

    // return (
    //     <div className="py-6 px-4 sm:p-6 lg:pb-8 dark:text-gray-100 max-w-fit w-screen md:max-w-3xl">
    //         <div>
    //             <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Settings</h2>
    //         </div>
    //         <div className="flex flex-col justify-between gap-x-4 mt-5 w-full">
    //             <div>
    //                 <label className="text-base font-medium text-gray-900 dark:text-gray-100">Theme</label>
    //                 <fieldset className="mt-4">
    //                     <legend className="sr-only">Theme</legend>
    //                     <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
    //                         {theme.themes.map((t, idx) => (
    //                             <div key={idx} className="flex items-center">
    //                                 <input
    //                                     id={t}
    //                                     name="notification-method"
    //                                     type="radio"
    //                                     checked={theme.theme === t}
    //                                     className="focus:ring-limeyfy-500 h-4 w-4 text-limeyfy-600 border-gray-300 dark:border-stone-700 dark:bg-stone-800"
    //                                     onChange={() => theme.toggleTheme(t as any)}
    //                                 />
    //                                 <label htmlFor={t} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
    //                                     {firstLetterUppercase(t)}
    //                                 </label>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </fieldset>
    //             </div>
    //             <Switch.Group as="div" className="flex items-center justify-between w-full">
    //                 <span className="flex-grow flex flex-col">
    //                     <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
    //                         Available to hire
    //                     </Switch.Label>
    //                     <Switch.Description as="span" className="text-sm text-gray-500">
    //                         Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
    //                     </Switch.Description>
    //                 </span>
    //                 <Switch
    //                     checked={sensitiveDataMode}
    //                     onChange={setSensitiveDataMode}
    //                     className={classNames(
    //                         sensitiveDataMode ? 'bg-limeyfy-600' : 'bg-gray-200',
    //                         'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500'
    //                     )}
    //                 >
    //                     <span
    //                         aria-hidden="true"
    //                         className={classNames(
    //                             sensitiveDataMode ? 'translate-x-5' : 'translate-x-0',
    //                             'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
    //                         )}
    //                     />
    //                 </Switch>
    //             </Switch.Group>
    //         </div>
    //         <button onClick={connectMetaMask} className="mt-5 whitespace-nowrap bg-orange-400 text-black px-4 py-2 flex items-center rounded-md font-semibold shadow-sm">
    //             {account ? `Connected to: ${account}` : "Connect to metamask"}
    //         </button>
    //     </div>
    // );
}

export default ProfileSettings;