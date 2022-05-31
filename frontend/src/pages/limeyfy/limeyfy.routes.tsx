import Cms from "@/components/cms/Cms";
import EditItem from "@/components/dynamic-components/EditItem";
import NotFound from "@/components/status-pages/NotFound";
import { fetchProjects } from "@/scripts/fetch";
import { TProject } from "@/types/Limeyfy";
import { DefaultGenerics, Route } from "@tanstack/react-location";
import React from "react";
import { QueryClient } from "react-query";
import NewHour from "./hours/NewHour";

const Invoice = React.lazy(() => import("./invoices/Invoice"));
const NewInvoice = React.lazy(() => import("./invoices/NewInvoice"));
const Invoices = React.lazy(() => import("./invoices/Invoices"));

const Projects = React.lazy(() => import("./projects/Projects"));
const Project = React.lazy(() => import("./projects/Project"));
const EditProject = React.lazy(() => import("./projects/EditProject"));

const Expenses = React.lazy(() => import("./expenses/Expenses"));
const NewExpense = React.lazy(() => import("./expenses/NewExpense"));

const queryClient = new QueryClient();

export const limeyfyRoutes: Route<DefaultGenerics>[] = [
    { // Projects
        path: "projects",
        loader: async () => await queryClient.getQueryData("projects") ?? await queryClient.fetchQuery("projects", fetchProjects).then(() => ({})),
        children: [
            {
                path: "/",
                element: <Projects />
            },
            {
                path: "add",
                element: (
                    <Cms
                        title="Create new project"
                        submitBtnText="Create"
                        submit={{
                            endpoint: "/limeyfy/project",
                            onSuccessAfterToast: () => queryClient.refetchQueries("projects")
                        }}
                        fields={[
                            {
                                name: "title",
                                type: "string",
                                options: {
                                    placeholder: "Project title"
                                }
                            },
                            {
                                name: "description",
                                type: "text",
                                options: {
                                    placeholder: "..."
                                }
                            },
                            {
                                name: "privateNote",
                                type: "text",
                                options: {
                                    placeholder: "..."
                                }
                            },
                            {
                                name: "linkToProject",
                                type: "string",
                                options: {
                                    placeholder: "https://vg.no"
                                }
                            },
                            {
                                name: "isCompleted",
                                type: "boolean",
                                value: true
                            },
                            {
                                name: "isPublic",
                                type: "boolean",
                            },
                            {
                                name: "linesOfCode",
                                type: "number",
                                options: {
                                    placeholder: "3000"
                                }
                            }
                        ]}
                    />
                )
            },
            {
                path: ":id",
                children: [
                    {
                        path: "/",
                        element: <Project />,
                    },
                    {
                        path: "edit",
                        element: async ({ params: { id } }) => {
                            return (
                                <EditItem<TProject>
                                    id={(id as string)}
                                    query={["projects", async () => (await fetchProjects()).data]}
                                    returnElement={(project) => <EditProject project={project} />}
                                />
                            )
                        }
                    }
                ]
            }
        ]
    },
    { // Invoices
        path: "invoices",
        children: [
            {
                path: "/",
                element: <Invoices />
            },
            {
                path: "/add",
                element: <NewInvoice />
            },
            {
                path: ":id",
                element: <Invoice />
            }
        ]
    },
    { // Expenses
        path: "expenses",
        children: [
            {
                path: "/",
                element: <Expenses />
            },
            {
                path: "/add",
                element: <NewExpense />
            }
        ]
    },
    { // Hours
        path: "hours/add",
        element: <NewHour />
    },
    { // Not found
        path: "*",
        element: <NotFound />
    }
]