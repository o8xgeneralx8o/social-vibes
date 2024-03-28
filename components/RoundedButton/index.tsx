import React from 'react'


const RoundedButton = ({
    selected,
    notSelected,
    isSelected
}: Readonly<{
    selected: React.ReactNode,
    notSelected: React.ReactNode,
    isSelected: boolean
}>) => {
    return (
        <button className={`flex items-center justify-center  rounded-full text-blue-500  w-10 h-10 bg-gray-100 hover:bg-gray-200 overflow-hidden outline-none`}>
            {isSelected ? selected : notSelected}
        </button>

    )
}

export default RoundedButton
