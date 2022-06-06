import React from 'react';
import {useDispatch} from "react-redux";
import {Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import {
    HomePage,
    NotFoundPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    OrdersPage
} from './pages';
import Layout from "./components/layout/layout";
import ProfileLayout from "./components/profile-layout/profile-layout";
import ProtectedRoute from "./components/protected-route/protected-route";
import {getIngredients} from "./services/actions/burger-ingredients";
import {updateUserInfoRequest} from "./services/actions/auth-provider";
import IngredientDetails from "./components/ingredient-details/ingredient-details";
import IngredientDetailsPage from "./pages/ingredient-details-page/ingredient-details-page";
import Modal from "./components/modal/modal";
import {CLOSE_DETAILS, OPEN_DETAILS} from "./services/actions/ingredient-details";


export default function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.background;
    const ingredient = location.state?.ingredient;

    const closeIngredientDetails = () => {
        dispatch({
            type: CLOSE_DETAILS
        })
        navigate(background.pathname, {replace: true})
    }

    React.useEffect(() => {
        dispatch(getIngredients());
        dispatch(updateUserInfoRequest());
        if (ingredient){
            dispatch({
                type: OPEN_DETAILS,
                ingredient: ingredient
        })
        };
    }, [dispatch]);

    return (
        <>
            <Routes location={background || location}>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='ingredients/:id' element={<IngredientDetailsPage />} />
                    <Route path='login' element={
                        <ProtectedRoute protectFromAuth={true}>
                            <LoginPage />
                        </ProtectedRoute>
                    } />
                    <Route path='register' element={
                        <ProtectedRoute protectFromAuth={true}>
                            <RegisterPage />
                        </ProtectedRoute>
                    } />
                    <Route path='forgot-password' element={
                        <ProtectedRoute protectFromAuth={true}>
                            <ForgotPasswordPage />
                        </ProtectedRoute>
                    } />
                    <Route path='reset-password' element={
                        <ProtectedRoute protectFromAuth={true} toResetPassword={true}>
                            <ResetPasswordPage />
                        </ProtectedRoute>
                    } />
                    <Route path='profile' element={
                        <ProtectedRoute protectFromAuth={false}>
                            <ProfileLayout />
                        </ProtectedRoute>
                    } >
                        <Route index element={
                            <ProtectedRoute protectFromAuth={false}>
                                <ProfilePage />
                            </ProtectedRoute>
                        } />
                        <Route path='orders' element={
                            <ProtectedRoute protectFromAuth={false}>
                                <OrdersPage />
                            </ProtectedRoute>
                        } />
                        <Route path='logout' element={
                            <ProtectedRoute protectFromAuth={false}>
                                <Navigate to='/login' replace state={{from: '/logout'}}/>
                            </ProtectedRoute>
                        } />
                    </Route>
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
             {background && <Routes>
                 <Route path='ingredients/:id' element={
                     <Modal handleClose={closeIngredientDetails} title={"Детали ингредиента"}>
                         <IngredientDetails/>
                     </Modal>
                 } />
             </Routes>}
        </>
    )
}