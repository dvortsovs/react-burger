import React from 'react';
import PropTypes from 'prop-types';
import ingredient from "../../constants/ingredient";
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';

function BurgerConstructor({data, handleModalOpen}) {

    const rolls = data.find(bun => bun.type === 'bun')

    return (
        <section className={`${burgerConstructorStyles.content} mt-25`}>
            {
                <ul className={`${burgerConstructorStyles.ingredients}`}>
                    <li className={`${burgerConstructorStyles.ingredient} pl-8`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${rolls.name} (верх)`}
                            price={rolls.price}
                            thumbnail={rolls.image}
                        />
                    </li>
                    <li className={`${burgerConstructorStyles.ingredient} ${burgerConstructorStyles.ingredient_list}`}>
                        <ul className={`${burgerConstructorStyles.list}`}>
                            {data.filter(ingredient => ingredient.type !== 'bun').map((ingredient, index) => {
                                    return (
                                        <li className={`${burgerConstructorStyles.item} `} key={index}>
                                            <div className={`${burgerConstructorStyles.holder}`}><DragIcon
                                                type={"primary"}/></div>
                                            <ConstructorElement
                                                text={ingredient.name}
                                                price={ingredient.price}
                                                thumbnail={ingredient.image}
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
                            text={`${rolls.name} (низ)`}
                            price={rolls.price}
                            thumbnail={rolls.image}
                        />
                    </li>
                </ul>
            }
            <div className={`${burgerConstructorStyles.container} mt-10`}>
                <p className={`text text_type_digits-medium mr-10`}>
                    610
                    <CurrencyIcon type={"primary"}/>
                </p>
                <Button onClick={() => {
                    handleModalOpen(null)
                }}
                        type={"primary"} size={"medium"}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredient).isRequired,
    handleModalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor