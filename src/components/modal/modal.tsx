import React, {FC, useCallback} from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
    handleClose: () => void;
    title: string
}

const reactModals = document.getElementById('react-modals') as HTMLElement

const Modal: FC<IModalProps> = (props) => {
    const modalContainer: HTMLElement = document.createElement("div")
    const handleKeyClose = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            props.handleClose();
        }
    }, [props])

    React.useEffect(() => {
        reactModals.appendChild(modalContainer)
        document.addEventListener('keydown', handleKeyClose)
        return (() => {
            document.removeEventListener('keydown', handleKeyClose)
            reactModals.removeChild(modalContainer)
        })
    }, [props.handleClose, handleKeyClose, modalContainer])


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
        modalContainer
    )
}

export default Modal