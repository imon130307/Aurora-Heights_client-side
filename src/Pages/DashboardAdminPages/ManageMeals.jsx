
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import useAuth from './../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import AdminAllMealsTable from '../../Components/Tables/AdminAllMealsTable';
import Swal from 'sweetalert2';

const ManageMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    console.log(user)
    const { data: adminAllMeals = [], refetch } = useQuery({
        queryKey: ['adminAllMeals', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/admin-all-meals/${user.email}`);
            return res.data;
        }
    })
    console.log(adminAllMeals)
    // !------handle meal delete-------
    const handleDeleteMeal = async(meal) => {
        const res = await axiosSecure.delete(`/delete-admin-meal/${meal._id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
            // =====refetch to update the ui=====
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${meal.title} has been deleted`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }







    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Meals</h2>
                <h2 className="text-3xl">Total Meals: {adminAllMeals?.length}</h2>
            </div>

            {
                adminAllMeals?.length ?
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Meal Title</th>
                                    <th>Likes</th>
                                    <th>Reviews_Count</th>
                                    <th>Rating</th>
                                    <th>Distributor Email</th>
                                    <th>Meal Update</th>
                                    <th>Meal Delete</th>
                                    <th>View Meal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminAllMeals.map((meal,index) => 
                                        <AdminAllMealsTable  
                                            key={index}
                                            meal={meal}
                                            index={index}
                                            handleDeleteMeal={handleDeleteMeal}
                                        ></AdminAllMealsTable>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No Meals yet</h2>
                    </div>
                </>
            }

        </div>
    );
};

export default ManageMeals;