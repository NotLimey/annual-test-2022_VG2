import DescriptionList from "@/components/information/DescriptionList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import Cms from "../../../components/cms/Cms";
import Loader from "../../../components/loaders/Loader";
import { fetchProjects } from "../../../scripts/fetch";
import { TProject } from "../../../types/Limeyfy";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState<null | TProject>()
    const { data, isLoading: dataLoading, refetch } = useQuery("limeyfy_projects", fetchProjects)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const location = useLocation();

    useEffect(() => {
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
            <DescriptionList
                object={project}
                title={project.title}
                editPath={location.pathname + "/edit"}
                ignoreValues={["id"]}
                customFormatting={[
                    {
                        name: "created",
                        func: obj => new Date(`${obj}`).toLocaleDateString()
                    }
                ]}
            />
        </>
    );
}

export default Project;