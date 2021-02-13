import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { competitionPage, clearCompetitionPage } from '../../store/posts'
import { format, formatDistance, addSeconds } from 'date-fns'
import { Link } from 'react-router-dom'
import { isArray } from "lodash";
import {CirclePicker} from 'react-color'
import './CompetitionPage.css'
import Carousel from "./Carousel";
//Component used to wrap elements that should be displayed in a modal; hidden prop is used to specify the property that
//checks whether the modal should be visible
const CompetitionPage = () => {
    const modals = useSelector(state => state.modal)
    const user = useSelector(state => state.session.user)
    const post = useSelector(state => state.posts.competitionPage)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const params = useParams()
    const competitionId = params.postId
    useEffect(() => {
        (async function () {
            dispatch(clearCompetitionPage())
            let data = await fetch(`/api/posts/competitions/${competitionId}`)
            data = await data.json()
            if (!data.notFound) {
                dispatch(competitionPage(data))
            } else {
                setNotFound(true)
            }

            setLoaded(true)
        })();
    }, [])

    if (notFound) {
        return (
            <h1 className='competition-404'>This Competition Does Not Exist</h1>
        )
    }

    if (loaded) {

        const titleCase = (text) => {
            let result = text.replace(/([A-Z])/g, " $1");
            let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
            return finalResult
        }

        const textOutput = (key, value) => {
            if (typeof value === 'object' && !isArray(value)) {
                return (
                    <>
                        <div className='range-text-title'>{titleCase(key)}:</div>
                        <div className='range-text'>Min: {value.minValue}</div>
                        <div className='range-text'>Default: {value.defaultValue}</div>
                        <div className='range-text'>Max: {value.maxValue}</div>
                    </>
                )
            }
            return null
        }

        const disabledList = (key, value) => {
            if (key.includes('disable') && value === true) {
                return (
                    <>
                        <div className='tool-change-item'>{titleCase(key).split(' ').slice(1).join(' ') + " Disabled"}</div>
                    </>
                )
            }
            return null
        }

        // const parseRules = (rules) => {
        //     for (let key in rules) {

        //         finalValue += titleCase(key) + ': ' + value
        //     }
        // }

        function formattedTime(m) {
            if (m === .5) {
                return '30 Seconds'
            } else if (m === 60) {
                return '1 Hour'
            } else {
                return `${m} Minutes`
            }
        }

        const imageError = (event) => {
            event.target.src = "http://simpleicon.com/wp-content/uploads/user1.png";
        }

        let timeDif = formatDistance(new Date(post.created_at), new Date())
        if (post.user.profileImg === null || post.user.profileImg === undefined) post.user.profileImage = 'create-error'

        return (
            <>
                { loaded &&

                    <div className='post-box'>
                        <div className='user-bar'>
                            <img className='user-icon' src={post.user.profileImg} onError={imageError} alt="User Icon" />
                            <div className='username'>Created by <Link to={`/users/${post.user.id}`} className='user-link'>{post.user.username}</Link> {timeDif} ago</div>
                        </div>
                        <div className='post-description'>{post.body}</div>
                        <div className='post-ruleset-wrapper'>
                            <div className='post-description-title'>Competition Description</div>
                            <div className='post-description-ruleset'>{post.ruleset.description}</div>
                        </div>
                        <div>{new Date() > new Date(post.competitionEnd) ? 'Closed on' : 'Closes on'} {format(new Date(post.competitionEnd), 'eeee, MMMM do')} at {format(new Date(post.competitionEnd), 'h:m a')}</div>
                        <div>Rules</div>
                        <div>Submission Time Limit: {formattedTime(post.ruleset.rules.timeLimit)}</div>
                        <div>Base Color Palette:</div>
                        <div className='canvas-tools-circle'>
                            <CirclePicker
                                color={"#FFFFFF"}
                                colors={post.ruleset.rules.defaultPalette}
                                className={'no-select'}
                            />
                        </div>
                        {Object.entries(post.ruleset.rules).map((el, ind) => {
                            return (
                                <div className='range-text-box' key={ind}>
                                    {textOutput(el[0], el[1])}
                                </div>
                            )
                        })}
                        <div>Tool Changes:</div>
                        <ul className='tool-alterations-list'>
                        {Object.entries(post.ruleset.rules).map((el, ind) => {
                            const val = disabledList(el[0], el[1])
                            if(!val) return null
                            return (
                                <li key={ind}>
                                    {val}
                                </li>
                            )
                        })}
                        </ul>
                        <div>Submissions</div>
                        <Carousel images={post.images}/>
                    </div>
                }
            </>
        );
    }
    return null
}

export default CompetitionPage;
