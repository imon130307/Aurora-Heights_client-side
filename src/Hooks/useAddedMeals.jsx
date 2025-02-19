import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAddedMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const {data: addedMeals = [], refetch } = useQuery({
        queryKey: ['addedMeal', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/added-meals?email=${user?.email}`);
            return res.data;
        }
    })

    return [addedMeals, refetch]
};

export default useAddedMeals;