//!warn  when edit
import { Modal, Button } from "react-bootstrap";

export function UserModals(props) {
    
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center">{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success" onClick={props.onConfirmDelete}>ตกลง</Button>
                <Button variant="danger" onClick={props.onHide}>ยกเลิก</Button>
            </Modal.Footer>
        </Modal>
    )
}