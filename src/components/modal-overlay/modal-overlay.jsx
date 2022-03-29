import React from 'react';
import ReactDOM from "react-dom";
import modalOverlayStyles from './modal-overlay.module.css'
import Modal from "../modal/modal";

function ModalOverlay(props) {

    return ReactDOM.createPortal(
        (
            <div className={`${modalOverlayStyles.modal}`}>
                <Modal>{props.children}</Modal>
            </div>
        ),
        document.getElementById('react-modals')
    )
}

export default ModalOverlay