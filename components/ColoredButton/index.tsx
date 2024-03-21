import React from 'react'


const ColoredButton = ({
    icon,
    title,
    animated,
    longBorder,
    iconAlwaysVisible,
    selected
}: Readonly<{
    icon?: React.ReactNode;
    title?: string,
    animated?: boolean,
    longBorder?: boolean
    iconAlwaysVisible?: boolean,
    selected?: boolean
}>) => {
    return (

        <button className={`
                flex 
                flex-row 
                items-center 
                justify-center 
                font-black 
                select-none 
                h-full 
                text-nowrap 
                text-xl 
                md:text-3xl 
                text-blue-500
            `}
        >
            <div className={`hover:bg-gray-50 
                  rounded-xl 
                px-4 
                h-12
                flex items-center justify-center
                ${selected ? 'text-white bg-blue-500' : ''}
                ${longBorder ? ' px-8 sm:px-16 md:px-30' : ' '}
                `}>
                <div className={`inline-block ${iconAlwaysVisible ? '' : 'block md:hidden'}`} >
                    {icon}
                </div>
                <span className='hidden md:inline-block '>
                    {title}
                </span>
            </div>



        </button>

    )
}

export default ColoredButton

//                border-blue-500 
//           bg-gray-100     
