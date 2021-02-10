import PostBox from './PostBox'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import { setLoginModal } from '../../store/modal'
import { useDispatch } from 'react-redux'
function PostList({ postList, name, competition }) {
    const [confirmScreen, setConfirmScreen] = useState(false)
    const history = useHistory()

    if (!postList || postList.length === 0) return (
        <>
            <div className='list-box'>
                <h1>{name}</h1>
                <div>
                    <h2>No Results</h2>
                </div>
            </div>
        </>
    )
    return (
        <div className='list-box'>
            <h1>{name}</h1>
            {postList.map((el, ind) => {
                return (
                    <PostBox post={el} key={ind} competition={competition}/>
                )
            })}
        </div>
    )
}

export default PostList
