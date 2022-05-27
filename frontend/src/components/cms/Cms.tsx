import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import formatFormDataCms from "../../scripts/cms/formatFormDataCms";
import getDefaultValuesCms from "../../scripts/cms/getDefaultValuesCms";
import isDuplicates from "../../scripts/cms/getDuplicatesCms";
import CmsArray from "./CmsArray";
import CmsBooleanCheckBox from "./CmsBooleanCheckBox";
import CmsObject from "./CmsObject";
import CmsSelect from "./CmsSelect";
import CmsStringField from "./CmsStringField";
import CmsTextField from "./CmsTextField";
import { ICms, ICmsObjectField, ICmsField } from "./CmsTypes";

const Cms = (props: ICms) => {
    const { title } = props;

    const [form, setForm] = useState<ICmsField[]>([]);
    const { errorToast, emojiToast } = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.fields || props.fields.length < 1) return;
        const isDuplicate = isDuplicates(props.fields);
        if (isDuplicate) {
            throw Error("CMS: Cant have duplicated props with same name");
        }
        const formData = getDefaultValuesCms(props.fields);
        setForm(formData);
    }, [props.fields]);

    const postData = async (data: any) => {
        if (!props.submit)
            throw Error("Props.submit is undefined");

        return await axios(props.submit?.endpoint, {
            method: props.submit.options?.method ?? "POST",
            data: data,
            headers: { ...props.submit.headers }
        })
    }

    const { mutate } = useMutation(postData, {
        onSuccess: (data) => {
            if (props.submit?.onSuccess) {
                props.submit.onSuccess(data);
                return;
            }
            emojiToast(props.submit?.options?.onSuccessText ?? "Success", "✅")
            if (props.submit?.onSuccessAfterToast)
                props.submit.onSuccessAfterToast();

            if (!props.submit?.noNavigate) {
                setTimeout(() => {
                    navigate(-1)
                }, 500)
            }

        },
        onError: (err: any) => {
            if (props.submit?.onError) {
                props.submit.onError(err);
                return;
            }
            if (err.request.status === 0) {
                errorToast(`Can't connect to api. Check your internet connection`)
                return;
            }
            errorToast(`${err.request.status}: There was an error`)
        },
        onSettled: () => {
            queryClient.invalidateQueries("create");
        },
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedData = formatFormDataCms(form);
        const data = { ...props.extraValues, ...formattedData }
        if (!props.submit && !props.onSubmit) {
            console.error("No action set for CMS on submit")
            return;
        }
        if (props.onSubmit) {
            props.onSubmit(data);
            return;
        }
        mutate(data);

    };

    const getObjectIndexAndArray = (name: string) => {
        let newArr = [...form];
        let objectIdx = form.findIndex((x: ICmsField) => x.name === name);
        return {
            newArr,
            objectIdx,
        };
    };

    //#region Handle-change
    const handleStringChange = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.value;
        setForm(newArr);
    };

    const handleNumberChange = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.value;
        setForm(newArr);
    };

    const handleTextChange = (
        name: string,
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.value;
        setForm(newArr);
    };

    const handleCheckBoxChange = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = e.target.checked;
        setForm(newArr);
    };

    const handleObjectChange = (name: string, val: ICmsObjectField[]) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        let value: any = {};
        for (var f = 0; f < val.length; f++) {
            value[val[f].name] = val[f].value;
        }
        newArr[objectIdx].value = value;
        setForm(newArr);
    };

    const handleAddToArray = (name: string, val: any) => {
        let { newArr, objectIdx } = getObjectIndexAndArray(name);
        if (!newArr[objectIdx].value) newArr[objectIdx].value = [];

        newArr[objectIdx].value.push(val);
        setForm(newArr);
    };

    const handleEditObjectInArray = (name: string, val: any, idx: number) => {
        let { newArr, objectIdx } = getObjectIndexAndArray(name);
        if (!newArr[objectIdx].value) newArr[objectIdx].value = [];

        newArr[objectIdx].value[idx] = val;

        setForm(newArr);
    };

    const handleSelectChange = (name: string, val: any) => {
        const { newArr, objectIdx } = getObjectIndexAndArray(name);
        newArr[objectIdx].value = val;
        setForm(newArr);
    }
    //#endregion

    return (
        <>
            <div className="max-w-xl mx-auto mt-5">
                <h1 className="text-2xl mb-8">{title ?? "Upload content"}</h1>
                <form onSubmit={submit}>
                    {form.map((prop, idx) => {
                        switch (prop.type) {
                            case "object": {
                                if (!prop.fields)
                                    throw Error(
                                        "A property of type 'object' needs at least one field in fields."
                                    );

                                return (
                                    <CmsObject
                                        key={idx}
                                        updateForm={(f) => handleObjectChange(prop.name, f)}
                                        fields={prop.fields}
                                        name={prop.name}
                                        title={prop.title}
                                    />
                                );
                            }
                            case "array": {
                                return (
                                    <CmsArray
                                        key={idx}
                                        prop={prop}
                                        onAddToArray={(obj) => handleAddToArray(prop.name, obj)}
                                        onEditItem={(obj, idx) =>
                                            handleEditObjectInArray(prop.name, obj, idx)
                                        }
                                    />
                                );
                            }
                            case "boolean": {
                                return (
                                    <CmsBooleanCheckBox
                                        key={idx}
                                        prop={prop}
                                        onChange={(e) => handleCheckBoxChange(prop.name, e)}
                                    />
                                );
                            }
                            case "text": {
                                return (
                                    <CmsTextField
                                        key={idx}
                                        prop={prop}
                                        onChange={(e) => handleTextChange(prop.name, e)}
                                    />
                                );
                            }
                            case "number": {
                                return (
                                    <CmsStringField
                                        key={idx}
                                        prop={prop}
                                        onChange={(e) => handleNumberChange(prop.name, e)}
                                        number
                                    />
                                );
                            }
                            case "select": {
                                if (!prop.select)
                                    throw Error("If you use the type 'select' you have to provide a values to 'select'")

                                return (
                                    <CmsSelect
                                        key={idx}
                                        options={prop.select}
                                        prop={prop}
                                        onChange={(val) => handleSelectChange(prop.name, val)}
                                    />
                                )
                            }
                            default: {
                                return (
                                    <CmsStringField
                                        key={idx}
                                        prop={prop}
                                        onChange={(e) => handleStringChange(prop.name, e)}
                                    />
                                );
                            }
                        }
                    })}
                    <div className="flex justify-end pt-5">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                        >
                            {props.submitBtnText
                                ? props.submitBtnText
                                : props.edit
                                    ? "Save"
                                    : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Cms;
