import { useQuery } from "react-query";
import Cms from "../../../components/cms/Cms"
import Loader from "../../../components/loaders/Loader";
import useAuth from "../../../hooks/useAuth";
import { fetchCompanies } from "../../../scripts/fetch";
import { TCompany } from "../../../types/Company";

const NewInvoice = () => {
    const { user } = useAuth();
    const { data } = useQuery("auth_companies", fetchCompanies);

    if (!data) return <Loader />

    // function that gets date in 14 days in format yyyy-mm-dd
    const getDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = date.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    return (
        <Cms
            title="Create new invoice"
            submit={{
                endpoint: "/invoices",
            }}
            extraValues={{
                userId: user.id
            }}
            props={[
                {
                    name: "title",
                    type: "string",
                },
                {
                    name: "description",
                    type: "string",
                },
                {
                    name: "companyId",
                    title: "Receiving Company",
                    type: "select",
                    select: {
                        data: data?.data ?? [],
                        defaultValue: (data) => data.find((x: any) => x.name.toLowerCase() === "uno marine") ?? data[0],
                        selectIdentifier: "name",
                        onSet: (data: TCompany) => data.id
                    }
                },
                {
                    name: "organizationId",
                    title: "Organization from",
                    type: "select",
                    select: {
                        data: data?.data ?? [],
                        defaultValue: (data) => data.find((x: any) => x.name.toLowerCase() === "limeyfy") ?? data[0],
                        selectIdentifier: "name",
                        onSet: (data: TCompany) => data.orgNr
                    }
                },
                {
                    name: "bankAccount",
                    title: "Receiving bank account",
                    type: "number",
                },
                {
                    name: "invoiceNumber",
                    type: "number",
                    title: "Invoice Id"
                },
                {
                    name: "dueDate",
                    title: "Due date (regularly in 14 days)",
                    type: "date",
                    value: getDate(),
                },
                {
                    name: "isPaid",
                    title: "Is invoice paid for?",
                    type: "boolean"
                },
                {
                    name: "invoiceLines",
                    type: "array",
                    of: "object",
                    fields: [
                        {
                            name: "description",
                            type: "string"
                        },
                        {
                            name: "hours",
                            type: "number"
                        },
                        {
                            name: "rate",
                            title: "Hour rate",
                            type: "number"
                        },
                    ]
                },
                {
                    name: "useMva",
                    type: "boolean"
                }
            ]}
        />
    );
}

export default NewInvoice;