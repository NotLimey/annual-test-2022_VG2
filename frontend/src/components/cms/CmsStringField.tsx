import React from "react";
import { formatPascalAndSpace } from "../../scripts/text";
import { ICmsOptions, ICmsProp, ICmsTypes } from "./CmsTypes";

interface ICmsStringField {
    prop: ICmsProp;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    number?: boolean;
}

const CmsStringField = (props: ICmsStringField) => (
    <div className="mb-5">
        <label
            htmlFor={props.prop.name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
            {props.prop.title ?? formatPascalAndSpace(props.prop.name)}
        </label>
        <div className="mt-1">
            <input
                type={getType(props.prop.type)}
                name={props.prop.name}
                id={props.prop.name}
                className="shadow-sm focus:ring-limeyfy-500 focus:border-limeyfy-500 block w-full sm:text-sm border-gray-300 dark:border-stone-700 dark:bg-stone-800 rounded-md"
                placeholder={props.prop.options?.placeholder ?? ""}
                value={props.prop.value}
                onChange={(e) => props.onChange(e)}
            />
        </div>
    </div>
);

function getType(type: ICmsTypes) {
    switch (type) {
        case "password": {
            return "password"
        }
        case "number": {
            return "number"
        }
        case "date": {
            return "date"
        }
        default: return "text"
    }
}

export default CmsStringField;
