import { useState , useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_GET, API_POST } from "./api";
import Sidebar from "./sidebar";

export default function UserDetail() {
    let params = useParams();

    const [sex, setSex] = useState(0);
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
   
    let navigate = useNavigate();

    useEffect (() => {
        async function fetchData(personNo) {
            let json = await API_GET("personData/" + personNo);
    
            // var data = json
            var data = json.data.rows[0];
            // var data1 = json.data1.rows[0];
            // var data2 = json.data2.rows[0];
            // var data3 = json.data3.rows[0];
    
            setpersonNo(data.person_no);
            setSex(data.sex);
            setDate(data.birthday);
            setUserNo(data.user_no);
            // setGTwo(data2.level_two);
            // setGThree(data3.level_three);
        
        }

        if (params.person_ != "add") {
            fetchData([params.person_no]);
        }
    }, [params.person_no]);

    return (
        <>
            {/* Patient detail No: {params.patientNo} */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 bg p-0">
                        <Sidebar />
                    </div>
                    <div className="col-10 p-0">
                        <h1 className="title">แก้ไขบัญชีผู้ใช้</h1>

                        <div className="p-5 hight-one">
                            <div className="content border rounded-3 p-2 shadow">
                                <Form>
                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>เพศ</Form.Label>
                                            <Form.Select
                                                value={sex}
                                                onChange={(e) => setSex(e.target.value)}
                                                required>
                                                <option label="เพศ"></option>    
                                                {
                                                    sex.map(item => (
                                                        <option
                                                            ></option>
                                                    ))
                                                }
                                            </Form.Select>

                                        </Form.Group>
                                    </Row>
                                    <Row>

                                    </Row>
                                    <Row>

                                    </Row>
                                    <Row>

                                    </Row>
                                    <Row>

                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}