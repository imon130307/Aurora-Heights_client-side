import { Helmet } from 'react-helmet-async';
import useMeals from '../../Hooks/useMeals';
import MealCard from '../../Components/Cards/MealCard';
import LoadingSpinner from './../../Components/LoadingSpinner/LoadingSpinner';

const AllMeals = () => {
    const [ meals, isLoading]=useMeals();
    // if (isLoading) return <LoadingSpinner />
    // console.log(meals)
    return (
        <div>
            <Helmet>
                <title>Aurora Heights | All Meals</title>
            </Helmet>
            <div className="flex justify-center items-center my-6">
                <h2 className="font-extrabold text-3xl text-black">Welcome to <span className="text-yellow-600">Serving Meals</span></h2>
            </div>
            <div className='grid md:grid-cols-4 gap-10 mt-10'>
                {
                    meals.map(meal =>
                            <MealCard
                                key={meal._id}
                                meal={meal}
                                >
                            </MealCard>)
                }            
            </div>
        </div>
    );
};

export default AllMeals;