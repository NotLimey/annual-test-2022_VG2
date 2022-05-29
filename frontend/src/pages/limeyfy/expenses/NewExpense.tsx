import Cms from "../../../components/cms/Cms";

const NewExpense = () => {
    return (
        <>
            <Cms
                title="Create new expense"
                submitBtnText="Create"
                submit={{
                    endpoint: "/expenses",
                }}
                fields={[
                    {
                        name: "date",
                        type: "date"
                    },
                    {
                        name: "amount",
                        type: "number"
                    },
                    {
                        name: "description",
                        type: "text"
                    },
                    {
                        name: "category",
                        type: "string"
                    },
                    {
                        name: "to",
                        type: "string"
                    },
                    {
                        name: "toLink",
                        type: "string"
                    },
                    {
                        name: "why",
                        type: "string"
                    }
                ]}
            />
        </>
    );
}

export default NewExpense;