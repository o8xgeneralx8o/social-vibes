import Avatar from '@/components/Avatar'
import React from 'react'
import moment from 'moment'

const PostHeader = ({ author, createdAt }: {
    author: string,
    createdAt: Date
}) => {
    return (
        <div className='px-4 flex flex-row gap-2 w-full'>
            <div>
                <Avatar />

            </div>
            <div className=' flex flex-col '>
                <p className='font-medium p-0 m-0'>{author}</p>
                <p className='p-0 m-0   font-light  text-xs text-gray-600  '>{moment(createdAt).fromNow()}</p>
            </div>
        </div>
    )
}

export default PostHeader