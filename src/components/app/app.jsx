import React from 'react';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {api} from "../../constants/api";
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {

    const [state, setState] = React.useState({isLoading: false, isError: false, data: [], modalIngredientVisible: false, modalIngredient: {}})

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

    const handleIngredientClick = (ingredient) => {
        setState({...state, modalIngredientVisible: true, modalIngredient: {...ingredient}})
    }

    const handleCloseClick = () => {
        setState({...state, modalIngredientVisible: false})
    }

  return (
    <div className={appStyle.app}>
        { state.modalIngredientVisible && <ModalOverlay><IngredientDetails handleCloseClick={handleCloseClick} ingredient={state.modalIngredient} /></ModalOverlay>}
        <AppHeader />
        <main className={`${appStyle.main}`}>
            {!state.isLoading && !state.isError && <BurgerIngredients handleIngredientClick={handleIngredientClick} data={state.data}/> }
            {!state.isLoading && !state.isError && !!state.data.length && <BurgerConstructor data={state.data} /> }
        </main>
    </div>
  );
}

export default App;
