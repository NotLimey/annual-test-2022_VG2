import { useEffect, useState } from "react";
import NoAccessImg from "../../assets/images/RoadSignNo.png";

interface ErrorPageProps {
    errorMsg?: string;
    apiStatus?: number;
}

const ErrorPage = (props: ErrorPageProps) => {
    const [message, setMessage] = useState("There was an unexpected error")

    useEffect(() => {
        if (props.errorMsg) {
            setMessage(props.errorMsg);
            return;
        }

        if (props.apiStatus !== undefined) {
            const status = getMessageFromStatus(props.apiStatus);
            console.log(status)
            setMessage(status);
            return;
        }

    }, [props.apiStatus, props.errorMsg])

    return (
        <div className="w-full h-screen flex justify-center">
            <div className="max-w-xl flex justify-center items-center">
                <div className="max-h-96 w-full">
                    <img src={NoAccessImg} alt="" />
                </div>
                <div className="max-h-96 w-full">
                    <h1 className="text-2xl font-regular">{message}</h1>
                </div>
            </div>
        </div>
    );
}

function getMessageFromStatus(status: number) {
    switch (status) {
        case 0:
            return "Couldn't connect to the server, try again later or check your internet connection";
        case 401:
            return "You are not authorized to access this page";
        case 403:
            return "You are not authorized to access this page";
        case 404:
            return "The page you are looking for does not exist";
        case 500:
            return "There was an unexpected error";
        default:
            return "There was an unexpected error";
    }
}

export default ErrorPage;