import { useQuery } from "react-query";
import { fetchStatisticsRevenue, fetchStatisticsRevenueLastYear } from "../../scripts/fetch";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from "react";
import { classNames } from "../../scripts/tailwind";
import useSettings from "../../hooks/useSettings";

interface IRevenueStatisticsData {
    lastYear: number;
    thisYear: number;
    last30Days: number;
    total: number;
    thisYearDataSets: {
        label: string;
        income: number;
        expense: number;
    }[];
}

const RevenueStatistics = () => {
    const { data } = useQuery("statistics_revenue_last_year", fetchStatisticsRevenue);
    const [stats, setStats] = useState<IRevenueStatisticsData>();
    const { settings } = useSettings();

    useEffect(() => {
        if (data?.data) {
            setStats(data.data);
        }
    }, [data])

    if (!stats) return <></>;

    return (
        <>
            <div className={classNames(settings.sensitiveDataMode ? "blur-lg" : "", "mt-5")}>
                <div>
                    <h3 className="text-lg md:text-xl leading-6 font-medium text-gray-900 dark:text-gray-100">Revenue over the last year</h3>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="px-4 py-5 bg-white dark:bg-stone-800 shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Last 30 days</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">Kr {stats.last30Days.toLocaleString()},- </dd>
                        </div>
                        <div className="px-4 py-5 bg-white dark:bg-stone-800 shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">This year</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">Kr {stats.thisYear.toLocaleString()},- </dd>
                        </div>
                        <div className="px-4 py-5 bg-white dark:bg-stone-800 shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">Total</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">Kr {stats.total.toLocaleString()},- </dd>
                        </div>
                    </dl>
                </div>
                <div className={classNames(settings.sensitiveDataMode ? "hidden" : "", "w-full h-96 bg-gray-200 px-5 py-3 rounded-lg shadow-md dark:bg-stone-800 my-5 flex flex-col")}>
                    <div className="w-full h-full max-h-fit">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.thisYearDataSets}>
                                <Tooltip />
                                <YAxis />
                                <XAxis dataKey="label" />
                                <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} unit=" Kr" name="Expenses" />
                                <Line type="monotone" dataKey="income" stroke="#5cb85c" strokeWidth={2} unit=" Kr" name="Revenue" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div >
        </>
    );
}

export default RevenueStatistics;