"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';
import { Pagination, Mousewheel } from 'swiper/modules';
import MediaContentSlide from './MediaContentSlide';
import type { MediaContent } from '@/types/mediaContent-type';

const SwiperCarousel = () => {

    const mediaContentArr: MediaContent[] = [
        {
            id: 'asd87as0fd87as078f',
            mediaType: 'video',
            postId: 'adsfsadfsadf324s3124',
            url: 'https://www.w3schools.com/html/movie.mp4'
        },
        {
            id: 'asd87as0fd123as078f',
            mediaType: 'image',
            postId: 'adsfsg6574adf32413124',
            url: 'https://xsgames.co/randomusers/avatar.php?g=female'
        },
        {
            id: 'asd87as0fd123ag078f',
            mediaType: 'image',
            postId: 'adsfsa6574adf3g413124',
            url: 'https://www.w3schools.com/html/pic_trulli.jpg'
        },
    ]



    return (
        <div className='select-none '>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                mousewheel={{ enabled: true, forceToAxis: true }}
                modules={[Pagination, Mousewheel]}
                className="mySwiper "
                setWrapperSize={true}

                autoHeight={true}
            >
                {
                    mediaContentArr.map((mediaContent) =>
                        <SwiperSlide key={mediaContent.id}>
                            <MediaContentSlide mediaContent={mediaContent} />
                        </SwiperSlide>

                    )
                }
            </Swiper>
        </div>
    )
}

export default SwiperCarousel