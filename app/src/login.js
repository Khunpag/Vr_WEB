import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './style.css';

var md5 = require("md5");

export default function Login() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }

        setValidated(true);

    };

    const doLogin = async () => {
        const data1 = await getAuthenToken();
        const authToken = data1.data.auth_token;

        console.log(authToken);

        const data2 = await getAccessToken(authToken);

        if(data2.result){
            localStorage.setItem("access_token", data2.data.access_token);
            localStorage.setItem("user_no", data2.data.account_info.user_no);
            localStorage.setItem("username", username);
            localStorage.setItem("pwd", data2.data.account_info.pwd);
            localStorage.setItem("department_no", data2.data.account_info.department_no);
            localStorage.setItem("department_name", data2.data.account_info.department_name);
            
            // console.log(localStorage.getItem("department_no"));

            navigate("home", { replace: false });
        }
    };

    const getAuthenToken = async () => {
        const response =await fetch(
            "http://localhost:8080/api/authen_request",
            {
                method: "POST",
                header: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: md5(username)
                })
            }
        );

        const data = await response.json();

        console.log(data);

        return data;

    };

    const getAccessToken = async(authToken) => {
        var baseString = username + "&" +md5(password);
        var authenSignature = md5(baseString);

        const response = await fetch(
            "http://localhost:8080/api/access_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auth_signature: authenSignature,
                    auth_token: authToken
                })
            }
        );

        const data = await response.json();

        console.log(data);
        return data;
    }

    return (
        <div className="container-fluid">
            <Row className="row">
                <Col md={3} className="bg">

                </Col>
            
                <Col md={6}>
                    
                    <div className="set-center border rounded-3 p-5 bg-light shadow">

                    <div className="text-center">
                        {/* <h1 className="mb-5">เข้าสู่ระบบ</h1> */}
                        <img src={`http://localhost:8080/images/hospital-icon.webp`} className="hospital-icon"/>
                    </div>
                    
                    <Form noValidate validated={validated} onSubmit={onLogin}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="validateUsername">
                                <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="ชื่อผู้ใช้งาน"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอก ชื่อผู้ใช้งาน
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="validatePassword">
                                <Form.Label>รหัสผ่าน</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="รหัสผ่าน"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอก รหัสผ่าน
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col md={12} className="text-center">
                                <Button type="submit">เข้าสู่ระบบ</Button>
                            </Col>
                        </Row>
                    </Form>
                    </div>
                </Col>

                <Col md={3} className="bg">

                </Col>
                
            </Row>

        </div>
        
    );
}