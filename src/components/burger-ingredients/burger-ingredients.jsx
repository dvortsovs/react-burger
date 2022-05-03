import React, {useRef} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css'
import IngredientList from "../ingredient-list/ingredient-list";

function BurgerIngredients() {

    const [currentIngredients, setCurrentIngredients] = React.useState('bun')

    const ingredientsRef = useRef(null)
    const bunRef = useRef(null);
    const saucesRef = useRef(null);
    const mainRef = useRef(null);

    const checkViewState = () => {
        bunRef.current.getBoundingClientRect().bottom - ingredientsRef.current.offsetTop > 0
            ? setCurrentIngredients('bun')
            : saucesRef.current.getBoundingClientRect().bottom - ingredientsRef.current.offsetTop > 0
                ? setCurrentIngredients('sauce')
                : mainRef.current.getBoundingClientRect().bottom - ingredientsRef.current.offsetTop > 0
                    ? setCurrentIngredients('main') :
                    setCurrentIngredients('bun')
    }

    const scrollToSection = (section) => {
        switch (section) {
            case 'bun': {
                bunRef.current.scrollIntoView({behavior: 'smooth', block: 'start',})
                setCurrentIngredients('bun')
                break
            }
            case 'sauce': {
                saucesRef.current.scrollIntoView({behavior: 'smooth', block: 'start',})
                setCurrentIngredients('sauce')
                break
            }
            case 'main': {
                mainRef.current.scrollIntoView({behavior: 'smooth', block: 'start',})
                setCurrentIngredients('main')
                break
            }
            default:
                return
        }
    }
    return (
        <section className={`${burgerIngredientsStyles.content}`}>
            <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
            <nav className={`${burgerIngredientsStyles.nav} mt-5`}>
                <Tab active={currentIngredients === 'bun'} value={'bun'} onClick={scrollToSection}>
                    Булки
                </Tab>
                <Tab active={currentIngredients === 'sauce'} value={'sauce'}
                     onClick={scrollToSection}>Соусы</Tab>
                <Tab active={currentIngredients === 'main'} value={'main'}
                     onClick={scrollToSection}>Начинки</Tab>
            </nav>
            <div ref={ingredientsRef} onScroll={checkViewState} className={`${burgerIngredientsStyles.container}`}>
                <IngredientList ref={bunRef} type={{type: 'bun', title: 'Булки'}}/>
                <IngredientList ref={saucesRef} type={{type: 'sauce', title: 'Соусы'}}/>
                <IngredientList ref={mainRef} type={{type: 'main', title: 'Начинка'}}/>
            </div>
        </section>
    )
}


export default BurgerIngredients