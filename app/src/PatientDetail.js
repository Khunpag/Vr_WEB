import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./sidebar";

export default function PatientDetail() {
    let params = useParams();

    const [sex, setSex] = useState(0);
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [weight, setWeight] = useState(0.0);
    const [hight, setHight] = useState(0.0);
    const [neck, setNeck] = useState(0.0);
    const [arm, setArm] = useState(0.0);
    const [bust, setBust] = useState(0.0);
    const [diseases, setDiseases] = useState("");
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [gTwo, setGTwo] = useState(0);
    const [gThree, setGThree] = useState(0);

    let navigate = useNavigate();

    return (
        <>
            {/* Patient detail No: {params.patientNo} */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 bg p-0">
                        <Sidebar />
                    </div>
                    <div className="col-10 p-0">
                        <h1 className="title">แก้ไขบัญชีผู้ป่วย</h1>

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