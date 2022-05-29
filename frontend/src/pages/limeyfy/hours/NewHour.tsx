import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Cms from "../../../components/cms/Cms";
import { fetchProjects, fetchUsers } from "../../../scripts/fetch";
import { TProject } from "../../../types/Limeyfy";

const NewHour = () => {
    const { data: projects } = useQuery("limeyfy_projects", fetchProjects);

    if (!projects) return <></>;

    if (projects.data.length < 1) return <>The must exist at least one project, create one <Link to="/limeyfy/projects/add" className="text-limeyfy-600">here</Link></>;

    const getDate = () => {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    return (
        <div>
            <Cms
                submit={{
                    endpoint: "/limeyfy/hours",
                }}
                fields={[
                    {
                        name: "projectId",
                        title: "Project",
                        type: "select",
                        select: {
                            data: projects.data ?? [],
                            defaultValue: (data: TProject[]) => data[0],
                            selectIdentifier: "title",
                            onSet: (data: TProject) => data.id
                        }
                    },
                    {
                        name: "date",
                        type: "date",
                        value: getDate(),
                    },
                    {
                        name: "hours",
                        type: "number",
                    },
                    {
                        name: "description",
                        type: "text",
                    }
                ]}
            />
        </div>
    );
}

export default NewHour;