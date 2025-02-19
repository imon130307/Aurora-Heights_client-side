import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AdminUpcomingMealsTable from "../../Components/Tables/AdminUpcomingMealsTable";
import { toast } from "react-toastify";


const AdminUpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    console.log(user)
    const { data: adminUpcomigMeals = [], refetch } = useQuery({
        queryKey: ['adminRequestedMeals', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/admin-upcoming-meals/${user.email}`);
            return res.data;
        }
    })
    console.log(adminUpcomigMeals)

    //!--For publishMeal in mealCollection---
    const handlePublishedMeal = async(meal) =>{
        console.log(meal)
        // ---Find target meal-----
        const upcomingMeal = adminUpcomigMeals.find((adminUpcomigMeal) => adminUpcomigMeal?._id === meal?._id);
        console.log(upcomingMeal)
        const mealData = {
            title:upcomingMeal?.title,
            category:upcomingMeal?.category,
            image: upcomingMeal?.image,
            ingredients:upcomingMeal?.ingredients,
            description:upcomingMeal?.description,
            price:upcomingMeal?.price,
            rating:upcomingMeal?.rating,
            like:upcomingMeal?.like,
            reviews_count:upcomingMeal?.reviews_count,
            post_time:Date.now(),
            seller_image:upcomingMeal?.seller_image,
            seller_email:upcomingMeal?.seller_email,
        }
        // console.table(mealData)
            try {
                //===== post req for a publish meal======
                await axiosSecure.post('/add-publish-meal', mealData)
                //===== delete req for this publish meal======
                const res = await axiosSecure.delete(`/delete-publish-meal/${upcomingMeal._id}`);
                refetch();
                toast.success('This Meal is published in mealCollection Successfully!')
                // navigate('/')
            } catch (err) {
                console.log(err)
            } finally {
                // setLoading(false)
            }
    }






    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Upcoming Meals</h2>
                <h2 className="text-3xl">Total Upcoming Meals: {adminUpcomigMeals?.length}</h2>
            </div>

            {
                adminUpcomigMeals?.length ?
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Meal Title</th>
                                    <th>Publish Meal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminUpcomigMeals.map((meal,index) => 
                                        <AdminUpcomingMealsTable  
                                            key={index}
                                            meal={meal}
                                            index={index}
                                            handlePublishedMeal={handlePublishedMeal}
                                        ></AdminUpcomingMealsTable>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No upcoming Meals yet</h2>
                    </div>
                </>
            }
        </div>
    );
};

export default AdminUpcomingMeals;