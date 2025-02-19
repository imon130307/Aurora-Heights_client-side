// !-----It is used for checking "admin" or not-------
import { Navigate } from 'react-router-dom'
import useRole from '../Hooks/useRole';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()
  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' replace='true' />
}
export default AdminRoute
