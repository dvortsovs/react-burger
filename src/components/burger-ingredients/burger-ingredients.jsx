import React from 'react';
import {Tab, Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css'

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
                <article>
                    <h2 className={`mt-10 mb-6 text text_type_main-medium`}>Булки</h2>
                    <ul className={`${burgerIngredientsStyles.list} ml-4 mr-4`}>
                        {data.map((ingredient) => {
                            if (ingredient.type === 'bun') {
                                return (
                                    <li className={`${burgerIngredientsStyles.card}`} key={ingredient._id}>
                                        <img className={`ml-4 mr-4`} src={ingredient.image} alt={ingredient.name} />
                                        <Counter count={1} />
                                        <div className={`${burgerIngredientsStyles.price} mt-1 `}>
                                            <p className={`mr-2 text text_type_digits-default`}>{ingredient.price}</p>
                                            <CurrencyIcon type={"primary"} />
                                        </div>
                                        <p className={`text text_type_main-default mt-1`}>{ingredient.name}</p>
                                    </li>
                                )
                            } else return null
                        })}
                    </ul>
                </article>
                <article>
                    <h2 className={`mt-10 mb-6 text text_type_main-medium`}>Соусы</h2>
                    <ul className={`${burgerIngredientsStyles.list} ml-4 mr-4`}>
                        {data.map((ingredient) => {
                            if (ingredient.type === 'sauce') {
                                return (
                                    <li className={`${burgerIngredientsStyles.card}`} key={ingredient._id}>
                                        <img className={`ml-4 mr-4`} src={ingredient.image} alt={ingredient.name} />
                                        <Counter count={1} />
                                        <div className={`${burgerIngredientsStyles.price} mt-1 `}>
                                            <p className={`mr-2 text text_type_digits-default`}>{ingredient.price}</p>
                                            <CurrencyIcon type={"primary"} />
                                        </div>
                                        <p className={`text text_type_main-default mt-1`}>{ingredient.name}</p>
                                    </li>
                                )
                            } else return null
                        })}
                    </ul>
                </article>
                <article>
                    <h2 className={`mt-10 mb-6 text text_type_main-medium`}>Начинки</h2>
                    <ul className={`${burgerIngredientsStyles.list} ml-4 mr-4`}>
                        {data.map((ingredient) => {
                            if (ingredient.type === 'main') {
                                return (
                                    <li className={`${burgerIngredientsStyles.card}`} key={ingredient._id}>
                                        <img className={`ml-4 mr-4`} src={ingredient.image} alt={ingredient.name} />
                                        <Counter count={1} />
                                        <div className={`${burgerIngredientsStyles.price} mt-1 `}>
                                            <p className={`mr-2 text text_type_digits-default`}>{ingredient.price}</p>
                                            <CurrencyIcon type={"primary"} />
                                        </div>
                                        <p className={`text text_type_main-default mt-1`}>{ingredient.name}</p>
                                    </li>
                                )
                            } else return null
                        })}
                    </ul>
                </article>
            </div>
        </section>
    )
}

export default BurgerIngredients