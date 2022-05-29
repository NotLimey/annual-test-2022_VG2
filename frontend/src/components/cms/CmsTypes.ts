import { AxiosRequestHeaders } from "axios";

export interface ICms {
    title?: string;
    fields?: ICmsField[];
    edit?: boolean;
    submitBtnText?: string;
    onSubmit?: (data: any) => void;
    submit?: ICmsSubmit;
    extraValues?: any;
}

export type ICmsTypes = "string" | "text" | "boolean" | "number" | "array" | "object" | "select" | "password" | "date";

export interface ICmsField {
    type: ICmsTypes;
    name: string;
    options?: ICmsOptions;
    value?: any;
    of?: "string" | "object";
    fields?: ICmsObjectField[];
    select?: ICmsSelectOptions;
    title?: string;
}

export interface ICmsSelectOptions {
    defaultValue: (data: any) => any;
    selectIdentifier: string; // Leave blank to use whole object
    data: any[];
    onSet?: (data: any) => any;
}

export interface ICmsOptions {
    placeholder?: string;
    sensitive?: boolean;
}

export interface ICmsObjectField {
    type: "string" | "text" | "boolean" | "number";
    name: string;
    title?: string;
    options?: ICmsOptions;
    value?: any;
    of?: "string";
}

export interface ICmsSubmit {
    endpoint: string;
    options?: ICmsSubmitOptions;
    onSuccess?: (res: any) => void;
    onSuccessAfterToast?: () => void;
    onError?: (err: any) => void;
    noNavigate?: boolean;
    headers?: AxiosRequestHeaders;
}

export interface ICmsSubmitOptions {
    method?: "POST" | "PUT" | "DELETE";
    onSuccessText?: string;
}