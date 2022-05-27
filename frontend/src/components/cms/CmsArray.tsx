import { PlusSmIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { classNames } from "../../scripts/tailwind";
import { formatPascalAndSpace } from "../../scripts/text";
import CmsObjectActionPanel from "../action-panels/CmsObjectActionPanel";
import { ICmsField, ICmsProp } from "./CmsTypes";

interface ICmsArray {
    prop: ICmsProp;
    onAddToArray: (obj: any) => void;
    onEditItem: (obj: any, idx: number) => void;
}

const CmsArray = ({ prop, onAddToArray, onEditItem }: ICmsArray) => {
    const [isPanelActive, togglePanel] = useState(false);
    const [edit, setEdit] = useState<ICmsField[]>([]);
    const [editIdx, setEditIdx] = useState(0);

    if (!prop.fields)
        throw Error(
            `Tried to render an array without setting fields. At least one field must be passed in property '${prop.name}'.`
        );

    const handleAddItemToArray = (obj: any) => {
        onAddToArray(obj);
        togglePanel(false);
    };

    const handleEdit = (prop: ICmsProp, idx: number) => {
        let fields: ICmsField[] = prop.fields || [];
        fields.forEach((val) => {
            val.value = prop.value[idx][val.name];
        });

        setEditIdx(idx);
        setEdit(fields);
        togglePanel(true);
    };

    const handleOnEditItem = (obj: any) => {
        onEditItem(obj, editIdx);
        togglePanel(false);
        setEdit([]);
        setEditIdx(0);
    };

    const handleClose = () => {
        togglePanel(false);
        setEdit([]);
        setEditIdx(0);
    };

    return (
        <>
            {isPanelActive && edit.length <= 0 && (
                <CmsObjectActionPanel
                    fields={prop.fields}
                    close={handleClose}
                    onSubmit={handleAddItemToArray}
                    title={formatPascalAndSpace(prop.name)}
                />
            )}
            {edit.length > 0 && isPanelActive && (
                <CmsObjectActionPanel
                    edit
                    fields={edit}
                    close={handleClose}
                    onSubmit={handleAddItemToArray}
                    onEdit={handleOnEditItem}
                    title={formatPascalAndSpace(prop.name)}
                />
            )}
            <div className="mb-5">
                <p>{prop.title ?? formatPascalAndSpace(prop.name)}</p>
                {prop.value.length > 0 && (
                    <div className="w-full dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-sm mb-3">
                        {prop.value.map((val: any, idx: number) => (
                            <div
                                key={idx}
                                onClick={() => handleEdit(prop, idx)}
                                className={classNames(
                                    "hover:bg-gray-100 dark:hover:bg-stone-700 py-2 px-5 cursor-pointer",
                                    idx !== 0
                                        ? ""
                                        : "border-b border-b-gray-300 dark:border-b-stone-700"
                                )}
                            >
                                <>
                                    {formatPascalAndSpace(Object.keys(val)[0])}:{" "}
                                    {Object.values(val)[0]}
                                </>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => togglePanel(true)}
                    type="button"
                    className="w-full py-2 px-5 dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md text-center hover:bg-gray-100 dark:hover:bg-stone-700"
                >
                    <span className="flex w-full justify-center items-center gap-1">
                        Add item <PlusSmIcon className="h-5 w-5" />
                    </span>
                </button>
            </div>
        </>
    );
};

export default CmsArray;
