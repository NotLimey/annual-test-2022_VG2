import { formatPascalAndSpace } from "../../scripts/text";
import { ICmsProp } from "./CmsTypes";

interface ICmsTextField {
    prop: ICmsProp;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CmsTextField = (props: ICmsTextField) => {
    return (
        <div className="mb-5">
            <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {props.prop.title ?? formatPascalAndSpace(props.prop.name)}
            </label>
            <div className="mt-1">
                <textarea
                    rows={4}
                    name={props.prop.name}
                    id={props.prop.name}
                    className="shadow-sm focus:ring-limeyfy-500 focus:border-limeyfy-500 block w-full sm:text-sm border-gray-300 dark:border-stone-700 dark:bg-stone-800 rounded-md"
                    value={props.prop.value}
                    placeholder={props.prop.options?.placeholder ?? ""}
                    onChange={(e) => props.onChange(e)}
                />
            </div>
        </div>
    );
};

export default CmsTextField;
