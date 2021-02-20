import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import FollowButton from './FollowButton';
import './UserHover.css'

const UserHover = ({ user, currentUser, login }) => {
    const history = useHistory()
    const [hidden, setHidden] = useState(true)
    const [alarm, setAlarm] = useState(null)

    const enter = () => {
        setAlarm(setTimeout(() => {
            setHidden(false)
        }, 500))
    }
    const leave = () => {
        clearTimeout(alarm)
        setHidden(true)
    }
    const click = (e) => {
        if (e.target === e.currentTarget) {
            history.push(`/users/${user.id}`)
        }
    }

    return (
        <span className='user-hover-wrapper' onMouseEnter={enter} onMouseLeave={leave} onClick={click}>
            {user.username}
            {!hidden &&
                <div className='user-hover-info'>
                    <div>Placeholder</div>
                    <FollowButton currentUser={currentUser} user={user} login={login} />
                    <div className='user-hover-view-profile modal-link' onClick={click}>View Profile</div>
                </div>
            }
        </span>
    );
}

export default UserHover;
