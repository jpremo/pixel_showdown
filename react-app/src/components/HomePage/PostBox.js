import { Link } from 'react-router-dom'
import React from 'react'


function PostBox({ post, competition }) {
    let desc = post.body
    if (post.body.length > 500) desc = post.description.slice(0, 500) + '...'
    let link = competition ? `/competitions/${post.id}`:`/posts/${post.id}`
    return (
        <div className='post-box'>
            <Link to={link} className='post-link'>Compete</Link>
            <div className='post-description'>{desc}</div>
        </div>
    )
}
export default PostBox
