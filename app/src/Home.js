import { Navigate } from "react-router-dom";
import Login from "./login";
import PatientHome from "./PatientHome"
import UserHome from "./UserHome";


export default function Home() {

    const getComponentByRole = () => {
        // console.log(localStorage.getItem("department_no"));
        if (localStorage.getItem("department_no") == 2) {
            return (<PatientHome />);
        }
        if(localStorage.getItem("department_no") == 1) {
            return (<UserHome />);
        }
        
        return <Navigate to="/" replace />

    }

    if (localStorage.getItem("access_token")) {
        return (
            <>
                { getComponentByRole() }
            </>
        );
    }

    return (
        <Navigate to="/" replace />
    );

}