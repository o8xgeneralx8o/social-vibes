import React from 'react'
import Image from "next/image";
import socialVibesLogo from '@/public/images/logo.svg'

const SocialVibesLogoButton = () => {
    return (
        <button className="flex justify-center items-center w-12 h-12 rounded-full bg-transparent-green-vibes   ease-in duration-300 transition ">
            <Image src={socialVibesLogo} alt="social-vibes-logo" width={27} />
        </button>
    )
}

export default SocialVibesLogoButton