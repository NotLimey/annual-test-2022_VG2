import { useLocation, useNavigate } from "@tanstack/react-location";


const BackBtn = () => {
    const location = useLocation();
    return (
        <button onClick={() => location.history.back()} className="text-md text-gra-700 dark:text-gray-100 flex items-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.25 6.75L4.75 12L10.25 17.25" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 12H5" />
            </svg>
            Back
        </button>
    );
}

export default BackBtn;