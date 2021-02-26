import { Link } from 'react-router-dom'
import React from 'react'
import { formatDistance } from 'date-fns'
import UserHover from '../UserHover'
import { isPast } from 'date-fns'

function PostBox({ login, user, post, competition, competitionClosed, profilePage }) {
    // let desc = post.body
    // if (post.body.length > 500) desc = post.description.slice(0, 500) + '...'
    let link = competition ? `/competitions/${post.id}` : `/posts/${post.id}`
    let timeDif = formatDistance(new Date(post.created_at), new Date())
    let competeText = 'View'
    if (post.competitionEnd) {
        competeText = isPast(new Date(post.competitionEnd)) ? 'View' : 'Compete'
    }
    const imageError = (event) => {
        event.target.src = "http://simpleicon.com/wp-content/uploads/user1.png";
    }
    if ((!profilePage) && (post.user.profileImg === null || post.user.profileImg === undefined)) post.user.profileImage = 'create-error'
    return (
        <div className='post-box'>
            {!profilePage &&
                <div className='user-bar'>
                    <img className='user-icon' src={post.user.profileImg} onError={imageError} alt="User Icon" />
                    <div className='username'>Posted by <UserHover login={login} user={post.user} currentUser={user} /> {timeDif} ago</div>
                    {/* <Link to={`/users/${post.user.id}`} className='user-link'>{post.user.username}</Link> */}
                </div>
            }
            <div className='post-description'>{post.body}</div>
            <div className='post-ruleset-wrapper'>
                <div className='post-description-title'>Competition Description</div>
                <div className='post-description-ruleset'>{post.ruleset.description}</div>
                <Link to={link} className='modal-link'>{competeText}</Link>
                {profilePage &&
                    <div className='post-timedif'>Posted {timeDif} ago</div>
                }
            </div>

        </div>
    )
}
export default PostBox
