import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import {DataContext} from "../../services/data-context";

function BurgerConstructor({handleModalOpen}) {
    const { data } = useContext(DataContext)
    const rolls = data.find(bun => bun.type === 'bun')
    const [ingredients, setIngredients] = React.useState([])
    const [totalPrice, setTotalPrice] = React.useState(null)
    React.useEffect(() => {
        setIngredients([...data])
        setTotalPrice(rolls.price * 2 + ingredients.reduce((total, current) => {
            if (current.type !== 'bun') {
                return total + current.price
            } else {
                return total
            }
        }, 0))
    }, [ingredients])

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
                            {ingredients.filter(ingredient => ingredient.type !== 'bun').map((ingredient, index) => {
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
                    {totalPrice}
                    <CurrencyIcon type={"primary"}/>
                </p>
                <Button onClick={() => {
                    handleModalOpen(data.map((ingredient) => {
                        return ingredient._id
                    }))
                }}
                        type={"primary"} size={"medium"}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    handleModalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor