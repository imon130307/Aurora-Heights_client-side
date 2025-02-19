import MealCard from "../../Components/Cards/MealCard";



const MealsByTabwise = ({meals}) => {
    // console.log(meals)




    return (
        <div className="mt-10">
            <div className='grid md:grid-cols-3 gap-10'>
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

export default MealsByTabwise;