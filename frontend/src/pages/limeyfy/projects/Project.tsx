import DescriptionList from "@/components/information/DescriptionList";
import { classNames } from "@/scripts/tailwind";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import Cms from "../../../components/cms/Cms";
import Loader from "../../../components/loaders/Loader";
import { fetchHours, fetchProjects } from "../../../scripts/fetch";
import { THour, TProject } from "../../../types/Limeyfy";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState<null | TProject>()
    const { data, isLoading: dataLoading, refetch } = useQuery("limeyfy_projects", fetchProjects)
    const { data: hours } = useQuery(["limeyfy_projects", id], () => fetchHours(id as string))

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
            <div className="mt-8 bg-white dark:bg-stone-800 sm:rounded-lg">
                <div className={classNames("border-b px-4 py-2 sm:px-6 border-b-gray-200 dark:border-b-stone-700")}>
                    Hour summary in "{project.title}"
                </div>
                {hours?.data.map((hour: THour, idx: number) => (
                    <div className={classNames(idx !== hours.data.length - 1 ? "border-b" : "", "px-4 py-3 sm:px-6 border-b-gray-200 dark:border-b-stone-700 text-sm flex flex-col sm:flex-row items-center")} key={idx}>
                        <div className="mb-4 sm:mb-0">
                            <span className="bg-gray-200 dark:bg-stone-700 px-2 py-1 sm:mr-3 rounded-md">{hour.hours}</span>
                        </div>
                        <p>{hour.description}</p>
                        <div className="h-full mt-4 sm:mt-0 text-center sm:ml-3">
                            {new Date(`${hour.date}`).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Project;