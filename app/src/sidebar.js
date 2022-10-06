import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOutModal } from "./modal";
import './style.css';

export default function Sidebar(){
    let navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const onLogOutModal = (data) => {
        setModalTitle("ออกจากระบบ");
        setModalMessage("ต้องการออกจากระบบ");
        setShowModal(true);
    }

    const onConfirmLogOut = async () => {
        setShowModal(false);
        localStorage.clear();
        navigate("/", { replace: false });
    }

    const onHide = () => {
        setShowModal(false);
    }
    
    return (
        <>
            <LogOutModal
                show={showModal}
                title={modalTitle}
                message={modalMessage}
                onConfirmLogOut={onConfirmLogOut}
                onHide={onHide}/>

            <div>
                <img src={`http://localhost:8080/images/logo-doctor.webp`} width={250} className="m-top-logo"/>
            </div>
            <div className="m-top">
                <Link to="/home"><i className="fa-solid fa-users fa-xl me-3"></i>จัดการบัญชีผู้ป่วย</Link>
            </div>
            <div className="m-top-logout">
                <Link className="bg-red" onClick={onLogOutModal}><i className="fa-solid fa-right-from-bracket fa-xl me-3"></i>ออกจากระบบ</Link>
            </div>
            
        </>
    );

}