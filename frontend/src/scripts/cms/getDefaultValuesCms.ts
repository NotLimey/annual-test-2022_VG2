import { ICmsProp } from "../../components/cms/CmsTypes";

const getDefaultValuesCms = (props: ICmsProp[]) => {
    let formData: ICmsProp[] = [];
    for (var i = 0; i < props.length; i++) {
        let item = props[i];
        let val = item.value;
        if (item.type === "object") {
            if (!item.fields || !item.fields.length) {
                throw Error(
                    "A property of type 'object' needs at least one field in fields."
                );
            }
            for (var f = 0; f < item.fields?.length; f++) {
                let objItem = item.fields[f];
                let val2 = objItem.value;
                if (!val2) {
                    switch (objItem.type) {
                        case "boolean": {
                            val2 = false;
                            break;
                        }
                        case "number": {
                            val2 = 0;
                            break;
                        }
                        default:
                            val2 = "";
                    }
                }
                objItem.value = val2;
                item.fields[f] = objItem;
            }
        }
        if (!val) {
            switch (item.type) {
                case "array": {
                    val = new Array();
                    break;
                }
                case "object": {
                    val = {};
                    break;
                }
                case "boolean": {
                    val = false;
                    break;
                }
                case "number": {
                    val = 0;
                    break;
                }
                case "select": {
                    if (!item.select)
                        throw Error("If you use the type 'select' you have to provide a values to 'select'")

                    if (item.select.onSet) {
                        val = item.select.onSet(item.select.defaultValue(item.select.data));
                        break;
                    }
                    val = item.select.defaultValue(item.select.data);
                    break;
                }
                default:
                    val = "";
            }
        }
        item.value = val;
        formData.push(item);
    }
    return formData;
}

export default getDefaultValuesCms;