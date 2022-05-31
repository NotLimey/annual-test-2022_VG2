import { Disclosure } from '@headlessui/react'
import {
    BellIcon,
    CogIcon, KeyIcon, UserCircleIcon
} from '@heroicons/react/outline'
import { useNavigate, useSearch } from '@tanstack/react-location'
import { useEffect, useState } from 'react'
import ProfileHome from './ProfileHome'
import ProfileSettings from './ProfileSettings'
import ProfileUpdatePassword from './ProfileUpdatePassword'

const subNavigation = [
    { name: 'Profile', to: "home", icon: UserCircleIcon, component: <ProfileHome /> },
    { name: 'Settings', to: "settings", icon: CogIcon, component: <ProfileSettings /> },
    { name: 'Password', to: "password", icon: KeyIcon, component: <ProfileUpdatePassword /> },
    { name: 'Notifications', to: "notifications", icon: BellIcon, component: <p>Nothing to se here</p> },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Profile() {
    const [activePage, setActivePage] = useState(0);
    const search = useSearch();
    const navigate = useNavigate();

    useEffect(() => {
        const page = (search["page"] as string);
        if (!page) return;
        const idx = subNavigation.findIndex(x => x.to === page?.toString());
        if (idx >= 0) setActivePage(idx);
    }, [search])

    return (
        <div className='dark:bg-stone-900 min-h-screen'>
            <Disclosure as="div" className="relative bg-limeyfy-700 pb-32 overflow-hidden">
                {({ open }) => (
                    <>
                        <div
                            aria-hidden="true"
                            className={classNames(
                                open ? 'bottom-0' : 'inset-y-0',
                                'absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0'
                            )}
                        >
                            <div className="absolute inset-0 flex">
                                <div className="h-full w-1/2" style={{ backgroundColor: '#5cb85c' }} />
                                <div className="h-full w-1/2" style={{ backgroundColor: '#7dc67d' }} />
                            </div>
                            <div className="relative flex justify-center">
                                <svg
                                    className="flex-shrink-0"
                                    width={1750}
                                    height={308}
                                    viewBox="0 0 1750 308"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#7dc67d" />
                                    <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#7dc67d" />
                                    <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#5cb85c" />
                                    <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#5cb85c" />
                                </svg>
                            </div>
                        </div>
                        <header className="relative py-10">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <button onClick={() => navigate({
                                    to: "/"
                                })} className="text-xl font-bold text-white dark:text-stone-900 flex items-center">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.25 6.75L4.75 12L10.25 17.25" />
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 12H5" />
                                    </svg>
                                    Home
                                </button>
                                <h1 className="text-3xl font-bold text-white dark:text-stone-900 mt-2">Settings</h1>
                            </div>
                        </header>
                    </>
                )}
            </Disclosure>

            <main className="relative -mt-32">
                <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                    <div className="bg-white dark:bg-stone-900 rounded-lg shadow dark:shadow-stone-700 dark:shadow-sm overflow-hidden">
                        <div className="divide-y divide-gray-200 dark:divide-stone-700 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                            <aside className="py-6 lg:col-span-3">
                                <nav className="space-y-1">
                                    {subNavigation.map((item, idx) => (
                                        <button
                                            onClick={() => navigate({
                                                search: () => ({
                                                    page: item.to
                                                })
                                            })}
                                            key={item.name}
                                            className={classNames(
                                                idx === activePage
                                                    ? 'bg-limeyfy-50 dark:bg-limeyfy-600 dark:bg-opacity-20 border-limeyfy-600 text-limeyfy-800 dark:text-limeyfy-500 hover:bg-limeyfy-100 bg-opacity-50 dark:hover:bg-opacity-25 hover:bg-opacity-50 hover:text-limeyfy-900 dark:hover:text-limeyfy-400'
                                                    : 'border-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-stone-800 hover:text-gray-900',
                                                'group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full'
                                            )}
                                            aria-current={idx === activePage ? 'page' : undefined}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    idx === activePage
                                                        ? 'text-limeyfy-800 group-hover:text-limeyfy-700 dark:text-limeyfy-500 dark:group-hover:text-limeyfy-400'
                                                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400',
                                                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            <span className="truncate">{item.name}</span>
                                        </button>
                                    ))}
                                </nav>
                            </aside>
                            {subNavigation[activePage].component}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}