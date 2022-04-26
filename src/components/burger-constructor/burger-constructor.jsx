import React from 'react';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    UPDATE_TOTAL_PRICE
} from "../../services/actions/burger-constructor";
import {getOrderDetails} from "../../services/actions/order-details";


function BurgerConstructor() {
    const ingredientList = useSelector(state => state.ingredientsList.ingredients);
    const {ingredients, bun, totalPrice} = useSelector(state => state.constructorList);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({
            type: ADD_BUN,
            bun: ingredientList.find(bun => bun.type === 'bun')
        })
        dispatch({
            type: ADD_INGREDIENT,
            ingredient: [...ingredientList.filter(ingredient => ingredient.type !== 'bun')]
        })
        dispatch({
            type: UPDATE_TOTAL_PRICE
        })
    }, [dispatch]);

    const openOrderDetails = () => {
        dispatch(getOrderDetails(ingredients))
    }

    const removeIngredient = (index) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            index: index
        })
        dispatch({
            type: UPDATE_TOTAL_PRICE
        })
    }

    return (
        <section className={`${burgerConstructorStyles.content} mt-25`}>
            {
                <ul className={`${burgerConstructorStyles.ingredients}`}>
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
                            {ingredients.filter(ingredient => ingredient.type !== 'bun').map((ingredient, index) => {
                                    return (
                                        <li className={`${burgerConstructorStyles.item} `} key={index}>
                                            <div className={`${burgerConstructorStyles.holder}`}><DragIcon
                                                type={"primary"}/></div>
                                            <ConstructorElement
                                                text={ingredient.name}
                                                price={ingredient.price}
                                                thumbnail={ingredient.image}
                                                handleClose={() => removeIngredient(index)}
                                            />
                                        </li>
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