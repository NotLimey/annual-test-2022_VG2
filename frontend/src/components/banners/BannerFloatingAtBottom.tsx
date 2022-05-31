import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

interface IBannerFloatingAtBottom {
    icon?: React.ReactNode;
    text: string;
    button: {
        text: string;
        action: () => void;
    }
}

const BannerFloatingAtBottom = (props: IBannerFloatingAtBottom) => {
    return (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-10">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="p-2 rounded-lg bg-limeyfy-600 shadow-lg sm:p-3">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <span className="flex p-2 rounded-lg bg-limeyfy-800">
                                {props.icon ?? <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />}
                            </span>
                            <p className="ml-3 font-medium text-white truncate">
                                <span className="hidden md:inline">{props.text}</span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <button
                                onClick={props.button.action}
                                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-limeyfy-600 bg-white hover:bg-limeyfy-50 dark:bg-stone-900 dark:font-semibold dark:hover:bg-stone-800"
                            >
                                {props.button.text}
                            </button>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                            <button
                                type="button"
                                className="-mr-1 flex p-2 rounded-md hover:bg-limeyfy-500 focus:outline-none focus:ring-2 focus:ring-white "
                            >
                                <span className="sr-only">Dismiss</span>
                                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BannerFloatingAtBottom;