import React from 'react';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {api} from "../../constants/api";

function App() {

    const [state, setState] = React.useState({isLoading: false, isError: false, data: []})

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

  return (
    <div className={appStyle.app}>
        <AppHeader />
        <main className={`${appStyle.main}`}>
            {!state.isLoading && !state.isError && <BurgerIngredients data={state.data}/> }
            {!state.isLoading && !state.isError && !!state.data.length && <BurgerConstructor data={state.data} /> }
        </main>
    </div>
  );
}

export default App;
