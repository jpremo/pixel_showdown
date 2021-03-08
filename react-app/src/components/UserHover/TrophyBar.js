import React from 'react';

const TrophyBar = ({ user }) => {
    return (
        <div className='user-hover-buttons'>
            <div className='user-hover-text'><i style={{ color: '#E0DF3D', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i> {user.first}</div>
            <div className='user-hover-text'><i style={{ color: '#DADADA', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i> {user.second}</div>
            <div className='user-hover-text'><i style={{ color: '#CD881B', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i> {user.third}</div>
        </div>
    );
}

export default TrophyBar;
