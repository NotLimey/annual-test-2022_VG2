import { useQuery } from "react-query";
import Cms from "../../../components/cms/Cms";
import { fetchCompanies, fetchUsers } from "../../../scripts/fetch";

const Register = () => {
    const { refetch: refetchUsers } = useQuery("auth_users", fetchUsers);
    const { data } = useQuery("companies", fetchCompanies);

    if (!data) return <></>;

    return (
        <>
            <Cms
                title="Register new user"
                submit={{
                    endpoint: "/auth/register",
                    onSuccessAfterToast: () => refetchUsers()
                }}
                fields={[
                    {
                        name: "firstName",
                        type: "string"
                    },
                    {
                        name: "lastName",
                        type: "string"
                    },
                    {
                        name: "email",
                        type: "string"
                    },
                    {
                        name: "userName",
                        type: "string",
                        title: "Username"
                    },
                    {
                        name: "password",
                        type: "password"
                    },
                    {
                        name: "company",
                        type: "select",
                        select: {
                            data: data.data,
                            defaultValue: (data) => {
                                const item = data.find((x: any) => x.name.toLowerCase() === "limeyfy")
                                return item ?? data[0]
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

export default Register;