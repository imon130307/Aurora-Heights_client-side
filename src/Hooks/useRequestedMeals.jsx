// !----It is used instead of axios but will have security------
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {useQuery} from '@tanstack/react-query'


const useRequestedMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const {data: requestedMeals = [], refetch } = useQuery({
        queryKey: ['requestedMeal', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/requested-meal?email=${user.email}`);
            return res.data;
        }
    })

    return [requestedMeals, refetch]
};
export default useRequestedMeals;