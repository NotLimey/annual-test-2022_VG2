import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import Companies from "./company/Companies";
import Company from "./company/Company";
import NewCompany from "./company/NewCompany";
import Roles from "./roles/Roles";
import EditUser from "./users/EditUser";
import Register from "./users/Register";
import Users from "./users/Users";

const AuthRoutes = () => {
    const { roles } = useAuth();
    const [authorized, setAuthorized] = useState(false)
    const perms = ["admin"]

    useEffect(() => {
        const _authorized = roles.some(x => perms.includes(x));
        setAuthorized(_authorized);
    }, [roles])

    if (!authorized) {
        return (
            <div>
                You dont have permissions to this site
            </div>
        )
    }

    return (
        <Routes>
            <Route path="companies" element={<Companies />} />
            <Route path="companies/:id" element={<Company />} />
            <Route path="companies/add" element={<NewCompany />} />
            {/* Roles */}
            <Route path="roles" element={<Roles />} />
            {/* Users */}
            <Route path="users" element={<Users />} />
            <Route path="users/register" element={<Register />} />
            <Route path="users/:id" element={<EditUser />} />
        </Routes>
    );
}

export default AuthRoutes;