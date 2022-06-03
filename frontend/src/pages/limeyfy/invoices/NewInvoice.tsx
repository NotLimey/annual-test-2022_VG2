import { useState } from "react";
import { useQuery } from "react-query";
import Cms from "../../../components/cms/Cms"
import Loader from "../../../components/loaders/Loader";
import useAuth from "../../../hooks/useAuth";
import { fetchCompanies, fetchInvoices } from "../../../scripts/fetch";
import { TCompany } from "../../../types/Company";

const NewInvoice = () => {
    const { user } = useAuth();
    const { data } = useQuery("companies", fetchCompanies);
    const { refetch } = useQuery("limeyfy_invoices", fetchInvoices);
    const [activeCompanyId, setActiveCompanyId] = useState<string>("")

    if (!data) return <Loader />

    const getDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = date.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    if (data.data.length < 1) return <p>There has to be at least one company</p>

    return (
        <Cms
            title="Create new invoice"
            submit={{
                endpoint: "/invoices",
                onSuccessAfterToast: () => refetch()
            }}
            extraValues={{
                userId: user.id
            }}
            fields={[
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
                        defaultValue: (data) => data.filter((x: any) => x.name.toLowerCase() !== "limeyfy")[0] ?? data[0],
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
                        onSet: (data: TCompany) => {
                            setActiveCompanyId(data.id);
                            return data.orgNr;
                        }
                    }
                },
                {
                    name: "bankAccount",
                    title: "Receiving bank account",
                    type: "number",
                    value: activeCompanyId.length > 0 ? (data?.data?.find((x: TCompany) => x.id === activeCompanyId) as TCompany).bankNr ?? 0 : 0
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
                            type: "number",
                            value: 250
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