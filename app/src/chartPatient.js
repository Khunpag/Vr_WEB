import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { API_GET } from "./api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Navigate } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        Legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'รายงานผลรวมการทำกิจกรรมบำบัด',
        },
    },
};

export default function ChartPatient(){
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        async function fetchData() {
            let json = await API_GET("report");

            // console.log(json);
            var labels = [];
            var data = [];
            // console.log(json);
            json.data.rows.map( item => {
                labels.push(item.game_name);
                data.push(item.count);
            })

            // for (var i = 0; i < json.data.rows; i++) {
            //     var item = json.data.rows[i];
            //     labels.push(item.game_name);
            //     data.push(item.count);
            // }

            var dataset = {
                labels: labels,
                datasets: [
                    {
                        label: "จำนวนการทำกิจกรรมบำบัดของผู้ป่วยทั้งหมด",
                        data: data,
                        backgroundColor: "rgba(175, 159, 223, 0.8)"
                    }
                ]
            }
            setChartData(dataset);
            setIsLoading(true);
        }

        fetchData();
    }, []);

    const getChart = () => {
        if (isLoading) {
            return <Bar options={options} data={chartData} />;
        }

        return <></>;
    }

    if (localStorage.getItem("access_token")) {
        return(
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 bg p-0">
                            <Sidebar />
                        </div>
                        <div className="col-10 p-0">
                            <h1 className="title">ผลรวมการทำกิจกรรมบำบัด</h1>
                            
                            <div className="p-5 hight-two">
                                <div className="content border rounded-3 p-2 shadow hight-two">
                                    <div>
                                        {
                                            getChart()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return(
        <Navigate to="/" replace />
    );
    
}