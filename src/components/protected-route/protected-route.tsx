import {useLocation, Navigate} from "react-router-dom";
import {useAppSelector} from "../../services/hooks";

interface IProtectedRouteProps {
    toResetPassword?: boolean;
    protectFromAuth: boolean;
    children: JSX.Element;
}

interface ILocationState {
    from?: {
        pathname?: string
    }
}

const ProtectedRoute = ({children, protectFromAuth, toResetPassword=false}: IProtectedRouteProps ) => {
    const {auth} = useAppSelector(state => state.auth)
    const location = useLocation();
    const state = location.state as ILocationState;

    if (!auth && !protectFromAuth) {
        return <Navigate to='/login' state={{from: location}} replace />
    }

    if (auth && protectFromAuth && !location.state) {
        return <Navigate to='/' replace />
    }

    if (toResetPassword) {
        if (state?.from?.pathname === "/forgot-password") {
            return children
        } else return <Navigate to='/forgot-password' replace />
    }

    return children
}

export default ProtectedRoute