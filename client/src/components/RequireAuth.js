import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../contexts/AuthProvider";

/**
 * Checks if user is allowed on page, otherwise redirects to unauthorized or login pages.
 * @param {*}  allowedRoles The roles that the page allowes
 */
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.role?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
export default RequireAuth;