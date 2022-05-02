import React from 'react';
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_BUN,
    ADD_INGREDIENT,
    UPDATE_TOTAL_PRICE
} from "../../services/actions/burger-constructor";
import {getOrderDetails} from "../../services/actions/order-details";
import {useDrop} from "react-dnd";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";


function BurgerConstructor() {
    const ingredientList = useSelector(state => state.ingredientsList.ingredients);
    const {ingredients, bun, totalPrice, counter} = useSelector(state => state.constructorList);
    const dispatch = useDispatch();

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item) {
            addIngredient(item.ingredient)
        }
    })

    React.useEffect(() => {
        dispatch({
            type: ADD_INGREDIENT,
            ingredient: []

        })
        dispatch({
            type: UPDATE_TOTAL_PRICE
        })
    }, [dispatch]);

    const openOrderDetails = () => {
        dispatch(getOrderDetails(ingredients))
    }

    const addIngredient = (ingredient) => {
        if (ingredient.type === 'bun') {
            dispatch({
                type: ADD_BUN,
                bun: ingredient
            })
        } else {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: [{id: counter, data: ingredient}]
            })
        }
        dispatch({
            type: UPDATE_TOTAL_PRICE
        })
    }

    const constructorIngredients = ingredients.filter(ingredient => ingredient.type !== 'bun')

    return (
        <section className={`${burgerConstructorStyles.content} mt-25`}>
            {
                <ul ref={dropRef} className={`${burgerConstructorStyles.ingredients}`}>
                    <li className={`${burgerConstructorStyles.ingredient} pl-8`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </li>
                    <li className={`${burgerConstructorStyles.ingredient} ${burgerConstructorStyles.ingredient_list}`}>
                        <ul className={`${burgerConstructorStyles.list}`}>
                            {constructorIngredients.map((ingredient, index) => {
                                    return (
                                        <ConstructorIngredient ingredient={ingredient.data} index={index} key={ingredient.id} />
                                    )
                                }
                            )}
                        </ul>
                    </li>
                    <li className={`${burgerConstructorStyles.ingredient} pl-8`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </li>
                </ul>
            }
            <div className={`${burgerConstructorStyles.container} mt-10`}>
                <p className={`text text_type_digits-medium mr-10`}>
                    {totalPrice}
                    <CurrencyIcon type={"primary"}/>
                </p>
                <Button onClick={openOrderDetails}
                        type={"primary"} size={"medium"}>
                    Оформить заказ
                </Button>

            </div>
        </section>
    )
}


export default BurgerConstructor