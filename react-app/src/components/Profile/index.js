import React, { useEffect, useState } from 'react';
import ProfileCarousel from './ProfileCarousel'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { setProfileUser, clearProfileUser } from '../../store/profile'
import './Profile.css'
import TrophyBar from '../UserHover/TrophyBar';
import { changeProperty } from '../../store/canvas';
import PostList from '../HomePage/PostList'
import UserList from './UserList';

const Profile = () => {
    const user = useSelector(state => state.session.user)
    const profile = useSelector(state => state.profile)
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const params = useParams()
    const userId = Number(params.userId)
    const owner = user.id === userId
    const dispatch = useDispatch()
    useEffect(() => {
        const initialize = async () => {
            dispatch(clearProfileUser())
            const res = await fetch(`/api/users/profile/${userId}`)
            const data = await res.json()
            dispatch(dispatch(setProfileUser(data)))
            setLoaded(true)
        }
        initialize()
    }, [])

    if (!loaded) {
        return null
    }
    const imageError = (event) => {
        event.target.src = "http://simpleicon.com/wp-content/uploads/user1.png";
    }
    if (profile.profileImg === null || profile.profileImg === undefined) profile.profileImage = 'create-error'

    const changePage = (e) => {
        switch (e.target.innerText) {
            case 'Images': setPage(1)
                break;
            case 'Competitions': setPage(2)
                break;
            case 'Followers': setPage(3)
                break;
            case 'Following': setPage(4)
                break;
        }
    }

    return (
        <div className='profile-wrapper'>
            <div className='profile-header'>
                <img className='user-icon-large' onError={imageError} alt='profile-pic' src={profile.profileImg} />
                <div className='profile-header-title'>
                    {owner ? 'Your Profile' : `${profile.username}'s Profile`}
                    <TrophyBar user={profile} />
                    <div className='user-hover-buttons' style={{ marginTop: '0' }}>
                        <div className='user-hover-text'>Pictures: {user.imageCount}</div>
                        <div className='user-hover-text'>Competitions: {user.competitionCount}</div>
                        <div className='user-hover-text'>Points: {user.points}</div>
                    </div>
                </div>
            </div>
            <div className='profile-select-bar'>
                <div onClick={changePage} className='profile-select-button user-hover-wrapper'>
                    Images
                </div>
                <div onClick={changePage} className='profile-select-button user-hover-wrapper'>
                    Competitions
                </div>
                <div onClick={changePage} className='profile-select-button user-hover-wrapper'>
                    Followers
                </div>
                <div onClick={changePage} className='profile-select-button user-hover-wrapper'>
                    Following
                </div>
            </div>
            {page === 1 &&
                <div className='profile-image-wrapper'>
                    <div className='profile-header-title'>
                        {owner ? 'Your Images' : `${profile.username}'s Images`}
                    </div>
                    <ProfileCarousel images={profile.images} owner={owner} userId={user.id} />
                </div>
            }
            {page === 2 &&
                <div className='profile-image-wrapper'>
                    <div className='profile-header-title'>
                        {owner ? 'Your Competitions' : `${profile.username}'s Images`}
                    </div>
                <PostList name='' postList={profile.competitions} profilePage={true}/>
                </div>
            }
            {page === 3 &&
                <div className='profile-user-list-wrapper'>
                    <div className='profile-header-title'>
                        {owner ? 'Your Followers' : `${profile.username}'s Followers`}
                    </div>
                <UserList user={user} users={profile.followers} owner={owner}/>
                </div>
            }
            {page === 4 &&
                <div className='profile-user-list-wrapper'>
                    <div className='profile-header-title'>
                        {owner ? 'Users You Follow' : `User ${profile.username} is Following`}
                    </div>
                    <UserList user={user} users={profile.followings} owner={owner}/>
                </div>
            }

        </div>
    );
}

export default Profile;
