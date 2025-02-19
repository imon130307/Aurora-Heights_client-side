// !----This Hook is used to show Dashboard according to "role"-------
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'


const useRole = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth()
  console.log("You are Now current User",user)
  
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],//---Here email is used as dependency
    // ----Condition for Enable-----
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-role/role/${user?.email}`)
      return data.role;
    },
  })
  console.log("You are Now ==>>>>",role)
  return [role, isLoading]
}

export default useRole
