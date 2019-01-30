import React from "react";
import {Modal} from "react-bootstrap";
import Textbody from "./typography/Textbody";

/*
Behaviours: 





*/

const ModalDialog = ({
    title,
    body,
    buttonText,
    show,
    onHide,
    onPASS,
    children,
    ...props,
    

}) => {
    return(
        <Modal 
        {...props}
        show={show} 
        onHide={onHide}>
            <Modal.Header  closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
                <Textbody>{body}</Textbody>
            </Modal.Body>

            <Modal.Footer>
           
            </Modal.Footer>
            
            
        </Modal>
    )
}

export default ModalDialog;