
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ratingIcon from "../../assets/ratingIcon.gif";
import likeIcon from "../../assets/likeIcon.gif";
import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";






    const MealDetails = () => {
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate)
    const navigate = useNavigate();
    const location = useLocation();
    const {user}=useContext(AuthContext)
    const [role]=useRole()
    console.log("I am Current User from Meal Details===>>>>>>",user)
    const { id } = useParams();
    console.log(id);
    const axiosSecure = useAxiosSecure();
    // !-----get a specific meal------
    const {
        data: meal = {},
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
        const { data } = await axiosSecure.get(`/meal/${id}`);
        return data;
        },
    });
    console.log(meal);
    const {
        _id,
        title,
        category,
        image,
        ingredients,
        description,
        price,
        rating,
        like,
        post_time,
        seller_image,
        seller_email,
    } = meal;

    // !-------Send request for Meal-------------
    const handleRequestedMeal=()=>{
        if (user && user.email) {
            //----send meal to the database----
            const requestedMealData = {
                requestedMealId: _id,
                title,
                image,
                price,
                requestedMealDate:startDate,
                status:'Pending',
                sellerInfo:{
                    image:seller_image,
                    email:seller_email,
                },
                customerInfo:{
                    displayName:user?.displayName,
                    image:user?.photoURL,
                    email:user?.email,
                    role
                },
                
            }
            console.log(requestedMealData)
            // ===Making meal request=======
            axiosSecure.post('/post-requested-meal', requestedMealData)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${title} added to your DB`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to request meal",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //---- send the user to the login page-----
                    navigate('/log-in', { state: { from: location } })
                }
            });
        }
    }

    // !-------Send "like" for this Meal-------------
    const handleLikeNumber=async()=>{
        if (user && user.email) {
            //----send meal  to the database----
            const mealLikeData = {
                likeId: _id,
            }
            console.log(mealLikeData)
            // ===Giving "like for this Meal"=====
            const likeRes =axiosSecure.patch(`/meal-like/${_id}`, mealLikeData);
            console.log(likeRes)
            if(likeRes){
                // ====show success popup=====
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Congrate for opinion.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            refetch()
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to request meal",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //---- send the user to the login page-----
                    navigate('/log-in', { state: { from: location } })
                }
            });
        }
    }




    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
            <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
            <h2 className="text-5xl font-bold tooltip" data-tip={category}>
                {title}
                
            </h2>
            <span className="ml-3 text-yellow-500">(For {category})</span>
            <p className="py-1">
                <span>Description : </span>
                {description}
            </p>
            <p className="py-1">
                <span>Ingredients : </span>
                {ingredients}
            </p>
            <div className="flex justify-between items-center">
                <div>
                    {
                        post_time &&
                        <>
                            <span>Post time : </span>
                            {format(new Date(post_time),'P')}
                        </>
                    }
                </div>
                <div className="flex justify-start items-center">
                <span>
                    <img className="w-6 h-6" src={likeIcon} alt="" srcset="" />{" "}
                </span>
                <p>{like}</p>
                </div>
                <div className="flex justify-start items-center">
                <span>
                    <img className="w-6 h-6"  src={ratingIcon} alt="" srcset="" />{" "}
                </span>
                <p>{rating}</p>
                </div>
                <p>
                <span>$ </span>
                {price}
                </p>
            </div>
            <div className="flex justify-start items-center gap-5 mt-5 " >
                <p className="tooltip" data-tip="seller"><img className="w-12 h-12 rounded-full" src={seller_image} alt="" srcset="" /></p>
                <p>{seller_email}</p>
            </div>
            <div className="flex justify-between items-center mt-5">
                <button className="btn btn-primary w-32" onClick={handleLikeNumber}>Like</button>
                <button className="btn btn-primary w-32">Review</button>
                <button className="btn btn-primary w-32" onClick={handleRequestedMeal}>Meal Request</button>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default MealDetails;
