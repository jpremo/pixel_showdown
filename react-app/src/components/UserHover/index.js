import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import FollowButton from './FollowButton';
import { formatDistance } from 'date-fns'
import './UserHover.css'
import TrophyBar from './TrophyBar';

const UserHover = ({ user, currentUser, login, profilePage=false }) => {
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
            history.go(0)
        }
    }

    const dateStr = formatDistance(new Date(user.created_at), new Date())
    const ribbonLogo = (place) => {
        switch (place) {
            case 0: return (<i style={{ color: '#E0DF3D', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i>)
            case 1: return (<i style={{ color: '#DADADA', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i>)
            case 2: return (<i style={{ color: '#CD881B', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i>)
            default: return null;
        }
    }
    return (
        <span className='user-hover-wrapper' onMouseEnter={enter} onMouseLeave={leave} onClick={click}>
            {user.username}
            {!hidden &&
                <div className='user-hover-info'>
                    <div className='user-hover-header'>Pixel Artist for {dateStr}</div>
                    <TrophyBar user={user}/>
                    <div className='user-hover-buttons' style={{marginTop:'0'}}>
                        <div className='user-hover-text'>Pictures: {user.imageCount}</div>
                        <div className='user-hover-text'>Competitions: {user.competitionCount}</div>
                        <div className='user-hover-text'>Points: {user.points}</div>
                    </div>
                    <div className='user-hover-buttons'>
                        <FollowButton currentUser={currentUser} user={user} login={login} profilePage={profilePage} />
                        <div className='user-hover-view-profile modal-link' onClick={click}>Profile</div>
                    </div>
                </div>
            }
        </span>
    );
}

export default UserHover;
