import React from 'react';
import {useDispatch, useSelector} from "react-redux";
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
import {CLOSE_DETAILS, OPEN_DETAILS} from "../../services/actions/ingredient-details";
import FeedDetails from "../feed-details/feed-details";
import {CLOSE_FEED_DETAILS, OPEN_FEED_DETAILS} from "../../services/actions/feed-details";


export default function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {auth} = useSelector(state => state.auth)
    const {ingredients} = useSelector(state => state.ingredientsList)
    const feedDetailsStore = useSelector(state => state.feedDetails)
    const background = location.state?.background;
    const ingredient = location.state?.ingredient;
    const order = location.state?.order;

    const closeIngredientDetails = () => {
        navigate(background.pathname, {replace: true})
        dispatch({
            type: CLOSE_DETAILS
        })
    }

    const closeFeedDetails = () => {
        navigate(background.pathname, {replace: true})
        dispatch({
            type: CLOSE_FEED_DETAILS
        })
    }

    React.useEffect(() => {
        dispatch(getIngredients());
        dispatch(updateUserInfoRequest());
        if (ingredient) {
            dispatch({
                type: OPEN_DETAILS,
                ingredient: ingredient
            })
        }
        if (order) {
            dispatch({
                type: OPEN_FEED_DETAILS,
                order: order
            })
        }
    }, [dispatch]);

    return (
        (auth === false || auth === true) && <>
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
                        <Route path='logout' element={
                            <ProtectedRoute protectFromAuth={false}>
                                {null}
                            </ProtectedRoute>
                        }/>
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
        </>
    )
}