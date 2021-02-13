import { Link } from 'react-router-dom'
import React from 'react'
import { formatDistance } from 'date-fns'


function PostBox({ post, competition, competitionClosed }) {
    // let desc = post.body
    // if (post.body.length > 500) desc = post.description.slice(0, 500) + '...'
    let link = competition ? `/competitions/${post.id}` : `/posts/${post.id}`
    let timeDif = formatDistance(new Date(post.created_at), new Date())
    const competeText = competitionClosed ? 'View' : 'Compete'
    const imageError = (event) => {
        event.target.src = "http://simpleicon.com/wp-content/uploads/user1.png";
    }
    if (post.user.profileImg === null || post.user.profileImg === undefined) post.user.profileImage = 'create-error'
    return (
        <div className='post-box'>
            <div className='user-bar'>
                <img className='user-icon' src={post.user.profileImg} onError={imageError} alt="User Icon" />
                <div className='username'>Posted by <Link to={`/users/${post.user.id}`} className='user-link'>{post.user.username}</Link> {timeDif} ago</div>
            </div>
            <div className='post-description'>{post.body}</div>
            <div className='post-ruleset-wrapper'>
                <div className='post-description-title'>Competition Description</div>
                <div className='post-description-ruleset'>{post.ruleset.description}</div>
                <Link to={link} className='nav-link'>{competeText}</Link>
            </div>
        </div>
    )
}
export default PostBox
