import React from 'react'
import Image from "next/image";
import socialVibesLogo from '@/public/images/logo.svg'

const SocialVibesLogo = () => {
    return (
        <Image src={socialVibesLogo} alt="social-vibes-logo" width={40} height={40}
            className='  cursor-pointer
            select-none' />

    )
}

export default SocialVibesLogo