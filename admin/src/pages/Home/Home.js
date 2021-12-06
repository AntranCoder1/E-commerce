import React, { useEffect, useMemo, useState } from 'react';
import Chart from '../chart/Chart';
import FeaturedInfo from '../featuredInfo/FeaturedInfo';
import { data } from '../../data';
import './Home.css';
import WidgetSm from '../widgetSm/WidgetSm';
import Widgetlg from '../Widgetlg/Widgetlg';
import { userRequest } from '../../requestMethod';

const Home = () => {

    const [userStats, setUserStats] = useState([]);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats");
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Active User": item.total },
                    ])
                );
            } catch {}
        };
        getStats();
    }, [MONTHS]);

    console.log(userStats)

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid datakey="Active User" />
            <div className="homwWidgets">
                <WidgetSm />
                <Widgetlg />
            </div>
        </div>
    )
}

export default Home
