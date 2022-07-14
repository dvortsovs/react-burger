import React, {FC, useRef} from 'react';
import constructorIngredientStyles from './constructor-ingredient.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient as removeAction, replaceIngredient} from "../../services/reducers/burger-constructor";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import TIngredient from "../../constants/ingredient";

interface IConstructorIngredientProps {
    ingredient: TIngredient;
    index: number;
}

const ConstructorIngredient: FC<IConstructorIngredientProps> = ({ingredient, index}) => {
    const {ingredients} = useAppSelector(state => state.constructorList)
    const ref = useRef<HTMLLIElement>(null)
    const dispatch = useAppDispatch();

    const [{isDragging}, drag] = useDrag({
        type: 'replaceItem',
        item: {ingredient, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const moveIngredient = (dragIndex: number, hoverIndex: number) => {
        const newArr = [...ingredients]
        newArr.splice(dragIndex, 1)
        newArr.splice(hoverIndex, 0, ingredients[dragIndex])
        dispatch(replaceIngredient(newArr))
    }

    const [, drop] = useDrop({
        accept: 'replaceItem',
        hover(item: IConstructorIngredientProps, monitor) {
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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
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


    const removeIngredient = (index: number) => {
        dispatch(removeAction(index))
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

export default ConstructorIngredient
