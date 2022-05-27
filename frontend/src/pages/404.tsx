import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="max-w-max mx-auto sm:mt-10">
            <main className="sm:flex">
                <p className="text-4xl font-extrabold text-limeyfy-600 sm:text-5xl">404</p>
                <div className="sm:ml-6">
                    <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">Page not found</h1>
                        <p className="mt-1 text-base text-gray-500 dark:text-gray-400">Please check the URL in the address bar and try again.</p>
                    </div>
                    <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NotFound;