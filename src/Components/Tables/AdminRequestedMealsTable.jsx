

const AdminRequestedMealsTable = ({meal,index,handleDeliveredMeal}) => {
    const {title,customerInfo,status}=meal;
    return (
        <tr >
        <th>{index + 1}</th>
        <td className="">{title}</td>
        <td><span className="">{customerInfo?.email}</span></td>
        <td><span className="">{status}</span></td>
        <td>
        <button
                onClick={() => handleDeliveredMeal(meal)}
                className="btn btn-lg bg-orange-500"
                >Serve</button>
        </td>
        </tr>
    );
};

export default AdminRequestedMealsTable;