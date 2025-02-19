import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import ratingIcon from '../../assets/ratingIcon.gif'
import likeIcon from '../../assets/likeIcon.gif'

const AdminReviewDetails = () => {
    const {id}=useParams()
    const axiosSecure = useAxiosSecure();
    const { data: review = [] } = useQuery({
        queryKey: ['review', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review-details/${id}`)
            return res.data;
        }
    })
    // console.log(review)
    const {title,category,likes,rating,customer_reviews,customer_email}=review
    return (
        <div className="card bg-orange-100 max-w-96 mx-auto text-black my-16 shadow-2xl ">
            <div className="card-body justify-start items-start text-center">
                <h2 className="card-title">{title}</h2>
                <p><span>Category : </span> {category}.</p>
                <p><span>Review : </span> {customer_reviews}.</p>
                <div className="max-w-96 flex justify-between gap-36">
                    <div className='flex justify-between items-center gap-2'>
                        <span><img className='w-6 h-6' src={likeIcon} alt="" srcset="" /> </span><p>{likes}</p>
                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <span><img className='w-6 h-6' src={ratingIcon} alt="" srcset="" /> </span><p>{rating}</p>
                    </div>
                </div>
                <p><span>Email: </span> {customer_email}.</p>
            </div>
        </div>
    );
};

export default AdminReviewDetails;