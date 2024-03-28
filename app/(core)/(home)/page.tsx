import React from 'react'
import PostCard from '@/components/PostCard'

const Home = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className='my-2 px-2 w-full flex flex-col items-center gap-4'>
            {
                arr.map((num) =>
                    <div key={num.toString()} className='max-w-[750px] w-full'>
                        <PostCard />
                    </div>
                )
            }
        </div>
    )
}
export default Home