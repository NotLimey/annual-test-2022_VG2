import { AxiosPromise } from "axios";
import { QueryFunction, useQuery } from "react-query";

interface EditItemProps<Type> {
    id: string;
    children?: React.ReactNode;
    query: [string, () => void];
}

const EditItem = <Type,>({ id, children, query }: EditItemProps<Type>) => {
    const { data } = useQuery(query[0], query[1])

    return (
        <div>
            {id}
            {JSON.stringify(data)}
        </div>
    );
}

export default EditItem;