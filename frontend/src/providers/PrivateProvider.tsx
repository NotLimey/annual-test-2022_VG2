import FullscreenLoader from "@/components/loaders/FullscreenLoader";
import React from "react";
import ErrorPage from "../components/status-pages/ErrorPage";
import useAuth from "../hooks/useAuth";
import Login from "../pages/auth/Login";
import signOut from "../scripts/signOut";

const PrivateProvider = ({ children }: { children: React.ReactNode }) => {
    const { rolesUpToDate, isError, errorCode, isAuthenticated, isLoadingUser } = useAuth();

    if (isLoadingUser) return <FullscreenLoader text='Connecting to database..' />

    if (!isAuthenticated) return <Login />

    if (isError) return <ErrorPage apiStatus={errorCode} />

    if (!rolesUpToDate) {
        signOut();
        return <></>
    }

    return <>{children}</>;
}

export default PrivateProvider;