import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.localStorage.removeItem("token");
        navigate("/")
    }, [navigate])


    return (
        <div></div>
    );
}

export default SignOut;