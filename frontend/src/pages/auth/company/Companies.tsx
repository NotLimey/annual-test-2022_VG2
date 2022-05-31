import { useQuery } from "react-query";
import StackedList from "../../../components/lists/StackedList";
import Loader from "../../../components/loaders/Loader";
import PageHeading from "../../../components/page-headings/PageHeading";
import { fetchCompanies } from "../../../scripts/fetch";
import { TCompany } from "../../../types/Company";

const Companies = () => {
    const { data, isLoading } = useQuery("companies", fetchCompanies);

    if (isLoading) return <Loader className="mt-12" />

    const companies: TCompany[] = data?.data;

    return (
        <>
            <PageHeading publishPath="/auth/companies/add" publishText="New Company">Companies</PageHeading>
            {data && <StackedList<TCompany>
                data={companies}
                titleAttribute="name"
                informationIcon={"InformationCircleIcon"}
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
                information={(item) => item.description.length > 80 ? item.description.substring(0, 80) + "..." : item.description}
            />}
        </>
    );
}

export default Companies;