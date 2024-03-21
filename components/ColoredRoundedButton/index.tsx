import React from 'react'


const ColoredRoundedButton = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <button className='flex items-center justify-center  rounded-full  animate-social-vibes-bg  w-10 h-10 text-white overflow-hidden  '>
            {children}
        </button>

    )
}

export default ColoredRoundedButton

//{/* <input className='bg-transparent   border-0 outline-0 w-[50%]' /> */}