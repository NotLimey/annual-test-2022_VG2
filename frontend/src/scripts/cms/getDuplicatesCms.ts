import { ICmsProp } from "../../components/cms/CmsTypes";

const checkIfDuplicateExists = (arr: string[]) => (new Set(arr).size !== arr.length);

const isDuplicates = (props: ICmsProp[]) => {
    const names = props.map(x => x.name);
    let isDuplicates = checkIfDuplicateExists(names);
    if (isDuplicates)
        return isDuplicates;

    for (var i = 0; i < props.length; i++) {
        const item = props[i];
        if (item.fields) {
            const fNames = item.fields.map(x => x.name);
            isDuplicates = checkIfDuplicateExists(fNames);
        }
    }

    return isDuplicates;
}

export default isDuplicates;