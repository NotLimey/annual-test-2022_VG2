import { useQuery } from "react-query";
import Cms from "../../../components/cms/Cms";
import { fetchCompanies } from "../../../scripts/fetch";

const NewCompany = () => {
    const { refetch } = useQuery("auth_companies", fetchCompanies)
    return (
        <Cms
            title={`Add company`}
            submit={{
                endpoint: "/companies",
                onSuccessAfterToast: () => refetch()
            }}
            fields={[
                {
                    name: "name",
                    title: "Company name",
                    type: "string"
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "logo",
                    title: "Link to logo image",
                    type: "string",
                    options: {
                        placeholder: "https://i.imgur.com/[code]"
                    }
                },
                {
                    name: "city",
                    type: "string"
                },
                {
                    name: "country",
                    type: "string"
                },
                {
                    name: "streetAddress",
                    type: "string"
                },
                {
                    name: "zipCode",
                    type: "number",
                    value: 1111,
                    options: {
                        placeholder: "1111"
                    }
                },
                {
                    name: "orgNr",
                    type: "number",
                    value: 123456789,
                    options: {
                        placeholder: "123 456 789"
                    }
                },
                {
                    name: "bankNr",
                    type: "number",
                    value: 12345678901,
                    options: {
                        placeholder: "1234 56 78901"
                    }
                },
                {
                    name: "phoneNumber",
                    type: "number",
                    value: 12345678,
                    options: {
                        placeholder: "123 45 678"
                    }
                },
                {
                    name: "latitude",
                    type: "number",
                    options: {
                        placeholder: "60.1245"
                    }
                },
                {
                    name: "longitude",
                    type: "number",
                    options: {
                        placeholder: "10.1245"
                    }
                },
                {
                    name: "contactEmail",
                    type: "string",
                    options: {
                        placeholder: "email@example.com"
                    }
                },
                {
                    name: "invoiceEmail",
                    type: "string",
                    options: {
                        placeholder: "invoice@example.com"
                    }
                }
            ]}
        />
    );
}

export default NewCompany;