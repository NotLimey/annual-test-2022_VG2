import { useQuery } from "react-query";
import StackedList from "../../../components/lists/StackedList";
import Loader from "../../../components/loaders/Loader";
import PageHeading from "../../../components/page-headings/PageHeading";
import useSettings from "../../../hooks/useSettings";
import { fetchExpenses } from "../../../scripts/fetch";
import { classNames } from "../../../scripts/tailwind";
import { TExpense } from "../../../types/Limeyfy";

const Expenses = () => {
    const { data, isLoading } = useQuery("limeyfy_expenses", fetchExpenses);

    const { settings } = useSettings();

    if (isLoading) return <Loader />

    if (!data?.data) return <p>An error occured</p>

    return (
        <div>
            <PageHeading publishPath="/limeyfy/expenses/add" publishText="Create expense">Expenses</PageHeading>
            <div className={classNames(settings.sensitiveDataMode ? "blur-lg" : "")}>
                <StackedList
                    data={data.data}
                    title={(invoice: TExpense) => `${invoice.to} (${invoice.category})`}
                    typeIcon={"CashIcon"}
                    typeAttribute="amount"
                    path={(id) => `/limeyfy/expenses/${id}`}
                    date={(id) => {
                        const item: TExpense = data.data.find((x: TExpense) => x.id === id);
                        if (!item)
                            return <p></p>

                        return (
                            <p>
                                Date, <time dateTime={item.date.toString()}>{new Date(`${item.date}`).toDateString()}</time>
                            </p>
                        )
                    }}
                />
            </div>
        </div>
    );
}

export default Expenses;