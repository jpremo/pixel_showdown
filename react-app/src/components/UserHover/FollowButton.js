import React from 'react';
import { useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../../store/session'
import './UserHover.css'
import { followUserProfile, unFollowUserProfile } from '../../store/profile'

const FollowButton = ({ user, currentUser, login, profilePage }) => {
    const dispatch = useDispatch()
    let followText
    if (currentUser.id && currentUser.followings.includes(user.id)) {
        followText = 'Unfollow'
    } else {
        followText = 'Follow'
    }
    const followClick = async () => {
        if (!currentUser.id) {
            login()
            return
        }
        if (followText === 'Follow') {
            await dispatch(followUser(currentUser.id, user.id))
            if(profilePage){
                dispatch(followUserProfile(user))
            }
        } else {
            await dispatch(unFollowUser(currentUser.id, user.id))
            if (profilePage) {
                dispatch(unFollowUserProfile(user))
            }
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
