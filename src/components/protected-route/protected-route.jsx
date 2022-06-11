import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function ProtectedRoute({children, protectFromAuth, toResetPassword=false}) {
    const {auth} = useSelector(state => state.auth)
    const location = useLocation();

    if (!auth && !protectFromAuth) {
        return <Navigate to='/login' state={{from: location}} replace />
    }

    if (auth && protectFromAuth && !location.state) {
        return <Navigate to='/' replace />
    }

    if (toResetPassword) {
        if (location.state?.from?.pathname === "/forgot-password") {
            return children
        } else return <Navigate to='/forgot-password' replace />
    }

    return children
}