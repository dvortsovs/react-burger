import React from 'react';
import bookingDetailsStyles from './booking-details.module.css'
import {useAppSelector} from "../../services/hooks";

function BookingDetails() {
    const {bookingDetails} = useAppSelector(state => state.booking)
    if (bookingDetails !== null) {
        return (
            <div className={`${bookingDetailsStyles.card} mt-20 mb-20 ml-15 mr-15`}>
                <h2 className={`${bookingDetailsStyles.title} text text_type_digits-large`}>{bookingDetails.order.number}</h2>
                <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
                <div className={`${bookingDetailsStyles.done} mt-15`}></div>
                <p className={`text text text_type_main-default mt-15`}>Ваш заказ начали готовить</p>
                <p className={`text text text_type_main-default text_color_inactive mt-2`}>Дождитесь готовности на
                    орбитальной станции</p>
            </div>
        )
    } else return null
}

export default BookingDetails