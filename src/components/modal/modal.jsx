import React from 'react';

import modalStyles from './modal.module.css'

function Modal(props) {
    return(
        <div className={`${modalStyles.modal} pt-10 pb-10 pl-10 pr-10`}>
            {props.children}
        </div>
    )
}

export default Modal