import React from 'react';
import appStyle from './home-page.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {CLOSE_ORDER_DETAILS} from "../../services/actions/order-details";
import {RESET_CONSTRUCTOR_STATE} from "../../services/actions/burger-constructor";
import Loader from "../../components/loader/loader";

function HomePage() {
    const dispatch = useDispatch();
    const {ingredients, ingredientsRequest, ingredientsRequestFailed} = useSelector(state => state.ingredientsList);
    const {orderVisible, orderRequest} = useSelector(state => state.order)

    const closeOrderDetails = () => {
        dispatch({
            type: RESET_CONSTRUCTOR_STATE
        })
        dispatch({
            type: CLOSE_ORDER_DETAILS
        })
    }

    return (
        <>
            <Loader stateDone={orderRequest}/>
            {orderVisible &&
                <Modal handleClose={closeOrderDetails} title={""}><OrderDetails/></Modal>}

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
