import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Cms from "../../../components/cms/Cms";
import Loader from "../../../components/loaders/Loader";
import { fetchCompanies } from "../../../scripts/fetch";
import { TCompany } from "../../../types/Company";

const Company = () => {
    const { id } = useParams();
    const [company, setCompany] = useState<null | TCompany>()
    const { data, isLoading: dataLoading, refetch } = useQuery("auth_companies", fetchCompanies)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (dataLoading || !id || !data) return;
        const obj: TCompany = data.data.find((x: TCompany) => x.id === id);
        if (obj) {
            setCompany(obj);
        } else {
            setError(true);
        }

        setIsLoading(false)
    }, [id, data, isLoading])

    if (isLoading) return <Loader className="mt-12" />

    if (error || !company) return (
        <div>
            Cannot find project with this id
        </div>
    )

    return (
        <Cms
            edit
            title={`Edit ${company.name}`}
            submit={{
                endpoint: "/companies",
                onSuccessAfterToast: () => refetch(),
                headers: {
                    "Id": company.id
                },
                options: {
                    method: "PUT",
                }
            }}
            fields={[
                {
                    name: "name",
                    title: "Company name",
                    value: company.name,
                    type: "string"
                },
                {
                    name: "description",
                    value: company.description,
                    type: "text"
                },
                {
                    name: "logo",
                    title: "Link to logo image",
                    value: company.logo,
                    type: "string",
                    options: {
                        placeholder: "https://i.imgur.com/[code]"
                    }
                },
                {
                    name: "city",
                    value: company.city,
                    type: "string"
                },
                {
                    name: "country",
                    value: company.country,
                    type: "string"
                },
                {
                    name: "streetAddress",
                    value: company.streetAddress,
                    type: "string"
                },
                {
                    name: "zipCode",
                    type: "number",
                    value: company.zipCode,
                    options: {
                        placeholder: "1111"
                    }
                },
                {
                    name: "orgNr",
                    type: "number",
                    value: company.orgNr,
                    options: {
                        placeholder: "123 456 789"
                    }
                },
                {
                    name: "bankNr",
                    type: "number",
                    value: company.bankNr,
                    options: {
                        placeholder: "1234 56 78901"
                    }
                },
                {
                    name: "phoneNumber",
                    type: "number",
                    value: company.phoneNumber,
                    options: {
                        placeholder: "123 45 678"
                    }
                },
                {
                    name: "latitude",
                    type: "number",
                    value: company.latitude,
                    options: {
                        placeholder: "60.1245"
                    }
                },
                {
                    name: "longitude",
                    value: company.longitude,
                    type: "number",
                    options: {
                        placeholder: "10.1245"
                    }
                },
                {
                    name: "contactEmail",
                    value: company.contactEmail,
                    type: "string",
                    options: {
                        placeholder: "email@example.com"
                    }
                },
                {
                    name: "invoiceEmail",
                    value: company.invoiceEmail,
                    type: "string",
                    options: {
                        placeholder: "invoice@example.com"
                    }
                }
            ]}
        />
    );
}

export default Company;