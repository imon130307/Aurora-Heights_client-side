import ratingIcon from '../../assets/ratingIcon.gif'
import likeIcon from '../../assets/likeIcon.gif'
import { Link } from 'react-router-dom';

const MealCard = ({meal}) => {
    // console.log(meal);
    const {_id,title,image,price,rating,like}=meal;
    return (
        <div className="card card-compact bg-base-300 shadow-2xl">
            <figure>
                <img
                className="bg-center bg-cover  h-52 p-4 rounded-[32px]"
                src={image}
                alt="meal" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="grid grid-cols-3 justify-start">
                    <p><span className="text-black font-semibold ">$</span> {price}</p>
                    <div className='flex justify-start items-center gap-2'>
                        <span><img className='w-6 h-6' src={likeIcon} alt="" srcset="" /> </span><p>{like}</p>
                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <span><img className='w-6 h-6' src={ratingIcon} alt="" srcset="" /> </span><p>{rating}</p>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/meal/${_id}`}>
                        <button className="btn btn-outline bg-slate-300 border-b-4 border-orange-300">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;