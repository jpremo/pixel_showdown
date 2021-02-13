import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { competitionPage, clearCompetitionPage } from '../../store/posts'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import { de } from "date-fns/locale";
import { isArray } from "lodash";
import './CompetitionPage.css'
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
            // debugger
            let finalValue = ''
            if (typeof value === 'object' && !isArray(value)) {
                for (let key in value) {
                    // debugger
                    finalValue += titleCase(key) + ': ' + String(value[key] + ' ')
                }
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

        // const parseRules = (rules) => {
        //     for (let key in rules) {

        //         finalValue += titleCase(key) + ': ' + value
        //     }
        // }

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
                        <div>Rules</div>
                        {Object.entries(post.ruleset.rules).map((el, ind) => {
                            return (
                                <div className='range-text-box' key={ind}>
                                    {textOutput(el[0], el[1])}
                                </div>
                            )
                        })}
                    </div>
                }
            </>
        );
    }
    return null
}

export default CompetitionPage;
