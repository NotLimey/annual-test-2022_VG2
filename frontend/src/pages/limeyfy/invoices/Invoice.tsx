import { Link, useMatch } from "@tanstack/react-location";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import RenderInvoicePDF from "../../../components/invoices/RenderInvoicePdfTS";
import Loader from "../../../components/loaders/Loader";
import useSettings from "../../../hooks/useSettings";
import { fetchInvoices } from "../../../scripts/fetch";
import { classNames } from "../../../scripts/tailwind";
import { TInvoice } from "../../../types/Limeyfy";

const updateInvoice = async (id: string, isPaid: boolean) => {
    await axios("/invoices", {
        method: "PUT",
        data: {
            id,
            isPaid
        }
    })
}

const Invoice = () => {
    const { params: { id } } = useMatch();
    const { data, refetch } = useQuery("limeyfy_invoices", fetchInvoices)
    const { settings } = useSettings();

    const [showAsPDF, setShowAsPDF] = useState(false)
    const [invoice, setInvoice] = useState<TInvoice>()

    useEffect(() => {
        if (!data || !id) return;
        const obj: TInvoice = data.data.find((x: TInvoice) => x.id === id);
        if (obj)
            setInvoice(obj);
    }, [data, id])

    if (!invoice) return <Loader />

    const handleUpdateIsPaid = async () => {
        await updateInvoice(invoice.id, !invoice.isPaid)
        setInvoice({ ...invoice, isPaid: !invoice.isPaid });
        await refetch();
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{invoice.title} (<Link to={"/auth/companies/" + invoice.company.id} className="text-limeyfy-600">{invoice.company.name}</Link>)</h1>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {invoice.description}
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={handleUpdateIsPaid}
                        className={classNames("mr-4 inline-flex items-center justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto",
                            invoice.isPaid ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 " : "bg-limeyfy-600 hover:bg-limeyfy-700 focus:ring-limeyfy-500 ")}
                    >
                        {!invoice.isPaid ? "Mark paid" : "Mark unpaid"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowAsPDF(!showAsPDF)}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-limeyfy-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-limeyfy-500 focus:ring-offset-2 sm:w-auto"
                    >
                        {showAsPDF ? "Hide PDF" : "Show PDF"}
                    </button>
                </div>
            </div>
            {!showAsPDF ? (
                <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-stone-700">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6 md:pl-0"
                                >
                                    Task
                                </th>
                                <th
                                    scope="col"
                                    className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell"
                                >
                                    Hours
                                </th>
                                <th
                                    scope="col"
                                    className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell"
                                >
                                    Rate
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pr-6 md:pr-0"
                                >
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody className={classNames(settings.sensitiveDataMode ? "blur-lg" : "")}>
                            {invoice.invoiceLines.map((line, idx) => (
                                <tr key={idx} className="border-b border-gray-200 dark:border-stone-700">
                                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{line.description}</div>
                                        <div className="mt-0.5 text-gray-500 dark:text-gray-400 sm:hidden">
                                            {line.hours} hours at {line.rate}
                                        </div>
                                    </td>
                                    <td className="hidden py-4 px-3 text-right text-sm text-gray-500 dark:text-gray-400 sm:table-cell">{line.hours}</td>
                                    <td className="hidden py-4 px-3 text-right text-sm text-gray-500 dark:text-gray-400 sm:table-cell">{line.rate.toLocaleString()}</td>
                                    <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 dark:text-gray-400 sm:pr-6 md:pr-0">Kr {line.price.toLocaleString()},-</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className={classNames(settings.sensitiveDataMode ? "blur-lg" : "")}>
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 dark:text-gray-400 sm:table-cell md:pl-0"
                                >
                                    Subtotal
                                </th>
                                <th scope="row" className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 dark:text-gray-400 sm:hidden">
                                    Subtotal
                                </th>
                                <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 dark:text-gray-400 sm:pr-6 md:pr-0">Kr {invoice.amount.toLocaleString()},-</td>
                            </tr>
                            {invoice.useMva && <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 dark:text-gray-400 sm:table-cell md:pl-0"
                                >
                                    Mva
                                </th>
                                <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 dark:text-gray-400 sm:hidden">
                                    Mva
                                </th>
                                <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 dark:text-gray-400 sm:pr-6 md:pr-0">Kr {invoice.mva.toLocaleString()},-</td>
                            </tr>}
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell md:pl-0"
                                >
                                    Total
                                </th>
                                <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:hidden">
                                    Total
                                </th>
                                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pr-6 md:pr-0">
                                    Kr {invoice.total.toLocaleString()},-
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className={classNames(settings.sensitiveDataMode ? "blur-lg" : "", "max-h-screen h-screen")}>
                    <RenderInvoicePDF {...invoice.pdfData} />
                </div>
            )}
        </div>
    )
}

export default Invoice;