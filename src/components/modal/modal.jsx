import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {


    const handleKeyClose = (e) => {
        if (e.key === 'Escape') {
            props.handleClose();
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyClose)
        return (() => {
            document.removeEventListener('keydown', handleKeyClose)
        })
    }, [props.handleClose])


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

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal