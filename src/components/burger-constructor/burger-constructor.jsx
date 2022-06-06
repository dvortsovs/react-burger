import React, {useMemo} from 'react';
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_BUN,
    ADD_INGREDIENT,
} from "../../services/actions/burger-constructor";
import {getOrderDetails} from "../../services/actions/order-details";
import {useDrop} from "react-dnd";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import {useLocation, useNavigate} from "react-router-dom";


function BurgerConstructor() {
    const {ingredients, bun, counter} = useSelector(state => state.constructorList);
    const {auth} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item) {
            addIngredient(item.ingredient)
        }
    })

    const openOrderDetails = () => {
        if (!auth) {
            navigate('/login', {state:{from: location}})
        } else dispatch(getOrderDetails(ingredients, bun))
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
    }

    const totalPrice = useMemo(() => {
        return ingredients.reduce((acc, item) => {
            return acc + item.data.price
        }, 0) + bun.price * 2
    }, [ingredients, bun])

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
                                        <ConstructorIngredient ingredient={ingredient.data} index={index}
                                                               key={ingredient.id}/>
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