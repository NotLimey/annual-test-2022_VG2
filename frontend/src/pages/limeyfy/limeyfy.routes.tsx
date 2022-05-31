import Cms from "@/components/cms/Cms";
import EditItem from "@/components/dynamic-components/EditItem";
import { fetchProjects } from "@/scripts/fetch";
import { TProject } from "@/types/Limeyfy";
import { DefaultGenerics, Route } from "@tanstack/react-location";
import { QueryClient } from "react-query";
import EditProject from "./projects/EditProject";
import Project from "./projects/Project";
import Projects from "./projects/Projects";

const queryClient = new QueryClient();

export const limeyfyRoutes: Route<DefaultGenerics>[] = [
    {
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
    }
]