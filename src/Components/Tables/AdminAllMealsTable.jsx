import { Link } from "react-router-dom";


const AdminAllMealsTable = ({meal,index,handleDeleteMeal}) => {
    const {_id,title,like,reviews_count,rating,seller_email}=meal
    return (
        <tr >
        <th>{index + 1}</th>
        <td className="">{title}</td>
        <td><span className="ml-3">{like}</span></td>
        <td><span className="ml-8">{reviews_count}</span></td>
        <td><span className="ml-3">{rating}</span></td>
        <td>{seller_email}</td>
        <td>
            <button
                // onClick={() => handleUpdateMeal(meal)}
                className="btn btn-lg bg-orange-500"
                >Update
            </button>
        </td>
        <td>
            <button
                onClick={() => handleDeleteMeal(meal)}
                className="btn btn-lg bg-orange-500"
                >Delete
            </button>
        </td>
        <td>
            <Link to={`/meal/${_id}`}>
                <button
                    className="btn btn-lg bg-orange-500"
                    >View
                </button>
            </Link>
        </td>
        </tr>
    );
};

export default AdminAllMealsTable;