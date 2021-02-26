import React, { useEffect, useState } from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import { pixelParser, rgbToHex } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import CompleteCanvas from '../canvas/CompleteCanvas'
import { setCreatePostModal, setLoginModal, setCreateCompetitionModal } from '../../store/modal'
import ModalContainer from '../NavBar/ModalContainer'
import './HomePage.css'
import { recentCompetitions, recentlyClosedCompetitions, clearCompetitions, popularCompetitions, featuredCompetitions } from '../../store/posts'
import PostList from './PostList'
//This component organizes the home page
function HomePage() {
    const modals = useSelector(state => state.modal)
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        (async function () {
            dispatch(clearCompetitions())
            let data = await fetch('/api/posts/competitions/recent')
            data = await data.json()
            dispatch(recentCompetitions(data))

            data = await fetch('/api/posts/competitions/recently-closed')
            data = await data.json()
            dispatch(recentlyClosedCompetitions(data))

            data = await fetch('/api/posts/competitions/popular')
            data = await data.json()
            dispatch(popularCompetitions(data))

            data = await fetch('/api/posts/competitions/featured')
            data = await data.json()
            dispatch(featuredCompetitions(data))

            setLoaded(true)
        })();
    }, [])

    return (
        <>

            {loaded &&
                <div className='center-content-wrapper'>
                    <div className='highlight-div'>
                        <PostList name='Featured Competitions' postList={posts.featuredCompetitions} competition={true} />
                        <PostList name='Popular Competitions' postList={posts.popularCompetitions} competition={true} competitionClosed={true} />
                    </div>
                    <div className='highlight-div'>
                        <PostList name='New Competitions' postList={posts.recentCompetitions} competition={true} />
                        <PostList name='Recently Closed Competitions' postList={posts.recentlyClosedCompetitions} competition={true} competitionClosed={true} />
                    </div>
                </div>
            }

        </>
    );
}
export default HomePage;
