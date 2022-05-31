import Cms from "@/components/cms/Cms";
import { TProject } from "@/types/Limeyfy";

const EditProject = ({ project }: { project: TProject }) => (
    <Cms
        title="Edit project"
        edit
        submit={{
            endpoint: "/limeyfy/project",
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
                name: "linesOfCode",
                type: "number",
                value: project.linesOfCode,
                options: {
                    placeholder: "3000"
                }
            }
        ]}
    />
)

export default EditProject;