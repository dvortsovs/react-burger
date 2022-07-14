import React, {useEffect} from 'react';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {
    HomePage,
    NotFoundPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    OrdersPage, FeedPage, FeedDetailsPage
} from '../../pages';
import Layout from "../layout/layout";
import ProfileLayout from "../profile-layout/profile-layout";
import ProtectedRoute from "../protected-route/protected-route";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {updateUserInfoRequest} from "../../services/actions/auth-provider";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientDetailsPage from "../../pages/ingredient-details-page/ingredient-details-page";
import Modal from "../modal/modal";
import FeedDetails from "../feed-details/feed-details";
import {closeFeedDetails as closeFeed, openFeedDetails, TFeedDetailsOrder} from "../../services/reducers/feed-details";
import {
    closeIngredientDetails as closeIngredient,
    openIngredientDetails
} from "../../services/reducers/ingredient-details";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import TIngredient from "../../constants/ingredient";

export type ILocationState = {
    background?: {
        pathname: string
    };
    ingredient?: TIngredient;
    order?: TFeedDetailsOrder;
    from?: {
        pathname?: string
    }
}

const App = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const locationState = location.state as ILocationState
    const navigate = useNavigate();
    const {auth} = useAppSelector(state => state.auth)
    const {ingredients} = useAppSelector(state => state.ingredientsList)
    const feedDetailsStore = useAppSelector(state => state.feedDetails)
    const background = locationState?.background;
    const ingredient = locationState?.ingredient;
    const order = locationState?.order;

    const closeIngredientDetails = () => {
        if (background)
            navigate(background.pathname, {replace: true})
        dispatch(closeIngredient())
    }

    const closeFeedDetails = () => {
        if (background)
            navigate(background.pathname, {replace: true})
        dispatch(closeFeed())
    }

    useEffect(() => {
        if ((auth === false || auth === true)) {
            if (ingredients.length === 0) {
                dispatch(getIngredients());
            }
            if (ingredient) {
                dispatch(openIngredientDetails(ingredient))
            }
            if (order) {
                dispatch(openFeedDetails(order))
            }
        }
    }, [auth, dispatch])

    React.useEffect(() => {
        dispatch(updateUserInfoRequest());
        // dispatch(getIngredients());
        // if (ingredient) {
        //     dispatch(openIngredientDetails(ingredient))
        // }
        // if (order) {
        //     dispatch(openFeedDetails(order))
        // }
    }, [dispatch]);

    return (
        (auth === false || auth === true) ? <>
            <Routes location={background || location}>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path='feed' element={<FeedPage/>}/>
                    <Route path='feed/:id' element={<FeedDetailsPage/>}/>
                    <Route path='ingredients/:id' element={<IngredientDetailsPage/>}/>
                    <Route path='login' element={
                        <ProtectedRoute protectFromAuth={true}>
                            <LoginPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='register' element={
                        <ProtectedRoute protectFromAuth={true}>
                            <RegisterPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='forgot-password' element={
                        <ProtectedRoute protectFromAuth={true}>
                            <ForgotPasswordPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='reset-password' element={
                        <ProtectedRoute protectFromAuth={true} toResetPassword={true}>
                            <ResetPasswordPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='profile/orders/:id' element={
                        <ProtectedRoute protectFromAuth={false}>
                            <FeedDetailsPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='profile' element={
                        <ProtectedRoute protectFromAuth={false}>
                            <ProfileLayout/>
                        </ProtectedRoute>
                    }>
                        <Route index element={
                            <ProtectedRoute protectFromAuth={false}>
                                <ProfilePage/>
                            </ProtectedRoute>
                        }/>
                        <Route path='orders' element={
                            <ProtectedRoute protectFromAuth={false}>
                                <OrdersPage/>
                            </ProtectedRoute>
                        }/>
                        <Route path='logout'/>
                    </Route>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Route>
            </Routes>
            {background && <Routes>
                <Route path='ingredients/:id' element={
                    <Modal handleClose={closeIngredientDetails} title={"Детали ингредиента"}>
                        <IngredientDetails/>
                    </Modal>
                }/>
                <Route path='feed/:id' element={
                    <Modal handleClose={closeFeedDetails} title={""}>
                        <div style={{height: '620px'}}>
                            {
                                !!ingredients.length && feedDetailsStore.order &&
                                <FeedDetails/>
                            }
                        </div>
                    </Modal>
                }/>
                <Route path='profile/orders/:id' element={
                    <ProtectedRoute protectFromAuth={false}>
                        <Modal handleClose={closeFeedDetails} title={""}>
                            <div style={{height: '620px'}}>
                                {
                                    !!ingredients.length && feedDetailsStore.order &&
                                    <FeedDetails/>
                                }
                            </div>
                        </Modal>
                    </ProtectedRoute>
                }/>
            </Routes>}
        </> : null
    )
}

export default App