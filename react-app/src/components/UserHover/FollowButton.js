import React from 'react';
import { useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../../store/session'
import './UserHover.css'

const FollowButton = ({ user, currentUser, login }) => {
    const dispatch = useDispatch()
    let followText
    if (currentUser.id && currentUser.followings.includes(user.id)) {
        followText = 'Unfollow'
    } else {
        followText = 'Follow'
    }
    const followClick = () => {
        if (!currentUser.id) {
            login()
            return
        }
        if (followText === 'Follow') {
            dispatch(followUser(currentUser.id, user.id))
        } else {
            dispatch(unFollowUser(currentUser.id, user.id))
        }
    }
    return (
        <>
            {currentUser.id !== user.id &&
                <div className='modal-link' onClick={followClick}>{followText}</div>
            }
        </>
    );
}

export default FollowButton;
