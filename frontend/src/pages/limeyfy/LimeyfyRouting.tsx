import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import Cms from "../../components/cms/Cms";
import Loader from "../../components/loaders/Loader";
import NotFound from "../../components/status-pages/NotFound";
import Unauthorized from "../../components/status-pages/Unauthorized";
import useAuth from "../../hooks/useAuth";
import Invoice from "./invoices/Invoice";
import Invoices from "./invoices/Invoices";
import NewInvoice from "./invoices/NewInvoice";
import NewProject from "./projects/NewProject";
import Project from "./projects/Project";
import Projects from "./projects/Projects";


const LimeyfyRouting = () => {
    const { roles: userRoles, isLoadingUser } = useAuth();
    const [authorized, setAuthorized] = useState(false)
    const perms = ["admin", "limeyfy"]

    useEffect(() => {
        const _authorized = userRoles.some(x => perms.includes(x));
        setAuthorized(_authorized);
    }, [userRoles])


    if (isLoadingUser) return <Loader />

    if (!authorized)
        return <Unauthorized />

    return (
        <Routes>
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="projects/add" element={<NewProject />} />
            {/* Invoices */}
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/add" element={<NewInvoice />} />
            <Route path="invoice/:id" element={<Invoice />} />
            {/* * Path */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default LimeyfyRouting;