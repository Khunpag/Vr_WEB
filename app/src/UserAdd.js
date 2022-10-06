import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { API_GET, API_POST } from "./api";
import Sidebar from "./sidebar";
import './style.css';
import { AddModal, DuplicateModal, HomeModal, UpdateModal } from "./modal";

export default function PatientAdd() {
    let params = useParams();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [sex, setSex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [validated, setValidated] = useState(false);
  const [personNo, setpersonNo] = useState(0);
  const [userNo, setUserNo] = useState(0);
  const [pageTitle, setPageTitle] =useState("");

    let navigate = useNavigate();

    useEffect (() => {
        if(params.person_no == "add"){
            setPageTitle("เพิ่มบัญชีผู้ป่วย");
        }else{
            setPageTitle("แก้ไขบัญชีผู้ป่วย");
        }
    },[])

    useEffect (() => {
        async function fetchData(personNo) {
            let json = await API_GET("personData/" + personNo);

            // var data = json
            var data = json.data.rows[0];
            // var data1 = json.data1.rows[0];
            // var data2 = json.data2.rows[0];
            // var data3 = json.data3.rows[0];

            // if(data1.g1_time >= 60){
            //     var checkMin = parseInt(data1.g1_time / 60);
            //     var checkMin2 = checkMin * 60;
            //     var checkSec = data1.g1_time - checkMin2;

            //     setMin(checkMin);
            //     setSec(checkSec)
                
            // }else{
            //     setMin(0);
            //     setSec(data1.g1_time);
            // }

            setpersonNo(data.person_no);
            setName(data.name);
            setLastname(data.last_name);
            setSex(data.sex);
            setDate(data.birthday);
        
        }

        if (params.person_no != "add") {
            fetchData([params.person_no]);
        }
    }, [params.person_no]);

    const onSave = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // console.log("1234");
        if(form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // console.log("a1234");
            // console.log(params.person_no);
            if(params.person_no == "add") {
                // console.log("b1234");
                // onAddModal();
                doAddPerson();
            }else {
                // console.log("c1234");
                // onUpdateModal();
                doUpdatePerson();
            }
        }

        setValidated(true);
    }

    const doAddPerson = async () => {
        console.log("Add");
        let json = await API_POST("person/add", {
            name: name,
            last_name: lastname,
            sex: sex,
            date: date,
            username: username,
            password: password,
        });

        // console.log(json.result);
        if(json.result) {
            navigate("/home", { replace: false });
        } else {
            // navigate("/home", { replace: false });
            // setModalTitle("ไม่สามารถเพิ่มข้อมูลผู้ป่วยได้");
            // setModalMessage(json.message);
            // setShowModal2(true);
        }
    }

    const doUpdatePerson = async () => {
        // console.log("mmm");
        const json = await API_POST("person/update", {
            personNo: personNo,
            name: name,
            last_name: lastname,
            sex: sex,
            date: date,
        });
        console.log("asdasd");

        if(json.result) {
            navigate("/home", { replace: false });
        }
    }

    // const onAddModal = async () => {
    //     setModalTitle("เพิ่มบัญชีผู้ป่วย");
    //     setModalMessage("ยืนยันการเพิ่มบัญชีผู้ป่วย");
    //     setShowModal(true);
    //     // setStatus("add");

    //     console.log("addModal");
    // }

    // const onUpdateModal = async () => {
    //     setModalTitle("แก้ไขข้อมูลผู้ป่วย");
    //     setModalMessage("ยืนยันการแก้ไขข้อมูลบัญชีผู้ป่วย");
    //     setShowModal(true);
    // }

    // const onConfirmUpdate = async () => {
    //     setShowModal(false);

    //     console.log("inup");

    //     doUpdatePatient();
    // }

    // const onConfirmAdd = async () => {
    //     setShowModal(false);

    //     console.log("incon");

    //     doAddPatient();
    // }

    // const onHide = () => {
    //     setShowModal(false);
    //     setShowModal2(false);
    // }

    // const onCancel = () => {
    //     navigate("/home", { replace: false });
    // }

    if(localStorage.getItem("access_token")){
        return (
          <>
            {/* User detail No: {params.PersonNo} */}
            {/* Bootstarp */}
      
            <div className="container-fluid">
              <div className="row">
                <div className="col-2 bg p-0">
                  <Sidebar />
                </div>
                <div className="col-10 p-0">
                  <h1 className="title">เพิ่มบัญชีผู้ใช้</h1>
                  <div className="p-5 hight-one">
                    <div className="content border rounded-3 p-2 shadow">
                    <Form className="m-3" noValidate validated={validated} onSubmit={onSave}>
                      <Row>
                        <Form.Group as={Col}>
                          <Form.Label>ชื่อ</Form.Label>
                          <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group as={Col}>
                          <Form.Label>นามสกุล</Form.Label>
                          <Form.Control
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </Form.Group>
                      </Row>
                        <Row>
                          <Col md={4} className="sex-btn">
                            <Form.Group as={Col}>
                              <Form.Label>เพศ</Form.Label>
                              <Form.Select
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                // required
                              >
                                <option label="เพศ"></option>
                                <option key="male" value="M">
                                  ชาย
                                </option>
                                <option key="female" value="F">
                                  หญิง
                                </option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Row>
                              <Form.Group as={Col}>
                                <Form.Label>วันเกิด</Form.Label>
                                <Form.Control
                                  required
                                  type="date"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value.toString())}
                                />
                                <Form.Control.Feedback type="invalid">
                                  กรุณากรอก วันเกิด
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Row>
                            <Form.Group as={Col}>
                              <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <Form.Control.Feedback type="invalid">
                                กรุณากรอก ชื่อผู้ใช้งาน
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                          <Row>
                            <Form.Group as={Col}>
                              <Form.Label>รหัสผ่าน</Form.Label>
                              <Form.Control
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <Form.Control.Feedback type="invalid">
                                กรุณากรอก รหัสผ่าน
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Button
                              as="input"
                              type="submit"
                              value="บันทึก"
                              className="bg-green re-bor"
                            />
                          </Col>
                          <Col md={6}>
                            <Button
                              as="input"
                              type="reset"
                              value="ยกเลิก"
                              className="bg-red re-bor"
                            />
                          </Col>
                        </Row>
                      </Form>
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

/////////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import { API_GET, API_POST } from "./api";
// import Sidebar from "./sidebar";
// import './style.css';
// import { v4 as uuidv4 } from 'uuid';


// export default function UserAdd() {
//   let params = useParams();

//   const [name, setName] = useState("ภภภภ");
//   const [lastname, setLastname] = useState("พพพพ");
//   const [sex, setSex] = useState(0);
//   const [username, setUsername] = useState("Pppp");
//   const [password, setPassword] = useState(uuidv4());
//   const [date, setDate] = useState("2000-06-10");
//   const [validated, setValidated] = useState(false);
//   const [personNo, setpersonNo] = useState(0);
//   const [userNo, setUserNo] = useState(0);
//   const [pageTitle, setPageTitle] =useState("");

//   let navigate = useNavigate();

//   useEffect (() => {
//     if(params.person_no == "add"){
//         setPageTitle("เพิ่มบัญชีผู้ใช้");
//     }else{
//         setPageTitle("แก้ไขบัญชีผู้ใช้");
//     }
// },[])

// const onSave = (event) => {
//     const form = event.currentTarget;
//     event.preventDefault();
//     // console.log("1234");
//     if(form.checkValidity() === false) {
//         event.stopPropagation();
//     } else {
//         // console.log("a1234");
//         // console.log(params.person_no);
//         if(params.person_no == "add") {
//             // console.log("b1234");
//              doAddPerson();
//         }else {
//             // console.log("c1234");
//              doUpdatePerson();
//             // doAddPerson();
//         }
//     }

//     setValidated(true);
// }

// const doAddPerson = async () => {
//     console.log("Add");
//     let json = await API_POST("user/add", {
//         name: name,
//         lastname: lastname,
//         sex: sex,
//         date: date,
//         // weight: weight,
//         // height: height,
//         // neck: neck,
//         // arm: arm,
//         // bust: bust,
//         // diseases: diseases,
//          username: username,
//         password: password,
//         // min: min,
//         // sec: sec,
//         // gTwo: gTwo,
//         // gThree: gThree
//     });

//     // console.log(json.result);
//     if(json.result) {
//         navigate("/home", { replace: false });
//     } else {
//         // console.log("asdad");
//         navigate("/home", { replace: false });
//         // setModalTitle("ไม่สามารถเพิ่มข้อมูลผู้ใช้ได้");
//         // setModalMessage(json.message);
//         // setShowModal2(true);
//     }
// }

// const doUpdatePerson = async () => {
//    console.log("mmm");
//     const json = await API_POST("person/update", {
//         person_no: personNo,
//         name: name,
//         last_name: lastname,
//         sex: sex,
//         date: date,
//         // weight: weight,
//         // height: height,
//         // neck: neck,
//         // arm: arm,
//         // bust: bust,
//         // diseases: diseases,
//         // min: min,
//         // sec: sec,
//         // gTwo: gTwo,
//         // gThree: gThree
//     });

//     if(json.result) {
//         navigate("/home", { replace: false });
//     }
// }


//   if(localStorage.getItem("access_token")){
//   return (
//     <>
//       {/* User detail No: {params.PersonNo} */}
//       {/* Bootstarp */}

//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-2 bg p-0">
//             <Sidebar />
//           </div>
//           <div className="col-10 p-0">
//             <h1 className="title">เพิ่มบัญชีผู้ใช้</h1>
//             <div className="p-5 hight-one">
//               <div className="content border rounded-3 p-2 shadow">
//               <Form className="m-3" noValidate validated={validated} onSubmit={onSave}>
//                 <Row>
//                   <Form.Group as={Col}>
//                     <Form.Label>ชื่อ</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Row>
//                 <Row>
//                   <Form.Group as={Col}>
//                     <Form.Label>นามสกุล</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={lastname}
//                       onChange={(e) => setLastname(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Row>
//                   <Row>
//                     <Col md={4} className="sex-btn">
//                       <Form.Group as={Col}>
//                         <Form.Label>เพศ</Form.Label>
//                         <Form.Select
//                           value={sex}
//                           onChange={(e) => setSex(e.target.value)}
//                           required
//                         >
//                           <option label="เพศ"></option>
//                           <option key="male" value="M">
//                             ชาย
//                           </option>
//                           <option key="female" value="F">
//                             หญิง
//                           </option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Row>
//                         <Form.Group as={Col}>
//                           <Form.Label>วันเกิด</Form.Label>
//                           <Form.Control
//                             required
//                             type="date"
//                             value={date}
//                             onChange={(e) => setDate(e.target.value.toString())}
//                           />
//                           <Form.Control.Feedback type="invalid">
//                             กรุณากรอก วันเกิด
//                           </Form.Control.Feedback>
//                         </Form.Group>
//                       </Row>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Row>
//                       <Form.Group as={Col}>
//                         <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
//                         <Form.Control
//                           required
//                           type="text"
//                           value={username}
//                           onChange={(e) => setUsername(e.target.value)}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           กรุณากรอก ชื่อผู้ใช้งาน
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Row>
//                     <Row>
//                       <Form.Group as={Col}>
//                         <Form.Label>รหัสผ่าน</Form.Label>
//                         <Form.Control
//                           required
//                           type="password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           กรุณากรอก รหัสผ่าน
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Row>
//                   </Row>
//                   <Row>
//                     <Col md={6}>
//                       <Button
//                         as="input"
//                         type="submit"
//                         value="บันทึก"
//                         className="bg-green re-bor"
//                       />
//                     </Col>
//                     <Col md={6}>
//                       <Button
//                         as="input"
//                         type="reset"
//                         value="ยกเลิก"
//                         className="bg-red re-bor"
//                       />
//                     </Col>
//                   </Row>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// }
