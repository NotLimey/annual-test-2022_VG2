import React from "react";
import { formatPascalAndSpace } from "../../scripts/text";
import CmsBooleanCheckBox from "./CmsBooleanCheckBox";
import CmsStringField from "./CmsStringField";
import CmsTextField from "./CmsTextField";
import { ICmsField } from "./CmsTypes";

interface ICmsObject {
    name: string;
    title?: string;
    fields: ICmsField[];
    updateForm: (fields: ICmsField[], name: string) => void;
    noIndent?: boolean;
}

const CmsObject = ({ fields, name, updateForm, noIndent, title }: ICmsObject) => {
    const getObjectIndexAndArray = (name: string) => {
        let newArr = [...fields];
        let objectIdx = fields.findIndex((x: ICmsField) => x.name === name);
        return {
            newArr,
            objectIdx,
        };
    };

    const handleStringChange = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.value;
        updateForm(newArr, name);
    };

    const handleNumberChange = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.value;
        updateForm(newArr, name);
    };

    const handleTextChange = (
        name: string,
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.value;
        updateForm(newArr, name);
    };

    const handleCheckBoxChange = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.checked;
        updateForm(newArr, name);
    };

    if (noIndent)
        return (
            <>
                {fields.map((field, idx) => {
                    switch (field.type) {
                        case "boolean":
                            return (
                                <CmsBooleanCheckBox
                                    key={idx}
                                    prop={field}
                                    onChange={(e) => handleCheckBoxChange(field.name, e)}
                                />
                            );
                        case "text":
                            return (
                                <CmsTextField
                                    key={idx}
                                    onChange={(e) => handleTextChange(field.name, e)}
                                    prop={field}
                                />
                            );
                        case "number":
                            return (
                                <CmsStringField
                                    key={idx}
                                    prop={field}
                                    onChange={(e) => handleNumberChange(field.name, e)}
                                    number
                                />
                            );
                        default:
                            return (
                                <CmsStringField
                                    key={idx}
                                    prop={field}
                                    onChange={(e) => handleStringChange(field.name, e)}
                                />
                            );
                    }
                })}
            </>
        );

    return (
        <div className="pl-8 pb-4 mb-5 ml-2 border-l dark:border-l-stone-700">
            <h2 className="mb-4 text-xl">{title ?? formatPascalAndSpace(name)}</h2>
            {fields.map((field, idx) => {
                switch (field.type) {
                    case "boolean":
                        return (
                            <CmsBooleanCheckBox
                                key={idx}
                                prop={field}
                                onChange={(e) => handleCheckBoxChange(field.name, e)}
                            />
                        );
                    case "text":
                        return (
                            <CmsTextField
                                key={idx}
                                prop={field}
                                onChange={(e) => handleTextChange(field.name, e)}
                            />
                        );
                    case "number":
                        return (
                            <CmsStringField
                                key={idx}
                                prop={field}
                                onChange={(e) => handleNumberChange(field.name, e)}
                                number
                            />
                        );
                    default:
                        return (
                            <CmsStringField
                                key={idx}
                                prop={field}
                                onChange={(e) => handleStringChange(field.name, e)}
                            />
                        );
                }
            })}
        </div>
    );
};

export default CmsObject;
