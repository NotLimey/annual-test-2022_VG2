import { Link } from "@tanstack/react-location";

interface IPageHeading {
    children: React.ReactNode;
    publishText?: string;
    publishPath?: string;
    noPublicBtn?: boolean;
}

const PageHeading = (props: IPageHeading) => {
    return (
        <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-gray-100 sm:text-2xl sm:truncate">{props.children}</h2>
            </div>
            {!props.noPublicBtn && <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link
                    to={props.publishPath ?? "/"}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                >
                    {props.publishText ?? "public"}
                </Link>
            </div>}
        </div>
    );
}

export default PageHeading;