import React, {useMemo} from 'react';
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import {getBookingDetails} from "../../services/actions/booking-details";
import {DropTargetMonitor, useDrop} from "react-dnd";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import {useLocation, useNavigate} from "react-router-dom";
import {addBun, addIngredients} from "../../services/reducers/burger-constructor";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import TIngredient from "../../constants/ingredient";


function BurgerConstructor() {
    const {ingredients, bun, counter} = useAppSelector(state => state.constructorList);
    const {auth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [{isOver}, dropRef] = useDrop({
        accept: 'ingredient',
        collect: (monitor: DropTargetMonitor<TIngredient>) => ({
            isOver: monitor.isOver()
        }),
        drop(item: TIngredient) {
            addIngredient(item)
        }
    })

    const openBookingDetails = () => {
        if (!auth) {
            navigate('/login', {state: {from: location}})
        } else {
            dispatch(getBookingDetails({ingredientsList: ingredients, bun: bun}))
        }
    }

    const addIngredient = (ingredient: TIngredient) => {
        if (ingredient.type === 'bun') {
            dispatch(addBun(ingredient))
        } else {
            dispatch(addIngredients({id: counter, data: ingredient}))
        }
    }

    const totalPrice = useMemo(() => {
        const bunPrice = bun ? bun.price : 0
        return ingredients.reduce((acc, item) => {
            return acc + item.data.price
        }, 0) + bunPrice * 2
    }, [ingredients, bun])

    return (
        <section className={`${burgerConstructorStyles.content} mt-25`}>
            {!!ingredients.length || bun ?
                <ul ref={dropRef} className={`${burgerConstructorStyles.ingredients}`}>
                    {bun ?
                        <li className={`${burgerConstructorStyles.ingredient} pl-8`}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </li>
                        :
                        <div
                            className={`${burgerConstructorStyles.emptyBox_bun} ${isOver ? burgerConstructorStyles.emptyBox_hover : ''}`}>
                            <h3 className={`${burgerConstructorStyles.emptyTitle} text text_type_main-large`}>
                                Перетащите сюда булку
                            </h3>
                        </div>
                    }
                    {!!ingredients.length ?
                        <li className={`${burgerConstructorStyles.ingredient} ${burgerConstructorStyles.ingredient_list}`}>
                            <ul className={`${burgerConstructorStyles.list}`}>
                                {ingredients.map((ingredient, index) => {
                                        return (
                                            <ConstructorIngredient ingredient={ingredient.data} index={index}
                                                                   key={ingredient.id}/>
                                        )
                                    }
                                )}
                            </ul>
                        </li>
                        :
                        <div
                            className={`${burgerConstructorStyles.emptyBox} 
                             ${isOver ? burgerConstructorStyles.emptyBox_hover : ''}`}>
                            <h3 className={`${burgerConstructorStyles.emptyTitle} text text_type_main-large`}>
                                Перетащите сюда ингредиенты
                            </h3>
                        </div>
                    }
                    {bun ?
                        <li className={`${burgerConstructorStyles.ingredient} pl-8`}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </li>
                        :
                        <div
                            className={`${burgerConstructorStyles.emptyBox_bun} ${isOver ? burgerConstructorStyles.emptyBox_hover : ''}`}>
                            <h3 className={`${burgerConstructorStyles.emptyTitle} text text_type_main-large`}>
                                Перетащите сюда булку
                            </h3>
                        </div>
                    }
                </ul>
                :
                <div ref={dropRef}
                     className={`${burgerConstructorStyles.emptyBox} ${isOver ? burgerConstructorStyles.emptyBox_hover : ''}`}>
                    <h3 className={`${burgerConstructorStyles.emptyTitle} text text_type_main-large`}>
                        Перетащите сюда булку и ингредиенты, чтобы сделать заказ
                    </h3>
                </div>
            }
            <div className={`${burgerConstructorStyles.container} mt-10`}>
                <p className={`text text_type_digits-medium mr-10`}>
                    {totalPrice}
                    <CurrencyIcon type={"primary"}/>
                </p>
                <Button onClick={openBookingDetails}
                        type={"primary"} size={"medium"}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor