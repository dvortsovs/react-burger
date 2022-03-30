import React from 'react';
import PropTypes from 'prop-types';
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

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay