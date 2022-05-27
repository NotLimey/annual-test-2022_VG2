import * as HeroIcon from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { classNames } from "../../scripts/tailwind";

interface IStackedList {
    data: any[];
    title?: (data: any) => string;
    titleAttribute?: string;
    date?: (id: string) => React.ReactNode;
    dateIcon?: string;
    badge?: (idx: number) => {
        text: string;
        color: "red" | "green"
    };
    typeAttribute?: string;
    typeIcon?: string;
    path?: (id: string) => string;
    identifier?: string;
}

const DynamicIcon = ({ name, className }: { name?: string, className: string }) => {
    const IconComponent = (HeroIcon as any)[name ?? ""];

    if (!IconComponent) { // Return a default one
        return <HeroIcon.ClockIcon className={className} />;
    }

    return <IconComponent className={className} />;
}

const StackedList = (props: IStackedList) => {
    const {
        data,
        badge,
        titleAttribute,
        typeAttribute,
        typeIcon,
        path,
        identifier
    } = props;

    return (
        <ul role="list" className="divide-y divide-gray-200 dark:divide-stone-700">
            {data.map((item, idx) => (
                <li key={idx}>
                    <Link to={path ? path(item[identifier ?? "id"]) : "/"} className="block hover:bg-gray-50 dark:hover:bg-stone-800">
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-limeyfy-600 truncate">{props.title ? props.title(item) : item[titleAttribute ?? "title"]}</p>
                                {badge && <ShowBadge badge={badge(idx)} />}
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <DynamicIcon name={typeIcon} className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                                        {item[typeAttribute ?? "type"]}
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                    <DynamicIcon name={props.dateIcon} className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                                    {props.date && props.date(item[identifier ?? "id"])}
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

const ShowBadge = ({ badge }: {
    badge: {
        text: string;
        color: "red" | "green"
    }
}) => {

    const val = badge;

    return (
        <div className="ml-2 flex-shrink-0 flex">
            <p className={classNames(val.color === "red" ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-500 dark:bg-opacity-20 text-red-800 dark:text-red-500" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-500 dark:bg-opacity-20 text-green-800 dark:text-green-500")}>
                {val.text}
            </p>
        </div>
    )
}

export default StackedList;