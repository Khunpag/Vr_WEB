import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserModals } from "./UserModals";

export default function UserList (props) {

    // const onDelete = async () => {
    //     props.onDelete(props.data);
    // }
    

    const onDeleteModal = async () => {
        console.log();
        props.onDeleteModal(props.data);
    }

    return (
        <span className="pa-icon"> 
        <div className="row border rounded shadow-sm mt-3 bg-white py-1 mar-con">
            <div className="col-3">
                <h5 className="text-center pad-role_user">{props.data.person_no}</h5>
                </div>
                
                <div className="col-4">
                <h4 className="text-center pad-role_user" >{props.data.name}  {props.data.last_name}</h4>
                {/* <p className="bg-success text-center pad-role_user" >{props.data.name}  {props.data.last_name}</p> */}
            </div>
            
            <div className="col-5 text-end">
                    <Link to={`/role_user/view/${props.data.sex}`} className="btn  me-3 bg-blue"><i className="fa-regular fa-clipboard fa-xl"></i></Link>
                    <Link to={`/role_user/view/${props.data.person_no}`} className="btn me-3 bg-green"><i className="fa-regular fa-eye fa-xl"></i></Link>
                    <Link to={`/user/${props.data.person_no}`} className="btn me-3 bg-yellow"><i className="fa-solid fa-gear fa-xl"></i></Link>
                    { <Button type="button" className="btn btn-warning me-3 bg-red-icon re-bor" onClick={onDeleteModal}><i className="fa-solid fa-trash-can fa-xl"></i></Button> }    
                    {/* { <Link className="btn btn-warning text-white" onClick={onDeleteModal}><i className="fa-solid fa-square-poll-vertical"></i></Link> } */}
                
            </div>
        </div>
        </span>
    )
}