import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import Fuse from "fuse.js";
import { API_GET, API_POST } from "./api";
import { UserModals } from "./UserModals";
import UserList from "./UserList";

export default function UserHome() {
  const [role_user, setUser] = useState([]);
  const [userNo, setUserNo] = useState(0);
  const [personNo, setpersonNo] = useState(0);
  const [conUser, setConUser] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log(localStorage.getItem("access_token"));

      const response = await fetch("http://localhost:8080/api/role_user", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      let json = await response.json();

      setUser(json.data);
      setConUser(json.data);

      console.log(json.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (search == "") {
      setUser(conUser);
    } else {
      const fuse = new Fuse(conUser, {
        keys: ["person_no"],
      })

      let paSearch = fuse.search(search);

      let resultSearch = [];

      paSearch.map((data) => {
        resultSearch.push(data.item);
      });

      console.log(resultSearch);

      setUser(resultSearch);
    }
  }, [search]);

  const onSearch = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const fuse = new Fuse(conUser, {
        keys: ["person_no"],
      });

      let paSearch = fuse.search(search);

      let resultSearch = [];

      paSearch.map((data) => {
        resultSearch.push(data.item);
      });

      console.log(resultSearch);

      setUser(resultSearch);
    }
  };

  const fetchUser = async () => {
    let json = await API_GET("role_user");
    setUser(json.data);
    console.log(json.data);
  };

  const onDeleteModal = (data) => {
    setUserNo(data.user_no);
    setpersonNo(data.person_no);

    setModalTitle("ลบบัญชีผู้ใช้");
    setModalMessage("ยืนยันการลบบัญชีผู้ใช้");
    setShowModal(true);

    // console.log("123");
}


  const onConfirmDelete = async () => {
    setShowModal(false);
    console.log("abc");
    let json = await API_POST("role_user/delete", {
        user_no: userNo,
        person_no: personNo
    });

    console.log(json);

    if (json.result) {
        console.log("cba");
        fetchUser();
    }

}
//   const fetchUser = async () => {
//     let json = await API_GET("role_user");
//     setUser(json.data);
//     console.log(json.data);
// }

// const onDeleteModal = (data) => {
//   setUserNo(data.user_no);
//   setPatientNo(data.patient_no);

//   setModalTitle("ลบบัญชีผู้ใช้");
//   setModalMessage("ยืนยันการลบบัญชีผู้ใช้");
//   setShowModal(true);

//   // console.log("123");
// }

// const onConfirmDelete = async () => {
//     setShowModal(false);
//     console.log("abc");
//     let json = await API_POST("role_user/delete", {
//         user_no: userNo,
//         person_no: personNo
//     });

//     console.log(json);

//     if (json.result) {
//         console.log("cba");
//         fetchUser();
//     }

// }

  const onHide = () => {
    setShowModal(false);
  };

  if (localStorage.getItem("access_token")) {
    console.log(localStorage.getItem("access_token"));

    return (
      <>
        <UserModals
          show={showModal}
          title={modalTitle}
          message={modalMessage}
          onConfirmDelete={onConfirmDelete}
          onHide={onHide}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 bg p-0">
              <Sidebar />
            </div>
            <div className="col-10 p-0">
              <h1 className="title">จัดการบัญชีผู้ใช้</h1>

              <div className="p-5 hight-one">
                <div className="content border rounded-3 p-2 shadow">
                  <div className="search-bar">
                    <Row>
                      <Col md={7}>
                        <Form>
                          <Form.Group as={Col} controlId="searchUser">
                            <Form.Control
                              type="text"
                              placeholder="ค้นหาผู้ใช้"
                              onChange={(e) => setSearch(e.target.value)}
                            />
                          </Form.Group>
                          {/* <Button type="submit">ค้นหา</Button> */}
                        </Form>
                      </Col>
                      <Col md={5}>
                        <div className="">
                          {/* <span className="sp-ad"> */}
                          <Link to={`/user/add`}
                            className="bg-green re-bor button-add-p rounded-3 button1"
                          >
                            <i className="fa-solid fa-plus fa-lg m-right-add-pa"></i>
                            เพิ่มบัญชีผู้ใช้
                          </Link>
                          {/* </span> */}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-4 overflow">
                    <div className="row">
                      <div className="col-4">
                        <p className="align-items-center">เลขรหัสประจำตัวผู้ใช้</p>{" "}         
                      </div>
                      <div className="col-4">
                        <p className="text end">ชื่อ-นามสกุล </p>{" "}
                      </div>
                    </div>
                    {/* { <h6 className="bg-secondary text-center"></h6>} */}
                    {console.log(role_user)}

                    
                    {role_user.map((item) => (
                      <UserList
                        key={item.person_no}
                        data={item}
                         //onDelete={onDelete}
                        onDeleteModal={onDeleteModal}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <Navigate to="/" replace />;
}
