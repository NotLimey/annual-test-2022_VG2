import { DefaultGenerics, Route } from "@tanstack/react-location";
import Companies from "./company/Companies";
import Company from "./company/Company";
import EditCompany from "./company/EditCompany";
import NewCompany from "./company/NewCompany";
import Roles from "./roles/Roles";
import EditUser from "./users/EditUser";
import Register from "./users/Register";
import Users from "./users/Users";



export const authRoutes: Route<DefaultGenerics>[] = [
    { // Companies
        path: "companies",
        children: [
            {
                path: "/",
                element: <Companies />
            },
            {
                path: "add",
                element: <NewCompany />
            },
            {
                path: ":id",
                children: [
                    {
                        path: "/",
                        element: <Company />
                    },
                    {
                        path: "edit",
                        element: <EditCompany />
                    }
                ]
            }
        ]
    },
    { // Roles
        path: "roles",
        element: <Roles />
    },
    { // Users
        path: "users",
        children: [
            {
                path: "/",
                element: <Users />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: ":id",
                element: <EditUser />
            }
        ]
    }
]