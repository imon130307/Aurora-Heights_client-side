import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import MealCard from "../../Components/Cards/MealCard";
import UpcomingCard from "../../Components/Cards/UpcomingCard";


const UpcomingMeals = () => {
        const axiosSecure = useAxiosSecure();
        const { user} = useAuth();
        const { refetch, data: meals = [],isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/upcoming-meals`);
            return res.data;
        }
    })
    console.log(meals)
    
    return (
        <div>
            <Helmet>
                <title>Aurora Heights | Upcoming Meals</title>
            </Helmet>
            <div className="flex justify-center items-center my-6">
                <h2 className="font-extrabold text-3xl text-black">Welcome to <span className="text-yellow-600">Upcoming Meals</span></h2>
            </div>
            <div className='grid md:grid-cols-4 gap-10 my-10'>
                {
                    meals.map(meal =>
                            <UpcomingCard
                                key={meal._id}
                                meal={meal}
                                >
                            </UpcomingCard>)
                }            
            </div>
        </div>
    );
};
export default UpcomingMeals;