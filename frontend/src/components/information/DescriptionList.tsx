import { formatPascalAndSpace } from "@/scripts/text";
import { DuplicateIcon, PaperClipIcon } from "@heroicons/react/outline";

interface DescriptionListProps {
    object?: any;
    title?: string;
    ignoreValues?: string[];
    customFormatting?: DescriptionListCustomField[];
}

interface DescriptionListCustomField {
    name: string;
    func: (value: any) => string | React.ReactNode;
}

const DescriptionList = ({ object, title, ignoreValues, customFormatting }: DescriptionListProps) => {
    return (
        <div className="bg-white dark:bg-stone-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{title ?? "Applicant Information"}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and application.</p>
            </div>
            <div className="border-t border-gray-200 dark:border-stone-700 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {Object.entries(object).map((value, idx) => {
                        if (ignoreValues?.includes(value[0])) return <></>

                        const _customFormatting = customFormatting?.find(x => x.name === value[0]);

                        if (_customFormatting) return (
                            <div key={idx} className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex">{formatPascalAndSpace(value[0])}  <DuplicateIcon className="h-4 w-4 ml-1 cursor-pointer" /></dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{_customFormatting.func(value[1])}</dd>
                            </div>
                        )

                        return (
                            <div key={idx} className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex">{formatPascalAndSpace(value[0])}  <DuplicateIcon className="h-4 w-4 ml-1 cursor-pointer" /></dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{(value[1] as any)}</dd>
                            </div>
                        )
                    })}
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">About</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                            qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                            pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default DescriptionList;