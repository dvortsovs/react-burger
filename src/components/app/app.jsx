import React from 'react';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();
    const {ingredients, ingredientsRequest, ingredientsRequestFailed} = useSelector(state => state.ingredientsList);
    const {detailsVisible} = useSelector(state => state.details)
    const {orderVisible} = useSelector(state => state.order)

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div className={appStyle.app}>
            {detailsVisible &&
                <Modal title={"Детали ингредиента"}><IngredientDetails/></Modal>}

            {orderVisible &&
                <Modal title={""}><OrderDetails/></Modal>}

            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={`${appStyle.main}`}>
                    {!ingredientsRequest && !ingredientsRequestFailed &&
                        <BurgerIngredients/>}
                    {!ingredientsRequest && !ingredientsRequestFailed && !!ingredients.length &&
                        <BurgerConstructor/>}
                </main>
            </DndProvider>
        </div>
    );
}

export default App;
