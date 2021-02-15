import React, { useEffect, useState } from 'react';
import ProfileCarousel from './ProfileCarousel'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { userImages, clearUserImages } from '../../store/profile'
import './Profile.css'

const Profile = () => {
    const user = useSelector(state => state.session.user)
    const profile = useSelector(state => state.profile)
    const [loaded, setLoaded] = useState(false)
    const params = useParams()
    const userId = Number(params.userId)
    const owner = user.id === userId
    const dispatch = useDispatch()
    useEffect(() => {
        const initialize = async () => {
            dispatch(clearUserImages())
            const res = await fetch(`/api/images/user/${userId}`)
            const data = await res.json()
            dispatch(dispatch(userImages(data)))
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
    if (profile.user.profileImg === null || profile.user.profileImg === undefined) profile.user.profileImage = 'create-error'
    return (
        <>
            <div className='profile-header'>
                <img className='user-icon-large' onError={imageError} alt='profile-pic' src={profile.user.profileImg} />
                <div className='profile-header-title'>
                    {owner ? 'Your Profile' : `${profile.user.username}'s Profile`}
                </div>
            </div>
            <div className='profile-header-title'>
                {owner ? 'Your Images' : `${profile.user.username}'s Images`}
            </div>
            <ProfileCarousel images={profile.images} owner={owner} userId={user.id} />

        </>
    );
}

export default Profile;
