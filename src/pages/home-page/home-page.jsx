import React from 'react';
import appStyle from './home-page.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import BookingDetails from "../../components/booking-details/booking-details";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Loader from "../../components/loader/loader";
import {resetConstructorState} from "../../services/reducers/burger-constructor";
import {closeBookingDetails as closeBooking} from "../../services/reducers/booking-details";

function HomePage() {
    const dispatch = useDispatch();
    const {ingredients, ingredientsRequest, ingredientsRequestFailed} = useSelector(state => state.ingredientsList);
    const {bookingDetailsVisible} = useSelector(state => state.booking)
    const {apiRequest} = useSelector(state => state.apiRequests)

    const closeBookingDetails = () => {
        dispatch(resetConstructorState())
        dispatch(closeBooking())
    }

    return (
        <>
            <Loader stateDone={apiRequest}/>
            {bookingDetailsVisible &&
                <Modal handleClose={closeBookingDetails} title={""}><BookingDetails/></Modal>}

            <DndProvider backend={HTML5Backend}>
                <div className={`${appStyle.main}`}>
                    {!ingredientsRequest && !ingredientsRequestFailed &&
                        <BurgerIngredients/>}
                    {!ingredientsRequest && !ingredientsRequestFailed && !!ingredients.length &&
                        <BurgerConstructor/>}
                </div>
            </DndProvider>
        </>
    );
}

export default HomePage;
