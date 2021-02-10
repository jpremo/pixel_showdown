import { Link } from 'react-router-dom'
import React from 'react'
import {formatDistance, subDays} from 'date-fns'


function PostBox({ post, competition }) {
    // let desc = post.body
    // if (post.body.length > 500) desc = post.description.slice(0, 500) + '...'
    let link = competition ? `/competitions/${post.id}`:`/posts/${post.id}`
    let timeDif = formatDistance(new Date(post.created_at), new Date())
    const imageError = (event) => {
        event.target.src = "http://simpleicon.com/wp-content/uploads/user1.png";
    }
    if (post.user.profileImg === null || post.user.profileImg === undefined) post.user.profileImage = 'create-error'
    return (
        <div className='post-box'>
            <img className='user-icon' src={post.user.profileImg} onError={imageError} alt="User Icon" />
            <div className='post-description'>Posted by {post.user.username} {timeDif} ago</div>
            <Link to={link} className='post-link'>Compete</Link>
            <div className='post-description'>{post.body}</div>
            <div className='post-description'>Competition Description</div>
            <div className='post-description'>{post.ruleset.description}</div>
        </div>
    )
}
export default PostBox
