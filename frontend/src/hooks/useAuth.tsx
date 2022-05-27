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

    return {
        user: (userData?.data as UserType) ?? null,
        roles: (userData?.data?.roles?.map((x: string) => x.toLowerCase()) as string[]) ?? [],
        roleClaims: (userData?.data?.claims?.map((x: string) => x.toLowerCase()) as string[]) ?? [],
        isLoading,
        isError,
        refetch,
        statusCode: userData?.status,
        error,
        data: userData,
        isFetched,
        status
    }
}

export default useAuth;