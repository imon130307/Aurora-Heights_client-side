import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyRequestedMealsTable from "../../Components/Tables/MyRequestedMealsTable";


const MyRequestedMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    console.log(user)
    const { data: myrequestedMeals = [], refetch } = useQuery({
        queryKey: ['myrequestedMeals', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/my-requested-meals/${user.email}`);
            return res.data;
        }
    })
    console.log(myrequestedMeals)

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">My Requested Meals</h2>
                <h2 className="text-3xl">Total Requested Meals: {myrequestedMeals?.length}</h2>
            </div>
            {
                myrequestedMeals?.length ?
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/*---- head ----*/}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Meal Title</th>
                                    <th>Likes</th>
                                    <th>Reviews_Count</th>
                                    <th>Status</th>
                                    <th>Cancel Meal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myrequestedMeals.map((meal,index) => 
                                        <MyRequestedMealsTable  
                                            key={index}
                                            meal={meal}
                                            index={index}
                                            refetch={refetch}
                                        ></MyRequestedMealsTable>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No do request meal yet</h2>
                    </div>
                </>
            }
        </div>
    );
};

export default MyRequestedMeals;