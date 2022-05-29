import { classNames } from "../../scripts/tailwind";
import { formatPascalAndSpace } from "../../scripts/text";
import { ICmsOptions, ICmsField } from "./CmsTypes";

interface ICmsBooleanCheckBox {
    prop: ICmsField;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CmsBooleanCheckBox = (props: ICmsBooleanCheckBox) => {
    return (
        <div className="relative flex items-start mb-5">
            <div className="min-w-0 flex-1 text-sm">
                <label className="font-medium text-gray-700 dark:text-gray-300 select-none">
                    {props.prop.title ?? formatPascalAndSpace(props.prop.name)}
                </label>
            </div>
            <div className={classNames(props.prop.options?.sensitive ? "blur-lg" : "", "ml-3 flex items-center h-5")}>
                <input
                    type="checkbox"
                    name={props.prop.name}
                    id={props.prop.name}
                    className="focus:ring-limeyfy-500 h-5 w-5 text-limeyfy-600 border-gray-300 dark:border-stone-700 dark:bg-stone-800 rounded"
                    checked={props.prop.value}
                    onChange={(e) => props.onChange(e)}
                />
            </div>
        </div>
    );
};

export default CmsBooleanCheckBox;
