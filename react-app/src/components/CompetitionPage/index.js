import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { competitionPage, clearCompetitionPage } from '../../store/posts'
import { format, formatDistance, isPast, addSeconds } from 'date-fns'
import { Link } from 'react-router-dom'
import { isArray } from "lodash";
import { CirclePicker } from 'react-color'
import './CompetitionPage.css'
import Carousel from "./Carousel";
import { setLoginModal } from '../../store/modal'
//Component used to wrap elements that should be displayed in a modal; hidden prop is used to specify the property that
//checks whether the modal should be visible
const CompetitionPage = () => {
    const modals = useSelector(state => state.modal)
    const user = useSelector(state => state.session.user)
    const post = useSelector(state => state.posts.competitionPage)
    const dispatch = useDispatch()
    const history = useHistory()
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

        const filteredImages = post.images.filter((img) => {
            const expirationDate = addSeconds(new Date(img.created_at), post.ruleset.rules.timeLimit * 60)
            if (isPast(expirationDate)) {
                return true
            }
        })

        let timeDif = formatDistance(new Date(post.created_at), new Date())
        if (post.user.profileImg === null || post.user.profileImg === undefined) post.user.profileImage = 'create-error'

        const entryLink = () => {
            if (user.id) {
                history.push(`/competitions/${post.id}/entry`)
            } else {
                dispatch(setLoginModal(true))
            }
        }

        const entryCheck = () => {
            if (!isPast(new Date(post.competitionEnd))) {
                if (user.id) {
                    if (user.id === post.user.id) {
                        return (
                            <div className='bolded-text'>Your competition is going great! Check back in later to judge the entries.</div>
                        )
                    }
                    let userSubmission = post.images.filter((el) => {
                        return el.userId === user.id
                    })
                    userSubmission = userSubmission[0]
                    if (userSubmission) {
                        const expirationDate = addSeconds(new Date(userSubmission.created_at), post.ruleset.rules.timeLimit * 60)
                        if (isPast(expirationDate)) {
                            return (
                                <div className='bolded-text'>Your entry has been received!</div>
                            )
                        } else {
                            return (
                                <div className='nav-link' onClick={entryLink}>Edit Entry</div>
                            )
                        }
                    }
                }
                return (
                    <div className='nav-link' onClick={entryLink}>Create Entry</div>
                )
            } else {
                if (user.id === post.user.id) {
                    return (
                        <div className='nav-link' onClick={() => history.push(`/competitions/${post.id}/judge`)}>Judge Entries</div>
                    )
                }
            }

        }

        let disabledTools = Object.entries(post.ruleset.rules).map((el, ind) => {
            const val = disabledList(el[0], el[1])
            if (!val) return null
            return (
                <li key={ind}>
                    {val}
                </li>
            )
        })
        let showTools = false
        for(let i = 0; i < disabledTools.length; i++) {
            if(disabledTools[i] !== null) {
                showTools = true
            }
        }

        return (
            <>
                { loaded &&
                    <div className='competition-content-wrapper'>
                        <div className='competition-content'>
                            <div>
                            <div className='user-bar'>
                                <img className='user-icon' src={post.user.profileImg} onError={imageError} alt="User Icon" />
                                <div className='username'>Created by <Link to={`/users/${post.user.id}`} className='user-link'>{post.user.username}</Link> {timeDif} ago</div>
                            </div>
                            <div className='post-description'>{post.body}</div>
                            <div className='post-ruleset-wrapper'>
                                <div className='post-description-title'>Competition Description</div>
                                <div className='post-description-ruleset'>{post.ruleset.description}</div>
                            </div>
                            </div>
                            <div className='bolded-text'>{new Date() > new Date(post.competitionEnd) ? 'Closed on' : 'Closes on'} {format(new Date(post.competitionEnd), 'eeee, MMMM do yyyy')} at {format(new Date(post.competitionEnd), 'h:m a')}</div>
                            <div className='competition-title-large'>Submissions</div>
                            <Carousel images={filteredImages} />
                            <div className='competition-title-large'>Rules</div>
                            <div className='bolded-text'>Submission Time Limit: {formattedTime(post.ruleset.rules.timeLimit)}</div>
                            <div className='competition-palette-box'>
                                <div>
                                    <div className='range-text-title'>Base Color Palette:</div>
                                    <div className='canvas-tools-circle'>
                                        <CirclePicker
                                            color={"#FFFFFF"}
                                            colors={post.ruleset.rules.defaultPalette}
                                            className={'no-select'}
                                        />
                                    </div>
                                </div>
                                {showTools &&
                                    <div>
                                        <div className='range-text-title'>Tool Changes:</div>
                                        <ul className='tool-alterations-list'>
                                            {disabledTools}
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className='competition-rule-box'>
                                {Object.entries(post.ruleset.rules).map((el, ind) => {
                                    const val = textOutput(el[0], el[1])
                                    if (!val) return null
                                    return (
                                        <div className='range-text-box' key={ind}>
                                            {val}
                                        </div>
                                    )
                                })}
                            </div>
                            {entryCheck()}
                        </div>
                    </div>
                }
            </>
        );
    }
    return null
}

export default CompetitionPage;
