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
    pdfData: InvoicePDFData;
}

export interface InvoiceLine {
    description: string;
    hours: number;
    rate: number;
    price: number;
}

export interface InvoicePDFData {
    title: string;
    companyName: string;
    companyStreetAddress: string;
    companyCity: string;
    companyZipCode: number;
    invoiceNumber: number;
    dueDate: Date;
    organizationId: number;
    bankAccount: number;
    invoiceLines: InvoiceLine[];
    amount: number;
    mva: number;
    total: number;
    createdAt: Date;
    useMva: boolean;
}

export interface TExpense {
    id: string;
    userId: string;
    date: Date;
    amount: number;
    description: string;
    category: string;
    to: string;
    toLink: string;
    why: string;
}

export type THour = {
    id: string;
    projectId: string;
    userId: string;
    date: string;
    hours: number;
    description: string;
}