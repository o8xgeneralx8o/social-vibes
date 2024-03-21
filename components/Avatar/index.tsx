import React from 'react'
import Image from 'next/image';



const Avatar = () => {
    return (
        <Image
            src={'https://xsgames.co/randomusers/avatar.php?g=female'}
            width={40}
            height={40}
            alt={'avatar'}
            className={`
                 select-none
                overflow-hidden 
                rounded-full
            `} />
    )
}

export default Avatar