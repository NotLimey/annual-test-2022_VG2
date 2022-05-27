import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import CmsObject from "../cms/CmsObject";
import { ICmsField } from "../cms/CmsTypes";

interface ICmsObjectActionPanel {
    close: () => void;
    fields: ICmsField[];
    onSubmit: (obj: any) => void;
    onEdit?: (obj: any) => void;
    edit?: boolean;
    title: string;
}

const CmsObjectActionPanel = ({
    close,
    fields: propFields,
    onSubmit,
    edit,
    onEdit,
    title,
}: ICmsObjectActionPanel) => {
    const [fields, setFields] = useState<ICmsField[]>([]);

    useEffect(() => {
        const elem = window.document.querySelector("body");
        if (!elem) return;
        elem.classList.add("stop-scrolling");
        return () => {
            const elem = window.document.querySelector("body");
            if (!elem) return;
            elem.classList.remove("stop-scrolling");
        };
    }, []);

    useEffect(() => {
        setFields([]);
        let newData: ICmsField[] = [];
        for (var f = 0; f < propFields.length; f++) {
            let item = propFields[f];
            let val;
            if (edit) {
                val = item.value;
            }
            if (!val) {
                switch (item.type) {
                    case "boolean": {
                        val = false;
                        break;
                    }
                    case "number": {
                        val = 0;
                        break;
                    }
                    default:
                        val = "";
                }
            }
            item.value = val;
            newData.push(item);
        }
        setFields(newData);
    }, []);

    const submit = () => {
        let obj: any = {};
        for (var i = 0; i < fields.length; i++) {
            let item = fields[i];
            obj[item.name] = item.value;
        }
        if (edit) {
            onEdit && onEdit(obj);
            return;
        }
        onSubmit(obj);
    };

    return (
        <div className="fixed w-screen h-screen z-40 bg-black dark:bg-white dark:bg-opacity-25 bg-opacity-25 top-0 left-0 flex justify-center items-center">
            <div className="bg-white dark:bg-stone-900 max-w-xl w-full py-5 shadow-md rounded-lg px-8 mx-4">
                <div className="flex justify-between">
                    <h3 className="text-xl mb-5">{title}</h3>
                    <XIcon className="h-5 w-5 cursor-pointer" onClick={close} />
                </div>
                <CmsObject
                    noIndent
                    fields={fields}
                    name="nameio"
                    updateForm={(f) => setFields(f)}
                />
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={submit}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                    >
                        {edit ? "Save" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CmsObjectActionPanel;
