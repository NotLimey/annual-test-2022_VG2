import { TCompany } from "@/types/Company";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import DescriptionList from "../../../components/information/DescriptionList";
import Loader from "../../../components/loaders/Loader";
import useSettings from "../../../hooks/useSettings";
import { fetchCompanies } from "../../../scripts/fetch";

const Company = () => {
    const { id } = useParams();
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
            ignoreValues={["id", "name"]}
            customFormatting={[
                {
                    name: "created",
                    func: (val: string) => new Date(`${val}`).toLocaleDateString()
                }
            ]}
        />
    )
}

export default Company;