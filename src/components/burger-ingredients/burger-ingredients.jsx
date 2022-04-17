import React from 'react';
import PropTypes from 'prop-types';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css'
import IngredientList from "../ingredient-list/ingredient-list";

function BurgerIngredients({ handleModalOpen }) {

    const [currentIngredients, setCurrentIngredients] = React.useState('bun')

    return (
        <section className={`${burgerIngredientsStyles.content}`}>
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
                <IngredientList handleModalOpen={handleModalOpen} type={{type: 'bun', title: 'Булки'}}/>
                <IngredientList handleModalOpen={handleModalOpen} type={{type: 'sauce', title: 'Соусы'}}/>
                <IngredientList handleModalOpen={handleModalOpen} type={{type: 'main', title: 'Начинка'}}/>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    handleModalOpen: PropTypes.func.isRequired
}

export default BurgerIngredients