import { smile } from "@/emojies";
import useToast from "@/hooks/useToast";
import copyTextToClipboard from "@/scripts/copyToClipboard";
import { formatPascalAndSpace } from "@/scripts/text";
import { DuplicateIcon } from "@heroicons/react/outline";
import { Link } from "@tanstack/react-location";
import { useState } from "react";

interface DescriptionListProps {
    object: any;
    title?: string;
    ignoreValues?: string[];
    customFormatting?: DescriptionListCustomField[];
    editPath?: string;
}

interface DescriptionListCustomField {
    name: string;
    func: (value: any) => string | React.ReactNode;
}

const DescriptionList = ({ object, title, ignoreValues, customFormatting, editPath }: DescriptionListProps) => {
    const [showFullValue, setShowFullValue] = useState<string[]>()

    const { errorToast, emojiToast } = useToast();

    const copyToClipboard = async (text: string, name: string) => {
        const successful = await copyTextToClipboard(text);
        if (successful) {
            emojiToast(`Copied '${formatPascalAndSpace(name)}' to clipboard`, smile);
            return;
        }
        errorToast(`Could'nt copy ${formatPascalAndSpace(name)} to clipboard`)
    }

    return (
        <div className="bg-white dark:bg-stone-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{title ?? "Applicant Information"}</h3>
                    {/* <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and application.</p> */}
                </div>
                {editPath && (
                    <Link
                        to={editPath}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                    >
                        Edit {title}
                    </Link>
                )}
            </div>
            <div className="border-t border-gray-200 dark:border-stone-700 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-5">
                    {Object.entries(object).map((value, idx) => {
                        if (ignoreValues?.includes(value[0])) return null;

                        const _customFormatting = customFormatting?.find(x => x.name === value[0]);

                        if (_customFormatting) return (
                            <div key={idx} className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex">{formatPascalAndSpace(value[0])}  <DuplicateIcon onClick={() => copyToClipboard((value[1] as string), value[0])} className="h-4 w-4 ml-1 cursor-pointer" /></dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{_customFormatting.func(value[1])}</dd>
                            </div>
                        )
                        const objectValueAsString = (value[1] as string);
                        if (objectValueAsString) {
                            const objectValueAsStringLength = objectValueAsString.length;

                            if (objectValueAsStringLength > 80) return (
                                <div key={idx} className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex">{formatPascalAndSpace(value[0])}  <DuplicateIcon onClick={() => copyToClipboard((value[1] as string), value[0])} className="h-4 w-4 ml-1 cursor-pointer" /></dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                        {showFullValue?.includes(value[0]) ? (
                                            <span>{objectValueAsString}</span>
                                        ) : (
                                            <>
                                                {objectValueAsString.substring(0, 500)}{objectValueAsStringLength > 500 && <span>... <span className="text-limeyfy-600 cursor-pointer" onClick={() => setShowFullValue([...showFullValue ?? [], value[0]])}>See more</span></span>}
                                            </>
                                        )}
                                    </dd>
                                </div>
                            )
                        }

                        return (
                            <div key={idx} className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex">{formatPascalAndSpace(value[0])}  <DuplicateIcon onClick={() => copyToClipboard((value[1] as string), value[0])} className="h-4 w-4 ml-1 cursor-pointer" /></dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{(value[1] as any)}</dd>
                            </div>
                        )
                    })}
                </dl>
            </div >
        </div >
    );
}

export default DescriptionList;