import Cms from "@/components/cms/Cms";
import Loader from "@/components/loaders/Loader";
import { fetchProjects } from "@/scripts/fetch";
import { TProject } from "@/types/Limeyfy";
import { useMatch } from "@tanstack/react-location";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const EditProject = () => {
    const { params: { id } } = useMatch();
    const [project, setProject] = useState<null | TProject>()
    const { data, isLoading: dataLoading, refetch } = useQuery("limeyfy_projects", fetchProjects)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        console.log(id)
        if (dataLoading || !id || !data) return;
        const obj: TProject = data.data.find((x: TProject) => x.id === id);
        if (obj) {
            setProject(obj);
        } else {
            setError(true);
        }

        setIsLoading(false)
    }, [id, data, isLoading])

    if (isLoading) return <Loader className="mt-12" />

    if (error || !project) return (
        <div>
            Cannot find project with this id
        </div>
    )

    return (
        <>
            <Cms
                title="Edit project"
                edit
                submit={{
                    endpoint: "/limeyfy/project",
                    onSuccessAfterToast: () => refetch(),
                    options: {
                        method: "PUT"
                    },
                    headers: {
                        "Id": project.id
                    }
                }}
                fields={[
                    {
                        name: "title",
                        type: "string",
                        value: project.title,
                        options: {
                            placeholder: "Project title"
                        }
                    },
                    {
                        name: "description",
                        type: "text",
                        value: project.description,
                        options: {
                            placeholder: "..."
                        }
                    },
                    {
                        name: "privateNote",
                        type: "text",
                        value: project.privateNote,
                        options: {
                            placeholder: "..."
                        }
                    },
                    {
                        name: "referenceLink",
                        type: "string",
                        value: project.referenceLink,
                        options: {
                            placeholder: "https://vg.no"
                        }
                    },
                    {
                        name: "isCompleted",
                        type: "boolean",
                        value: project.isCompleted
                    },
                    {
                        name: "isPublic",
                        type: "boolean",
                        value: project.isPublic
                    },
                    {
                        name: "hours",
                        type: "number",
                        value: project.hours,
                        options: {
                            placeholder: "10"
                        }
                    },
                    {
                        name: "linesOfCode",
                        type: "number",
                        value: project.linesOfCode,
                        options: {
                            placeholder: "3000"
                        }
                    }
                ]}
            />
        </>
    );
}

export default EditProject;