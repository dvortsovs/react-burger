import React from 'react';
import appStyle from './home-page.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {CLOSE_DETAILS_MODAL} from "../../services/actions/ingredient-details";
import {CLOSE_ORDER_DETAILS} from "../../services/actions/order-details";
import {RESET_CONSTRUCTOR_STATE} from "../../services/actions/burger-constructor";

function HomePage() {
    const dispatch = useDispatch();
    const {ingredients, ingredientsRequest, ingredientsRequestFailed} = useSelector(state => state.ingredientsList);
    const {detailsVisible} = useSelector(state => state.details)
    const {orderVisible} = useSelector(state => state.order)

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const closeIngredientDetails = () => {
        dispatch({
            type: CLOSE_DETAILS_MODAL
        })
    }

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
            {detailsVisible &&
                <Modal handleClose={closeIngredientDetails} title={"Детали ингредиента"}><IngredientDetails/></Modal>}

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
