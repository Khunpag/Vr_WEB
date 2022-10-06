import { Modal, Button } from "react-bootstrap";

export function DeleteModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} onConfirmDelete={props.onConfirmDelete} centered>
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

// export function AddModal(props) {
//     return (
//         <Modal show={props.show} onHide={props.onHide} onConfirmAdd={props.onConfirmAdd} centered>
//             <Modal.Header>
//                 <Modal.Title>{props.title}</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//                 <p className="text-center">{props.message}</p>
//             </Modal.Body>

//             <Modal.Footer>
//                 <Button variant="success" onClick={props.onConfirmAdd}>ตกลง</Button>
//                 <Button variant="danger" onClick={props.onHide}>ยกเลิก</Button>
//             </Modal.Footer>
//         </Modal>
//     )
// }

export function HomeModal(props) {
    return (

        <>
            {
                (props.status == "add")?
                    <Modal show={props.show} onHide={props.onHide} onConfirmAdd={props.onConfirmAdd} centered>
                        <Modal.Header>
                            <Modal.Title>{props.title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p className="text-center">{props.message}</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="success" onClick={props.onConfirmAdd}>ตกลง</Button>
                            <Button variant="danger" onClick={props.onHide}>ยกเลิก</Button>
                        </Modal.Footer>
                    </Modal>
                        : <Modal show={props.show} onHide={props.onHide} onConfirmUpdate={props.onConfirmUpdate} centered>
                            <Modal.Header>
                                <Modal.Title>{props.title}</Modal.Title>
                            </Modal.Header>
                
                            <Modal.Body>
                                <p className="text-center">{props.message}</p>
                            </Modal.Body>
                
                            <Modal.Footer>
                                <Button variant="success" onClick={props.onConfirmUpdate}>ยืนยัน</Button>
                                <Button variant="danger" onClick={props.onHide}>ยกเลิก</Button>
                            </Modal.Footer>
                        </Modal>
            }
        </>
        
    )
}

export function LogOutModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} onConfirmLogOut={props.onConfirmLogOut} centered>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center">{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success" onClick={props.onConfirmLogOut}>ยืนยัน</Button>
                <Button variant="danger" onClick={props.onHide}>ยกเลิก</Button>
            </Modal.Footer>
        </Modal>
    )
}

// export function UpdateModal(props) {
//     return (
//         <Modal show={props.show} onHide={props.onHide} onConfirmUpdate={props.onConfirmUpdate} centered>
//             <Modal.Header>
//                 <Modal.Title>{props.title}</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//                 <p className="text-center">{props.message}</p>
//             </Modal.Body>

//             <Modal.Footer>
//                 <Button variant="success" onClick={props.onConfirmUpdate}>ยืนยัน</Button>
//                 <Button variant="danger" onClick={props.onHide}>ยกเลิก</Button>
//             </Modal.Footer>
//         </Modal>
//     )
// }

export function DuplicateModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center">{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success" onClick={props.onHide}>ตกลง</Button>
            </Modal.Footer>
        </Modal>
    )
}