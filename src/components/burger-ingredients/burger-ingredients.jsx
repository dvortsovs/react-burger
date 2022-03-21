import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css'
import IngredientList from "../ingredient-list/ingredient-list";

function BurgerIngredients({data}) {
    const [currentIngredients, setCurrentIngredients] = React.useState('bun')

    return (
        <section className={`${burgerIngredientsStyles.content} ml-5`}>
            <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
            <nav className={`${burgerIngredientsStyles.nav} mt-5`}>
                <Tab active={currentIngredients === 'bun'} value={'bun'} onClick={setCurrentIngredients}>
                    Булки
                </Tab>
                <Tab active={currentIngredients === 'sauce'} value={'sauce'}
                     onClick={setCurrentIngredients}>Соусы</Tab>
                <Tab active={currentIngredients === 'main'} value={'main'}
                     onClick={setCurrentIngredients}>Начинки</Tab>
            </nav>
            <div className={`${burgerIngredientsStyles.container}`}>
                <IngredientList data={data} type={{type: 'bun', title: 'Булки'}} />
                <IngredientList data={data} type={{type: 'sauce', title: 'Соусы'}} />
                <IngredientList data={data} type={{type: 'main', title: 'Начинка'}} />
            </div>
        </section>
    )
}

export default BurgerIngredients