import {api} from "../../constants/api";
import {ingredientsFailed, ingredientsRequest, ingredientsSuccess} from "../reducers/burger-ingredients";
import {TAppDispatch} from "../reducers";

export const getIngredients = () => {
    return (dispatch: TAppDispatch) => {
        dispatch(ingredientsRequest())
        fetch(`${api.urls.baseUrl}${api.urls.ingredients}`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then(res => {
                dispatch(ingredientsSuccess(res.data))
            })
            .catch(() => {
                dispatch(ingredientsFailed())
            })
    }
}