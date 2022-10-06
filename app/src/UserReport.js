// import Sidebar from "./sidebar";
// import { useEffect, useState } from "react";
// import { API_GET } from "./api";
// import ReportList from "./ReportList";

export default function UserReport() {

    // const [gameReport, setGameReport] = useState([]);

    // useEffect(() => {
    //     async function fetchData(patientNo) {
    //         const response = await API_GET("game_report/" + patientNo);

    //         let json = await response.json();

    //         console.log(json);

    //         setGameReport(json.data);
    //     }

    //     fetchData([]);
        
    // }, []);

    return(
        <>
            {/* <div className="container-fluid">
                <div className="row">
                    <div className="col-2 bg p-0">
                        <Sidebar />
                    </div>
                    <div className="col-10 p-0">
                        <h1 className="title">รายงานผลการทำกิจกรรมบำบัด</h1>

                        <div className="p-5 hight-one">
                            <div className="content border rounded-3 p-2 shadow">
                                <div className="px-4 overflow">
                                    {
                                        gameReport.map(item => (
                                            <ReportList
                                            key={item.game_no}
                                            data={item} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}