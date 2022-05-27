
import { useQuery } from "react-query";
import StackedList from "../../../components/lists/StackedList";
import FullscreenLoader from "../../../components/loaders/FullscreenLoader";
import Loader from "../../../components/loaders/Loader";
import { Spinner } from "../../../components/loaders/Spinner";
import PageHeading from "../../../components/page-headings/PageHeading";
import { fetchProjects } from "../../../scripts/fetch";
import { TProject } from "../../../types/Limeyfy";

const Projects = () => {
    const { data, isLoading } = useQuery("limeyfy_projects", fetchProjects)

    if (isLoading) return <Loader className="mt-12" />

    const projects: TProject[] = data?.data;

    return (
        <div>
            <PageHeading publishPath="/limeyfy/projects/add" publishText="New project">Projects</PageHeading>
            {data && <StackedList
                data={projects}
                badge={(idx) => projects[idx].isPublic ? { color: "green", text: "Public" } : { color: "red", text: "Private" }}
                typeIcon={"CodeIcon"}
                typeAttribute="linesOfCode"
                path={(id) => `/limeyfy/projects/${id}`}
                date={(id) => {
                    const item = projects.find((x: TProject) => x.id === id);
                    if (!item)
                        return <p></p>

                    return (
                        <p>
                            Created, <time dateTime={item.created.toString()}>{new Date(`${item.created}`).toDateString()}</time>
                        </p>
                    )
                }}
            />}
        </div>
    );
}

export default Projects;