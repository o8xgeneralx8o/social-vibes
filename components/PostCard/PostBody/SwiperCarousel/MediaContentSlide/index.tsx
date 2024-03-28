import React, { useEffect, useRef, useState } from 'react'
import type { MediaContent } from '@/types/mediaContent-type'
import Image from 'next/image'
import { FaPlay } from "react-icons/fa";
import { useInView } from "react-intersection-observer";


const MediaContentSlide = ({
    mediaContent
}: {
    mediaContent: MediaContent
}) => {
    const video = useRef<HTMLVideoElement>(null);
    const [isVideoPaused, setIsVideoPaused] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0,
    });


    const handlePlayVideo = async () => {
        await video?.current?.play();
        setIsVideoPaused(false);
    }

    const handlePauseVideo = async () => {
        video?.current?.pause();
        setIsVideoPaused(true);
    }

    useEffect(() => {
        if (inView === false)
            handlePauseVideo()
    }, [inView])

    if (mediaContent.mediaType === 'image')
        return (
            <Image
                src={mediaContent.url}
                width={750}
                height={0}
                alt={'image here!'}
            />
        )
    else if (mediaContent.mediaType === 'video')
        return (
            <div className='w-full relative' ref={ref}>

                <video ref={video} onEnded={() => { setIsVideoPaused(true) }} onClick={handlePauseVideo} className='w-full '>
                    <source src={mediaContent.url} type="video/mp4" />
                </video>
                {
                    isVideoPaused ? (
                        <div onClick={handlePlayVideo} className='absolute  top-0 right-0 bottom-0 flex items-center justify-center left-0  '>
                            <FaPlay size={150} className='text-gray-300 opacity-20    hover:opacity-30' />
                        </div>
                    ) : (<></>)
                }

            </div>

        )
}

export default MediaContentSlide