import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Cms from "../../../components/cms/Cms";
import Loader from "../../../components/loaders/Loader";
import { fetchCompanies, fetchUsers } from "../../../scripts/fetch";
import { UserType } from "../../../types/User";

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState<null | UserType>()
    const { data, isLoading: dataLoading, refetch } = useQuery("auth_users", fetchUsers)
    const { data: companies } = useQuery("auth_companies", fetchCompanies);

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (dataLoading || !id || !data) return;
        const obj: UserType = data.data.find((x: UserType) => x.id === id);
        if (obj) {
            setUser(obj);
        } else {
            setError(true);
        }

        setIsLoading(false)
    }, [id, data, isLoading])

    if (isLoading) return <Loader className="mt-12" />

    if (error || !user) return (
        <div>
            Cannot find project with this id
        </div>
    )

    if (!companies) return <></>

    return (
        <>
            <Cms
                edit
                title={`Edit ${user.userName}`}
                submit={{
                    endpoint: "/user",
                    onSuccessAfterToast: () => refetch(),
                    headers: {
                        "Id": user.id
                    },
                    options: {
                        method: "PUT",
                    }
                }}
                fields={[
                    {
                        name: "firstName",
                        type: "string",
                        value: user.firstName
                    },
                    {
                        name: "lastName",
                        type: "string",
                        value: user.lastName
                    },
                    {
                        name: "company",
                        type: "select",
                        select: {
                            data: companies?.data,
                            defaultValue: () => user.company ?? {
                                name: "Not selected",
                                id: null
                            },
                            selectIdentifier: "name",
                            onSet: (data) => data.id
                        }
                    }
                ]}
            />
        </>
    );
}

export default EditUser;