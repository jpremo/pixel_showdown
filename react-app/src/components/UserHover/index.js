import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './UserHover.css'

const UserHover = ({user}) => {
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
    const click = () => {
        history.push(`/users/${user.id}`)
    }
        return (
            <span className='user-hover-wrapper' onMouseEnter={enter} onMouseLeave={leave} onClick={click}>
                {user.username}
                {!hidden &&
                    <div className='user-hover-info'>I am hidden!</div>
                }
            </span>
        );
}

export default UserHover;
