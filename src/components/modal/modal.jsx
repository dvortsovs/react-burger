import React from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyClose)
        return(() => {
            document.removeEventListener('keydown', handleKeyClose)
        })
    }, [])

    const handleKeyClose = (e) => {
        if (e.key === 'Escape') {
            props.handleClose()
        }
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClick={props.handleClose}>
                <div className={`${modalStyles.modal} p-10`}>
                    <div className={`${modalStyles.header}`}>
                        <h2 className={`text text_type_main-large`}>{props.title}</h2>
                        <button onClick={props.handleClose} type="button" className={`${modalStyles.close}`}>
                            <CloseIcon type={"primary"}/></button>
                    </div>
                    {props.children}
                </div>
            </ModalOverlay>
        ),
        document.getElementById('react-modals')
    )
}

export default Modal