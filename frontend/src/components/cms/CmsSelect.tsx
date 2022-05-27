import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { classNames } from "../../scripts/tailwind";
import { formatPascalAndSpace } from "../../scripts/text";
import { ICmsProp, ICmsSelectOptions } from "./CmsTypes";

interface ICmsSelect {
    options: ICmsSelectOptions;
    prop: ICmsProp;
    onChange: (data: any) => void;
}

const CmsSelect = (props: ICmsSelect) => {
    const { data, defaultValue, selectIdentifier, onSet } = props.options;
    const [selected, setSelected] = useState(defaultValue(data))

    const handleSetSelected = (onChange: React.Dispatch<any>) => {
        setSelected(onChange);
        if (!onSet) {
            props.onChange(onChange);
            return;
        }
        props.onChange(onSet(onChange));
        return;
    }

    return (
        <div className="mb-5">
            <Listbox value={selected} onChange={handleSetSelected} >
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-100">{props.prop.title ?? formatPascalAndSpace(props.prop.name)}</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 dark:bg-stone-800 dark:border-stone-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-limeyfy-500 focus:border-limeyfy-500 sm:text-sm">
                                <span className="block truncate">{selected.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-stone-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black dark:ring-stone-700 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {data.map((item, idx) => (
                                        <Listbox.Option
                                            key={idx}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-limeyfy-600' : 'text-gray-900 dark:text-gray-200',
                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                )
                                            }
                                            value={item}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {item[selectIdentifier]}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-limeyfy-600',
                                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}

export default CmsSelect;