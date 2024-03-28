import React from 'react'

const AnimatedColoredTitle = ({ title }: Readonly<{ title: string }>) => {
    return (
        <div className=" animate-social-vibes-color  font-black text-xl md:text-4xl ">{title}</div>
    )
}

export default AnimatedColoredTitle