import RevenueStatistics from "../components/statistics/RevenueStatistics";
import useAuth from "../hooks/useAuth";


const GetGreeting = () => {
    const now = new Date();
    const time = parseInt(now.toTimeString().substring(0, 2));
    if (time < 12) return "Good morning";
    if (time < 16) return "Good afternoon"
    return "Good evening"
}


const Home = () => {
    const finance = ["finance", "admin"];

    const { user, roles } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-regular">{GetGreeting()}, {user.firstName?.length > 0 ? user.firstName : user.userName}</h1>
            {(!finance || roles.some(x => finance.includes(x))) && (
                <RevenueStatistics />
            )}
        </div>
    );
}

export default Home;