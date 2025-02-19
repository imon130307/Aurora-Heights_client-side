import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
        const axiosPublic = useAxiosPublic();
        const { user} = useAuth();
        const { refetch, data: reviews = [],isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/all-reviews`);
            return res.data;
        }
    })
    console.log("All reviews===>>>",reviews)
    return (
        <div className='my-10'>
            <div className="flex justify-center items-center ">
                <h2 className="font-extrabold text-3xl text-black">Our honourable <span className="text-yellow-600">Customer reviews</span></h2>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-4">{review.customer_reviews}</p>
                            <h3 className="text-2xl text-orange-400">{review.customer_email}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;