import { useQuery } from "react-query";
import Cms from "../../../components/cms/Cms";
import { fetchProjects } from "../../../scripts/fetch";

const NewProject = () => {
    const { refetch } = useQuery("limeyfy_projects", fetchProjects)
    return (
        <>
            <Cms
                title="Create new project"
                submitBtnText="Create"
                submit={{
                    endpoint: "/limeyfy/project",
                    onSuccessAfterToast: () => refetch()
                }}
                props={[
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
                        name: "hours",
                        type: "number",
                        options: {
                            placeholder: "10"
                        }
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
        </>
    );
}

export default NewProject;