import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Login from "../pages/auth/Login";
import signOut from "../scripts/signOut";
import { UserType } from "../types/User";

interface IPrivateContext {
    user?: UserType | null;
    children?: React.ReactNode;
}

export const PrivateContext = createContext<IPrivateContext>({});

function arraysEqual(a: string[], b: string[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const PrivateProvider = (value: IPrivateContext) => {

    const { roles, roleClaims, rolesIsLoading, isError } = useAuth();

    if (!value || !value.user || isError) return <Login />

    if (!rolesIsLoading && !arraysEqual(roles, roleClaims)) {
        signOut();
        return <></>
    }

    return (
        <PrivateContext.Provider value={value}>
            {value.children ?? <div></div>}
        </PrivateContext.Provider>
    );
}

export default PrivateProvider;