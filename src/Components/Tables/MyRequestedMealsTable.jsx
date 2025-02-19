import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MyRequestedMealsTable = ({meal,index,refetch}) => {
    const {title,like,reviews_count,status}=meal;
    console.log(meal)
    const axiosSecure = useAxiosSecure();

    const handleCancelMeal = async(meal) => {
        const res = await axiosSecure.delete(`/delete-meal/${meal._id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
            // =====refetch to update the ui=====
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${meal?.title} has been deleted`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    return (
        <tr >
        <th>{index + 1}</th>
        <td className="">{title}</td>
        <td><span className="ml-3">{like}</span></td>
        <td><span className="ml-8">{reviews_count}</span></td>
        <td><span className="ml-3">{status}</span></td>
        <td>
        <button
                onClick={() => handleCancelMeal(meal)}
                className="btn btn-lg bg-orange-500"
                >Cancel</button>
        </td>
        </tr>
    );
};

export default MyRequestedMealsTable;