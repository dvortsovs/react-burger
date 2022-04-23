import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DETAILS_MODAL} from "../../services/actions/ingredient-details";
import {CLOSE_ORDER_DETAILS} from "../../services/actions/order-details";

function Modal(props) {
    const dispatch = useDispatch();
    const {detailsVisible} = useSelector(state => state.details)
    const {orderVisible} = useSelector(state => state.order)
    const closeModal = () => {
        if (orderVisible) {
            dispatch({
                type: CLOSE_ORDER_DETAILS
            })
        }
        if (detailsVisible) {
            dispatch({
                type: CLOSE_DETAILS_MODAL
            })
        }
    }

    React.useEffect(() => {
        const handleKeyClose = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', handleKeyClose)
        return (() => {
            document.removeEventListener('keydown', handleKeyClose)
        })
    }, [dispatch])


    return ReactDOM.createPortal(
        (
            <ModalOverlay onClick={closeModal}>
                <div className={`${modalStyles.modal} p-10`}>
                    <div className={`${modalStyles.header}`}>
                        <h2 className={`text text_type_main-large`}>{props.title}</h2>
                        <button onClick={closeModal} type="button" className={`${modalStyles.close}`}>
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
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal