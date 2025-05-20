import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UnathenticatedRoute = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    let isValidToken = false;

    //Check if token exists and is not expired
    if (token) {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp >  currentTime){
                isValidToken = true;
            }
        } catch (error) {
            console.error('Invalid Token: ', error);
            
        }
    }
    if(isValidToken) {
        return <Navigate to="/dashboard" state={{from: location}} replace />
    }

    return <Outlet />
}
export default UnathenticatedRoute;