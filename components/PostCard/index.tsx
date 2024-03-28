import React from 'react'
import PostHeader from './PostHeader'
import PostBody from './PostBody'

const PostCard = () => {
    return (
        <div className='w-full  standard-shape  py-2 flex flex-col gap-2'>
            <PostHeader author={'Mohamed Asaad'} createdAt={new Date()} />
            <PostBody text={'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate optio nostrum dolore repudiandae facere quas provident reprehenderit, repellat labore, perspiciatis error tenetur cum accusamus iusto dicta expedita illum laudantium dolores.'} />
        </div>
    )
}

export default PostCard