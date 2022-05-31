import { Link } from "@tanstack/react-location";
import UnauthorizedSvg from "../../assets/svgs/lock-dynamic-color.svg";

const Unauthorized = () => {
    return (
        <div className="w-full min-h-screen px-10 flex items-center justify-center">
            <div className="flex flex-row-reverse items-center justify-center max-w-6xl flex-wrap-reverse">
                <div className="w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl mb-8">Unauthorized</h1>
                    <p className="text-xl mb-10">Seems like you are trying to access a page you do not have access to. Go back to home by clicking the button below.</p>
                    <Link to="/" className="bg-gradient-to-br from-limeyfy-400 to-limeyfy-600 py-2 text-xl md:text-2xl px-5 rounded-2xl shadow-xl">
                        Return to home
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <img className="w-96" src={UnauthorizedSvg} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;