// import React from "react";
// import { useEffect, useState } from "react";
// import Loader from "../../components/loaders/Loader";
// import NotFound from "../../components/status-pages/NotFound";
// import Unauthorized from "../../components/status-pages/Unauthorized";
// import useAuth from "../../hooks/useAuth";
// import Expenses from "./expenses/Expenses";
// import NewExpense from "./expenses/NewExpense";
// import NewHour from "./hours/NewHour";
// import Invoice from "./invoices/Invoice";
// import Invoices from "./invoices/Invoices";
// import NewInvoice from "./invoices/NewInvoice";
// import Project from "./projects/Project";
// import Projects from "./projects/Projects";

// const EditProject = React.lazy(() => import("./projects/EditProject"));
// const NewProject = React.lazy(() => import("./projects/NewProject"));

// const LimeyfyRouting = () => {
//     const { roles: userRoles, isLoadingUser } = useAuth();
//     const [authorized, setAuthorized] = useState(false)
//     const perms = ["admin", "limeyfy"]

//     useEffect(() => {
//         const _authorized = userRoles.some(x => perms.includes(x));
//         setAuthorized(_authorized);
//     }, [userRoles])


//     if (isLoadingUser) return <Loader />

//     if (!authorized)
//         return <Unauthorized />

//     return (
//         <Routes>
//             <Route path="projects" element={<Projects />} />
//             <Route path="projects/:id" element={<Project />} />
//             <Route path="projects/:id/edit" element={<React.Suspense fallback={<Loader />}><EditProject /></React.Suspense>} />
//             <Route path="projects/add" element={<React.Suspense fallback={<Loader />}><NewProject /></React.Suspense>} />
//             {/* Invoices */}
//             <Route path="invoices" element={<Invoices />} />
//             <Route path="invoices/add" element={<NewInvoice />} />
//             <Route path="invoice/:id" element={<Invoice />} />
//             {/* Expenses */}
//             <Route path="expenses" element={<Expenses />} />
//             <Route path="expenses/add" element={<NewExpense />} />
//             {/* Hours */}
//             <Route path="hours/add" element={<NewHour />} />
//             {/* * Path */}
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     );
// }

// export default LimeyfyRouting;

const LimeyfyRouting = () => {
    return (
        <div></div>
    );
}

export default LimeyfyRouting;