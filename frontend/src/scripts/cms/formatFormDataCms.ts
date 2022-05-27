import { ICmsProp } from "../../components/cms/CmsTypes";

const formatFormDataCms = (form: ICmsProp[]) => {
    let formData: any = {};
    for (var i = 0; i < form.length; i++) {
        const item = form[i];
        let val = item.value;
        if (item.type === "number") {
            const number = parseInt(val);
            if (number) {
                val = number;
            } else {
                val = 0;
            }
        }
        formData[item.name] = val;
    }
    return formData;
}

export default formatFormDataCms;