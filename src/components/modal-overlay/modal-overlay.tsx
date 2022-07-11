import React, {FC, MouseEvent} from 'react';
import modalOverlayStyles from './modal-overlay.module.css'

interface IModalOverlayProps {
    onClick: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = (props) => {

    const handleClose = (e: MouseEvent) => {
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