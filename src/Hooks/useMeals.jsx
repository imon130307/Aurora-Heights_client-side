// !----It is used instead of using several places------
import { useState,useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';


const useMeals = () => {
    // const [meals, setmeals] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}/all-meals`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setmeals(data);
    //         setLoading(false);
    //     });
    // }, []);
        const axiosSecure = useAxiosSecure();
        const { user} = useAuth();
        const { refetch, data: meals = [],isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/all-meals`);
            return res.data;
        }
    })

return [meals, refetch,isLoading]
// return [ meals, loading ];
};

export default useMeals;



// const useCart = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user} = useAuth();
//     const { refetch, data: cart = [] } = useQuery({
//         // queryKey: ['cart'],
//         queryKey: ['cart', user?.email],
//         queryFn: async() => {
//             // const res = await axiosSecure.get(`/carts`);
//             const res = await axiosSecure.get(`/carts?email=${user.email}`);
//             return res.data;
//         }
//     })

//     return [cart, refetch]
// };

// export default useCart;