import axios from "axios";
import { useQuery } from "react-query";
import { BaseUrl } from "../main";
import { fetchUsersRoles } from "../scripts/fetch";
import { UserType } from "../types/User";


const getUser = async () => await axios(`${BaseUrl}/user/user`, {
    validateStatus: (status) => {
        return status < 500
    }
}).catch(ex => ex);

const useAuth = () => {
    const { data: userData, isLoading, isError, refetch, error, isFetched, status } = useQuery("user", getUser);
    const { data: roleData, isLoading: rolesIsLoading } = useQuery("user_roles", fetchUsersRoles);

    return {
        user: (userData?.data as UserType) ?? null,
        roles: (roleData?.data?.roles?.map((x: string) => x.toLowerCase()) as string[]) ?? [],
        roleClaims: (roleData?.data?.claims?.map((x: string) => x.toLowerCase()) as string[]) ?? [],
        isLoading,
        isError,
        refetch,
        rolesIsLoading,
        statusCode: userData?.status,
        error,
        data: userData,
        isFetched,
        status
    }
}

export default useAuth;