import React from 'react';
import data from "../../utils/data";
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={appStyle.app}>
        <AppHeader />
        <main className={`${appStyle.main}`}>
            <BurgerIngredients data={data} />
            <BurgerConstructor />
        </main>
    </div>


  );
}

export default App;
