import React from 'react';
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';


function BurgerConstructor({data}) {

    const rolls = data.find(bun => bun.type === 'bun')

    return (
        <section className={`${burgerConstructorStyles.content} mt-25`}>
            {
                <ul className={`${burgerConstructorStyles.ingredients} pl-8`}>
                    <li className={`${burgerConstructorStyles.ingredient} `}>
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
                            {data.map((ingredient) => {
                                    if (ingredient.type !== 'bun') {
                                        return (
                                            <li className={`${burgerConstructorStyles.item} `} key={ingredient._id}>
                                                <ConstructorElement
                                                    text={ingredient.name}
                                                    price={ingredient.price}
                                                    thumbnail={ingredient.image}
                                                />
                                            </li>
                                        )
                                    } else return null
                                }
                            )}
                        </ul>
                    </li>
                    <li className={`${burgerConstructorStyles.ingredient}`}>
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
                <Button
                type={"primary"} size={"medium"}>
                Оформить заказ
            </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor