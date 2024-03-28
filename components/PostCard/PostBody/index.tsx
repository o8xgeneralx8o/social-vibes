import React from 'react'
import SwiperCarousel from './SwiperCarousel'

const PostBody = ({ text }: { text: string }) => {
    return (
        <>
            <div className='px-4' >
                {text}
            </div>
            <SwiperCarousel />
        </>
    )
}

export default PostBody