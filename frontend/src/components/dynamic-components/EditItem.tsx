import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface EditItemProps<Type> {
    id: string;
    returnElement: (data: Type, dataArray: Type[]) => React.ReactNode | Element;
    query: [string, () => void];
    identifier?: string;
}

const EditItem = <Type,>({ id, query, returnElement, identifier }: EditItemProps<Type>) => {
    const [loading, setLoading] = useState(true)
    const [object, setObject] = useState<Type | null>(null)
    const [objects, setObjects] = useState<Type[]>([])
    const { data } = useQuery(query[0], query[1])

    useEffect(() => {
        if (!data) return;
        setObjects(data);
        const obj = (data as Type[]).find(x => (x as any)[identifier ?? "id"] === id);
        if (obj) {
            setObject(obj)
        }
        setLoading(false);
    }, [data])

    if (loading) return <p>Loading...</p>

    if (!object) return <p>An error occurred, check if the path is correct</p>

    return (
        <>
            {returnElement(object, objects)}
        </>
    )
}

export default EditItem;