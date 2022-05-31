import DescriptionList from "@/components/information/DescriptionList";
import Loader from "@/components/loaders/Loader";
import { fetchHours, fetchProjects } from "@/scripts/fetch";
import { classNames } from "@/scripts/tailwind";
import { THour, TProject } from "@/types/Limeyfy";
import { Link, useLocation, useMatch } from "@tanstack/react-location";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Project = () => {
    const { params: { id } } = useMatch();
    const [project, setProject] = useState<null | TProject>()
    const { data, isLoading: dataLoading } = useQuery("limeyfy_projects", fetchProjects)
    const { data: hours } = useQuery(["limeyfy_projects", id], () => fetchHours(id as string), {
        refetchOnMount: true
    })

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const location = useLocation();

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
            <DescriptionList
                object={project}
                title={project.title}
                editPath={location.current.pathname + "/edit"}
                ignoreValues={["id"]}
                customFormatting={[
                    {
                        name: "created",
                        func: obj => new Date(`${obj}`).toLocaleDateString()
                    }
                ]}
            />
            <div className="mt-8 bg-white dark:bg-stone-800 sm:rounded-lg">
                <div className={classNames(hours?.data.length > 0 ? "border-b" : "", "px-4 py-5 sm:px-6 border-b-gray-200 dark:border-b-stone-700 flex justify-between items-center gap-x-2")}>
                    <p>
                        Hour summary in "{project.title}"
                    </p>
                    <Link
                        to={"/limeyfy/hours/add?id=" + project.id}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-limeyfy-600 hover:bg-limeyfy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-limeyfy-500"
                    >
                        Add
                    </Link>
                </div>
                {hours?.data.map((hour: THour, idx: number) => (
                    <div className={classNames(idx !== hours.data.length - 1 ? "border-b" : "", "px-4 py-4 sm:px-6 border-b-gray-200 dark:border-b-stone-700 text-sm flex flex-col sm:flex-row items-center justify-between")} key={idx}>

                        <p className="w-full text-left">{hour.description}</p>
                        <div className="mt-4 sm:mt-0">
                            <span className="bg-gray-200 dark:bg-stone-700 px-2 py-1 sm:ml-5 rounded-md">{hour.hours}</span>
                        </div>
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