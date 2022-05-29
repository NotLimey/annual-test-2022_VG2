import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BaseUrl } from "../main";
import { UserType } from "../types/User";


const getUser = async () => await axios(`${BaseUrl}/users/user`, {
    validateStatus: (status) => {
        return status < 500
    }
}).catch(ex => ex);

function arraysEqual(a: string[], b: string[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const useAuth = () => {
    const { data: userData, isLoading, isError: fetchError, refetch, error, isFetched, status } = useQuery("auth_user", getUser);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserType>({} as UserType);
    const [roles, setRoles] = useState<string[]>([]);
    const [rolesUpToDate, setRolesUpToDate] = useState(true);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorCode, setErrorCode] = useState(-1);

    useEffect(() => {
        if (isLoading) return;
        if (!isFetched) return;

        const status = userData?.response?.status || userData?.status;

        if ((status === undefined && userData?.data)) {
            setUser(userData.data);
            if (userData.data?.id.length > 10) {
                setIsAuthenticated(true);
            }
            const roles = userData.data?.roles.map((x: string) => x.toLowerCase())
            const claims = userData.data?.claims.map((x: string) => x.toLowerCase())
            setRoles(roles);
            setRolesUpToDate(arraysEqual(claims, roles));
            setIsLoadingUser(false)
            return;
        }

        if (status === 401) {
            setIsAuthenticated(false);
            setIsLoadingUser(false)
            return;
        }

        if (status || status === 0) {
            setIsError(true);
            setErrorCode(status);
            setIsLoadingUser(false)
            return;
        }
        setIsError(true);
        setErrorCode(-1);
        setIsLoadingUser(false)

    }, [userData])

    return {
        user,
        roles,
        rolesUpToDate,
        isLoadingUser,
        isError,
        isAuthenticated,
        errorCode
    }
}

export default useAuth;