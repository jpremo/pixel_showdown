import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import FollowButton from './FollowButton';
import { formatDistance } from 'date-fns'
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

    const dateStr = formatDistance(new Date(user.created_at), new Date())

    return (
        <span className='user-hover-wrapper' onMouseEnter={enter} onMouseLeave={leave} onClick={click}>
            {user.username}
            {!hidden &&
                <div className='user-hover-info'>
                    <div className='user-hover-header'>Pixel Artist for {dateStr}</div>
                    <div className='user-hover-buttons'>
                        <div className='user-hover-text'>{user.imageCount} Pictures</div>
                        <div className='user-hover-text'>{user.competitionCount} Competitions</div>
                    </div>
                    <div className='user-hover-buttons'>
                        <FollowButton currentUser={currentUser} user={user} login={login} />
                        <div className='user-hover-view-profile modal-link' onClick={click}>Profile</div>
                    </div>
                </div>
            }
        </span>
    );
}

export default UserHover;
