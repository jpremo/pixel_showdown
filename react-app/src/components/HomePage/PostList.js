import PostBox from './PostBox'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import { setLoginModal } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux'
function PostList({ postList, name, competition, competitionClosed=false, profilePage=false }) {
    const [confirmScreen, setConfirmScreen] = useState(false)
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const loginModalOpen = () => {
        dispatch(setLoginModal(true))
    }
    if (!postList || postList.length === 0) return (
        <>
            <div className='list-box'>
                <h1>{name}</h1>
                <div>
                    <h2 style={{marginLeft:'10px'}}>No Results</h2>
                </div>
            </div>
        </>
    )
    return (
        <div className='list-box'>
            <h1>{name}</h1>
            {postList.map((el, ind) => {
                return (
                    <PostBox login={loginModalOpen} user={user} post={el} key={ind} profilePage={profilePage} competition={competition} competitionClosed={competitionClosed}/>
                )
            })}
        </div>
    )
}

export default PostList
