import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";



const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { data: manageUsers = [], refetch } = useQuery({
        queryKey: ['manageUsers', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/manage-users`);
            return res?.data;
        }
    })
    // console.log(manageUsers)
    // console.log(user)
    // !-----handle make a admin-------
    const handleMakeAdmin = (user) =>{
        console.log(user)
        axiosSecure.patch(`/user-into/admin/${user?._id}`)
        .then(res =>{
            console.log(res?.data)
            if(res.data?.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }


    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {manageUsers?.length}</h2>
            </div>

            {
                manageUsers?.length ?
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Make Admin</th>
                                    <th>Subscription Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    manageUsers.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            { user.role === 'admin' ? 'Admin' : <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-lg bg-orange-500">
                                                <FaUsers 
                                                className="text-white text-xs"
                                                ></FaUsers>
                                            </button>
                                            }
                                        </td>
                                        <td>
                                            {user?.badge}
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No user yet</h2>
                    </div>
                </>
            }

        </div>
    );
};

export default ManageUsers;