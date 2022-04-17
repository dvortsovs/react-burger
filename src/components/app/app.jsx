import React, {useState} from 'react';
import appStyle from './app.module.css';
import {api} from "../../constants/api";
import {DataContext} from "../../services/data-context";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function App() {
    const [data, setData] = useState([])
    const [state, setState] = React.useState({
        isLoading: false,
        isError: false,
        modalIngredientVisible: false,
        modalOrderDetailsVisible: false,
        modalIngredient: null,
        orderNumber: null
    })

    React.useEffect(() => {
        setState({...state, isLoading: true});
        fetch(`${api.urls.baseUrl}${api.urls.ingredients}`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then(res => {
                setState({...state, isLoading: false})
                setData([...res.data])
            })
            .catch((err) => {
                setState({...state, isLoading: false, isError: true})
                console.log(err)
            })
    }, [])

    const handleIngredientModalOpen = (ingredient) => {
        setState({...state, modalIngredientVisible: true, modalIngredient: {...ingredient}})
    }

    const handleOrderModalOpen = (ingredientsList) => {
        fetch(`${api.urls.baseUrl}${api.urls.orders}`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({"ingredients": ingredientsList})
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then((res) => {
                setState({...state, orderNumber: res.order.number, modalOrderDetailsVisible: true})
            })
            .catch((err) => {
                setState({...state, orderNumber: null})
                console.log(err)
            })
    }

    const handleClose = () => {
        setState({...state, modalOrderDetailsVisible: false, modalIngredientVisible: false})
    }

    return (
        <div className={appStyle.app}>
            <DataContext.Provider value={{data}}>
                {state.modalIngredientVisible &&
                    <Modal title={"Детали ингредиента"} handleClose={handleClose}><IngredientDetails
                        ingredient={state.modalIngredient}/></Modal>}

                {state.modalOrderDetailsVisible &&
                    <Modal title={""} handleClose={handleClose}><OrderDetails orderNumber={state.orderNumber}/></Modal>}

                <AppHeader/>
                <main className={`${appStyle.main}`}>
                    {!state.isLoading && !state.isError &&
                        <BurgerIngredients handleModalOpen={handleIngredientModalOpen}/>}
                    {!state.isLoading && !state.isError && !!data.length &&
                        <BurgerConstructor handleModalOpen={handleOrderModalOpen}/>}
                </main>
            </DataContext.Provider>
        </div>
    );
}

export default App;
