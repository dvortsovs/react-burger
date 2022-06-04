import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function ProtectedRoute({children}) {
    const {auth} = useSelector(state => state.auth)
    const location = useLocation();

    if (!auth) {
        return <Navigate to='/login' state={{from: location}} />
    }

    return children
}