import React, {useRef} from 'react';
import constructorIngredientStyles from './constructor-ingredient.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    REMOVE_INGREDIENT, REPLACE_INGREDIENT,
} from "../../services/actions/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import ingredient from "../../constants/ingredient";
import PropTypes from "prop-types";


function ConstructorIngredient({ingredient, index}) {
    const {ingredients} = useSelector(state => state.constructorList)
    const ref = useRef(null)
    const dispatch = useDispatch();

    const [{isDragging}, drag] = useDrag({
        type: 'replaceItem',
        item: {ingredient, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const moveIngredient = (dragIndex, hoverIndex) => {
        const newArr = [...ingredients]
        newArr.splice(dragIndex, 1)
        newArr.splice(hoverIndex, 0, ingredients[dragIndex])
        dispatch({
            type: REPLACE_INGREDIENT,
            ingredients: [...newArr]
        })
    }

    const [, drop] = useDrop({
        accept: 'replaceItem',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveIngredient(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })


    const removeIngredient = (index) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            index: index
        })
    }

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <li style={{opacity}} ref={ref}
            className={`${constructorIngredientStyles.item}`}>
            <div className={`${constructorIngredientStyles.holder}`}><DragIcon
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

ConstructorIngredient.propTypes = {
    ingredient: ingredient.isRequired,
    index: PropTypes.number.isRequired
}

export default ConstructorIngredient
