// !-----It is used for checking "customer" or not-------
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/useRole";


const CustomerRoute = ({children}) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner />
    if (role === 'customer') return children
    return <Navigate to='/dashboard' replace='true' />
};
export default CustomerRoute;