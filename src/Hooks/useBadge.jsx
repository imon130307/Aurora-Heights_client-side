// !----This Hook is used to show Dashboard according to "badge"-------

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useBadge = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    console.log("You are Now current User",user)
    
    const { data: badge, isLoading } = useQuery({
        queryKey: ['badge', user?.email],//---Here email is used as dependency
        // ----Condition for Enable-----
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user-badge/badge/${user?.email}`)
            return data.badge;
        },
    })
    console.log("You are Now ==>>>>",badge)
    return [badge, isLoading]
};

export default useBadge;