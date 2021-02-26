import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import { setLoginModal } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux'
import UserHover from '../UserHover'

function UserList({ users, user, owner }) {
    const dispatch = useDispatch()
    const loginModalOpen = () => {
        dispatch(setLoginModal(true))
    }
    if (!users || users.length === 0) return (
        <>
            <div className='profile-user-list'>
                <div>
                    <h2 style={{ marginLeft: '10px' }}>No Results</h2>
                </div>
            </div>
        </>
    )
    return (
        <div className='profile-user-list'>
            {users.map((el, ind) => {
                return (
                    <div className={'profile-user-wrapper'} key={ind}>
                        <UserHover login={loginModalOpen} currentUser={user} user={el} profilePage={owner} />
                    </div>
                )
            })}
        </div>
    )
}

export default UserList
