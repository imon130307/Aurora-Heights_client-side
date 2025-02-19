import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AdminReviewsTable from "../../Components/Tables/AdminReviewsTable";
import Swal from "sweetalert2";


const AdminAllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    console.log(user)
    const { data: adminReviews = [], refetch } = useQuery({
        queryKey: ['adminReviews', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/admin-reviews/${user?.email}`);
            return res.data;
        }
    })
    // console.log(adminReviews)


    //! ----handle delete review--------
    const handleDeleteReview = async(id) => {
        const res = await axiosSecure.delete(`/admin-review-delete/${id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
            // =====refetch to update the ui=====
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `This review has been deleted`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }





    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Reviews</h2>
                <h2 className="text-3xl">Total Reviews: {adminReviews?.length}</h2>
            </div>


            {
                adminReviews?.length ?
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
                                    <th>Meal Delete</th>
                                    <th>View Meal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminReviews.map((meal,index) => 
                                        <AdminReviewsTable  
                                            key={index}
                                            meal={meal}
                                            index={index}
                                            handleDeleteReview={handleDeleteReview}
                                        ></AdminReviewsTable>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No review yet</h2>
                    </div>
                </>
            }
        </div>
    );
};

export default AdminAllReviews;