import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { API_GET, API_POST } from "./api";
import Sidebar from "./sidebar";
import './style.css';
import { AddModal, DuplicateModal, HomeModal, UpdateModal } from "./modal";

export default function PatientAdd() {
    let params = useParams();

    const [sex, setSex] = useState(0);
    const [weight, setWeight] = useState(0.0);
    const [height, setHeight] = useState(0.0);
    const [neck, setNeck] = useState(0.0);
    const [arm, setArm] = useState(0.0);
    const [bust, setBust] = useState(0.0);
    const [diseases, setDiseases] = useState("ไม่มี");
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [gTwo, setGTwo] = useState(0);
    const [gThree, setGThree] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const [validated, setValidated] = useState(false);
    const [patientNo, setPatientNo] = useState(0);
    const [userNo, setUserNo] = useState(0);
    const [pageTitle, setPageTitle] =useState("");

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [status, setStatus] = useState("");

    let navigate = useNavigate();

    useEffect (() => {
        if(params.actionId == "add"){
            setPageTitle("เพิ่มบัญชีผู้ป่วย");
        }else{
            setPageTitle("แก้ไขบัญชีผู้ป่วย");
        }
    },[])

    useEffect (() => {
        async function fetchData(patientNo) {
            let json = await API_GET("patientData/" + patientNo);

            // var data = json
            var data = json.data.rows[0];
            var data1 = json.data1.rows[0];
            var data2 = json.data2.rows[0];
            var data3 = json.data3.rows[0];

            if(data1.g1_time >= 60){
                var checkMin = parseInt(data1.g1_time / 60);
                var checkMin2 = checkMin * 60;
                var checkSec = data1.g1_time - checkMin2;

                setMin(checkMin);
                setSec(checkSec)
                
            }else{
                setMin(0);
                setSec(data1.g1_time);
            }

            setPatientNo(data.patient_no);
            setSex(data.sex);
            setDate(data.birthday);
            setWeight(data.weight);
            setHeight(data.height);
            setNeck(data.neck_length);
            setArm(data.arm_length);
            setBust(data.bust_waist_length);
            setDiseases(data.related_diseases);
            setUserNo(data.user_no);
            setGTwo(data2.level_two);
            setGThree(data3.level_three);
        
        }

        if (params.actionId != "add") {
            fetchData([params.actionId]);
        }
    }, [params.actionId]);

    const onSave = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // console.log("1234");
        if(form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // console.log("a1234");
            // console.log(params.actionId);
            if(params.actionId == "add") {
                // console.log("b1234");
                onAddModal();
            }else {
                // console.log("c1234");
                onUpdateModal();
            }
        }

        setValidated(true);
    }

    const doAddPatient = async () => {
        console.log("Add");
        let json = await API_POST("patient/add", {
            sex: sex,
            date: date,
            weight: weight,
            height: height,
            neck: neck,
            arm: arm,
            bust: bust,
            diseases: diseases,
            username: username,
            password: password,
            min: min,
            sec: sec,
            gTwo: gTwo,
            gThree: gThree
        });

        // console.log(json.result);
        if(json.result) {
            navigate("/home", { replace: false });
        } else {
            setModalTitle("ไม่สามารถเพิ่มข้อมูลผู้ป่วยได้");
            setModalMessage(json.message);
            setShowModal2(true);
        }
    }

    const doUpdatePatient = async () => {
        // console.log("mmm");
        const json = await API_POST("patient/update", {
            patientNo: patientNo,
            sex: sex,
            date: date,
            weight: weight,
            height: height,
            neck: neck,
            arm: arm,
            bust: bust,
            diseases: diseases,
            min: min,
            sec: sec,
            gTwo: gTwo,
            gThree: gThree
        });

        if(json.result) {
            navigate("/home", { replace: false });
        }
    }

    const onAddModal = async () => {
        setModalTitle("เพิ่มบัญชีผู้ป่วย");
        setModalMessage("ยืนยันการเพิ่มบัญชีผู้ป่วย");
        setShowModal(true);
        // setStatus("add");

        console.log("addModal");
    }

    const onUpdateModal = async () => {
        setModalTitle("แก้ไขข้อมูลผู้ป่วย");
        setModalMessage("ยืนยันการแก้ไขข้อมูลบัญชีผู้ป่วย");
        setShowModal(true);
    }

    const onConfirmUpdate = async () => {
        setShowModal(false);

        console.log("inup");

        doUpdatePatient();
    }

    const onConfirmAdd = async () => {
        setShowModal(false);

        console.log("incon");

        doAddPatient();
    }

    const onHide = () => {
        setShowModal(false);
        setShowModal2(false);
    }

    const onCancel = () => {
        navigate("/home", { replace: false });
    }

    if (localStorage.getItem("access_token")){
        return (
            <>
                {/* Patient detail No: {params.patientNo} */}
    
                {/* <AddModal
                    show={showModal}
                    title={modalTitle}
                    message={modalMessage}
                    onConfirmAdd={onConfirmAdd}
                    onHide={onHide}/>
    
                <UpdateModal
                    show={showModal}
                    title={modalTitle}
                    message={modalMessage}
                    onConfirmUpdate={onConfirmUpdate}
                    onHide={onHide}/> */}
    
                <HomeModal
                    show={showModal}
                    title={modalTitle}
                    message={modalMessage}
                    status={params.actionId}
                    onConfirmAdd={onConfirmAdd}
                    onConfirmUpdate={onConfirmUpdate}
                    onHide={onHide}/>
    
                <DuplicateModal
                    show={showModal2}
                    title={modalTitle}
                    message={modalMessage}
                    onHide={onHide}/>
    
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 bg p-0">
                            <Sidebar />
                        </div>
                        <div className="col-10 p-0">
                            <h1 className="title">{pageTitle}</h1>
    
                            <div className="p-5 hight-one">
                                <div className="content-add border rounded-3 p-2 shadow">
                                    <Form className="m-3" noValidate validated={validated} onSubmit={onSave}>
                                        <Row className="m-b1">
                                            <Col md={4}>
                                                <div className="sex-btn d-inline-block">
                                                    <Form.Group as={Col} controlId="group1">
                                                        <Form.Label>เพศ</Form.Label>
                                                        <Form.Select
                                                            value={sex}
                                                            onChange={(e) => setSex(e.target.value)}
                                                            required
                                                            >
                                                            <option label="เพศ"></option>    
                                                            <option key="male" value="M">ชาย</option>
                                                            <option key="female" value="F">หญิง</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            กรุณากรอก เพศ
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="birth-btn d-inline-block p-0">
                                                    <Form.Group as={Col} controlId="group2">
                                                        <Form.Label>วันเกิด</Form.Label>
                                                        <Form.Control
                                                        required
                                                        type="date"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        กรุณากรอก วันเกิด
                                                    </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                {
                                                    (params.actionId == "add")?
                                                        <div className="login-btn">
                                                            <Form.Group as={Col} controlId="group3">
                                                                <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    placeholder="ชื่อผู้ใช้งาน"
                                                                    value={username}
                                                                    onChange={(e) => setUsername(e.target.value)}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    กรุณากรอก ชื่อผู้ใช้งาน
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </div>
                                                            : <></>
                                                }
                                                
                                            </Col>
                                            <Col md={4}>                             
                                                <div>
                                                    <Col md={6} className="time-btn d-inline-block m-right20">
                                                    <Form.Group as={Col} controlId="group4">
                                                        <Form.Label>ระยะเวลาในเกมที่ 1</Form.Label>
                                                        <Form.Select
                                                            value={min}
                                                            onChange={(e) => setMin(e.target.value)}
                                                            required>
                                                            <option label="นาที" value="0"></option>    
                                                            <option key="m1" value="1">1</option>
                                                            <option key="m2" value="2">2</option>
                                                            <option key="m3" value="3">3</option>
                                                            <option key="m4" value="4">4</option>
                                                            <option key="m5" value="5">5</option>
                                                            <option key="m6" value="6">6</option>
                                                            <option key="m7" value="7">7</option>
                                                            <option key="m8" value="8">8</option>
                                                            <option key="m9" value="9">9</option>
                                                            <option key="m10" value="10">10</option>
                                                            <option key="m11" value="11">11</option>
                                                            <option key="m12" value="12">12</option>
                                                            <option key="m13" value="13">13</option>
                                                            <option key="m14" value="14">14</option>
                                                            <option key="m15" value="15">15</option>
                                                            <option key="m16" value="16">16</option>
                                                            <option key="m17" value="17">17</option>
                                                            <option key="m18" value="18">18</option>
                                                            <option key="m19" value="19">19</option>
                                                            <option key="m20" value="20">20</option>
                                                            <option key="m21" value="21">21</option>
                                                            <option key="m22" value="22">22</option>
                                                            <option key="m23" value="23">23</option>
                                                            <option key="m24" value="24">24</option>
                                                            <option key="m25" value="25">25</option>
                                                            <option key="m26" value="26">26</option>
                                                            <option key="m27" value="27">27</option>
                                                            <option key="m28" value="28">28</option>
                                                            <option key="m29" value="29">29</option>
                                                            <option key="m30" value="30">30</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="time-btn d-inline-block">
                                                    <Form.Group as={Col} controlId="group5">
                                                        <Form.Select
                                                            value={sec}
                                                            onChange={(e) => setSec(e.target.value)}
                                                            required>
                                                            <option label="วินาที" value="0"></option>    
                                                            <option key="s1" value="1">1</option>
                                                            <option key="s2" value="2">2</option>
                                                            <option key="s3" value="3">3</option>
                                                            <option key="s4" value="4">4</option>
                                                            <option key="s5" value="5">5</option>
                                                            <option key="s6" value="6">6</option>
                                                            <option key="s7" value="7">7</option>
                                                            <option key="s8" value="8">8</option>
                                                            <option key="s9" value="9">9</option>
                                                            <option key="s10" value="10">10</option>
                                                            <option key="s11" value="11">11</option>
                                                            <option key="s12" value="12">12</option>
                                                            <option key="s13" value="13">13</option>
                                                            <option key="s14" value="14">14</option>
                                                            <option key="s15" value="15">15</option>
                                                            <option key="s16" value="16">16</option>
                                                            <option key="s17" value="17">17</option>
                                                            <option key="s18" value="18">18</option>
                                                            <option key="s19" value="19">19</option>
                                                            <option key="s20" value="20">20</option>
                                                            <option key="s21" value="21">21</option>
                                                            <option key="s22" value="22">22</option>
                                                            <option key="s23" value="23">23</option>
                                                            <option key="s24" value="24">24</option>
                                                            <option key="s25" value="25">25</option>
                                                            <option key="s26" value="26">26</option>
                                                            <option key="s27" value="27">27</option>
                                                            <option key="s28" value="28">28</option>
                                                            <option key="s29" value="29">29</option>
                                                            <option key="s30" value="30">30</option>
                                                            <option key="s31" value="31">31</option>
                                                            <option key="s32" value="32">32</option>
                                                            <option key="s33" value="33">33</option>
                                                            <option key="s34" value="34">34</option>
                                                            <option key="s35" value="35">35</option>
                                                            <option key="s36" value="36">36</option>
                                                            <option key="s37" value="37">37</option>
                                                            <option key="s38" value="38">38</option>
                                                            <option key="s39" value="39">39</option>
                                                            <option key="s40" value="40">40</option>
                                                            <option key="s41" value="41">41</option>
                                                            <option key="s42" value="42">42</option>
                                                            <option key="s43" value="43">43</option>
                                                            <option key="s44" value="44">44</option>
                                                            <option key="s45" value="45">45</option>
                                                            <option key="s46" value="46">46</option>
                                                            <option key="s47" value="47">47</option>
                                                            <option key="s48" value="48">48</option>
                                                            <option key="s49" value="49">49</option>
                                                            <option key="s50" value="50">50</option>
                                                            <option key="s51" value="51">51</option>
                                                            <option key="s52" value="52">52</option>
                                                            <option key="s53" value="53">53</option>
                                                            <option key="s54" value="54">54</option>
                                                            <option key="s55" value="55">55</option>
                                                            <option key="s56" value="56">56</option>
                                                            <option key="s57" value="57">57</option>
                                                            <option key="s58" value="58">58</option>
                                                            <option key="s59" value="59">59</option>
                                                            <option key="s60" value="60">60</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    </Col>
                                                </div>
                                            </Col>      
                                        </Row>
                                        <Row className="m-b1">
                                            <Col md={4}>
                                                <div className="d-inline-block m-right20 we-btn">
                                                    <Form.Group as={Col} controlId="group6">
                                                        <Form.Label>น้ำหนัก (กก.)</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            value={weight}
                                                            step="0.01"
                                                            max={999}
                                                            min={1}
                                                            onChange={(e) => setWeight(e.target.value)}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            กรุณากรอก น้ำหนัก
                                                        </Form.Control.Feedback>
                                            
                                                    </Form.Group>
                                                </div>
                                                <div className="d-inline-block he-btn">
                                                    <Form.Group as={Col} controlId="group7">
                                                        <Form.Label>ส่วนสูง (ซม.)</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            value={height}
                                                            step="0.01"
                                                            max={999}
                                                            min={1}
                                                            onChange={(e) => setHeight(e.target.value)}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            กรุณากรอก ส่วนสูง
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                
                                            </Col>
                                            <Col md={4}>
                                                {
                                                    (params.actionId == "add")?
                                                        <div className="login-btn">
                                                            <Form.Group as={Col} controlId="group8">
                                                                <Form.Label>รหัสผ่าน</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    type="password"
                                                                    value={password}
                                                                    placeholder="รหัสผ่าน"
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    กรุณากรอก รหัสผ่าน
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </div>
                                                            : <></>
                                                }
                                                
                                            </Col>
                                            <Col md={4}>
                                            {/* {console.log(gTwo)} */}
                                                <div className="g3-btn">
                                                    <Form.Group as={Col} controlId="group9">
                                                        <Form.Label>ระดับความยากเกมที่ 2</Form.Label>
                                                        <Form.Select
                                                        
                                                            value={gTwo}
                                                            onChange={(e) => setGTwo(e.target.value)}
                                                            >
                                                            <option label="ระดับ" value="0"></option>    
                                                            <option key="1" value="1">1</option>
                                                            <option key="2" value="2">2</option>
                                                            <option key="3" value="3">3</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                                                                            
                                            </Col>
                                        </Row>
                                        <Row className="m-b1">
                                            <Col md={4}>
                                                <div className="neck-btn d-inline-block m-right20">
                                                    <Form.Group as={Col} controlId="group10">
                                                        <Form.Label>ความยาวคอ (ซม.)</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            value={neck}
                                                            step="0.01"
                                                            max={999}
                                                            min={1}
                                                            onChange={(e) => setNeck(e.target.value)}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            กรุณากรอก ความยาวคอ
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="d-inline-block arm-btn">
                                                    <Form.Group as={Col} controlId="group11">
                                                        <Form.Label>ความยาวแขน (ซม.)</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            value={arm}
                                                            step="0.01"
                                                            max={999}
                                                            min={1}
                                                            onChange={(e) => setArm(e.target.value)}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            กรุณากรอก ความยาวแขน
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                
                                            </Col>
                                            <Col md={4}>
                                                <div className="g3-btn">
                                                    <Form.Group as={Col} controlId="group12">
                                                        <Form.Label>ระดับความยากเกมที่ 3</Form.Label>
                                                        <Form.Select
                                                            value={gThree}
                                                            onChange={(e) => setGThree(e.target.value)}
                                                            required>
                                                            <option label="ระดับ" value="0"></option>    
                                                            <option key="1" value="1">1</option>
                                                            <option key="2" value="2">2</option>
                                                            <option key="3" value="3">3</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                                
                                            </Col>
                                        </Row>
                                        <Row className="m-b1">
                                            <div className="bust-btn">
                                                <Form.Group as={Col} controlId="group13">
                                                    <Form.Label>ระยะห่างระหว่างอกถึงเอว (ซม.)</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        value={bust}
                                                        step="0.01"
                                                        max={999}
                                                        min={1}
                                                        onChange={(e) => setBust(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        กรุณากรอก ระยะห่างระหว่างอกถึงเอว
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        </Row>
                                        <Row className="m-b1">
                                            <div>
                                                <Form.Group as={Col} controlId="group14">
                                                    <Form.Label>อาการที่เกี่ยวข้อง (ไม่บังคับ)</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={diseases}
                                                        className="di-btn"
                                                        onChange={(e) => setDiseases(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="ad-sub-btn">
                                                <div className="d-inline-block ad-sub">
                                                    <Col md={6}>
                                                        <Button as="input" type="submit" value="บันทึก" className="bg-green re-bor"/>
                                                    </Col>
                                                </div>
                                                <div className="d-inline-block">
                                                    <Col md={6}>
                                                        <Button type="button" className="bg-red-icon re-bor" onClick={onCancel}>ยกเลิก</Button>
                                                    </Col>
                                                </div>
                                            </div> 
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

    return (
        <Navigate to="/" replace />
    );

}