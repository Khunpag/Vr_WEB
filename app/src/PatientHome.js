import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PatientList from "./PatientList";
import Sidebar from "./sidebar";
import { Row, Col, Button, Form } from "react-bootstrap";
import Fuse from 'fuse.js';
import { API_GET, API_POST } from "./api";
import { DeleteModal } from "./modal";

export default function PatientHome(){

    const [patient, setPatient] = useState([]);
    const [userNo, setUserNo] = useState(0);
    const [patientNo, setPatientNo] = useState(0);
    const [conPatient, setConPatient] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    

    useEffect(() => {
        async function fetchData() {

            console.log(localStorage.getItem("access_token"));

            const response = await fetch(
                "http://localhost:8080/api/patient",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer "+ localStorage.getItem("access_token")
                    }
                }
            );

            let json = await response.json();

            setPatient(json.data);
            setConPatient(json.data);

            console.log(json.data);
        }

        fetchData();
        
    }, []);

    useEffect(() => {
        if(search == ""){
            setPatient(conPatient);
        }else{
            const fuse = new Fuse(conPatient, {
                keys: ['patient_no']
            })
    
            let paSearch = fuse.search(search);

            console.log(paSearch);

            let resultSearch = [];

            paSearch.map(data => {
                resultSearch.push(data.item);
            })

            console.log(resultSearch);

            setPatient(resultSearch);
        }
    }, [search]);

    const onSearch = (event) => {

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const fuse = new Fuse(conPatient, {
                keys: ['patient_no']
            })
    
            let paSearch = fuse.search(search);

            let resultSearch = [];

            paSearch.map(data => {
                resultSearch.push(data.item);
            })

            console.log(resultSearch);

            setPatient(resultSearch);

        }
    }

    const fetchPatient = async () => {
        let json = await API_GET("patient");
        setPatient(json.data);
        console.log(json.data);
    }

    const onDeleteModal = (data) => {
        setUserNo(data.user_no);
        setPatientNo(data.patient_no);

        setModalTitle("ลบบัญชีผู้ป่วย");
        setModalMessage("ยืนยันการลบบัญชีผู้ป่วย");
        setShowModal(true);

        // console.log("123");
    }

    const onConfirmDelete = async () => {
        setShowModal(false);
        console.log("abc");
        let json = await API_POST("patient/delete", {
            user_no: userNo,
            patient_no: patientNo
        });

        console.log(json);

        if (json.result) {
            // console.log("cba");
            fetchPatient();
        }

    }

    const onHide = () => {
        setShowModal(false);
    }

    if (localStorage.getItem("access_token")) {
        console.log(localStorage.getItem("access_token"));
        
        return (
            <>
            <DeleteModal
                show={showModal}
                title={modalTitle}
                message={modalMessage}
                onConfirmDelete={onConfirmDelete}
                onHide={onHide}/>
            <div className="container-fluid">
            <div className="row">
                <div className="col-2 bg p-0">
                    <Sidebar />
                </div>
                <div className="col-10 p-0">
                    <h1 className="title">จัดการบัญชีผู้ป่วย</h1>

                    <div className="p-5 hight-one">
                        <div className="content border rounded-3 p-2 shadow">
                            <div className="search-bar">
                                <Row>
                                    <Col md={7}>
                                        <Form>
                                        <Form.Group as={Col} controlId="searchPatient">
                                            <Form.Control
                                                type="text"
                                                placeholder="ค้นหาผู้ป่วย"
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </Form.Group>
                                        {/* <Button type="submit">ค้นหา</Button> */}
                                        </Form>
                                    </Col>
                                    <Col md={5}>
                                        <div className="">
                                            {/* <span> */}
                                                <Link to={`/patient/add`} className="bg-green re-bor button-add-p rounded-3 button1 d-inline-block "><i className="fa-solid fa-plus fa-lg m-right-add-pa"></i>เพิ่มบัญชีผู้ป่วย</Link>
                                                <Link to={`/report/all`} className="re-bor rounded-3 d-inline-block button1 button-add-p chart-btn"><i className="fa-solid fa-chart-line fa-lg m-right-add-pa"></i>กิจกรรมบำบัด</Link>
                                            {/* </span> */}
                                        </div>
                                        
                                    </Col>
                                </Row>
                            </div>
                            <h6 className="m-l-p">เลขรหัสประจำตัวผู้ป่วย</h6>
                            <div className="px-4 overflow">
                                {/* {console.log(patient)} */}
                                {
                                    patient.map(item => (
                                        <PatientList 
                                        key={item.patient_no} 
                                        data={item} 
                                        // onDelete={onDelete}
                                        onDeleteModal={onDeleteModal} />
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            </div>
            </>
        );
    }

    return (
        <Navigate to="/" replace />
    );
}