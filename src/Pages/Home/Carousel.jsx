// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../../assets/bannerImg/1.jpg'
import bgimg2 from '../../assets/bannerImg/2.jpg'
import bgimg3 from '../../assets/bannerImg/3.jpg'
import bgimg4 from '../../assets/bannerImg/4.jpg'

export default function Carousel() {
  return (
    <div className='max-w-[2520px] mx-auto bg-slate-100 dark:text-white'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='Budget-Friendly Accommodation'
            description='Ideal for backpackers and budget-conscious guests seeking clean and economical lodging without compromising quality.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Comfortable Living Spaces'
            description='Affordable and cozy shared rooms with all basic amenities, creating a home-like atmosphere for students and travelers.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Secure and Safe Environment'
            description='Round-the-clock security measures ensure peace of mind for all guests during their stay.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg4}
            text='Eco-Friendly Living'
            description='Sustainable practices like recycling and energy efficiency promote responsible travel for environmentally conscious guests.'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
