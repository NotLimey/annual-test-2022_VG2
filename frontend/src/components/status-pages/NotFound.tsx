import { Link } from "react-router-dom";
import Robot404 from "../../assets/svgs/404Error.svg";


const NotFound = () => {
    return (
        <div className="w-full min-h-screen px-10 flex items-center justify-center">
            <div className="flex items-center justify-center max-w-6xl flex-wrap-reverse">
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl mb-8">Ooooops...</h1>
                    <p className="text-xl mb-10">Seems like the page you are trying to access doesn't exist :/ Dont worry you can go back to home by clicking the button below.</p>
                    <Link to="/" className="bg-gradient-to-br from-limeyfy-400 to-limeyfy-600 py-2 text-xl md:text-2xl px-5 rounded-2xl shadow-xl">
                        Return to home
                    </Link>
                </div>
                <div className="w-full md:w-1/2">
                    <img src={Robot404} alt="" />
                </div>
            </div>
        </div>
    );
}

export default NotFound;