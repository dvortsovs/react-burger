import React from 'react';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {api} from "../../constants/api";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function App() {

    const [state, setState] = React.useState({
        isLoading: false,
        isError: false,
        data: [],
        modalIsOpen: false,
        modalIngredientVisible: false,
        modalOrderDetailsVisible: false,
        modalIngredient: {}
    })

    React.useEffect(() => {
        setState({...state, isLoading: true});
        fetch(api)
            .then(res => res.json())
            .then(res => setState({...state, data: res.data, isLoading: false}))
            .catch((err) => {
                setState({...state, isLoading: false, isError: true})
                console.log(err)
            })
    }, [])

    const handleModalOpen = (ingredient, modalType) => {
        if (modalType === "ingredient") {
            setState({...state, modalIsOpen: true, modalIngredientVisible: true, modalIngredient: {...ingredient}})
        } else {
            setState({...state, modalIsOpen: true, modalOrderDetailsVisibleVisible: true})
        }
    }

    const handleClose = () => {
        setState({...state, modalIsOpen: false, modalOrderDetailsVisibleVisible: false, modalIngredientVisible: false})
    }

    return (
        <div className={appStyle.app}>
            {state.modalIsOpen && <Modal title={state.modalIngredientVisible ? "Детали ингредиента" : ""}
                                         handleClose={handleClose}>{state.modalIngredientVisible ?
                <IngredientDetails ingredient={state.modalIngredient}/> : <OrderDetails/>}</Modal>}
            <AppHeader/>
            <main className={`${appStyle.main}`}>
                {!state.isLoading && !state.isError &&
                    <BurgerIngredients handleModalOpen={handleModalOpen} data={state.data}/>}
                {!state.isLoading && !state.isError && !!state.data.length &&
                    <BurgerConstructor handleModalOpen={handleModalOpen} data={state.data}/>}
            </main>
        </div>
    );
}

export default App;
