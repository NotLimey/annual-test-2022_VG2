import { useQuery } from "react-query";
import StackedList from "../../../components/lists/StackedList";
import Loader from "../../../components/loaders/Loader";
import PageHeading from "../../../components/page-headings/PageHeading";
import { fetchInvoices } from "../../../scripts/fetch";
import { TInvoice } from "../../../types/Limeyfy";

const Invoices = () => {

    const { data, isLoading } = useQuery("limeyfy_invoices", fetchInvoices);

    if (!isLoading) <Loader />
    if (!data) return <>Error</>

    return (
        <div>
            <PageHeading publishPath="/limeyfy/invoices/add" publishText="Create invoice">Invoices</PageHeading>
            <StackedList
                data={data.data}
                title={(invoice: TInvoice) => `${invoice.invoiceNumber} - ${invoice.title} (${invoice.company.name})`}
                badge={(idx) => data.data[idx].isPaid ? { color: "green", text: "Paid" } : { color: "red", text: "Not paid" }}
                typeIcon={"CashIcon"}
                typeAttribute="total"
                path={(id) => `/limeyfy/invoice/${id}`}
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
    );
}

export default Invoices;