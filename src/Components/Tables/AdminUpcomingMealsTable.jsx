

const AdminUpcomingMealsTable = ({meal,index,handlePublishedMeal}) => {
    const {title,like,reviews_count}=meal;
    return (
        <tr >
        <th>{index + 1}</th>
        <td className="">{title}</td>
        <td>
            <button
                onClick={() => handlePublishedMeal(meal)}
                className="btn btn-lg bg-orange-500"
            >Publish Meal</button>
        </td>
        </tr>
    );
};

export default AdminUpcomingMealsTable;