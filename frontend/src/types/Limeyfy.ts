import { TCompany } from "./Company";

export type TProject = {
    id: string;
    title: string;
    description: string;
    privateNote: string;
    referenceLink: string;
    images: string[];
    isCompleted: boolean;
    isPublic: boolean;
    hours: number;
    linesOfCode: number;
    created: Date;
}

export type TInvoice = {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    company: TCompany;
    organizationId: number;
    bankAccount: number;
    invoiceNumber: number;
    dueDate: Date;
    isPaid: boolean;
    amount: number;
    mva: number;
    total: number;
    invoiceLines: InvoiceLine[];
    useMva: boolean;
    createdAt: Date;
}

export interface InvoiceLine {
    description: string;
    hours: number;
    rate: number;
    price: number;
}