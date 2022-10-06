import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PatientList(props) {

    // const onDelete = async () => {
    //     props.onDelete(props.data);
    // }

    const onDeleteModal = async () => {
        console.log();
        props.onDeleteModal(props.data);
    }

    return (
        <div className="row border rounded shadow-sm mt-3 bg-white py-1 mar-con">
            <div className="col-3">
                <h5 className="text-center pad-patient">{props.data.patient_no}</h5>
            </div>
            <div className="col-9">
                <span className="pa-icon">
                    <Link to={`/patient/view/${props.data.patient_no}`} className="btn me-3 bg-blue"><i className="fa-regular fa-clipboard fa-xl"></i></Link>
                    <Link to={`/patient/view/${props.data.patient_no}`} className="btn me-3 bg-green"><i className="fa-regular fa-eye fa-xl"></i></Link>
                    <Link to={`/patient/${props.data.patient_no}`} className="btn me-3 bg-yellow"><i className="fa-solid fa-gear fa-xl"></i></Link>
                    {/* <Button type="button" className="btn me-3 bg-red-icon re-bor" onClick={onDeleteModal}><i className="fa-solid fa-trash-can fa-xl"></i></Button> */}
                    <Link className="btn me-3 bg-red-icon re-bor" onClick={onDeleteModal}><i className="fa-solid fa-trash-can fa-xl"></i></Link>
                </span>
            </div>
        </div>
    )
}