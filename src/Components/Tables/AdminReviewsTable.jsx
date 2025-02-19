import { Link } from "react-router-dom";

const AdminReviewsTable = ({meal,index,handleDeleteReview}) => {
    const {_id,title,likes,reviews_count}=meal
    console.log(likes)
    return (
        <tr >
        <th>{index + 1}</th>
        <td className="">{title}</td>
        <td><span className="ml-3">{likes}</span></td>
        <td><span className="ml-8">{reviews_count}</span></td>
        <td>
        <button
                onClick={() => handleDeleteReview(_id)}
                className="btn btn-lg bg-orange-500"
                >Delete</button>
        </td>
        <td>
        <Link to={`/dashboard/review-details/${_id}`}>
            <button
                className="btn btn-lg bg-orange-500"
                >View
            </button>
        </Link>
        </td>
        </tr>
    );
};

export default AdminReviewsTable;