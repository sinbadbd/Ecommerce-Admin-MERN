import React from 'react'
import { Modal , Button } from 'react-bootstrap';

const ModalCustom = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default ModalCustom
