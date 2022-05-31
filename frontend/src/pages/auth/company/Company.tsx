import { classNames } from "@/scripts/tailwind";
import { TCompany } from "@/types/Company";
import { useMatch } from "@tanstack/react-location";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import DescriptionList from "../../../components/information/DescriptionList";
import Loader from "../../../components/loaders/Loader";
import useSettings from "../../../hooks/useSettings";
import { fetchCompanies } from "../../../scripts/fetch";

const Company = () => {
    const { data: { id } } = useMatch();
    const [company, setCompany] = useState<null | TCompany>()
    const { data, isLoading: dataLoading, refetch } = useQuery("auth_companies", fetchCompanies)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const { settings } = useSettings();

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
        <DescriptionList
            title={company.name}
            object={company}
            editPath={`/auth/companies/${company.id}/edit`}
            ignoreValues={["id", "name"]}
            customFormatting={[
                {
                    name: "created",
                    func: (val: string) => new Date(`${val}`).toLocaleDateString()
                },
                {
                    name: "bankNr",
                    func: (val: number) => {
                        const stringVal = val.toString();
                        return <span className={classNames(settings.sensitiveDataMode ? "blur-lg" : "")}>{`${stringVal.substring(0, 4)} ${stringVal.substring(4, 6)} ${stringVal.substring(6, 11)}`}</span>
                    }
                },
                {
                    name: "orgNr",
                    func: (val: number) => {
                        const stringVal = val.toString();
                        return `${stringVal.substring(0, 3)} ${stringVal.substring(3, 6)} ${stringVal.substring(6, 9)}`
                    }
                },
                {
                    name: "phoneNumber",
                    func: (val: number) => {
                        const stringVal = val.toString();
                        return `${stringVal.substring(0, 3)} ${stringVal.substring(3, 5)} ${stringVal.substring(5, 8)}`
                    }
                }
            ]}
        />
    )
}

export default Company;