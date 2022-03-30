import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css'

function ModalOverlay(props) {

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            props.onClick()
        }
    }

    return (
        (
            <div onClick={handleClose} className={`${modalOverlayStyles.modal}`}>
                {props.children}
            </div>
        )
    )
}

export default ModalOverlay