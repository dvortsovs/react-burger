import React from 'react';
import orderDetailsStyles from './order-details.module.css'
import doneIcon from '../../images/graphics.svg'
import PropTypes from "prop-types";

function OrderDetails({orderNumber}) {
    return (
        <div className={`${orderDetailsStyles.card} mt-20 mb-20 ml-15 mr-15`}>
            <h2 className={`${orderDetailsStyles.title} text text_type_digits-large`}>{orderNumber}</h2>
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <img className={`mt-15`} src={doneIcon} alt="done"/>
            <p className={`text text text_type_main-default mt-15`}>Ваш заказ начали готовить</p>
            <p className={`text text text_type_main-default text_color_inactive mt-2`}>Дождитесь готовности на
                орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number
}


export default OrderDetails