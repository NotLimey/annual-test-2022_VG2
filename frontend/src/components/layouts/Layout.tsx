import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    BellIcon, ClockIcon, CurrencyDollarIcon, DocumentTextIcon,
    FingerPrintIcon,
    FolderIcon,
    HomeIcon, MenuAlt2Icon,
    OfficeBuildingIcon, TruckIcon,
    UsersIcon,
    XIcon
} from '@heroicons/react/outline'
import React, { Fragment, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from "../../assets/Logo.svg"
import LogoDark from "../../assets/LogoWhiteTextFull.svg"
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
import { getIdenticon } from '../../scripts/avatar'
import signOut from '../../scripts/signOut'
import { classNames } from '../../scripts/tailwind'
import BackBtn from '../buttons/BackBtn'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Projects', href: '/limeyfy/projects', icon: FolderIcon, roles: ["limeyfy", "admin"] },
    { name: "Invoices", href: '/limeyfy/invoices', icon: DocumentTextIcon, roles: ["finance", "admin"] },
    { name: "Expenses", href: '/limeyfy/expenses', icon: CurrencyDollarIcon, roles: ["finance", "admin"] },
    { name: "Hours", href: '/limeyfy/hours', icon: ClockIcon, roles: ["limeyfy", "admin"] },
    { name: "Users", href: '/auth/users', icon: UsersIcon, roles: ["admin"] },
    { name: "Roles", href: '/auth/roles', icon: FingerPrintIcon, roles: ["admin"] },
    { name: "Companies", href: '/auth/companies', icon: OfficeBuildingIcon, roles: ["admin"] },
    { name: "Uno Marine", href: '/uno-marine', icon: TruckIcon },
]
const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/profile?page=settings' },
    { name: 'Sign out', func: () => signOut() },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const { isSystemDarkTheme, theme } = useTheme();
    const { user, roles: userRoles } = useAuth();
    const location = useLocation();

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex z-40">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-100 dark:bg-stone-900">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-stone-900"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XIcon className="h-6 w-6 text-white dark:text-stone-900" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src={theme === "dark" ? LogoDark : (theme === "system" && isSystemDarkTheme) ? LogoDark : Logo}
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                        <nav className="px-2 space-y-1">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        item.href === location.pathname
                                                            ? 'bg-gray-100 text-gray-900 dark:bg-stone-800 dark:text-gray-200'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 hover:dark:bg-stone-800 hover:dark:bg-opacity-70',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.href === location.pathname ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400',
                                                            'mr-4 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="flex-shrink-0 w-14" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-stone-700 pt-5 bg-gray-100 dark:bg-stone-900 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                className="h-8 w-auto"
                                src={theme === "dark" ? LogoDark : (theme === "system" && isSystemDarkTheme) ? LogoDark : Logo}
                                alt="Workflow"
                            />
                        </div>
                        <div className="mt-5 flex-grow flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                {navigation.map((item) => (!item.roles || userRoles.some(x => item.roles?.includes(x))) && (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.href === location.pathname ? 'bg-gray-100 text-gray-900 dark:bg-stone-800 dark:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 hover:dark:bg-stone-800 hover:dark:bg-opacity-70',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.href === location.pathname ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1 min-h-screen">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-gray-100 dark:bg-stone-900 dark:border-b dark:border-b-stone-700 shadow">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 dark:border-stone-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-limeyfy-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between">
                            <div className="flex-1 flex">
                                {location.pathname.length > 1 && <BackBtn />}
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="bg-gray-100 dark:bg-stone-900 p-1 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="max-w-xs bg-gray-100 dark:bg-stone-900 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={getIdenticon(user.userName)}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-100 dark:bg-stone-900 ring-1 ring-black dark:ring-stone-700 ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => item.func ? <button
                                                        onClick={item.func}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 dark:bg-stone-800' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 w-full text-left focus:outline-none '
                                                        )}
                                                    >
                                                        {item.name}
                                                    </button> : (
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 dark:bg-stone-800' : '',
                                                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 dark:bg-stone-900 dark:text-white min-h-full">
                        <div className="py-6 min-h-full">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout;