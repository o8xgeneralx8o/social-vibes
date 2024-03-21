import React from 'react'
import Image from 'next/image'
import DividerWithTitle from '@/components/DividerWithTitle'
import GoogleAuthButton from '@/components/GoogleAuthButton'
import AnimatedColoredTitle from '@/components/AnimatedColoredTitle'

const SignIn = () => {
    return (
        <div className='w-screen h-screen overflow-hidden'>

            <div className="flex flex-col justify-center items-center h-screen relative">
                <video src={"/videos/signin-page-video.mp4"} autoPlay loop muted className='absolute top-0 min-h-screen min-w-full object-cover'></video>

                <div
                    className="absolute flex flex-col items-center space-y-4  p-8  mx-auto w-[75%]  max-w-[500px] white-card  ">
                    <div className='w-48 h-64 md:w-64 md:h-80   relative' >
                        <Image src={'/images/simon-lee.png'} alt='sign-in-ui-image' fill={true} />
                    </div>

                    <AnimatedColoredTitle title={'Social Vibes'} />

                    <GoogleAuthButton />

                    <DividerWithTitle title={'Enjoy'} />

                </div>
            </div>

        </div>
    )
}
export default SignIn