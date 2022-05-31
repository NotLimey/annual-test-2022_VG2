import { useQuery } from "react-query";
import StackedList from "../../../components/lists/StackedList";
import Loader from "../../../components/loaders/Loader";
import PageHeading from "../../../components/page-headings/PageHeading";
import useSettings from "../../../hooks/useSettings";
import { fetchInvoices } from "../../../scripts/fetch";
import { classNames } from "../../../scripts/tailwind";
import { TInvoice } from "../../../types/Limeyfy";

const Invoices = () => {

    const { data, isLoading } = useQuery("limeyfy_invoices", fetchInvoices);
    const { settings } = useSettings();

    if (!isLoading) <Loader />
    if (!data) return <>Error</>

    return (
        <div>
            <PageHeading publishPath="/limeyfy/invoices/add" publishText="Create invoice">Invoices</PageHeading>
            <div className={classNames(settings.sensitiveDataMode ? "blur-lg" : "")}>
                <StackedList<TInvoice>
                    data={data.data}
                    title={(invoice: TInvoice) => `${invoice.invoiceNumber} - ${invoice.title} (${invoice.company.name})`}
                    badge={(idx) => data.data[idx].isPaid ? { color: "green", text: "Paid" } : { color: "red", text: "Not paid" }}
                    informationIcon={"CashIcon"}
                    information={i => `Kr ${i.total},-`}
                    path={(id) => `/limeyfy/invoices/${id}`}
                    date={(id) => {
                        const item = data.data.find((x: TInvoice) => x.id === id);
                        if (!item)
                            return <p></p>

                        return (
                            <p>
                                Due date, <time dateTime={item.dueDate}>{new Date(`${item.dueDate}`).toDateString()}</time>
                            </p>
                        )
                    }}
                />
            </div>
        </div>
    );
}

export default Invoices;