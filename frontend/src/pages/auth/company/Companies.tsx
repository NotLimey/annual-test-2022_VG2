import { useQuery } from "react-query";
import StackedList from "../../../components/lists/StackedList";
import Loader from "../../../components/loaders/Loader";
import PageHeading from "../../../components/page-headings/PageHeading";
import { fetchCompanies } from "../../../scripts/fetch";
import { TCompany } from "../../../types/Company";

const Companies = () => {
    const { data, isLoading } = useQuery("auth_companies", fetchCompanies);

    if (isLoading) return <Loader className="mt-12" />

    const companies: TCompany[] = data?.data;

    return (
        <>
            <PageHeading publishPath="/auth/companies/add" publishText="New Company">Companies</PageHeading>
            {data && <StackedList
                data={companies}
                titleAttribute="name"
                typeIcon={"InformationCircleIcon"}
                typeAttribute="description"
                path={(id) => `/auth/companies/${id}`}
                date={(id) => {
                    const item = companies.find((x: TCompany) => x.id === id);
                    if (!item)
                        return <p></p>

                    return (
                        <p>
                            Created, <time dateTime={item.created.toString()}>{new Date(`${item.created}`).toDateString()}</time>
                        </p>
                    )
                }}
            />}
        </>
    );
}

export default Companies;