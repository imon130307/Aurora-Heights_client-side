import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../AuthProvider/AuthProvider';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation();
    console.log(location)
    if(loading){
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (user) {
        return children;
    }
    return <Navigate to='/log-in' state={{ from: location }} replace={true} />;
};

export default PrivateRoute;