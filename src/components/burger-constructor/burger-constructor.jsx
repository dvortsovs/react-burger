import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import bun from '../../images/bun-02.png';
import meat from '../../images/meat-02.png';
import sauce from '../../images/sauce-03.png';
import sp from '../../images/sp-1.png';
import rings from '../../images/mineral-rings.png';

function BurgerConstructor() {
    return(
        <section className={`${burgerConstructorStyles.content} mt-25`}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={bun}
            />
            <ul className={`${burgerConstructorStyles.list}`}>
                <li className={`${burgerConstructorStyles.item}`}>
                    <ConstructorElement
                        text="Соус традиционный галактический"
                        price={50}
                        thumbnail={sauce}
                    />
                </li>
                <li className={`${burgerConstructorStyles.item}`}>
                    <ConstructorElement
                        text="Мясо бессмертных моллюсков Protostomia"
                        price={50}
                        thumbnail={meat}
                    />
                </li>
                <li className={`${burgerConstructorStyles.item}`}>
                    <ConstructorElement
                        text="Плоды Фалленианского дерева"
                        price={50}
                        thumbnail={sp}
                    />
                </li>
                <li className={`${burgerConstructorStyles.item}`}>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={50}
                        thumbnail={rings}
                    />
                </li>
                <li className={`${burgerConstructorStyles.item}`}>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={50}
                        thumbnail={rings}
                    />
                </li>
            </ul>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={bun}
            />
        </section>
    )
}

export default BurgerConstructor