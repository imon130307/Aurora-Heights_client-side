import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AdminRequestedMealsTable from "../../Components/Tables/AdminRequestedMealsTable";
import Swal from "sweetalert2";

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    console.log(user)
    const { data: adminRequestedMeals = [], refetch } = useQuery({
        queryKey: ['adminRequestedMeals', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/admin-requested-meals/${user.email}`);
            return res.data;
        }
    })
    console.log(adminRequestedMeals)
    
    // !----handle serve meal status----
    const handleDeliveredMeal = (meal) =>{
        console.log(meal)
        axiosSecure.patch(`/delivered-meal/${meal?._id}`)
        .then(res =>{
            console.log(res?.data)
            if(res.data?.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${meal?.title} is delivered Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }


    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Requested Meals</h2>
                <h2 className="text-3xl">Total Requested Meals: {adminRequestedMeals?.length}</h2>
            </div>

            {
                adminRequestedMeals?.length ?
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Meal Title</th>
                                    <th>Customer Email</th>
                                    <th>Status</th>
                                    <th>Serve Meal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminRequestedMeals.map((meal,index) => 
                                        <AdminRequestedMealsTable  
                                            key={index}
                                            meal={meal}
                                            index={index}
                                            handleDeliveredMeal={handleDeliveredMeal}
                                        ></AdminRequestedMealsTable>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No do serve meal yet</h2>
                    </div>
                </>
            }

        </div>
    );
};

export default ServeMeals;